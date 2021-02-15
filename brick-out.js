(function() {
    
	
	var canvas = document.getElementById('canvas1'),
	context = canvas.getContext('2d');
	
    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);
	
    function resizeCanvas() {
		canvas.width = window.innerWidth - 50;
		
		if( /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) { 
			canvas.height = window.innerHeight-40;
		}else{
			canvas.height = window.innerHeight-3;
		}
		
		/**
			* Your drawings need to be inside this function otherwise they will be reset when 
			* you resize the browser window and the canvas goes will be cleared.
		*/
		drawStuff(); 
	}
    resizeCanvas();
	
    function drawStuff() {
		// do your drawing stuff here
	}
})();
window.addEventListener('resize', function(event){ 
	document.location.reload();
});
/* let width1 = window.innerWidth;
let height1 = window.innerHeight;  
const width12 = document.getElementById("width1");
const height12 = document.getElementById("height1");
width12.innerHTML = width1;
height12.innerHTML = height1;   */

//var bodyr = document.body;
var gameVin = document.getElementById("gamevin");
var gameOver = document.getElementById("gameover");
var canvas=document.getElementById("canvas1");
var ctx=canvas.getContext("2d");
//console.log(bodyr);
//console.log(gameOver);
//console.log(canvas);
/*ctx.beginPath();
	ctx.rect(20,40,50,50);
	ctx.fillStyle="#FF0000";
	ctx.fill();
	ctx.strokeStyle='rgba(0,0,255,0.5)';
	ctx.stroke();
	ctx.closePath();
	
	ctx.beginPath();
	ctx.arc(240,160,20,0,Math.PI*2,false);
	ctx.fillStyle="green";
	ctx.fill();
	ctx.strokeStyle='rgba(0,0,255,0.5)';
	ctx.stroke();
ctx.closePath();*/

var x=canvas.width/2;
var y=canvas.height-10;    
var dx=2;
var dy=-2;
var ballRadius=5;
var paddleHeight=15;
var paddleWidth=75;
var paddleX=(canvas.width-paddleWidth)/2;
var elem = document.getElementById("knopka_left");
elem.style.left = paddleX + 40 + 'px';
var rightPressed=false;
var leftPressed=false;
var brickRowCount=6;

if (window.innerHeight < 361) { 
	var speed = 7; 
	var brickColumnCount=Math.floor(canvas.width / 57);
	console.log(brickColumnCount);
	var brickWidth=55;
	var brickHeight=15;
	var brickPadding=5;
	var brickOffSetTop=5;
	var brickOffSetLeft=10;
}else if (window.innerHeight > 362 && window.innerHeight < 376 ) { 
	var speed = 6; 
	var brickColumnCount=Math.floor(canvas.width / 57);
	console.log(brickColumnCount);
	var brickWidth=55;
	var brickHeight=15;
	var brickPadding=5;
	var brickOffSetTop=5;
	var brickOffSetLeft=10;
}else if (window.innerHeight > 377 && window.innerHeight < 416 ) { 
	var speed = 5; 
	var brickColumnCount=Math.floor(canvas.width / 57);
	console.log(brickColumnCount);
	var brickWidth=55;
	var brickHeight=15;
	var brickPadding=5;
	if( /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) { 
		var brickOffSetTop=5;
	}else{		
		var brickOffSetTop=30;
	} 
	var brickOffSetLeft=10;
}else if (window.innerHeight > 417 || window.innerHeight < 645 ) { 
	var ballRadius=5;
	var speed = 3;
	var brickColumnCount=Math.floor(canvas.width / 85);
	var brickWidth=75;
	var brickHeight=25;
	var brickPadding=10;
	if( /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) { 
		var brickOffSetTop=5;
	}else{		
		var brickOffSetTop=30;
	} ;
	 
	var brickOffSetLeft=30; 
}else if (window.innerHeight > 646 || window.innerHeight < 770 ) { 
	var ballRadius=8;
	var speed = 2;
	var brickColumnCount=Math.floor(canvas.width / 85);
	var brickWidth=75;
	var brickHeight=30;
	var brickPadding=10;
		if( /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) { 
			var brickOffSetTop=5;
		}else{		
			var brickOffSetTop=30;
		} 
	var brickOffSetLeft=30; 
}else if (window.innerHeight > 771) { 
	var ballRadius=8;
	var speed = 1;
	var brickColumnCount=Math.floor(canvas.width / 85);
	var brickWidth=75;
	var brickHeight=35;
	var brickPadding=10;
	
	if( /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) { 
		var brickOffSetTop=5;
	}else{		
		var brickOffSetTop=30;
	} 
} 
var score=0;
var lives=10;

var bricks=[];
for(let c=0;c<brickColumnCount;c++)
{
	bricks[c]=[];
	for(let r=0;r<brickRowCount;r++)
	{
		bricks[c][r]={x:0,y:0,status:1};
	}
}

document.addEventListener("keydown",keyDownHandler);
document.addEventListener("keyup",keyUpHandler);



var knopka_left = document.getElementById("knopka_left");
knopka_left.addEventListener("mousedown", knopka_left1, false);
knopka_left.addEventListener("mouseup", knopka_left_of1, false);

function knopka_left1()
{
	leftPressed=true;
	//	alert("fsdfsd");
}
function knopka_left_of1()
{
	leftPressed=false;
}  
var knopka_right = document.getElementById("knopka_right");
knopka_right.addEventListener("mousedown", knopka_right1, false);
knopka_right.addEventListener("mouseup", knopka_right_of1, false);

