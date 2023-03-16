const textarea = document.getElementById("story-text");
textarea.addEventListener("input", updateMain);

function getStoryInput() {
  return textarea.value.trim();
}

function makeAlphaLower(rawText) {
  const alphaOnly = rawText.replace(/[^a-zA-Z ]/g, "");
  return alphaOnly.toLowerCase();
}

function splitToArray(textAlphaLower) {
  return textAlphaLower.split(/\s+/);
}

// TODO do it yourself geezer
// function makeSingular() {}

function makeUnique(words) {
  const uniqueWords = new Set(words);
  if (uniqueWords.has("")) {
    uniqueWords.delete("");
  }
  return uniqueWords;
}

function getWordCount(words) {
  return words[0] == "" ? 0 : words.length;
}

function displayWordCount(wordCount) {
  document.getElementById(
    "word-count"
  ).innerHTML = `word count is: ${wordCount}`;
}

function getUniqueWordCount(uniqueWords) {
  return uniqueWords.size;
}

function displayUniqueWordCount(uniqueWordCount) {
  document.getElementById(
    "unique-word-count"
  ).innerHTML = `unique word count is: ${uniqueWordCount}`;
}

function displayUniqueWords(uniqueWords) {
  const uniqueWordsString = [...uniqueWords].join(" ");
  document.getElementById(
    "unique-words"
  ).innerHTML = `unique words: ${uniqueWordsString}`;
}

function updateMain() {
  const rawText = getStoryInput();
  const textAlphaLower = makeAlphaLower(rawText);
  const words = splitToArray(textAlphaLower);
  // const wordsSingular = makeSingular(words);
  const uniqueWords = makeUnique(words);
  const wordCount = getWordCount(words);
  displayWordCount(wordCount);
  const uniqueWordCount = getUniqueWordCount(uniqueWords);
  displayUniqueWordCount(uniqueWordCount);
  displayUniqueWords(uniqueWords);
}
