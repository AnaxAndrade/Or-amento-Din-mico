APP.controller('OrcamentoDinamico', ['$scope', "$http", OrcamentoController]);

function OrcamentoController($scope, $http) {
	var self = this;
	reset();

	$scope.limparSelecoes = _limparSelecoes;
	$scope.calcTotal = _calcularTotal;
	$scope.normalize = _rectify;

	// Lógica para Calcular totalAtual
		// = somatório (item.valor if item.ativo && item.checked)
	function _calcularTotal(){
		return $scope.model.features.reduce(function(acc, item){
            return acc + (item.ativo && item.checked ? item.valor : 0);
        }, 0);
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
	//@param index indice do item na array
	//@param it id do item
	function _rectify(index, it){
		if (index < 0 ){ //Quando precisa retificar geral
			for (var i=0; i< $scope.model.features.length; i++){
				if ($scope.model.features[i].required){
					$scope.model.features[i].checked = true;
				}
			}
		}else{ // Quando um checkbox for clicado
			if ($scope.model.features[index].required){
				$scope.model.features[index].checked = true;
			}

			// Clik:
				// Ver required ifs
					// Loop throug required_ifs
						// find refered item by id
						// item.checked = item.checked == required_if.status
				// Ver unchecked ifs
				// VEr se é required, e manter sempre on
			//Checkar subs
			for (var i=0; i< $scope.model.features.length; i++){
				if ($scope.model.features[index].checkar.includes($scope.model.features[i].id)){

				}

				if ($scope.model.features[index].descheckar.includes($scope.model.features[i].id)){

				}
			}

			//Descheckar subs
		}
	}

	//Setar tudo do zero!
	function reset(){
        $scope.model = {};
        $scope.model.projeto = {};
        $scope.model.features = [];
        $scope.total = 0;
        $scope.tt = "Orçamento Dinâmico";


		_carregarFeatures();
	}

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

		_rectify(-1, -1);

		//Título com base no título do Projeto em questão
		$scope.tt = "Orçamento de "+ $scope.model.projeto.titulo;
	}

}; 