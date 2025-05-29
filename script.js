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
  	imgsrc = "img/harukaErr.gif";
  } else if (fraction < .20) {
  	text = "die";
  	imgsrc = "img/haruka1.gif";
  } else if (fraction < .40) {
  	text = "w-why... I know you're better than this producer-san";
  	imgsrc = "img/haruka2.jpg";
  } else if (fraction < .60) {
  	text = "pls work a little harder producer-san";
  	imgsrc = "img/haruka3.jpg";
  } else if (fraction < .80) {
  	text = "not bad but you can do better next time producer-san";
  	imgsrc = "img/haruka4.gif";
  } else {
  	text = "waow good job producer-san!!! (´・◡・｀)";
  	imgsrc = "img/haruka5.gif";
  }

  document.getElementById("text").innerHTML = text;
  document.getElementById("haruka").src = imgsrc;
}

window.onload = function() {
	document.getElementById("myForm").addEventListener('submit', evaluateScore);
};