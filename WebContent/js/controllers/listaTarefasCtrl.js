angular.module("listaTarefas").controller("listaTarefasCtrl", function($scope, $filter, tarefasAPI) {
	$scope.app = "Lista de Tarefas";
	$scope.contatos = [];
	$scope.tarefas = [];
	$scope.tarefa = null;
	$scope.btnInserir = false;
	$scope.btnAlterar = false;
	$scope.hasSuccessFeedback = false;
	$scope.hasFailureFeedback = false;
	$scope.msgFeedback = "";
	var carregarTarefas = function () {
		/*
		$scope.tarefas = [
			{titulo:"Ir ao Mecanico",descricao:"Levar o carro ao mecanico na Asa Norte",data:new Date()},
			{titulo:"Consulta no Oftalmologista",descricao:"Retorno no consultorio do oftalmologista no Setor Hospitalar Sul",data:new Date()}
		];
		*/
		tarefasAPI.getTarefas().then(function (response) {
			$scope.tarefas = response.data;
		});
		
	};
	carregarTarefas();
	$scope.inserirTarefa = function (tarefa) {
		$scope.hasFailureFeedback = false;
		$scope.hasSuccessFeedback = false;

		console.log(tarefa);
		/*
		tarefasAPI.saveTarefa(tarefa).then(function (response) {
			$scope.tarefas = response.data; 
			carregarTarefas();
			delete $scope.tarefa;
			$scope.configTarefaForm.$setPristine();
		});*/
		//tarefa.data = new Date();
		if(tarefa.data < new Date() ) {
			$scope.configTarefaForm.$setPristine();
			$scope.hasFailureFeedback = true;
			$scope.msgFeedback = "A data da tarefa deve ser superior à data atual.";
			console.log($scope.msgFeedback);
		} else {
			$scope.tarefas.push(angular.copy(tarefa));
			delete $scope.tarefa;
			$scope.configTarefaForm.$setPristine();
			$scope.hasSuccessFeedback = true;
			$scope.msgFeedback = "Nova tarefa inserida com sucesso.";
		}
		
	};
	
	$scope.excluirTarefas = function (tarefas) {
		console.log(tarefas);
		$scope.tarefas = tarefas.filter(function (tarefa) {
			if (!tarefa.selecionado) return tarefa; 
		});	
		$scope.tarefaForm.$setPristine();	
		$scope.criterioDeBusca = "";			
	};
	$scope.isTarefaSelecionado = function (tarefas) {
		return tarefas.some(function(tarefa) {
			return tarefa.selecionado;
		});
	};
	$scope.ordenarPor = function (campo) {
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
		console.log($scope.criterioDeOrdenacao);				
	};

	$scope.novaTarefa = function () {
		$scope.btnInserir = true;
		$scope.btnAlterar = false;
		delete $scope.tarefa;
	};

	$scope.configurarTarefa = function (tarefa) {
		$scope.btnInserir = false;
		$scope.btnAlterar = true;
		console.log(tarefa);
		$scope.tarefa = angular.copy(tarefa);
	};

	$scope.alterarTarefa = function (tarefa) {
		console.log(tarefa);
		/*
		tarefasAPI.saveTarefa(tarefa).then(function (response) {
			$scope.tarefas = response.data; 
			carregarTarefas();
			delete $scope.tarefa;
			$scope.configTarefaForm.$setPristine();
		});*/
		//tarefa.data = new Date();
		$scope.tarefas.push(angular.copy(tarefa));
		//delete $scope.tarefa;
		$scope.configTarefaForm.$setPristine();
	};
});