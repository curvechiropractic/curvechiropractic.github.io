import fs from "fs";
import { parse } from "yaml";

export function getContact() {
  const fileContent = fs.readFileSync("./src/content/contact.yaml", "utf-8");
  const data = parse(fileContent);
  return data.contact;
}
