function main() {
	var canvas=document.getElementById("tansnake");
	var ctx=canvas.getContext("2d");
	var speed=0;
	var snakeColor="lightblue";
	var foodColor="red"
	var sizeSnakePoint=50;
	var len=1;
	var snake=new Array();
	var food=[(Math.ceil(Math.ceil(Math.random()*canvas.width)/50)-1)*50,(Math.ceil(Math.ceil(Math.random()*canvas.height)/50)-1)*50,0];
	function printSnakePoint() {
	// body...
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.save();
		ctx.translate(food[0], food[1]);
		ctx.beginPath();
		ctx.fillStyle = foodColor;
		ctx.rect(0, 0, sizeSnakePoint, sizeSnakePoint);
		ctx.closePath();
		ctx.fill();
		ctx.strokeStyle="rgb(0,0,0)";
		ctx.stroke();
		ctx.restore();
		for (var i=1;i<=len;i++){
			ctx.save();
			ctx.translate(snake[i][0], snake[i][1]);
			ctx.beginPath();
			ctx.fillStyle = snakeColor;
			ctx.rect(0, 0, sizeSnakePoint, sizeSnakePoint);
			ctx.closePath();
			ctx.fill();
			ctx.strokeStyle="rgb(2,100,30)";
			ctx.stroke();
			ctx.restore();
		}
	}
	snake[len]=[0, 0, 1];
	//console.log(Math.ceil(0.1));
	//-----------------------------------------------------------------
	setInterval(function(){
		if (food[2]===1){
			var t=0;
			do{
				t=0;
				food=[(Math.ceil(Math.ceil(Math.random()*canvas.width)/50)-1)*50,(Math.ceil(Math.ceil(Math.random()*canvas.height)/50)-1)*50,0];
				for (var i=1;i<=len;i++){
					if (food[0]==snake[i][0]&&food[1]==snake[i][1]){
						t=1;
						break;
					}
				}
			}while (t===1);
		}
		document.onkeydown=function(event){
			//right 1 left 2 up 3 down 4
            var e = event || window.event || arguments.callee.caller.arguments[0];
          	if(e && (e.keyCode==87||e.keyCode==38)){ 
              //up
              if (len===1||snake[1][2]!==4) snake[1][2]=3;
           	}
      		if(e && (e.keyCode==83||e.keyCode==40)){ 
              //down
              if (len===1||snake[1][2]!==3) snake[1][2]=4;
            }            
          	if(e && (e.keyCode==65||e.keyCode==37)){ 
               //left
               if (len===1||snake[1][2]!==1) snake[1][2]=2;
            }
            if(e && (e.keyCode==68||e.keyCode==39)){ 
                // right
                if (len===1||snake[1][2]!==2) snake[1][2]=1;
            }
        }; 

        var sa=[snake[len][0],snake[len][1],snake[len][2]];
        for (var i=len;i>=2;i--){
        	snake[i]=[snake[i-1][0],snake[i-1][1],snake[i-1][2]];
        }

        if (snake[1][2]===1) {snake[1][0]=(snake[1][0]+50)%canvas.width;}
        if (snake[1][2]===2) {snake[1][0]=(snake[1][0]-50+canvas.width)%canvas.width;}
        if (snake[1][2]===3) {snake[1][1]=(snake[1][1]-50+canvas.height)%canvas.height;}
        if (snake[1][2]===4) {snake[1][1]=(snake[1][1]+50)%canvas.height;}

        if (snake[1][0]===food[0]&&snake[1][1]===food[1]) {
        	food[2]=1;
        	len++;
        	snake[len]=[sa[0],sa[1],sa[2]];
        }
        printSnakePoint();
	}, 400-speed);
}
window.onload=main();