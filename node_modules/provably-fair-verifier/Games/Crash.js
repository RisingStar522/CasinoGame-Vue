import {sha256} from 'js-sha256';

/**
 * Verifies a crash game.
 * @class
 */
export default class Crash {

    /**
     * Verifies a Crash game by returning the stoppage for a given hash and a client seed.
     * @param {Object} seed_data
     * @param {string} seed_data.hash
     * @param {string} seed_data.clientSeed
     * @return {float} The result
     */
    verify({hash, clientSeed}) {
        const house_edge = 0.99;
        const hex = sha256.hmac.update(hash, clientSeed).hex();
        const int = parseInt(hex.substr(0, 8), 16);
        const crash_point = Math.max(1, (2 ** 32 / (int + 1)) * house_edge);
        return (Math.floor(crash_point * 100) / 100).toFixed(2);
    }

}
