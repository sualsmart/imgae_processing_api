import path from "path";
export function imageProcessing(
  filename: string,
  width: number,
  height: number
): string {
  const img = (path.resolve(`./`) +
    `/assets/images/${filename}.jpeg`) as string;
  const sharp = require("sharp");
  const newPath =
    path.resolve(`./`) + `/assets/newImage/${filename}_${height}_${width}.jpeg`;
  sharp(img)
    .resize(height, width, {
      fit: "fill",
    })
    .toFile(newPath);

  return newPath;
}
