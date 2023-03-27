import { isPlural, returnSingular } from "./pluralize-dindles.mjs";

const clrGood = getComputedStyle(document.body).getPropertyValue("--clr-good");
const clrBad = getComputedStyle(document.body).getPropertyValue("--clr-bad");

const textarea = document.getElementById("story-text");

// workaround - regex in splitToArray doesn't
// register when a new line isn't preceded by a space.
textarea.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    textarea.value += " ";
  }
});

// get string input from HTML
textarea.addEventListener("input", updateMain);

// updateMain calls the following functions:
function getStoryInput() {
  return textarea.value.trim();
}

function makeAlphaLower(rawText) {
  const alphaOnly = rawText.replace(/[^a-zA-Z ']/g, "");
  return alphaOnly.toLowerCase();
}

// TODO - get this bugger to split on a newline with no space
function splitToArray(textAlphaLower) {
  return textAlphaLower.split(/\s+/);
}

function makeSingular(words) {
  const wordsSingular = [];
  for (let i = 0; i < words.length; i++) {
    if (isPlural(words[i])) {
      wordsSingular.push(returnSingular(words[i]));
    } else {
      wordsSingular.push(words[i]);
    }
  }
  return wordsSingular;
}

function makeUnique(words) {
  const uniqueWords = new Set(words.sort());
  if (uniqueWords.has("")) {
    uniqueWords.delete("");
  }
  return uniqueWords;
}

function getWordCount(words) {
  return words[0] == "" ? 0 : words.length;
}

function displayWordCount(wordCount) {
  const wc = document.getElementById("word-count");
  wc.innerHTML = `${wordCount}`;

  if (wordCount == 200) {
    wc.style.color = clrGood;
  } else {
    wc.style.color = clrBad;
  }
}

function getUniqueWordCount(uniqueWords) {
  return uniqueWords.size;
}

function displayUniqueWordCount(uniqueWordCount) {
  const uwc = document.getElementById("unique-word-count");
  uwc.innerHTML = `${uniqueWordCount}`;

  if (uniqueWordCount <= 50) {
    uwc.style.color = clrGood;
  } else {
    uwc.style.color = clrBad;
  }
}

function displayUniqueWords(uniqueWords) {
  const uniqueWordsString = [...uniqueWords].join(" ");
  document.getElementById("unique-words").innerHTML = `${uniqueWordsString}`;
}

function updateMain() {
  const rawText = getStoryInput();
  const textAlphaLower = makeAlphaLower(rawText);
  const words = splitToArray(textAlphaLower);
  const wordsSingular = makeSingular(words);
  const uniqueWords = makeUnique(wordsSingular);
  const wordCount = getWordCount(words);
  displayWordCount(wordCount);
  const uniqueWordCount = getUniqueWordCount(uniqueWords);
  displayUniqueWordCount(uniqueWordCount);
  displayUniqueWords(uniqueWords);
}
