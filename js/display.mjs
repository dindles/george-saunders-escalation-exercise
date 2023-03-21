// INTRO/STORY DISPLAY LOGIC
function goButtonGo() {
  toggle_visibility_main();
  toggle_visibility_intro();

  setTimeout(function () {
    transition_main();
    transition_intro();
  }, 10); // wait x ms before starting the transitions
}

function toggle_visibility_main() {
  const e = document.getElementById("main");
  e.style.display = "flex";
  e.style.opacity = 0;
  e.style.transform = "scale(0)";
}

function toggle_visibility_intro() {
  const e = document.getElementById("intro");
  e.style.display = "block";
  e.style.opacity = 1;
  e.style.transform = "scale(1)";
}

function transition_main() {
  const e = document.getElementById("main");
  let opacity = 0;
  let scale = 0;
  const interval = setInterval(function () {
    opacity += 0.1;
    scale += 0.1;
    e.style.opacity = opacity;
    e.style.transform = "scale(" + scale + ")";
    if (opacity >= 1 || scale >= 1) {
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

// go button makes intro para, title and go button hidden
// go button makes thin bar appear top with clock, save and collapsible
// collapsible shows intro para

// OTHER
// textarea height
const storyText = document.getElementById("story-text");

storyText.addEventListener("input", () => {
  adjustTextareaHeight(storyText);
});

function adjustTextareaHeight(storyText) {
  storyText.style.height = "auto";
  storyText.style.height = `${storyText.scrollHeight}px`;
}
