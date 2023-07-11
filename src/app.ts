import 'dotenv/config';
import process from 'node:process';
import bot from './bot.ts';
import logger from './logger.ts';
import stableDiffusion from './stable_diffusion.ts';

// Error Handler
process.on("uncaughtException", (err) => {
    logger.error(err);
    process.exit(1);
});

// Exit Handler
process.once("exit", () => {
    logger.info("stopping...")
    // db.write()
    process.exit();
});

const main = async () => {
    // db.read();
    await stableDiffusion.load();
    await bot.loadModules();
    await bot.run()
}

main();