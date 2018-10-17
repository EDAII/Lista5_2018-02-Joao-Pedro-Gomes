package br.com.unb.eda2.jp.web.rest;

import br.com.unb.eda2.jp.Eda2App;

import br.com.unb.eda2.jp.domain.Troco;
import br.com.unb.eda2.jp.repository.TrocoRepository;
import br.com.unb.eda2.jp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static br.com.unb.eda2.jp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TrocoResource REST controller.
 *
 * @see TrocoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Eda2App.class)
public class TrocoResourceIntTest {

    private static final Float DEFAULT_VALOR = 1F;
    private static final Float UPDATED_VALOR = 2F;

    @Autowired
    private TrocoRepository trocoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTrocoMockMvc;

    private Troco troco;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TrocoResource trocoResource = new TrocoResource(trocoRepository);
        this.restTrocoMockMvc = MockMvcBuilders.standaloneSetup(trocoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Troco createEntity(EntityManager em) {
        Troco troco = new Troco()
            .valor(DEFAULT_VALOR);
        return troco;
    }

    @Before
    public void initTest() {
        troco = createEntity(em);
    }

    @Test
    @Transactional
    public void createTroco() throws Exception {
        int databaseSizeBeforeCreate = trocoRepository.findAll().size();

        // Create the Troco
        restTrocoMockMvc.perform(post("/api/trocos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(troco)))
            .andExpect(status().isCreated());

        // Validate the Troco in the database
        List<Troco> trocoList = trocoRepository.findAll();
        assertThat(trocoList).hasSize(databaseSizeBeforeCreate + 1);
        Troco testTroco = trocoList.get(trocoList.size() - 1);
        assertThat(testTroco.getValor()).isEqualTo(DEFAULT_VALOR);
    }

    @Test
    @Transactional
    public void createTrocoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = trocoRepository.findAll().size();

        // Create the Troco with an existing ID
        troco.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrocoMockMvc.perform(post("/api/trocos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(troco)))
            .andExpect(status().isBadRequest());

        // Validate the Troco in the database
        List<Troco> trocoList = trocoRepository.findAll();
        assertThat(trocoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTrocos() throws Exception {
        // Initialize the database
        trocoRepository.saveAndFlush(troco);

        // Get all the trocoList
        restTrocoMockMvc.perform(get("/api/trocos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(troco.getId().intValue())))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getTroco() throws Exception {
        // Initialize the database
        trocoRepository.saveAndFlush(troco);

        // Get the troco
        restTrocoMockMvc.perform(get("/api/trocos/{id}", troco.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(troco.getId().intValue()))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTroco() throws Exception {
        // Get the troco
        restTrocoMockMvc.perform(get("/api/trocos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTroco() throws Exception {
        // Initialize the database
        trocoRepository.saveAndFlush(troco);

        int databaseSizeBeforeUpdate = trocoRepository.findAll().size();

        // Update the troco
        Troco updatedTroco = trocoRepository.findById(troco.getId()).get();
        // Disconnect from session so that the updates on updatedTroco are not directly saved in db
        em.detach(updatedTroco);
        updatedTroco
            .valor(UPDATED_VALOR);

        restTrocoMockMvc.perform(put("/api/trocos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTroco)))
            .andExpect(status().isOk());

        // Validate the Troco in the database
        List<Troco> trocoList = trocoRepository.findAll();
        assertThat(trocoList).hasSize(databaseSizeBeforeUpdate);
        Troco testTroco = trocoList.get(trocoList.size() - 1);
        assertThat(testTroco.getValor()).isEqualTo(UPDATED_VALOR);
    }

    @Test
    @Transactional
    public void updateNonExistingTroco() throws Exception {
        int databaseSizeBeforeUpdate = trocoRepository.findAll().size();

        // Create the Troco

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrocoMockMvc.perform(put("/api/trocos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(troco)))
            .andExpect(status().isBadRequest());

        // Validate the Troco in the database
        List<Troco> trocoList = trocoRepository.findAll();
        assertThat(trocoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTroco() throws Exception {
        // Initialize the database
        trocoRepository.saveAndFlush(troco);

        int databaseSizeBeforeDelete = trocoRepository.findAll().size();

        // Get the troco
        restTrocoMockMvc.perform(delete("/api/trocos/{id}", troco.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Troco> trocoList = trocoRepository.findAll();
        assertThat(trocoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Troco.class);
        Troco troco1 = new Troco();
        troco1.setId(1L);
        Troco troco2 = new Troco();
        troco2.setId(troco1.getId());
        assertThat(troco1).isEqualTo(troco2);
        troco2.setId(2L);
        assertThat(troco1).isNotEqualTo(troco2);
        troco1.setId(null);
        assertThat(troco1).isNotEqualTo(troco2);
    }
}
