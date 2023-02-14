import app from "./app";

const port = process.env.PORT;
const start = async (): Promise<void> => {
  app.listen(port, () => console.log(`Listening on port ${port}!`));
};

start();
console.log("TypeScript Eslint Prettier Starter Template");
