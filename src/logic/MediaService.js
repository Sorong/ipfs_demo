var buffer = require('buffer/').Buffer

class MediaService {
    constructor(db) {
        this.db = db;
    }
    getDummy() {
        return dummy;
    }
    async getMedium(hash) {
        return await this.db.getSpecific(hash);
    }

    async getMediumList(tag = '', limit = -1) {
        //return this.db.get(tag);
        if (tag !== '') {
            return await this.db.getLast(limit);
        }
        return await this.db.getLast(limit);
    }

    async getFiltered(tag, limit = -1) {

    }

    putMedium(medium) {
        this._storeFile(medium);

        return this._addTemp(medium);
        //return this.db.add(medium);
    }

    async _addTemp(medium) {
        let reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onerror = () => {
                reader.abort();
                reject(new DOMException("Problem parsing input file."));
            };

            reader.onload = () => {
                resolve({
                    content: reader.result,
                    hash: "none",
                    path: medium.name,
                    type: medium.type,
                    width: "100%"

                });
            };
            reader.readAsDataURL(medium);
        });
    }


    _storeFile(medium) {
        let reader = new FileReader();
        reader.onerror = () => {
            reader.abort();
        };

        reader.onload = () => {
            medium = {
                content: buffer.from(reader.result),
                hash: "none",
                path: medium.name,
                type: medium.type,
                width: "100%"
            };
            this.db.addMedium([medium]);
        };
        reader.readAsArrayBuffer(medium);
    }

}

export default MediaService;
const dummy = {
    path: 'image_dummy.png',
    content: require('../assets/image_dummy.png'),//'http://localhost:3001/static/media/dummy0.5c8d5aa3.jpg',
    hash: '-1',
    width: '100%',
    type: 'image'
};