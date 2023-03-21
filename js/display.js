// INTRO/STORY DISPLAY LOGIC

// go button makes textare and wordcounts visible

// go button makes intro para, title and go button hidden
// go button makes thin bar appear top with clock, save and collapsible
// https://www.w3schools.com/howto/howto_js_collapsible.asp
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
