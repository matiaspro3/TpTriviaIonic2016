angular.module('App.controladores', [])

.controller('LoginCtrl', function($rootScope,$scope, $ionicPopup, $state) {
  $rootScope.usuario = {};
  $rootScope.usuario.nombre = "";
  $scope.login = function() {
      if($rootScope.usuario.nombre == "")
        $scope.showAlert("POR FAVOR INGRESE SU NOMBRE");
      else{
        $scope.showAlert("BIENVENIDO " + $scope.usuario.nombre + "!" + "   "+"Elije el juego");
        
          //si le mando el nombre por paramatros necesito lo de abajo.


        /*var usuario = { "user": $scope.usuario.nombre};
        
        console.log(usuario);               // no esta reciviendo paramatros el state
        console.log("finn");               // no esta reciviendo paramatros el state



        $state.go('Trivia', usuario);

        */


//$state.go('Trivia');
$state.go('app.gallery');
      }
    };/*
      $scope.irA = function(){
        $state.go("app.gallery");
      }*/

    $scope.showAlert = function(resultado) {
      var alertPopup = $ionicPopup.alert({
         title: resultado
      });
      alertPopup.then(function(res) {
         // Custom functionality....
      });
   };
})


.controller('controlerTrivia', function($scope, $ionicPopup, $state, $stateParams, $cordovaVibration,  $cordovaNativeAudio, $timeout, Preguntas, Respuestas, Opciones,$firebaseArray ) {
  
        // no esta reciviendo paramatros el state
         //si le mando el nombre por paramatros necesito lo de abajo.
  /*$scope.nombreUsuario =angular.fromJson($stateParams); 
  console.log($scope.nombreUsuario.user);

      console.log("finn2");               // no esta reciviendo paramatros el state
*/



    $scope.showComenzar = true;
  $scope.seCargaronLosSonidos = false;
  $scope.preguntas1 = Preguntas;
  $scope.respuestas = Respuestas;
  $scope.opciones = Opciones;
  $scope.btnOp1Estado = 'clear';
  $scope.btnOp2Estado = 'clear';
  $scope.btnOp3Estado = 'clear';

  $scope.random = Math.round(Math.random() * 3); //TODO: Cambiar el random a un tanaño variable de a cuerdo a la cantidad de preguntas cargadas en firebase

  $scope.getPregunta = function() {
   // if($scope.nombreUsuario.user == null){
    $scope.showAlert("No se ha logueado!");
   // $state.go('Login');
  //}else{




    $scope.showComenzar = false;
    $scope.showPregunta = true;


  var ref = new Firebase("https://trivia-b8a12.firebaseio.com/preguntas");
  $scope.messages = $firebaseArray(ref);
  console.log($scope.messages);

  $scope.pregunta1=$scope.messages;
  console.log($scope.pregunta1);




  //}
  };

  $scope.setRespuesta = function(idOpcion, Respuesta, btnApretado) {
    if(1 == 1){
      try{
      $cordovaVibration.vibrate(100);  
      }catch(err){
        console.log("No es un dispositivo mobile");
      }
      $scope.cambiarColorBoton(btnApretado, 'correcto');
      $scope.play('clickBien');
    //Le agrego un retardo para que me muestre el popUp del resultado y me muestre la próxima pregunta
    setTimeout(function() {
      $scope.showAlert("CORRECTO!", btnApretado);
      }, 700);  
    }
    else{
      try{
        var patron = [100, 100, 100, 100];
        $cordovaVibration.vibrate(patron); 
      }catch(err){
        console.log("No es un dispositivo mobile");
      }
      $scope.cambiarColorBoton(btnApretado, 'incorrecto');

      try{
      $scope.play('clickMal');
      }catch(err){
        console.log("No es un dispositivo mobile");
      }

      setTimeout(function() {
        $scope.showAlert("INCORRECTO!", btnApretado);
      }, 700);
    }
  };


  $scope.cambiarColorBoton = function(btnApretado, estado) {
  switch(btnApretado){
        case 'btnOp1':
          $scope.btnOp1Estado = estado;
        break;
        case 'btnOp2':
          $scope.btnOp2Estado = estado;
        break;
        case 'btnOp3':
          $scope.btnOp3Estado = estado;
        break;
        default:
        break;
      }
  }

  $scope.showAlert = function(resultado, btnApretado) {
  
      var alertPopup = $ionicPopup.alert({
         title: resultado,
         okText: "SIGUIENTE"
      });

      alertPopup.then(function(res) {
        //vuelvo a poner el boton en el color por default
        $scope.cambiarColorBoton(btnApretado, 'clear'); 
        //recargo la variable random para que se recargue la siguiente pregunta
         $scope.random = Math.round(Math.random() * 2); 
      });
   };

try{
  if(!$scope.seCargaronLosSonidos){
    $scope.seCargaronLosSonidos = true;
  $cordovaNativeAudio
      .preloadSimple('clickBien', 'audio/correcto.mp3')
      .then(function (msg) {
        console.log(msg);
      }, function (error) {
        console.log(error);
      });

  $cordovaNativeAudio
      .preloadSimple('clickMal', 'audio/incorrecto.mp3')
      .then(function (msg) {
        console.log(msg);
      }, function (error) {
        console.log(error);
      });
  }  
}catch(err){
  console.log("No es un dispositivo mobile");
}

/****FUNCIONES NATIVE AUDIO****/
$scope.play = function (sound) {
  try{
  $cordovaNativeAudio.play(sound);
  }catch(err){
    console.log("No es un dispositivo mobile");
  }
};
/****FIN FUNCIONES NATIVE AUDIO****/

})

//*************************************************************************************
    //servicios


 





/*********************************************************/
angular.module('App.firebase', [])
.factory("Preguntas", function($firebaseArray) {
  var itemsRef = new Firebase('https://trivia-b8a12.firebaseio.com/');
  return $firebaseArray(itemsRef.child('preguntas'));
})

.factory("Opciones", function($firebaseArray) {
  var itemsRef = new Firebase('https://triviaionic.firebaseio.com/');
  return $firebaseArray(itemsRef.child('opciones'));
})

.factory("Respuestas", function($firebaseArray) {
  var itemsRef = new Firebase('https://triviaionic.firebaseio.com/');
  return $firebaseArray(itemsRef.child('respuestas'));
});
///************************************************************************************************************ 
