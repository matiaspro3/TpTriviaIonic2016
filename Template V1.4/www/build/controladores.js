angular.module('App.controladores', [])

.controller('LoginCtrl', function($rootScope,$scope, $ionicPopup, $state,$cordovaVibration, $cordovaNativeAudio) {
  $rootScope.usuario = {};
  $rootScope.usuario.nombre = "";
  /*
      $cordovaNativeAudio
    .preloadSimple('music', 'audio/correcto.mp3')
    .then(function (msg) {
      console.log(msg);
      console.log("Musica");
    }, function (error) {
      console.error(error);
    });

*/
  $scope.login = function() {
      if($rootScope.usuario.nombre == ""  )
        $scope.showAlert("POR FAVOR INGRESE SU NOMBRE");
      else{
    try{
      $cordovaVibration.vibrate(150);  

  try{
      $scope.play('clickMal');
      }catch(err){
        console.log("No es un dispositivo mobile");
      }
  //  $cordovaNativeAudio.play('music');


    }catch(err){

      console.log("No se puede vibrar" + err.message);
    }


  

        $scope.showAlert("BIENVENIDO " + $rootScope.usuario.nombre + "!" + "   "+"Elije el juego");
        
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


.controller('controlerTrivia', function($scope, $ionicPopup, $state,$stateParams, $cordovaVibration,  $cordovaNativeAudio, $timeout ) 
{
  
        // no esta reciviendo paramatros el state
         //si le mando el nombre por paramatros necesito lo de abajo.
  /*$scope.nombreUsuario =angular.fromJson($stateParams); 
  console.log($scope.nombreUsuario.user);

      console.log("finn2");               // no esta reciviendo paramatros el state
*/
/*


    $scope.showComenzar = true;
  $scope.seCargaronLosSonidos = false;
  $scope.preguntas1 = Preguntas;
  $scope.respuestas = Respuestas;
  $scope.opciones = Opciones;
  $scope.btnOp1Estado = 'clear';
  $scope.btnOp2Estado = 'clear';
  $scope.btnOp3Estado = 'clear';

  $scope.random = Math.round(Math.random() * 3); //TODO: Cambiar el random a un tanaño variable de a cuerdo a la cantidad de preguntas cargadas en firebase
*/ 

 
    $scope.showComenzar = true;


// firebase
 var ref = new Firebase("https://trivia-b8a12.firebaseio.com/preguntas");
  /*
  ref.push(

{
pregunta : "2*2*2+3?",
rtas :[
{
rta: "13",
correcta: false
},
{
rta: "10",
correcta: false
},
{
rta: "9",
correcta: true
}

]
    }
    );
*/

$scope.fireBas;
ref.once("value", function(snapshot) {
  //console.info("Datos", snapshot.val());
  
  
  
    $scope.fireBas = snapshot.val();
 
    
//console.log($scope.fireBas);
console.info("Datos", $scope.fireBas);


$scope.arrtrivia  =[]; 
for (elem in $scope.fireBas) {
   $scope.arrtrivia.push($scope.fireBas[elem]);
}
  });
// firebase fin




$scope.trivia = [] ;



  $scope.getPregunta = function() {
  

  
    $scope.showComenzar = false;
    $scope.showPregunta = true;
console.info("arrtrivia",$scope.trivia);
                                                                      //  cancela si toca muy rapido.
        //$scope.trivia =  angular.fromJson($scope.fireBas);

console.info("lenght",$scope.arrtrivia.length);

$scope.trivia = $scope.arrtrivia[Math.floor(Math.random() * $scope.arrtrivia.length)];

console.info("trivia",$scope.trivia);



    //console.log($scope.message[0]);





  };

$scope.setRespuesta = function($opcion) {
    if($opcion){
      try{
      $cordovaVibration.vibrate(100);  
      }
      catch(err){
        console.log("No es un dispositivo mobile");
      }
    //  $scope.cambiarColorBoton(btnApretado, 'correcto');
     // $scope.play('clickBien');
    //Le agrego un retardo para que me muestre el popUp del resultado y me muestre la próxima pregunta
    //setTimeout(function() {
     $scope.showAlert("CORRECTO!");
        $scope.getPregunta();     


          // }, 700);  
    }


    else{
      try{
        var patron = [100, 100, 100, 100];
        $cordovaVibration.vibrate(patron); 
      }catch(err){
        console.log("No es un dispositivo mobile");
      }
 //     $scope.cambiarColorBoton(btnApretado, 'incorrecto');
/*
      try{
      $scope.play('clickMal');
      }catch(err){
        console.log("No es un dispositivo mobile");
      }
*/
         //$scope.showAlert("INCORRECTO!", btnApretado);
         $scope.showAlert("INCORRECTO");
       $scope.getPregunta();       
    }

    
  };




/*
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
*/
  $scope.showAlert = function(resultado, btnApretado) {
  
      var alertPopup = $ionicPopup.alert({
         title: resultado,
         okText: "SIGUIENTE"
      });

      alertPopup.then(function(res) {
        //vuelvo a poner el boton en el color por default
     //   $scope.cambiarColorBoton(btnApretado, 'clear'); 
        //recargo la variable random para que se recargue la siguiente pregunta
       //  $scope.random = Math.round(Math.random() * 2); 
      });
     };
/****FIN FUNCIONES NATIVE AUDIO****/

})

.factory("Base", function($firebaseArray) {
  var itemsRef = new Firebase('https://trivia-b8a12.firebaseio.com/');
  return itemsRef;
});
//*************************************************************************************
    //servicios


 




/*********************************************************/
/*angular.module('App.firebase', [])
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
*////************************************************************************************************************ 
