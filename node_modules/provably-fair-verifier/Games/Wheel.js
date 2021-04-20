import Seed from "../utils/Seed";

/**
 * Verifies a wheel game.
 * @class
 */
export default class Wheel {

    /**
     * Verifies a wheel game by returning the chosen result for given seed_data object and segments.
     * @param {Object} seed_data
     * @param {string} seed_data.serverSeed
     * @param {string} seed_data.clientSeed
     * @param {integer} seed_data.nonce
     * @param {integer} segments The number of segments.
     * @return {string[]} The directions.
     */
    verify(seed_data, segments) {
        return Math.floor(Seed.extractFloat(seed_data) * segments);
    }

}
