module.exports.transform = (user) => {
    return {
        id: user._id,
        email: user.email,
        name: user.name,
        surname: user.surname
    }
};
module.exports.many = (users) => users.map((user) => this.transform(user));
