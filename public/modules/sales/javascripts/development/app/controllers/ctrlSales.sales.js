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