// ===============
// GO BUTTON PRESS
// ===============
function goButtonGo() {
  toggle_visibility_main();

  setTimeout(function () {
    transitionIn("main");
    transitionOut("intro");
  }, 10); // wait 10 ms before starting the transitions

  startTimer();

  createHeaderButtons();

  hideFooter();
}

// INTRO/MAIN VISIBILITY TOGGLES
function toggle_visibility_main() {
  const e = document.getElementById("main");
  e.style.display = "flex";
  e.style.opacity = 0;
}

function transitionIn(element) {
  const e = document.getElementById(element);
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

function transitionOut(element) {
  e = document.getElementById(element);
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
  const InstructButton = document.createElement("button");
  InstructButton.innerText = "◄";
  InstructButton.classList.add("header-button");

  InstructButton.onclick = function () {
    if (InstructButton.innerText === "◄") {
      InstructButton.innerText = "▼";
    } else {
      InstructButton.innerText = "◄";
    }

    const i = document.getElementById("instructions");
    i.classList.toggle("show");

    // if (window.getComputedStyle(instructions, null).display === "none") {
    //   i.style.display = "flex";
    // } else {
    //   i.style.display = "none";
    // }
  };

  const saveButton = document.createElement("button");
  saveButton.innerText = "save";
  saveButton.classList.add("header-button");
  saveButton.innerHTML = "<img src='./assets/pixil-save-icon.png'/>";
  saveButton.setAttribute("id", "save-button");
  saveButton.onclick = function () {
    if ((promptFilename = prompt("Save file as", ""))) {
      const textBlob = new Blob([document.getElementById("story-text").value], {
        type: "text/plain",
      });
      const downloadLink = document.createElement("a");
      downloadLink.download = promptFilename;
      downloadLink.innerHTML = "Save story";
      downloadLink.href = window.URL.createObjectURL(textBlob);
      downloadLink.click();
      downloadLink = null;
      textBlob = null;
    }
  };

  header.appendChild(saveButton);
  header.appendChild(InstructButton);
}

// Timer
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

// Hide footer
function hideFooter() {
  const footer = document.getElementById("footer");
  footer.style.display = "none";
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
