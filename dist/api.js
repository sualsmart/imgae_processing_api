"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const ImageProcessing_1 = require("./ImageProcessing");
dotenv_1.default.config();
//note the image is from https://simplesnippets.tech/wp-content/uploads/2018/10/variables-and-datatypes-in-JavaScript-featured-image.jpg.
const routes = express_1.default.Router();
routes.use(express_1.default.json());
routes.get('/', (req, res) => {
    const name = req.query.filename;
    const height = req.query.height;
    const width = req.query.width;
    let newimg = '';
    const img = path_1.default.resolve(`./`) + `/assets/images/${name}.jpeg`;
    // validating inputs
    if ((0, fs_1.existsSync)(img) === true) { // check if the image does existes to process
        // check retrived values is not null
        if ((0, fs_1.existsSync)((path_1.default.resolve(`./`) + `/assets/newImage/${name}_${height}_${width}.jpeg`)) === false) {
            if (name != null && height != null && width != null) {
                //check the width and height has numberic values
                if ((/^-?\d+$/.test(width) != false) && (/^-?\d+$/.test(height) != false)) {
                    if (parseInt(width) > 0 && parseInt(height) > 0) {
                        // image processing
                        newimg = (0, ImageProcessing_1.imageProcessing)(name, parseInt(width), parseInt(height));
                    }
                    else {
                        return res
                            .status(400)
                            .send(' height and width need to be greater than zero example: 225 ');
                    }
                }
                else {
                    return res
                        .status(400)
                        .send(' height and width need to be in numberical form example: 250 ');
                }
            }
            else {
                return res
                    .status(404)
                    .send('name and height and width are required to use this API');
            }
            //to give time to save the processed image in the directory
            sleep(300).then(() => {
                if ((0, fs_1.existsSync)(newimg) === true) {
                    return res.sendFile(newimg);
                }
                else {
                    return res
                        .status(404)
                        .send('resources is not created yet');
                }
            });
        }
        else {
            console.log('image is already existed');
            newimg = (path_1.default.resolve(`./`) + `/assets/newImage/${name}_${height}_${width}.jpeg`);
            return res.sendFile(newimg);
        }
    }
    else {
        return res
            .status(404)
            .send('image is not found, please enter valid image name');
    }
});
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.default = routes;
