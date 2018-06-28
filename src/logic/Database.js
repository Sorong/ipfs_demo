const IPFS = require('ipfs');
const OrbitDB = require('orbit-db');
const ipfsOptions = {
    EXPERIMENTAL: {
        pubsub: true
    },
};

class Database {
    constructor() {
        this.ipfs = new IPFS(ipfsOptions);
        this.isReady = false;
        this.ipfs.on('ready', () =>  {
            this.isReady = true;
            this.orbitdb = new OrbitDB(this.ipfs)
        });

    }

    async get(key, limit = 1) {
        return this.db.get(key);
    }

    async add(data) {
        return await this.db.add(data);
    }
}

export default Database;

