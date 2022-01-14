const fs = require("fs");
const path = require("path");

console.time();
const folder = process.argv[2];
const folderContents = fs.readdirSync(folder);
let allWords = "";

for (subtitleFileName of folderContents) {
  allWords += fs.readFileSync(path.join(folder, subtitleFileName), "utf-8");
}

allWords = allWords
  .trim()
  .toLowerCase()
  .replace(/[0-9;,->?'"!().&`�\n\r]/g, " ")
  .replace(/  +/g, " ")
  .split(" ")
  .filter((word) => word.length >= 5);

const objectMetWoordenAantalVoorkomen = allWords.reduce((obj, word) => {
  obj[word] = obj[word] + 1 || 1; // indien obj[word] niet bestaat (NaN) zal het 1 zijn.
  return obj;
}, {});

const gestorteerdeWoorden = Object.keys(objectMetWoordenAantalVoorkomen).sort(
  (a, b) =>
    objectMetWoordenAantalVoorkomen[b] - objectMetWoordenAantalVoorkomen[a]
);
console.log(gestorteerdeWoorden);
console.timeEnd();
