import mongoose from "mongoose";
import config from "config";
import log from "./logger";

async function connect() {
  const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(() => log.info("Database connected"));
  } catch (error) {
    log.error("db error", error);
    process.exit(1);
  }
}

export default connect;