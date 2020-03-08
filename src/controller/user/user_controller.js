let mongoose = require('mongoose');

const User = mongoose.model('User');

const userTransformer = require("../../transformer/user")
const request = require("../../module/request");
const response = require("../../module/response");

module.exports = {
    get: async (req, res, next) => {
        let users = await User.find({})
            .skip(request.getSkip(req))
            .limit(request.getLimit(req));
	await res.json({
            "data": {
                "users": userTransformer.many(users)
            },
            "meta": {
                "totalCount": await User.count()
            }
        });
    },
    create: async (req, res, next) => {
        let newUser = new User({
            email: req.body.email,
            name: req.body.name,
            surname: req.body.surname
        });
        if (await response.validateAndSave(newUser, res, next)) return;

        res.status(201);
        await res.json({
            "data": {
                "user": userTransformer.transform(newUser)
            },
            "meta": {
                "totalCount": await User.count()
            }
        });
    },
    find: async (req, res, next) => {
        let user = await User.findOne({_id: req.params.id});
        if (!user) return response.error("User not found", 404, res, next);
        response.item("user", userTransformer.transform(user), res, next)
    },
    delete: async (req, res, next) => {
        let user = await User.findOne({_id: req.params.id});
        if (!user) return response.error("User not found", 404, res, next);
        await user.delete();
        response.item("deleted_user", userTransformer.transform(user), res, next)
    }
};
