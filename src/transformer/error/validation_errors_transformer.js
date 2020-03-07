module.exports = {
    transform(err) {
        let errors = err.message.split(', ').map((message) => {
            return {
                code: 422,
                message
            }
        });
        if (err.name === "MongoError" && err.code === 11000) errors = [
            {
                code: 422,
                message: `This ${Object.keys(err.keyValue)[0]} is already taken`
            }
        ];
        return {
            "errors": errors,
        };
    }
};
