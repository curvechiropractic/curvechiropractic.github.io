import fs from "fs";
import { parse } from "yaml";

export function getFaqs() {
  const fileContent = fs.readFileSync("./src/content/faq.yaml", "utf-8");
  const data = parse(fileContent);
  return data.faqs;
}
