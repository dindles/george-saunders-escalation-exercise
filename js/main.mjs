const clrBad = getComputedStyle(document.body).getPropertyValue("--clr-bad");

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

// GO BUTTON VISIBILITY TOGGLES
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

function hideFooter() {
  const footer = document.getElementById("footer");
  footer.style.display = "none";
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

// CREATE TIMER

function startTimer() {
  const timer = document.getElementById("timer");
  displayTimer(1 * 60, timer);
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
      time = 0;
      timer.style.color = clrBad;
    }
  }, 1000);
}

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

// dark/light mode toggle

const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark"); //add this
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light"); //add this
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);