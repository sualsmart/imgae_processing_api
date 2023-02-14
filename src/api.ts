import express, { query, Request, Response, Router } from "express";
import dotenv from "dotenv";
import path from "path";
import { existsSync } from "fs";
import { imageProcessing } from "./ImageProcessing";
dotenv.config();
//note the image is from https://simplesnippets.tech/wp-content/uploads/2018/10/variables-and-datatypes-in-JavaScript-featured-image.jpg.
const routes: Router = express.Router();
routes.use(express.json());
routes.get("/", (req: Request, res: Response): void => {
  const name: string = req.query.filename as string;
  const height: string = req.query.height as string;
  const width: string = req.query.width as string;
  let newimg: string = "";
  const img = (path.resolve(`./`) + `/assets/images/${name}.jpeg`) as string;
  // validating inputs
  if (existsSync(img) === true) {
    // check if the image does existes to process
    // check retrived values is not null
    if (
      existsSync(
        path.resolve(`./`) + `/assets/newImage/${name}_${height}_${width}.jpeg`
      ) === false
    ) {
      if (name != null && height != null && width != null) {
        //check the width and height has numberic values
        if (/^-?\d+$/.test(width) != false && /^-?\d+$/.test(height) != false) {
          if (parseInt(width) > 0 && parseInt(height) > 0) {
            // image processing
            newimg = imageProcessing(name, parseInt(width), parseInt(height));
          } else {
            res
              .status(400)
              .send(
                " height and width need to be greater than zero example: 225 "
              );
            return;
          }
        } else {
          res
            .status(400)
            .send(
              " height and width need to be in numberical form example: 250 "
            );
          return;
        }
      } else {
        res
          .status(404)
          .send("name and height and width are required to use this API");
        return;
      }
      //to give time to save the processed image in the directory
      sleep(300).then(() => {
        if (existsSync(newimg) === true) {
          return res.sendFile(newimg);
        } else {
          return res.status(404).send("resources is not created yet");
        }
      });
    } else {
      console.log("image is already existed");
      newimg =
        path.resolve(`./`) + `/assets/newImage/${name}_${height}_${width}.jpeg`;
      return res.sendFile(newimg);
    }
  } else {
    res.status(404).send("image is not found, please enter valid image name");
    return;
  }
});
function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default routes;
