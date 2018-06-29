const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')


class Database {

    constructor() {
        this.init = this.init.bind(this);
        this.repostLog = '';
        this.tagLog = '';
        this.commentLog = '';
        this.mediaLog = '';
        this.ipfs = '';
        this.orbitdb = '';
        this.init();
    }

    init() {
        this.ipfs = new IPFS();
        this.ipfs.on('ready', async () => {
            this.orbitdb = new OrbitDB(this.ipfs);

            this.repostLog = await this.orbitdb.kvstore('repost');
            await this.repostLog.drop();
            await this.repostLog.load();

            this.mediaLog = await this.orbitdb.log('media');
            await this.mediaLog.drop();
            await this.mediaLog.load();

            // Listen for updates from peers
            this.mediaLog.events.on('replicated', (address) => {
                console.log(this.mediaLog.iterator({limit: -1}).collect())
            });
        });
    }

    async getSpecific(hash) {
        const data = this.repostLog.get(hash);
        this.tagLog = await this.orbitdb.eventlog(hash);
        this.tagLog.load();

        this.commentLog = await this.orbitdb.eventlog(hash);
        this.commentLog.load();
        return data;
    }

    async getLast(limit = -1) {
        return await this.mediaLog.iterator({limit: limit}).collect().map((e) => e.payload.value)
    }

    addMedium(data) {
        this.ipfs.files.add(data, (err, files) => {
            data.hash = files[0].hash;
            data.path = "/ipfs/" + data.hash;
            this._addMedium(data).then();
        });
    }

    async _addMedium(data) {
        const exist = this.repostLog.get(data.hash);
        if (exist === undefined) {
            this.mediaLog.add(data.hash).then((h) => {
                console.log("Item: " + h);
                this.repostLog.put(data.hash, data);
            });
        }
    }

}

export default (new Database());

