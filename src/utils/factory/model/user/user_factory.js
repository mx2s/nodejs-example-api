let mongoose = require('mongoose');

let User = mongoose.model('User');

module.exports = {
    async createOne() {
        let newUser = new User({
            email: Math.random().toString(36).substring(7).toLowerCase() + '@test.com',
            name: 'John' + Math.random().toString(36).substring(5),
            surname: 'Doe' + Math.random().toString(36).substring(5),
        });

        await newUser.save();

        return newUser;
    }
};