package br.com.unb.eda2.jp.web.rest;

import br.com.unb.eda2.jp.Eda2App;

import br.com.unb.eda2.jp.domain.Tarefa;
import br.com.unb.eda2.jp.repository.TarefaRepository;
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
 * Test class for the TarefaResource REST controller.
 *
 * @see TarefaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Eda2App.class)
public class TarefaResourceIntTest {

    private static final Integer DEFAULT_HORARIO_INICIO = 0;
    private static final Integer UPDATED_HORARIO_INICIO = 1;

    private static final Integer DEFAULT_HORARIO_FINAL = 0;
    private static final Integer UPDATED_HORARIO_FINAL = 1;

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private TarefaRepository tarefaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTarefaMockMvc;

    private Tarefa tarefa;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TarefaResource tarefaResource = new TarefaResource(tarefaRepository);
        this.restTarefaMockMvc = MockMvcBuilders.standaloneSetup(tarefaResource)
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
    public static Tarefa createEntity(EntityManager em) {
        Tarefa tarefa = new Tarefa()
            .horarioInicio(DEFAULT_HORARIO_INICIO)
            .horarioFinal(DEFAULT_HORARIO_FINAL)
            .nome(DEFAULT_NOME);
        return tarefa;
    }

    @Before
    public void initTest() {
        tarefa = createEntity(em);
    }

    @Test
    @Transactional
    public void createTarefa() throws Exception {
        int databaseSizeBeforeCreate = tarefaRepository.findAll().size();

        // Create the Tarefa
        restTarefaMockMvc.perform(post("/api/tarefas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarefa)))
            .andExpect(status().isCreated());

        // Validate the Tarefa in the database
        List<Tarefa> tarefaList = tarefaRepository.findAll();
        assertThat(tarefaList).hasSize(databaseSizeBeforeCreate + 1);
        Tarefa testTarefa = tarefaList.get(tarefaList.size() - 1);
        assertThat(testTarefa.getHorarioInicio()).isEqualTo(DEFAULT_HORARIO_INICIO);
        assertThat(testTarefa.getHorarioFinal()).isEqualTo(DEFAULT_HORARIO_FINAL);
        assertThat(testTarefa.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createTarefaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tarefaRepository.findAll().size();

        // Create the Tarefa with an existing ID
        tarefa.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTarefaMockMvc.perform(post("/api/tarefas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarefa)))
            .andExpect(status().isBadRequest());

        // Validate the Tarefa in the database
        List<Tarefa> tarefaList = tarefaRepository.findAll();
        assertThat(tarefaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkHorarioInicioIsRequired() throws Exception {
        int databaseSizeBeforeTest = tarefaRepository.findAll().size();
        // set the field null
        tarefa.setHorarioInicio(null);

        // Create the Tarefa, which fails.

        restTarefaMockMvc.perform(post("/api/tarefas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarefa)))
            .andExpect(status().isBadRequest());

        List<Tarefa> tarefaList = tarefaRepository.findAll();
        assertThat(tarefaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkHorarioFinalIsRequired() throws Exception {
        int databaseSizeBeforeTest = tarefaRepository.findAll().size();
        // set the field null
        tarefa.setHorarioFinal(null);

        // Create the Tarefa, which fails.

        restTarefaMockMvc.perform(post("/api/tarefas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarefa)))
            .andExpect(status().isBadRequest());

        List<Tarefa> tarefaList = tarefaRepository.findAll();
        assertThat(tarefaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = tarefaRepository.findAll().size();
        // set the field null
        tarefa.setNome(null);

        // Create the Tarefa, which fails.

        restTarefaMockMvc.perform(post("/api/tarefas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarefa)))
            .andExpect(status().isBadRequest());

        List<Tarefa> tarefaList = tarefaRepository.findAll();
        assertThat(tarefaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTarefas() throws Exception {
        // Initialize the database
        tarefaRepository.saveAndFlush(tarefa);

        // Get all the tarefaList
        restTarefaMockMvc.perform(get("/api/tarefas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tarefa.getId().intValue())))
            .andExpect(jsonPath("$.[*].horarioInicio").value(hasItem(DEFAULT_HORARIO_INICIO)))
            .andExpect(jsonPath("$.[*].horarioFinal").value(hasItem(DEFAULT_HORARIO_FINAL)))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())));
    }
    
    @Test
    @Transactional
    public void getTarefa() throws Exception {
        // Initialize the database
        tarefaRepository.saveAndFlush(tarefa);

        // Get the tarefa
        restTarefaMockMvc.perform(get("/api/tarefas/{id}", tarefa.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tarefa.getId().intValue()))
            .andExpect(jsonPath("$.horarioInicio").value(DEFAULT_HORARIO_INICIO))
            .andExpect(jsonPath("$.horarioFinal").value(DEFAULT_HORARIO_FINAL))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTarefa() throws Exception {
        // Get the tarefa
        restTarefaMockMvc.perform(get("/api/tarefas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTarefa() throws Exception {
        // Initialize the database
        tarefaRepository.saveAndFlush(tarefa);

        int databaseSizeBeforeUpdate = tarefaRepository.findAll().size();

        // Update the tarefa
        Tarefa updatedTarefa = tarefaRepository.findById(tarefa.getId()).get();
        // Disconnect from session so that the updates on updatedTarefa are not directly saved in db
        em.detach(updatedTarefa);
        updatedTarefa
            .horarioInicio(UPDATED_HORARIO_INICIO)
            .horarioFinal(UPDATED_HORARIO_FINAL)
            .nome(UPDATED_NOME);

        restTarefaMockMvc.perform(put("/api/tarefas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTarefa)))
            .andExpect(status().isOk());

        // Validate the Tarefa in the database
        List<Tarefa> tarefaList = tarefaRepository.findAll();
        assertThat(tarefaList).hasSize(databaseSizeBeforeUpdate);
        Tarefa testTarefa = tarefaList.get(tarefaList.size() - 1);
        assertThat(testTarefa.getHorarioInicio()).isEqualTo(UPDATED_HORARIO_INICIO);
        assertThat(testTarefa.getHorarioFinal()).isEqualTo(UPDATED_HORARIO_FINAL);
        assertThat(testTarefa.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingTarefa() throws Exception {
        int databaseSizeBeforeUpdate = tarefaRepository.findAll().size();

        // Create the Tarefa

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTarefaMockMvc.perform(put("/api/tarefas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarefa)))
            .andExpect(status().isBadRequest());

        // Validate the Tarefa in the database
        List<Tarefa> tarefaList = tarefaRepository.findAll();
        assertThat(tarefaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTarefa() throws Exception {
        // Initialize the database
        tarefaRepository.saveAndFlush(tarefa);

        int databaseSizeBeforeDelete = tarefaRepository.findAll().size();

        // Get the tarefa
        restTarefaMockMvc.perform(delete("/api/tarefas/{id}", tarefa.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Tarefa> tarefaList = tarefaRepository.findAll();
        assertThat(tarefaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tarefa.class);
        Tarefa tarefa1 = new Tarefa();
        tarefa1.setId(1L);
        Tarefa tarefa2 = new Tarefa();
        tarefa2.setId(tarefa1.getId());
        assertThat(tarefa1).isEqualTo(tarefa2);
        tarefa2.setId(2L);
        assertThat(tarefa1).isNotEqualTo(tarefa2);
        tarefa1.setId(null);
        assertThat(tarefa1).isNotEqualTo(tarefa2);
    }
}
