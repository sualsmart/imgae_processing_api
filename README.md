
## Prerequisites Technologies

Your must install the following in order to use the project:
- [Node & NPM](https://nodejs.org/en/download/)
- [Typescript](https://www.npmjs.com/package/typescript) (install it globally)

## Setup Steps
To get started, clone this repo and open your terminal at the project root.

and then in your terminal run:
1. `npm install`
2. `cp .env.example .env`
2. `npm start`

and then head to your browser at `localhost:3000` and it should be working.

#### Notes
1. To run your tests you can simply run `npm test`.
2. You can modify your environment variables through the `.env` file.

### Steps for start, build and test:
To start the project just run npm start 
To build the npm run build —> the javascript file will be in dist folder 
To test use npm test  

The endpoints that should be accessed to test is /api

### Any other functionality you have included in the project to ensure the reviewer knows what to expect?
The pre processing validation of the image is cover the following cases:
1- filename or width or height are null
2- filename is not existed 
3- zero value for width or height 
4- non numerical value for width or height 
5- if the image existed check the processing info if it already been processed before, if it has been processed before this request return the stored image with request width and height.

### Important Note
Image folder: contain the image pre processing.
There are one image in the assets folder under images folder that can be processed using the api, you can add any image you want to process to the folder.
newImage folder: it contain the processed images.

### Scripts 
"scripts": {
    "start": "ts-node-dev index.ts",
    "build": "rm -rf ./dist/* && tsc --build",
    "lint": "eslint . --ext .ts",
    "test": "jasmine-ts"
  }
### to run prettier
npm run prettier
### to run eslint
npm run lint
### eslint fix run the following command
npm run lint -- --fix