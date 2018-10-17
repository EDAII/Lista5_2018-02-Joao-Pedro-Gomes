package br.com.unb.eda2.jp.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.unb.eda2.jp.domain.Troco;
import br.com.unb.eda2.jp.repository.TrocoRepository;
import br.com.unb.eda2.jp.web.rest.errors.BadRequestAlertException;
import br.com.unb.eda2.jp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Troco.
 */
@RestController
@RequestMapping("/api")
public class TrocoResource {

    private final Logger log = LoggerFactory.getLogger(TrocoResource.class);

    private static final String ENTITY_NAME = "troco";

    private final TrocoRepository trocoRepository;

    public TrocoResource(TrocoRepository trocoRepository) {
        this.trocoRepository = trocoRepository;
    }

    /**
     * POST  /trocos : Create a new troco.
     *
     * @param troco the troco to create
     * @return the ResponseEntity with status 201 (Created) and with body the new troco, or with status 400 (Bad Request) if the troco has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/trocos")
    @Timed
    public ResponseEntity<Troco> createTroco(@RequestBody Troco troco) throws URISyntaxException {
        log.debug("REST request to save Troco : {}", troco);
        if (troco.getId() != null) {
            throw new BadRequestAlertException("A new troco cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Troco result = trocoRepository.save(troco);
        return ResponseEntity.created(new URI("/api/trocos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /trocos : Updates an existing troco.
     *
     * @param troco the troco to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated troco,
     * or with status 400 (Bad Request) if the troco is not valid,
     * or with status 500 (Internal Server Error) if the troco couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/trocos")
    @Timed
    public ResponseEntity<Troco> updateTroco(@RequestBody Troco troco) throws URISyntaxException {
        log.debug("REST request to update Troco : {}", troco);
        if (troco.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Troco result = trocoRepository.save(troco);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, troco.getId().toString()))
            .body(result);
    }

    /**
     * GET  /trocos : get all the trocos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of trocos in body
     */
    @GetMapping("/trocos")
    @Timed
    public List<Troco> getAllTrocos() {
        log.debug("REST request to get all Trocos");
        return trocoRepository.findAll();
    }

    /**
     * GET  /trocos/:id : get the "id" troco.
     *
     * @param id the id of the troco to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the troco, or with status 404 (Not Found)
     */
    @GetMapping("/trocos/{id}")
    @Timed
    public ResponseEntity<Troco> getTroco(@PathVariable Long id) {
        log.debug("REST request to get Troco : {}", id);
        Optional<Troco> troco = trocoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(troco);
    }

    /**
     * DELETE  /trocos/:id : delete the "id" troco.
     *
     * @param id the id of the troco to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/trocos/{id}")
    @Timed
    public ResponseEntity<Void> deleteTroco(@PathVariable Long id) {
        log.debug("REST request to delete Troco : {}", id);

        trocoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
