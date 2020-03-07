const mongoose = require('mongoose');
const customValidations = require('../../utils/validation/custom_validations');

const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: [customValidations.validateEmail, 'Please fill a valid email address'],
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'name must be longer than 1 character'],
        maxlength: [20, 'name must be shorter than 20 characters'],
        set: (val) => {
            return val[0].toUpperCase() + val.slice(1).toLowerCase()
        }
    },
    surname: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'name must be longer than 1 character'],
        maxlength: [20, 'name must be shorter than 20 characters'],
        set: (val) => {
            return val[0].toUpperCase() + val.slice(1).toLowerCase()
        }
    }
});

UserModelSchema.methods = {
    create(data) {
        let newModel = new User(data);
        newModel.save();
    },
};

UserModelSchema.statics = {
    async count(data = {}) {
        let totalCount = 0;
        await User.countDocuments(data, function (err, c) {
            totalCount = c;
        });
        return totalCount;
    }
};

const User = mongoose.model('User', UserModelSchema);
