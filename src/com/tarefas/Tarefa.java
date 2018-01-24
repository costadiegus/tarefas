package com.tarefas;

import java.sql.Date;

public class Tarefa {
	String titulo;
	String descricao;
	Date dataExecucao;
	
	public Tarefa (String titulo, String descricao, Date data) {
		this.titulo = titulo;
		this.descricao = descricao;
		this.dataExecucao = data;
	}
}
