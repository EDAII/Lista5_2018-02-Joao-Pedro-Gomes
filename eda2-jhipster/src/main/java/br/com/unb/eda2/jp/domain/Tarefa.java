package br.com.unb.eda2.jp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Tarefa.
 */
@Entity
@Table(name = "tarefa")
public class Tarefa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Min(value = 0)
    @Max(value = 23)
    @Column(name = "horario_inicio", nullable = false)
    private Integer horarioInicio;

    @NotNull
    @Min(value = 0)
    @Max(value = 23)
    @Column(name = "horario_final", nullable = false)
    private Integer horarioFinal;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @ManyToOne
    @JsonIgnoreProperties("")
    private User tem;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getHorarioInicio() {
        return horarioInicio;
    }

    public Tarefa horarioInicio(Integer horarioInicio) {
        this.horarioInicio = horarioInicio;
        return this;
    }

    public void setHorarioInicio(Integer horarioInicio) {
        this.horarioInicio = horarioInicio;
    }

    public Integer getHorarioFinal() {
        return horarioFinal;
    }

    public Tarefa horarioFinal(Integer horarioFinal) {
        this.horarioFinal = horarioFinal;
        return this;
    }

    public void setHorarioFinal(Integer horarioFinal) {
        this.horarioFinal = horarioFinal;
    }

    public String getNome() {
        return nome;
    }

    public Tarefa nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public User getTem() {
        return tem;
    }

    public Tarefa tem(User user) {
        this.tem = user;
        return this;
    }

    public void setTem(User user) {
        this.tem = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Tarefa tarefa = (Tarefa) o;
        if (tarefa.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tarefa.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Tarefa{" +
            "id=" + getId() +
            ", horarioInicio=" + getHorarioInicio() +
            ", horarioFinal=" + getHorarioFinal() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
