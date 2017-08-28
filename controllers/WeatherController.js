/* global angular */

(function() {
    
    var WeatherController = function($scope){
        $scope.addresInput = '96817';
        $scope.toggle = true;
        $scope.toggleText = "Get Weather";
        
        
        $scope.$watch('toggle', function(){
            $scope.toggleText = $scope.toggle ? 'Get the weather' : 'Reset';
        });
    };
    
    WeatherController.$inject = ['$scope'];
    
    angular.module('weatherApp')
        .controller('WeatherController', WeatherController);
}());