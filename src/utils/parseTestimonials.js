import fs from "fs";
import { parse } from "yaml";

export function getTestimonials() {
  const fileContent = fs.readFileSync(
    "./src/content/testimonials.yaml",
    "utf-8"
  );
  const data = parse(fileContent);
  return data.testimonials;
}
