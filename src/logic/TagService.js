class TagService {

    constructor(db) {
        this.db = db;
    }

    putTag(hash, tag) {
        return this.db.add()
    }

    getTags(hash) {

    }
}

export default TagService;