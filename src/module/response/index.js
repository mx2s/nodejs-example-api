const ValidationErrorsTransformer = require("../../transformer/error/validation_errors_transformer");

module.exports = {
    item: (key, data, res, next, statusCode = 200) => {
        res.status(statusCode);
        let result = {
            data: {}
        }
        result.data[key] = data;
        res.json(result);
        next()
    },
    error: (message, statusCode, res, next) => {
        res.status(statusCode);
        res.json({
            errors: [
                {
                    code: statusCode,
                    message
                }
            ]
        });
        next()
    },
    validateAndSave: async (model, res, next) => {
        try {
            await model.save();
        } catch (err) {
            if (!err) return;
            res.status(422);
            res.json(ValidationErrorsTransformer.transform(err));
            next()
            return err;
        }
    }
}