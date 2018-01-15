const assert = require('assert');
const logger = require('./logger');

describe('logger', function () {

    describe('if NODE_ENV=test', function () {
        it('logger.canLog === false', function () {
            assert(logger.canLog === false);
        });
    });
});