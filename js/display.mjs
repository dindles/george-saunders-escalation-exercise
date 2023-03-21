// INTRO/STORY DISPLAY LOGIC
function goButtonGo() {
  toggle_visibility_main();
  toggle_visibility_intro();
}
// go button makes textare and wordcounts visible
function toggle_visibility_main() {
  var e = document.getElementById("main");
  e.style.display = "flex";
}
function toggle_visibility_intro() {
  var e = document.getElementById("intro");
  e.style.display = "none";
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
