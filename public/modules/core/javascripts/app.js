var coreApp = angular.module('coreApp',['ngMaterial','ui.router','ngMessages','LocalStorageModule','ngSanitize']);
coreApp.config(['$mdIconProvider',function($mdIconProvider) {
	$mdIconProvider
			.defaultFontSet('fontawesome');
}])

coreApp.config(['localStorageServiceProvider',function(localStorageServiceProvider) {
	localStorageServiceProvider
		.setPrefix('coreApp');
 localStorageServiceProvider
    .setStorageType('sessionStorage');

}])

coreApp.run(['localStorageService','svcArticles',function(localStorageService,svcArticles){
		svcArticles.getAllArticles()
		.then(function(response){

			while(typeof(response.data)=="string"){
				response.data = JSON.parse(response.data)
			};
  	localStorageService.set('articles',JSON.stringify(response.data));
		},
		function(err){
			console.log(err);
		});
		

}])
/*
coreApp.config(['$stateProvider','$urlRouterProvider', function( $stateProvider,$urlRouterProvider){
	
}])
*/

coreApp.controller('ctrlCore', ['$scope','$mdBottomSheet', function($scope,$mdBottomSheet){
  console.log("ctrlCore")
  $scope.alert = '';
  $scope.isOpen = false;
  $scope.demo = {
    isOpen: false,
    count: 0,
    selectedAlignment: 'md-right'
  };
  $scope.demo2 = {
    isOpen: false,
    count: 0,
    selectedAlignment: 'md-right'
  };
  $scope.ya = function(){
  	console.log("hola")
  	$scope.demo.isOpen = $scope.demo.isOpen?false:true;
  }
  $scope.showGridBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: '/modules/core/views/menu-bottom.html',
      controller: 'ctrlMenuBottom',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };

}])

coreApp.run(['$http','$templateCache',function($http, $templateCache) {
		/*
    var urls = [
      'img/icons/share-arrow.svg',
      'img/icons/upload.svg',
      'img/icons/copy.svg',
      'img/icons/print.svg',
      'img/icons/hangout.svg',
      'img/icons/mail.svg',
      'img/icons/message.svg',
      'img/icons/copy2.svg',
      'img/icons/facebook.svg',
      'img/icons/twitter.svg'
    ];

    angular.forEach(urls, function(url) {
      $http.get(url, {cache: $templateCache});
    });
		*/

  }]);




coreApp.controller('ctrlMenuBottom',['$scope','$mdBottomSheet', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Ventas', icon: 'fa fa-credit-card',href:"sales" },
    { name: 'Inicio', icon: 'fa fa-home',href:"home" },
    { name: 'Compras', icon: 'fa fa-cart-plus',href:"shopping" },
    { name: 'Reportes', icon: 'fa fa-area-chart',href:"reports" },
    { name: 'Configuraciones', icon: 'fa fa-wrench',href:"setup" },
    { name: 'Twitter', icon: 'fa fa-street-view',href:"sales" },
  ];

  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
}]);
coreApp.service('svcSample1', [ function(){
	//...
}])
//..
var homeApp = angular.module('homeApp',['ngMaterial','ui.router']);
/*
*/
homeApp.config(['$mdIconProvider',function($mdIconProvider) {
	$mdIconProvider
			.defaultFontSet('fontawesome');
}])

homeApp.config(['$stateProvider','$urlRouterProvider', function( $stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('home',{
			url:'/home',
			templateUrl:'/modules/home/views/home.html',
			controller:'ctrlHome'
		})
}])

coreApp.requires.push('homeApp')
;
homeApp.controller('ctrlHome', ['$scope', function($scope){
	console.log("ctrlHome");
}])
var salesApp = angular.module('salesApp',['ngMaterial','ui.router']);
/*
*/
salesApp.config(['$mdIconProvider',function($mdIconProvider) {
	$mdIconProvider
			.defaultFontSet('fontawesome');
}])

salesApp.config(['$stateProvider','$urlRouterProvider', function( $stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('sales',{
			url:'/',
			templateUrl:'/modules/sales/views/sales.html',
			controller:'ctrlSales'
		})
}])

coreApp.requires.push('salesApp')

salesApp.controller('ctrlSales', ['$scope','localStorageService','$mdDialog','$sanitize','$sce','$compile','$rootScope', function($scope,localStorageService,$mdDialog,$sanitize,$sce,$compile,$rootScope){
  /*
  $scope.cad = "<strong>hola mundo</strong> gracias!! <script>alert('jajaja')</script>"
  $scope.html_ = $sanitize($scope.cad); //suprime los tags <script>
  $scope.html__ = $sce.trustAsHtml($scope.cad);
  */
  var countForms = 1;
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

  $scope.isValid = function(){
      console.log($scope.frmVentas);
      console.log($scope);
      return false;
  };
  $scope.addFormArticle = function(){
    var formList = angular.element('[form-list]')
    var i = countForms;
    var html =  '<section flex="100"> <section layout-sm="column"> <md-autocomplete flex-gt-lg="99" flex-lg="99" flex-gt-md="99" flex-gt-sm="99" flex-sm="99" md-search-text="articulo'+i+'" md-search-text-change="change(articulo'+i+')" placeholder="Busca el articulo" md-items="item in querySearch(articulo'+i+')" md-item-text="item.display" md-selected-item-change="selectedItemChange(item)" class="search-article"><span md-highlight-text="articulo'+i+'" md-highlight-flags="^i">{{item.display}}</span></md-autocomplete> <md-input-container flex-gt-lg="99" flex-lg="99" flex-gt-md="99" flex-gt-sm="99" flex-sm="99"> <input maxlength="30" md-maxlength="30" type="text" required="required" name="articulo'+i+'" ng-model="articulo" class="hide"/> <ng-messages for="frmVentas.articulo'+i+'.$error"> <ng-message when="required">Escriba el articulo</ng-message> <ng-message when="md-maxlength">No se permite mas de 30 caracteres</ng-message> </ng-messages> </md-input-container> </section> <section layout="row" layout-sm="column"> <md-input-container flex-gt-md="20" flex-sm="99"> <label>Cantidad</label> <input type="number" min="1" max="99" required="required" name="cantidad'+i+'" ng-model="cantidad'+i+'"/> <ng-messages for="frmVentas.cantidad'+i+'.$error"> <ng-message when="required">Un numero</ng-message> <ng-message when="max">Maximo 99 unidades</ng-message> <ng-message when="min">Minimo 1 unidad</ng-message> </ng-messages> </md-input-container> <md-input-container flex-gt-md="20" flex-sm="99"> <label>Precio</label> <input disabled="disabled" name="precio'+i+'" ng-model="precio'+i+'"/> </md-input-container> <md-input-container flex-gt-md="60" flex-sm="99"> <label>Descripcion</label> <textarea maxlength="300" md-maxlength="300" placeholder="Comentario sobre este articulo o venta específica" columns="0" name="descripcion'+i+'" ng-model="descripcion'+i+'"></textarea> </md-input-container> </section> <section layout="row" layout-align="end start"> <md-button ng-click="addFormArticle()">Agregar otro articulo</md-button> </section> </section>'
    var html_ = $compile(html)($scope)
    formList.append(html_)
    addFieldsToForm(i)
    countForms++;
    //console.log(html_);
  }
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