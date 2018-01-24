package com.tarefas;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.tarefas.bd.DBConnection;

/**
 * Servlet implementation class GetTarefas
 */
@WebServlet("/GetTarefas")
public class GetTarefas extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * Default constructor.
	 */
	public GetTarefas() {
		// TODO Auto-generated constructor stub

	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		Connection conexao = DBConnection.getConexaoMySQL();

		try {
			String query = "SELECT * FROM tarefa";
			
			Statement st = conexao.createStatement();

			ResultSet rs = st.executeQuery(query);
			
			ArrayList<Tarefa> listaDeTarefas = new ArrayList<Tarefa>();
			
			
			
			while (rs.next()) {
				//int id = rs.getInt("idtarefa");
				String titulo = rs.getString("titulo");
				String descricao = rs.getString("descricao");
				Date dataExecucao = rs.getDate("data");
				
				listaDeTarefas.add(new Tarefa(titulo, descricao, dataExecucao));

			}
			st.close();

			String json = new Gson().toJson(listaDeTarefas);
			PrintWriter out = response.getWriter();
			out.println(json);
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
