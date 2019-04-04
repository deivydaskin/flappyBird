var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');

var bird = new Image();
var backGround = new Image();
var floor = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = 'images/bird.png';
backGround.src = 'images/bg.png';
floor.src = 'images/fg.png';
pipeNorth.src = 'images/pipeNorth.png';
pipeSouth.src = 'images/pipeSouth1.png';

var fly = new Audio();
var scor = new Audio();
var lose = new Audio();

fly.src = 'sounds/jump.wav';

var gap = 95;
var constant;
var birdX = 10;
var birdY = 150;
var velocityBirdY = 0.3;
var accelerateY = 0.1;

document.addEventListener('keydown', moveUp);
document.addEventListener('touchstart', moveUp);

function moveUp() {
	velocityBirdY = -1;
	birdY -= 50;
	fly.play();
}

var pipe = [];

pipe[0] = {
	x: cvs.width,
	y: 0
};

function draw() {
	ctx.drawImage(backGround, 0, 0);

	for (var i = 0; i < pipe.length; i++) {
		constant = pipeNorth.height + gap;
		ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
		pipe[i].x--;
		if (pipe[i].x == 125) {
			pipe.push({
				x: cvs.width,
				y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
			});
		}
		if (
			(birdX + bird.width >= pipe[i].x &&
				birdX <= pipe[i].x + pipeNorth.width &&
				(birdY <= pipe[i].y + pipeNorth.height || birdY + bird.height >= pipe[i].y + constant)) ||
			birdY + bird.height >= cvs.height - floor.height
		) {
			location.reload();
		}
	}

	ctx.drawImage(floor, 0, cvs.height - floor.height);
	ctx.drawImage(bird, birdX, birdY);
	velocityBirdY += accelerateY;
	birdY += velocityBirdY;
	requestAnimationFrame(draw);
}

draw();
