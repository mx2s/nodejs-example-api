module.exports = {
    getSkip: (req) => {
        let skip = parseInt(req.query.skip) || 0;
        return skip < 0 ? 0 : skip;
    },
    getLimit: (req, max = 50, min = 0, def= 10) => {
        let limit = parseInt(req.query.limit) || def;
        if (limit > max) limit = max;
        return limit < min ? min : limit;
    },
}