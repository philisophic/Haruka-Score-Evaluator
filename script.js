class Profile {
  constructor(name, homeResponse, responseThresholds, responseSet, errResponse) {
    this.name = name;
    this.homeResponse = new Response(homeResponse); // preloaded for quick switching
    this.responseThresholds = responseThresholds;
    this.responseSet = responseSet;
    this.errResponse = errResponse;
  }

  preloadAssets() {
    currentResponseSet = this.responseSet.map((response) => new Response(response));
    currentErrResponse = new Response(this.errResponse);
  }
}

class Response {
  constructor(responseData) {
    this.img = new Image();
    this.img.src = responseData[0];

    this.msg = responseData[1];
    this.audio = new Audio(responseData[2]);
  }

  display() {
    document.getElementById("response-img").firstElementChild.replaceWith(this.img);
    document.getElementById("response-msg").innerHTML = this.msg;
  }
}

function evaluateScore(event) {
  event.preventDefault();

  // retrieve user input for score
  let score = document.getElementById("score").value;
  let maxscore = document.getElementById("maxscore").value;
  if (isNaN(maxscore) || maxscore.trim() == "") {
  	maxscore = 100;
  }

  // select appropriate response and display it
  let response;

  if (isNaN(score) || score.trim() == "") {
    response = currentErrResponse;
  } else {
    let scoreFraction = score/maxscore;
    let searchSuccess = false;

    for (let i = 0; i < currentProfile.responseThresholds.length; i++) {
      if (scoreFraction < currentProfile.responseThresholds[i]) {
        response = currentResponseSet[i];
        searchSuccess = true;
        break;
      }
    }
    if (!searchSuccess) { // greater than last threshold value
      response = currentResponseSet[currentProfile.responseThresholds.length];
    }
  }

  response.display();
}

function changeTheme() {
  let newProfile = profiles[document.getElementById("theme").value];
  newProfile.homeResponse.display();
  newProfile.preloadAssets();
  currentProfile = newProfile;
}

let haruka = new Profile(
  "Haruka Amami",
  ["img/haruka0.png", "tell haruka your test score and she will decide your fate"],
  [0.2, 0.4, 0.6, 0.8],
  [
    ["img/haruka1.gif", "die"],
    ["img/haruka2.jpg", "w-why... I know you're better than this producer-san"],
    ["img/haruka3.jpg", "pls work a little harder producer-san"],
    ["img/haruka4.gif", "not bad but you can do better next time producer-san"],
    ["img/haruka5.gif", "waow good job producer-san!!! (´・◡・｀)"]
  ],
  ["img/harukaErr.gif", "please enter a valid numeric score producer-san"],
);

let suisei = new Profile(
  "Hoshimachi Suisei",
  ["img/suisei0.webp", "tell suisei your test score and she will decide your fate"],
  [0.2, 0.4, 0.6, 0.8],
  [
    ["img/suisei1.gif", "you've yeed your last haw buddy"],
    ["img/suisei2.gif", "c'mon man you can do better"],
    ["img/suisei3.gif", "don't give up yet, fighto fighto"],
    ["img/suisei4.gif", "not bad, but hoshiyomis gotta keep working hard!"],
    ["img/suisei5.gif", "nice job, you're a rockstar!! ⋆｡°✩"]
  ],
  ["img/suiseiErr.gif", "are you sure that's a numeric score?"]
);

let profiles = {
  "haruka": haruka,
  "suisei": suisei
}

let currentProfile = haruka;

let currentResponseSet;
let currentErrResponse;

window.onload = function() {
  // fill theme selection dropdown
  for (let theme in profiles) {
    let option = document.createElement("option");
    option.value = theme;
    option.innerHTML = profiles[theme].name;
    document.getElementById("theme").appendChild(option); 
  }

  // set appropriate theme if specified in url
  let initialTheme = (new URL(window.location.href)).searchParams.get("theme");
  if (initialTheme in profiles) {
    currentProfile = profiles[initialTheme];
    document.getElementById("theme").value = initialTheme;
  }

  currentProfile.homeResponse.display();
  
  document.getElementById("myForm").addEventListener("submit", evaluateScore);
  document.getElementById("theme").onchange = changeTheme;

  currentProfile.preloadAssets();
};