class MediumService {
    constructor(db) {
        this.db = db;
    }
    getMedium(hash) {
        return this.db.get(hash);
    }

    getMediumList(tag ='', limit = 1) {
        //return this.db.get(tag);
        return images;
    }

    putMedium(medium) {
        //return this.db.add(medium);
    }
}

export default MediumService;

const images = [
    {
        url: require('../assets/dummy0.jpg'),//'http://localhost:3001/static/media/dummy0.5c8d5aa3.jpg',
        title: '1',
        width: '100%',
        type: 'image'
    },
    {
        url: require('../assets/dummy1.jpg'),//'http://localhost:3001/static/media/dummy1.d7171ce0.jpg',
        title: '2',
        width: '100%',
        type: 'image'
    },
    {
        url: require('../assets/dummy2.jpg'),//'http://localhost:3001/static/media/dummy2.4338a1b8.jpg',
        title: '3',
        width: '100%',
        type: 'image'
    },
    {
        url: require('../assets/movie.mp4'),
        title: '4',
        width: '100%',
        type: 'video'
    }
];