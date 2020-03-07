let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../../server');
let mongoose = require('mongoose');
let bson = require('bson');

const userFactory = require('../../../../src/utils/factory/model/user/user_factory');

chai.use(chaiHttp);
chai.should();

let app = server.getApp();

describe("UserController tests", () => {
    describe("GET /api/v1/users/:id", () => {
        it("should return user", async function () {
            let user = await userFactory.createOne();
            let res = await chai.request(app).get(`/api/v1/users/${user.id}`);
            res.should.have.status(200);
            res.body.should.be.a('object');

            res.body.data.user.should.be.a('object');

            let targetUser = res.body.data.user;

            targetUser.should.be.a('object');

            chai.assert.equal(targetUser.name, user.name);
            chai.assert.equal(targetUser.surname, user.surname);
        });
        it("should return 404 if user does not exist", async function () {
            let userId = new bson.ObjectID().toString();
            let res = await chai.request(app).get(`/api/v1/users/${userId}`);
            res.should.have.status(404);
        });
    });
    describe("GET /api/v1/users", () => {
        it("should return users", async function () {
            await userFactory.createOne();

            let res = await chai.request(app).get(`/api/v1/users`);
            res.should.have.status(200);
            res.body.should.be.a('object');

            res.body.data.users.should.be.a('array');

            chai.assert.isTrue(res.body.data.users.length > 0);
        });
    });
    describe("POST /api/v1/users", () => {
        it("should create user", async function () {
            let testUser = {
                email: 'some-email@root.com',
                name: 'John',
                surname: 'Doe'
            }

            let res = await chai.request(app)
                .post('/api/v1/users')
                .send(testUser);
            res.should.have.status(201);

            let responseUser = res.body.data.user;

            responseUser.should.be.a('object');

            chai.assert.equal(responseUser.name, testUser.name);
            chai.assert.equal(responseUser.surname, testUser.surname);

            let dbUser = await mongoose.model('User').findOne({_id: responseUser.id});
            chai.assert.equal(responseUser.id, dbUser.id);
        });
        it("should return 422 if user name is too short", async function () {
            let testUser = {
                email: 'some-email@root.com',
                name: 'John',
                surname: 'Doe'
            }

            let res = await chai.request(app)
                .post('/api/v1/users')
                .send(testUser);
            res.should.have.status(422);
        });
    });
    describe("DELETE /api/v1/users/:id", () => {
        it("should delete user", async function () {
            let user = await userFactory.createOne();

            let res = await chai.request(app).delete(`/api/v1/users/${user.id}`)

            res.should.have.status(200);

            let responseUser = res.body.data.deleted_user;

            let dbUser = await mongoose.model('User').findOne({_id: responseUser.id});
            chai.assert.equal(dbUser, null);
        });
        it("should return 404 if user does not exist", async function () {
            let userId = new bson.ObjectID().toString();
            let res = await chai.request(app).delete(`/api/v1/users/${userId}`);
            res.should.have.status(404);
        });
    });
});