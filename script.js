function evaluateScore(event) {
  event.preventDefault();

  let score = document.getElementById("score").value;
  let maxscore = document.getElementById("maxscore").value;
  if (isNaN(maxscore) || maxscore == "") {
  	maxscore = 100;
  }
  let text;
  let imgsrc;

  let fraction = score/maxscore;
  if (isNaN(score)) {
  	text = "please enter a valid numeric score producer-san";
  	imgsrc = "https://i.imgur.com/u7X6VbA.gif";
  } else if (fraction < .20) {
  	text = "die";
  	imgsrc = "https://bondsandgates.files.wordpress.com/2014/07/pic3.gif";
  } else if (fraction < .40) {
  	text = "w-why... I know you're better than this producer-san";
  	imgsrc = "https://formeinfullbloom.files.wordpress.com/2013/06/harukaamami.jpg";
  } else if (fraction < .60) {
  	text = "pls work a little harder producer-san";
  	imgsrc = "https://pbs.twimg.com/media/CoaLO2JUEAAD1U8.jpg";
  } else if (fraction < .80) {
  	text = "not bad but you can do better next time producer-san";
  	imgsrc = "https://i.imgur.com/E2ncdRP.gif";
  } else {
  	text = "waow good job producer-san!!! (´・◡・｀)";
  	imgsrc = "https://i.imgur.com/cIwbfuz.gif";
  }

  document.getElementById("text").innerHTML = text;
  document.getElementById("haruka").src = imgsrc;
}

window.onload = function() {
	document.getElementById("myForm").addEventListener('submit', evaluateScore);
};