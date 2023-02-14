"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageProcessing = void 0;
const path_1 = __importDefault(require("path"));
function imageProcessing(filename, width, height) {
    const img = path_1.default.resolve(`./`) + `/assets/images/${filename}.jpeg`;
    const sharp = require('sharp');
    const newPath = path_1.default.resolve(`./`) + `/assets/newImage/${filename}_${height}_${width}.jpeg`;
    sharp(img)
        .resize(height, width, {
        fit: 'fill',
    })
        .toFile(newPath);
    return newPath;
}
exports.imageProcessing = imageProcessing;
