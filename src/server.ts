import app from "./app";
import config from "./config/env";
import { initDb } from "./db";

const main =async () => {
  initDb()
  app.listen(config.port, () => {
    console.log(`issue-pulse running on port ${config.port}`);
  });
};
main();
