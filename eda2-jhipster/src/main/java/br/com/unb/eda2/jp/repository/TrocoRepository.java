package br.com.unb.eda2.jp.repository;

import br.com.unb.eda2.jp.domain.Troco;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Troco entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TrocoRepository extends JpaRepository<Troco, Long> {

}
