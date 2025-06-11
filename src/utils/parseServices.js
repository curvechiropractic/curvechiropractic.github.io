import fs from "fs";
import { parse } from "yaml";

export function getServices() {
  const fileContent = fs.readFileSync("./src/content/services.yaml", "utf-8");
  const data = parse(fileContent);
  return data.services;
}
