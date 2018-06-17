class MediumService {
    constructor(db) {
        this.db = db;
    }
    getMedium(hash) {
        return this.db.get(hash);
    }

    getMediumList(tag, limit = 1) {
        return this.db.get(tag);
    }

    putMedium(medium) {
        return this.db.add(medium);
    }
}