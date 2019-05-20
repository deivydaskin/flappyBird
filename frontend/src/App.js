import axios from "axios";

const weatherAPIKey = "033ef322bd432f252c5e2317ee618683";

var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var backGround = new Image();
var floor = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
var start = new Image();

bird.src = "/images/bird.png";
floor.src = "/images/fg.png";
pipeNorth.src = "/images/pipeNorth.png";
pipeSouth.src = "/images/pipeSouth1.png";
start.src = "/images/start.png";

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/jump.wav";
scor.src = "sounds/score.mp3";

var gap = 125;
var constant;
var birdX = 10;
var birdY = 150;
var velocityBirdY = 0.3;
var accelerateY = 0.1;

var score = 0;

var bestScores = [];

var userName = "";
var weather;

function moveUp() {
  velocityBirdY = -1;
  birdY -= 20;
  fly.currentTime = 0;
  fly.play();
}

var pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0
};

var id = null;

function start_animation() {
  id = requestAnimationFrame(draw);
}

function gameOver() {
  if (
    score > parseInt(bestScores[0].score) ||
    score > parseInt(bestScores[1].score) ||
    score > parseInt(bestScores[2].score)
  )
    axios
      .post("http://localhost:3001/api/scores", {
        username: userName,
        score: score
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });

  cancelAnimationFrame();
}

function draw() {
  ctx.drawImage(backGround, 0, 0);

  document.addEventListener("keydown", moveUp);
  document.addEventListener("touchstart", moveUp);

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
        (birdY <= pipe[i].y + pipeNorth.height ||
          birdY + bird.height >= pipe[i].y + constant)) ||
      birdY + bird.height >= cvs.height - floor.height
    ) {
      gameOver();
    }

    if (pipe[i].x == 5) {
      score++;
      scor.play();
    }
  }

  ctx.drawImage(floor, 0, cvs.height - floor.height);
  ctx.drawImage(bird, birdX, birdY);
  velocityBirdY += accelerateY;
  birdY += velocityBirdY;

  ctx.fillStyle = "#000";

  ctx.font = "22px Roboto";
  ctx.fillText("Score : " + score, 10, cvs.height - 40);

  ctx.font = "18px Roboto";
  ctx.fillText("Best Scores:", cvs.width - 115, cvs.height - 80);
  ctx.font = "14px Roboto";
  ctx.fillText(
    bestScores[0].username + ": " + bestScores[0].score,
    cvs.width - 95,
    cvs.height - 60
  );
  ctx.fillText(
    bestScores[1].username + ": " + bestScores[1].score,
    cvs.width - 95,
    cvs.height - 40
  );
  ctx.fillText(
    bestScores[2].username + ": " + bestScores[2].score,
    cvs.width - 95,
    cvs.height - 20
  );

  start_animation();
}

window.onload = function() {
  getLocation();

  ctx.drawImage(backGround, 0, 0);
  constant = pipeNorth.height + gap;
  ctx.drawImage(pipeNorth, pipe.x, pipe.y);
  ctx.drawImage(pipeSouth, pipe.x, pipe.y + constant);

  ctx.drawImage(floor, 0, cvs.height - floor.height);
  ctx.drawImage(bird, birdX, birdY);
  ctx.drawImage(start, 95, 156);

  axios
    .get("http://localhost:3001/api/scores")
    .then(res => {
      bestScores = res.data;
      ctx.font = "18px Roboto";
      ctx.fillText("Best Scores:", cvs.width - 115, cvs.height - 80);
      ctx.font = "14px Roboto";
      ctx.fillText(
        bestScores[0].username + ": " + bestScores[0].score,
        cvs.width - 95,
        cvs.height - 60
      );
      ctx.fillText(
        bestScores[1].username + ": " + bestScores[1].score,
        cvs.width - 95,
        cvs.height - 40
      );
      ctx.fillText(
        bestScores[2].username + ": " + bestScores[2].score,
        cvs.width - 95,
        cvs.height - 20
      );
    })
    .catch(err => console.log(err));
};

function getBackground(x) {
  console.log(x);
  if (x == "clear sky") {
    backGround.src = "/images/clearSky.png";
  } else if (x == "few clouds") {
    backGround.src = "/images/fewClouds.png";
  } else if (x == "scattered clouds") {
    backGround.src = "/images/scatteredClouds.png";
  } else if (x == "broken clouds") {
    backGround.src = "/images/brokenClouds.png";
  } else if (x == "shower rain") {
    backGround.src = "/images/showerRain.png";
  } else if (x == "rain") {
    backGround.src = "/images/rain.png";
  } else if (x == "thunderstorm") {
    backGround.src = "/images/thunderstorm.png";
  } else if (x == "mist") {
    backGround.src = "/images/mist.png";
  } else {
    backGround.src = "/images/clearSky.png";
  }
}

document.getElementById("canvas").addEventListener(
  "click",
  async function() {
    userName = document.getElementById("userName").value;
    if (!userName) {
      alert("Enter your username!");
    } else {
      start_animation();
    }
  },
  false
);

function getLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition(
      function success(position) {
        let url1 = `http://api.openweathermap.org/data/2.5/weather?lat=${
          position.coords.latitude
        }&lon=${position.coords.longitude}&units=metric&APPID=${weatherAPIKey}`;

        axios
          .get(url1)
          .then(res => {
            getBackground(res.data.weather[0].description);
          })
          .catch(err => console.log(err));
      },
      function error(error_message) {
        console.error(
          "An error has occured while retrieving location",
          error_message
        );
      }
    );
  } else {
    console.log("geolocation is not enabled on this browser");
  }
}
