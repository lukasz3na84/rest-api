import mongoose from "mongoose";
import log from "./logger";
import '../middleware/dotenvMiddleware';

async function connect() {
  const dbUri = process.env.DB_URI ?? '';

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