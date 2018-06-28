class TagCommentService {

    putComment(hash, comment) {

    }
    putTag(hash, tag) {

    }

    getComments(hash) {
        return comments;
    }

    getTags(hash) {
        return tags;
    }
}

const tags = [
    { key: 0, label: 'Trump' },
    { key: 1, label: 'Kim' },
    { key: 2, label: 'Covfefe' },
    { key: 3, label: 'Tag3' },
    { key: 4, label: 'Tag4' },
];

const comments = [
    {id: 0, text: "höhö lustig"},
    {id: 1, text: "covfefe?"}
];


export default TagCommentService;