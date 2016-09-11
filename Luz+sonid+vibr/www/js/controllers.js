angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, $cordovaVibration, $cordovaFlashlight, $cordovaNativeAudio, $timeout) {
 
  $scope.Vibrar = function() {
    try{
      $cordovaVibration.vibrate(10000);  
    }catch(err){
      alert("No se puede vibrar" + err.message);
    }
    
  };

  $scope.Parar = function() {
    try{
    $cordovaVibration.vibrate(0);
    }catch(err){
      alert("No se puede vibrar" + err.message);
    }
  };

  $scope.Encender = function() {
    try{
      $cordovaFlashlight.switchOn()
    }catch(err){
      alert("No se puede vibrar" + err.message);
    }
    
  };

  $scope.Apagar = function() {
    try{ 
      $cordovaFlashlight.switchOff()
    }catch(err){
      alert("No se puede Apagar" + err.message);
    }
    
  };

  $scope.Play = function() {
    try{
      media.play(); // Android
    }catch(err){
      alert("No se puede vibrar" + err.message);
    }
    
  };

  $scope.Stop = function() {
    try{ 
      media.stop();
    }catch(err){
      alert("No se puede Apagar" + err.message);
    }
    
  };

  //Funciones Audio:


  $cordovaNativeAudio
    .preloadComplex('music', 'audioTest.mp3', 1, 1)
    .then(function (msg) {
      console.log(msg);
    }, function (error) {
      console.error(error);
    });

  
$scope.play = function () {
    $cordovaNativeAudio.play('music');
  };

  $scope.stop = function () {

    
      $cordovaNativeAudio.stop('music');

  };
  //Funciones linterna:
  $cordovaFlashlight.available().then(function(availability) {
    var avail = availability; // is available
  }, function () {
    // unavailable
  });

  $cordovaFlashlight.switchOn()
    .then(
      function (success) { /* success */ },
      function (error) { /* error */ });

  $cordovaFlashlight.switchOff()
    .then(
      function (success) { /* success */ },
      function (error) { /* error */ });

  $cordovaFlashlight.toggle()
    .then(function (success) { /* success */ },
      function (error) { /* error */ });
})



.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
