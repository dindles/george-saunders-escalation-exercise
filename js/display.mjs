// ===============
// GO BUTTON PRESS
// ===============
function goButtonGo() {
  toggle_visibility_main();
  // toggle_visibility_intro();

  setTimeout(function () {
    transition_main();
    transition_intro();
  }, 10);
  // wait x ms before starting the transitions

  // todo create drop-down element
  // todo create save button

  // start timer
  startTimer();
  createHeaderButtons();
}

// INTRO/MAIN VISIBILITY TOGGLES
function toggle_visibility_main() {
  const e = document.getElementById("main");
  e.style.display = "flex";
  e.style.opacity = 0;
  // e.style.transform = "scale(0)";
}

// function toggle_visibility_intro() {
//   const e = document.getElementById("intro");
//   e.style.display = "block";
//   e.style.opacity = 1;
//   e.style.transform = "scale(1)";
// }

function transition_main() {
  const e = document.getElementById("main");
  let opacity = 0;
  let scale = 0;
  const interval = setInterval(function () {
    opacity += 0.1;
    scale += 0.1;
    e.style.opacity = opacity;
    e.style.transform = "scale(" + scale + ")";
    if (opacity >= 1 || scale >= 0.9) {
      clearInterval(interval);
    }
  }, 20); // animate every x ms
}

function transition_intro() {
  const e = document.getElementById("intro");
  let opacity = 1;
  let scale = 1;
  const interval = setInterval(function () {
    opacity -= 0.1;
    scale -= 0.1;
    e.style.opacity = opacity;
    e.style.transform = "scale(" + scale + ")";
    if (opacity <= 0 || scale <= 0) {
      clearInterval(interval);
      e.style.display = "none"; // hide element when transition is complete
    }
  }, 10); // animate every x ms
}

// CREATE SAVE AND INTRO HEADER BUTTONS
function createHeaderButtons() {
  const collapseIntroButton = document.createElement("button");
  collapseIntroButton.innerText = "◄";
  collapseIntroButton.classList.add("header-button");
  collapseIntroButton.setAttribute("id", "intro-collapsible");
  // collapseIntroButton.addEventListener("click", expandCollapseIntro());

  const saveButton = document.createElement("button");
  saveButton.innerText = "save";
  saveButton.classList.add("header-button");
  saveButton.innerHTML = "<img src='./assets/pixil-save-icon.png'/>";
  saveButton.setAttribute("id", "save-button");
  saveButton.onclick = function () {
    if ((promptFilename = prompt("Save file as", ""))) {
      var textBlob = new Blob([document.getElementById("story-text").value], {
        type: "text/plain",
      });
      var downloadLink = document.createElement("a");
      downloadLink.download = promptFilename;
      downloadLink.innerHTML = "Save story";
      downloadLink.href = window.URL.createObjectURL(textBlob);
      downloadLink.click();
      downloadLink = null;
      textBlob = null;
    }
  };

  header.appendChild(saveButton);
  header.appendChild(collapseIntroButton);
}

// TIMER
function startTimer() {
  const timer = document.getElementById("timer");
  displayTimer(45 * 60, timer);
}

function displayTimer(duration, timer) {
  let time = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(time / 60, 10);
    seconds = parseInt(time % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timer.textContent = minutes + ":" + seconds;

    if (--time < 0) {
      time = duration;
    }
  }, 1000);
}

// =====================
// TODO GOOD/BAD COLOUR LOGIC
// =====================
// Two colours: good and bad
// Word count is good only on 200. otherwise bad.
// Unique word count is good until 50.

// =====
// OTHER
// =====

// textarea height
const storyText = document.getElementById("story-text");

storyText.addEventListener("input", () => {
  adjustTextareaHeight(storyText);
});

function adjustTextareaHeight(storyText) {
  storyText.style.height = "auto";
  storyText.style.height = `${storyText.scrollHeight}px`;
}

// ==========
// SAVE STORY
// ==========

// ====
// TODO
// function expandCollapseIntro() {}
