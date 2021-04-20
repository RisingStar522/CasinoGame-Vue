# Win5X Provably Fair Verifier

Verifies that game results on Win5X.com are provably fair.

#### Usage example
```
import Limbo from 'provably-fair-verifier/Games/Limbo';

console.log(new Limbo().verify({
    serverSeed: 'example_server_seed',
    clientSeed: 'example_client_seed',
    nonce: 0
})); // Returns "1.07"
```