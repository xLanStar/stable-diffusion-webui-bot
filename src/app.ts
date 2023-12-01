import "dotenv/config";
import bot from "./bot";
import logger from "./logger";
import stableDiffusion from "./stable_diffusion";

// Error Handler
process.on("uncaughtException", (err) => {
  logger.error(err);
  process.exit(1);
});

// Exit Handler
process.once("exit", () => {
  logger.info("stopping...");
  process.exit();
});

const main = async () => {
  // db.read();
  try {
    await stableDiffusion.load();
    await bot.loadModules();
    await bot.run();
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

main();
