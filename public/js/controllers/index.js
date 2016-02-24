var app = angular.module('ecommerceArtisans', []);
app.controller('ecommerceArtisansCtrl', function($scope,$http) {
	console.log('ecommerceArtisansCtrl() running')
	$scope.newMail=''
	$scope.hideRegister=false

	$scope.register = function(){
		console.log('register() running')
		console.log('newMail',$scope.newMail)

		$http({
            method  : 'POST',
            url     : '/newsletter/subscribe',
			data    : {'newMail':$scope.newMail} 
        })
        .success(function(data){
				console.log(data)
        	if(data.status){
				$scope.hideRegister=true
			}else{
				alert('Errore, reinserire mail')
			}
        })

	}
});