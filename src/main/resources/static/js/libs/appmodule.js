(function () {
    var cnv = null;
    var ctx = null;
    var clickX = null;
    var clickY = null;
    var app = angular.module('modone', []);
	app.controller('plan_control', 
    function($scope,$log, $http){
                initCanvas();
                $scope.nuevo = "";
		$scope.seleccionado = "";
		$scope.listaPlanos = [];

                $scope.addData = function () {
                    $log.debug($scope.entry);
                    $http({
                        method: 'POST',
                        url: 'http://localhost:8080/blog',
                        data: $scope.nuevo
                    }).success(function (data) {
                        alert(document.getElementById("figuraAdd").value);
                        console.log(data);
                        $scope.loadData();
                    });
                };
                
	
		$scope.loadData = function() {
                    var configList = {
                            method: "GET",
                            url: "http://localhost:8080/blueprints"
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
                            url: "http://localhost:8080/blueprints/"+$scope.seleccionado
                    };

                    var response=$http(configList);

                    response.success(function(data, status, headers, config) {
                        $log.debug('se cargo');                        
                        //var cnv= document.getElementById("myCanvas");
                        //var ctx = cnv.getContext("2d");
                        var puntos = "";
  
                        puntos=data.points[0].x+","+data.points[0].y;
                        ctx.moveTo(data.points[0].x,data.points[0].y);
                        for(i=1; i < data.points.length; i++){					
                            puntos+=" "+data.points[i].x+","+data.points[i].y;                                    
                            ctx.lineTo(data.points[i].x,data.points[i].y);
                        }                        
                        crearForma(puntos);

                        ctx.strokeStyle = "#f00";
                        ctx.stroke();

                        $scope.listaPlanos = data;

                    });

                    response.error(function(data, status, headers, config) {
                        alert("The petition has failed. HTTP Status:"+status);
                    });
                
		};
       

        function crearForma(puntos) {
            var svg = document.getElementById("mySVGs");
            forma = document.createElementNS("http://www.w3.org/2000/svg", "polyline");            
            forma.setAttribute("points", puntos);
            forma.setAttribute("fill", "none");
            forma.setAttribute("stroke", "black");
            forma.setAttribute("stroke-width", "2");
            svg.appendChild(forma);           
        }
        
        
        function writeMessage(canvas, message) {
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.font = '18pt Calibri';
            context.fillStyle = 'black';
            context.fillText(message, 10, 25);
          }
          
          function getMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
              x: evt.clientX - rect.left,
              y: evt.clientY - rect.top
            };
          }
        
        function initCanvas(){
            cnv= document.getElementById("myCanvas");
            ctx = cnv.getContext("2d");
            alert("Ha creado canvas");
            clickX = [];
            clickY = [];           
            //cnv.addEventListener('mousemove', mouseMove);
            //cnv.onclick = mouseClick();
        }
        
        function mouseMove(evt){            
            var mousePos = getMousePos(cnv, evt);
            var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
            writeMessage(cnv, message);            
        }
        
        function mouseClick(evt){
            /*var mousePos = getMousePos(cnv, evt);
            clickX.push(mousePos.x);            
            clickY.push(mousePos.y);
            alert("X: "+clickX[0] + "Y: "+clickY[0]);   */
            
            var x = evt.pageX - this.offsetLeft;
            var y = evt.pageY - this.offsetTop;
            
            alert("entro x: "+x+" y: "+y);
        }
        
        
        function addPoints(x, y){
            var x1 = e.pageX - cnv.offsetLeft;
            var y1 = e.pageY - cnv.offsetTop;
            
            
        }
        
    }
    );

	

})();





