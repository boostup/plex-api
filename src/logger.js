let logger = {};

logger.log = (str) => console.log(str);
logger.canLog = true;


if (process.env.NODE_ENV === 'test') {
    logger.log = () => {};
    logger.canLog = false;
}

module.exports = logger;