angular.module("listaTarefas").factory("tarefasAPI", function ($http, config) {
	var _getTarefas = function () {
		return $http.get("http://localhost:8080/Tarefas/GetTarefas");
	};
	var _saveTarefa = function (tarefa) {
		return $http.post(config.baseURL + "/AddTarefa", tarefa);
	};
	var _delTarefa = function (tarefa) {
		return $http.post(config.baseURL + "/DelTarefa", tarefa);
	};
	return {
		getTarefas: _getTarefas,
		saveTarefa: _saveTarefa,
		delTarefa: _delTarefa
	};	
});