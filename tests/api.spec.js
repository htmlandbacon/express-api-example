const {assert} = require('chai');
const superagent = require('superagent');
const status = require('http-status');
// include server
const server = require('../index');
// ser variables 
const port = process.env.PORT || 3000;
const validUserID = 'A0001';
const invalidUserID = 'B0001';

describe('/api/users', function() {
    let app;
 
    before(function() {
        // start server
        app = server(port);
    });
    
    after(function() {
        // close server
        app.close();
    });
    
    it('should return list of users when called', function(done) {  
        superagent
        .get(`http://localhost:${port}/api/users`)
        .end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            const result = JSON.parse(res.text);
            assert.lengthOf(result, 3);
            done();
        });
    });
    describe('/:id', function() { 
        it('returns user when valid user id is used', function(done) {
            superagent
            .get(`http://localhost:${port}/api/users/${validUserID}`)
            .end(function(err, res) {
                assert.ifError(err);
                assert.equal(res.status, status.OK);
                const result = JSON.parse(res.text);
                assert.equal(result.id, validUserID);
                done();
            });
        });

        it('returns 404 error with message when user does not exist', function(done) {
            superagent
            .get(`http://localhost:${port}/api/users/${invalidUserID}`)
            .end(function(err, res) {
                assert.equal(res.status, status.NOT_FOUND);
                const result = JSON.parse(res.text);
                assert.equal(result.message, `User ${invalidUserID} was not found.`);
                done();
            });
        });
    });
});