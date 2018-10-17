package br.com.unb.eda2.jp.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.unb.eda2.jp.domain.Tarefa;
import br.com.unb.eda2.jp.repository.TarefaRepository;
import br.com.unb.eda2.jp.web.rest.errors.BadRequestAlertException;
import br.com.unb.eda2.jp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Tarefa.
 */
@RestController
@RequestMapping("/api")
public class TarefaResource {

    private final Logger log = LoggerFactory.getLogger(TarefaResource.class);

    private static final String ENTITY_NAME = "tarefa";

    private final TarefaRepository tarefaRepository;

    public TarefaResource(TarefaRepository tarefaRepository) {
        this.tarefaRepository = tarefaRepository;
    }

    /**
     * POST  /tarefas : Create a new tarefa.
     *
     * @param tarefa the tarefa to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tarefa, or with status 400 (Bad Request) if the tarefa has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tarefas")
    @Timed
    public ResponseEntity<Tarefa> createTarefa(@Valid @RequestBody Tarefa tarefa) throws URISyntaxException {
        log.debug("REST request to save Tarefa : {}", tarefa);
        if (tarefa.getId() != null) {
            throw new BadRequestAlertException("A new tarefa cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tarefa result = tarefaRepository.save(tarefa);
        return ResponseEntity.created(new URI("/api/tarefas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tarefas : Updates an existing tarefa.
     *
     * @param tarefa the tarefa to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tarefa,
     * or with status 400 (Bad Request) if the tarefa is not valid,
     * or with status 500 (Internal Server Error) if the tarefa couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tarefas")
    @Timed
    public ResponseEntity<Tarefa> updateTarefa(@Valid @RequestBody Tarefa tarefa) throws URISyntaxException {
        log.debug("REST request to update Tarefa : {}", tarefa);
        if (tarefa.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Tarefa result = tarefaRepository.save(tarefa);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tarefa.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tarefas : get all the tarefas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tarefas in body
     */
    @GetMapping("/tarefas")
    @Timed
    public List<Tarefa> getAllTarefas() {
        log.debug("REST request to get all Tarefas");
        return tarefaRepository.findAll();
    }

    /**
     * GET  /tarefas/:id : get the "id" tarefa.
     *
     * @param id the id of the tarefa to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tarefa, or with status 404 (Not Found)
     */
    @GetMapping("/tarefas/{id}")
    @Timed
    public ResponseEntity<Tarefa> getTarefa(@PathVariable Long id) {
        log.debug("REST request to get Tarefa : {}", id);
        Optional<Tarefa> tarefa = tarefaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tarefa);
    }

    /**
     * DELETE  /tarefas/:id : delete the "id" tarefa.
     *
     * @param id the id of the tarefa to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tarefas/{id}")
    @Timed
    public ResponseEntity<Void> deleteTarefa(@PathVariable Long id) {
        log.debug("REST request to delete Tarefa : {}", id);

        tarefaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
