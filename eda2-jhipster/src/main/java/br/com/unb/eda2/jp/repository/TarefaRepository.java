package br.com.unb.eda2.jp.repository;

import br.com.unb.eda2.jp.domain.Tarefa;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Tarefa entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Long> {

    @Query("select tarefa from Tarefa tarefa where tarefa.tem.login = ?#{principal.username}")
    List<Tarefa> findByTemIsCurrentUser();

}
