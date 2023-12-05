import { getGootleTotal } from "./provider/google.js";
import { allCombos } from "./utils.js";

const DELAY_MS = 1000;
const BATCH_SIZE = 5;
const QUERY_TERMS = [
  [
    "process analysis",
    "process mining",
    "business process",
    "process management",
    "process discovery",
    "process querying",
  ],
  ["chatgpt", "chatbot", "llm", "plm", "bpm"],
  ["natural language", "prompting", "prompt engineering", "nlp"],
];
const allCombinations = allCombos(...QUERY_TERMS);

let results = [];
let batch = 0;
const totalLength = allCombinations.length;
while (batch < totalLength) {
  const maxBatch =
    batch + BATCH_SIZE > totalLength ? totalLength : batch + BATCH_SIZE;
  const batchResults = await Promise.all(
    allCombinations.slice(batch, maxBatch).map(async (query) => {
      const total = await getGootleTotal(query);
      return { ...total };
    })
  );
  results = results.concat(batchResults);
  batch += BATCH_SIZE;
  if (DELAY_MS) {
    await new Promise((resolve, reject) => {
      setTimeout(() => resolve(true), DELAY_MS);
    });
  }
}

console.log("------------------------------------keys");
console.log(results.map((r) => r.query).join("\n"));
console.log("------------------------------------values");
console.log(results.map((r) => r.total).join("\n"));
