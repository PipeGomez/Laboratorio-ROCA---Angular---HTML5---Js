(function () {
    var app = angular.module('modone', []);
	app.controller('plan_control', 
    function($scope,$log, $http){
		$scope.seleccionado = "";
		$scope.listaPlanos = [];

    
	
		$scope.loadData = function() {
			var configList = {
				method: "GET",
				url: "blueprints"
			};

			var response=$http(configList);

			response.success(function(data, status, headers, config) {
				 $log.debug('se cargo');
				$scope.listaPlanos = data;
			});

			response.error(function(data, status, headers, config) {
				alert("The petition has failed. HTTP Status:"+status);
			});
		};

		$scope.loadDataSelec = function() {
			var configList = {
				method: "GET",
				url: "blueprints/"+$scope.seleccionado
			};

			var response=$http(configList);

			response.success(function(data, status, headers, config) {
				$log.debug('se cargo');
				var cnv= document.getElementById("myCanvas");
				var ctx = cnv.getContext("2d");
								
				for(i=0; i < data.points.length-1; i++){
					alert(i);
					ctx.moveTo(data.points[i].x,data.points[i].y);
					ctx.lineTo(data.points[i+1].x,data.points[i+1].y);
				}
				
				ctx.strokeStyle = "#f00";
				ctx.stroke();
				
				$scope.listaPlanos = data;
				
			});

			response.error(function(data, status, headers, config) {
				alert("The petition has failed. HTTP Status:"+status);
			});
		};

/*
{points: "points",								name: "name"}
*/

    }
    );

	

})();