function knopka_right1()
{
	//alert();
	rightPressed=true;
}
function knopka_right_of1()
{
	rightPressed=false;
}  


if( /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) { 
	
	elem.addEventListener('touchmove', function (e) { 
		touchPosition = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
		//	console.log(touchPosition.x); //Рисуем точку текущей позиции
		//	var touchPosition1 = touchPosition.x * 0.8;
		elem.style.left = touchPosition.x - 40 + 'px'; 
		paddleX = touchPosition.x- 100; 
	});   
} 
else {
	
	document.addEventListener("mousemove",mouseMoveHandler);
	
	function mouseMoveHandler(e)
	{
		var relativeX = e.clientX-canvas.offsetLeft;
		if(relativeX>0+paddleWidth/2 && relativeX < canvas.width-paddleWidth/2)
		{
			paddleX= relativeX-paddleWidth/2; 
		}  
	}  
}      

/* document.addEventListener("mousemove",mouseMoveHandler);
	
	function mouseMoveHandler(e)
	{
	var relativeX = e.clientX-canvas.offsetLeft;
	if(relativeX>0+paddleWidth/2 && relativeX < canvas.width-paddleWidth/2)
	{
	paddleX= relativeX-paddleWidth/2;
	}  
}   */
function drawBricks()
{
	for(let c=0;c<brickColumnCount;c++)
	{
		for(let r=0;r<brickRowCount;r++)
		{
			if(bricks[c][r].status==1)
			{
				var brickX=(c*(brickWidth+brickPadding)+brickOffSetLeft);
				var brickY=(r*(brickHeight+brickPadding)+brickOffSetTop);
				bricks[c][r].x=brickX;
				bricks[c][r].y=brickY;
				
				ctx.beginPath();
				ctx.rect(brickX,brickY,brickWidth,brickHeight);
				ctx.fillStyle="#00095DD";
				ctx.fill();
				ctx.strokeStyle='rgba(0,0,255,0.5)';
				ctx.stroke();
				ctx.closePath();
			}
			
		}
	}
}
function keyDownHandler(e){
	if(e.keyCode==39)
	{
		rightPressed=true;
	}
	else if(e.keyCode==37)
	{
		leftPressed=true;
	}
	
}

function keyUpHandler(e){
	if(e.keyCode==39)
	{
		rightPressed=false;
	}
	else if(e.keyCode==37)
	{
		leftPressed=false;
	}
	
}

function drawBall()
{
	ctx.beginPath();
	ctx.arc(x,y,ballRadius,0,Math.PI*2);
	ctx.fillStyle="#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle()
{
	ctx.beginPath();
	ctx.rect(paddleX,canvas.height-(paddleHeight),paddleWidth,paddleHeight);
	ctx.fillStyle="#0095DD";
	ctx.fill();
	ctx.closePath();
}
function collisonDetection()
{
	for(var c=0;c<brickColumnCount;c++)
	{
		for(var r=0;r<brickRowCount;r++)
		{
			var b=bricks[c][r];
			if(b.status==1)
			{
				if(x>b.x && x< b.x+brickWidth && y>b.y && y< b.y+brickHeight )
				{
					dy=-dy;
					b.status=0;
					++score;
					if(brickColumnCount*brickRowCount==score)
					{ 
						lives=1000;
						gameVin.style.display = "block";
						canvas.classList.add("bodyend");
						//	alert("YOU WIN");
						//	document.location.reload();
					}
					
				}
			}
		}
	}
}

function drawScore()
{
	ctx.font="16px Arial";
	ctx.fillStyle="#0095DD";
	if( /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) { 
		ctx.fillText(Scored+score,8,canvas.height/1.5);	
	}else{	 
		ctx.fillText(Scored+score,8,20);
	}
}

function drawLives()
{
	ctx.font="16px Arial";
	ctx.fillStyle="#0095DD";
	
	if( /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) { 
		ctx.fillText(Livesd+lives,canvas.width-85,canvas.height/1.5);
	}else{ 
		ctx.fillText(Livesd+lives,canvas.width-85,20);
	}
	
}
function draw()
{
	ctx.clearRect(0,0,canvas.width,canvas.height)
	drawBricks();
	drawLives();
	drawBall();
	drawPaddle();
	drawScore();
	collisonDetection();
	
	if(y+dy < ballRadius){
		dy=-dy;
	}
	else if(y+dy > canvas.height-2*ballRadius)
	{
		
		if(x>paddleX && x<paddleX +paddleWidth)
		{
			dy=-dy;
		}
		else{
			lives=lives-1;
			if(!lives)
			{
				gameOver.style.display = "block";
				canvas.classList.add("bodyend");
				//alert("GAME OVER");
				setTimeout(function(){ location.reload(); }, 25000);
			}
			else
			{
				x=canvas.width/2;
				y=canvas.height-30;
				dx=2;
				dy=-2;
				paddleX=(canvas.width-paddleWidth)/2;
				
				elem.style.left = paddleX + 40 + 'px';
			}
		}
	}
	
	if((x+dx < ballRadius|| (x+dx > canvas.width-ballRadius)) ){
		dx=-dx;
	}
	if(rightPressed && paddleX <canvas.width-paddleWidth)
	{
		paddleX+=7;
	}
	else if(leftPressed && paddleX>0){
		paddleX-=7;
	}
	x += dx;
	y += dy;
}


setInterval(draw,speed);
