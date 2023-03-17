import { pluralize, checkWord } from "./pluralize-dindles.mjs";

let plural_word = pluralize("cow");
let x = checkWord("cow");
console.log("this is the result of calling pluralize:", plural_word);
console.log("this is the result of calling checkWord:", x);
