APP.controller('OrcamentoDinamico', ['$scope', "$http", OrcamentoController]);

function OrcamentoController($scope, $http) {
	var self = this;
	reset();
	$scope.tt = "Orçamento Dinâmico";

	$scope.limparSelecoes = _limparSelecoes;

	// Lógica para Calcular totalAtual
		// = somatório (item.valor if item.ativo && item.checked)
	$scope.model.valorTotal = function(){
            return $scope.model.features.reduce(function(acc, item){
                return acc + (item.ativo && item.checked ? item.valor : 0);
            }, 0);
    };

	

	function _carregarFeatures (){
		/* DADOS DO PROJETO VIRÃO DE UMA API
		$http.get('dados.json').then( function (response){
			$scope.model.features = response.data;
		}); */

		$scope.model.projeto.titulo = "Meu Projeto";
		$scope.model.features =  [
			{
				"id": 1,
				"titulo": "Feature #1",
				"valor": 10000,
				"descricao": "",
				"ativo": true,
				"checked": false,
				"required": false,
				"required_if": [],
				"disabled_if": []
			},{
				"id": 2,
				"titulo": "Blá Blá Blá",
				"valor": 5000,
				"descricao": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy",
				"ativo": true,
				"checked": false,
				"required": false,
				"required_if": [],
				"disabled_if": []
			},{
				"id": 3,
				"titulo": "Outra Escolha",
				"valor": 13500,
				"descricao": "",
				"ativo": true,
				"checked": false,
				"required": true,
				"required_if": [],
				"disabled_if": []
			}
		];

		//Título com base no título do Projeto em questão
		$scope.tt = "Orçamento de "+ $scope.model.projeto.titulo;
	}

	// Resetar ao estado inicial
		// For item in features if !item.required => item.checked = false
	function _limparSelecoes(){
		for (var i=0; i< $scope.model.features.length; i++){
			if (!$scope.model.features[i].required){
				$scope.model.features[i].checked = false;
			}
		}
	}

	//Função para verificar se está tudo nos conformes
	// Todos os required estão checked e todos condicionais
	//   estão satisfeitos 
	function _rectify(){

	}


	//Setar tudo do zero!
	function reset(){
        $scope.model = {};
        $scope.model.projeto = {};
        $scope.model.features = [];
		_carregarFeatures();
	}

}; 