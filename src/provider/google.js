import axios from "axios";

const googleRegEx = /Aproximadamente ([0-9\.]+) resultados/gi;

export async function getGootleTotal(query) {
  const formatedQuery = `\"${query.join('" AND "')}\"`;
  const params = new URLSearchParams({
    hl: "pt-BR",
    q: formatedQuery,
  })
  const url = new URL(`https://scholar.google.com/scholar?${params}`);

  let doc;
  try {
    doc = await axios.get(url);
    const result = new RegExp(googleRegEx).exec(doc.data);
    return { query: formatedQuery, total: result[1] };
  } catch (e) {
    console.error(e);
    return { query: formatedQuery, total: e.message };
  }
}
