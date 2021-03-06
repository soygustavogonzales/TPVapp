var salesApp = angular.module('salesApp',['ngMaterial','ui.router']);
/*
*/
salesApp.config(['$mdIconProvider',function($mdIconProvider) {
	$mdIconProvider
			.defaultFontSet('fontawesome');
}]);

salesApp.config(['$stateProvider','$urlRouterProvider', function( $stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('sales',{
			url:'/',
			views:{
				'@':{
					templateUrl:'/modules/sales/views/sales.html',
					controller:'ctrlSales'
				},
				'info@sales':{
						templateUrl:'/modules/sales@info/views/sales@info.html',
						controller:'ctrlInfo'
				},
				'detail@sales':{
						template:'<em>hello from detail@sales</em>',
						controller:'ctrlInfo'
				}
			}
		})
}])

coreApp.requires.push('salesApp')

salesApp.controller('ctrlSales', ['$scope','localStorageService','$mdDialog','$sanitize','$sce','$compile','$rootScope', function($scope,localStorageService,$mdDialog,$sanitize,$sce,$compile,$rootScope){
  /*
  $scope.cad = "<strong>hola mundo</strong> gracias!! <script>alert('jajaja')</script>"
  $scope.html_ = $sanitize($scope.cad); //suprime los tags <script>
  $scope.html__ = $sce.trustAsHtml($scope.cad);
  */
  var countFields = 1;
  $scope.models = new Object();
  $scope.fields = new Array();
  $scope.articulos = [
    {
      name:"Harina 1",
      id:"$01"
    },
    {
      name:"Levadura 1",
      id:"$02"
    },
    {
      name:"Azucar 1",
      id:"$03"
    }
  ];

  function addFieldsToForm(i) {

      [
        'articulo',
        'cantidad',
        'precio',
        'descrípcion'
      ].forEach(function(field,key){
        $rootScope.$apply(function(){
          $scope.frmVentas[field+i] = JSON.parse(JSON.stringify($scope.frmVentas[field]));
          $scope.frmVentas[field+i].$name = field+i
        })
        
      });

  };
  $scope.addFormArticle = function(){
    var i = countFields;
    $scope.fields.push({
      article:"article"+i,
      cantidad:"cantidad"+i,
      precio:"precio"+i,
      descripcion:"descripcion"+i
    })
    countFields++;
    console.log($scope.frmVentas)
  }
  $scope.addFormArticle();
  $scope.sendNewBuy = function(){
    var data = {};
    
  }
  $scope.showConfirmBuy = function($event){

    var confirm = $mdDialog.confirm()
        .parent(angular.element(document.body))
        .title('¿ confirmar venta ?')
        //.content('Confirmar venta')
        .ariaLabel('confirmBuy')
        .ok('confirmar')
        .cancel('cancelar')
        .targetEvent($event);

      $mdDialog.show(confirm)
      .then(function(){
        console.log("OK");
      },function(){
        console.log("CANCEL");
      });

  }

  $scope.querySearch = function (query) {
    
    var jsonData =  JSON.parse(localStorageService.get('articles'))
    while(typeof(jsonData) == "string"){
      console.log(jsonData);
      jsonData = JSON.parse(jsonData)
    }
    var results = query ? jsonData.filter(createFilterFor(query)) : jsonData;
    return results;
  }

  $scope.selectedItemChange = function(item) {
    console.info('Item changed to ' + JSON.stringify(item));
  }

  function createFilterFor(query) {
    console.log(query);
    var lowercaseQuery = angular.lowercase(query);

    return function filterFn(state) {
      var result_ = state.value.indexOf(lowercaseQuery) === 0 
      console.log(result_);
      return result_;
    };

  }
}])
salesApp.service('svcArticles', ['$http','$q', function($http,$q){
/**/
	this.getAllArticles = function(){

			return $http.get('http://localhost:3001/sales.articulos');

	}

}])
salesApp.directive('drvScrollX', [function(){
	return {
		restrict:'A'
		,link:function($scope,iElement,iAttrs){
				iElement[0].addEventListener('mousewheel', function(event,a){
					var maximize = parseInt(iAttrs.drvScrollXMaximize);
					event.preventDefault();
					console.info();
					this.scrollLeft = this.scrollLeft-(event.deltaY*maximize);
						console.log(event);
						console.log(a);
				},false);
		}
	}
}]);
/*
*/
var ctrlInfo = function($scope){
	$scope.saiHi = "hola desde ctrlInfo"
};

ctrlInfo.$inject = ['$scope'];

salesApp.controller('ctrlInfo',ctrlInfo);