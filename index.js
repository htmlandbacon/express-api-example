// requires from node_modules
var express = require('express');
var bodyParser = require('body-parser');
// load in the data
const data = require('./data/user.json');
// express app
var app = express();
// start a router
const router = express.Router();

var createServer = function(port) {
    // use body parser for processing
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // end point to get all users
    router.get('/users', function(req, res) {
        res.json(data);   
    });

    // end point to search users, if not found return 404 with error
    router.get('/users/:id', function(req, res) {
        // get id from url
        const id = req.params.id;
        // filter users
        const user = data.filter(user => {
            if (id === user.id) {
                return user;
            }
        });
        // if user is empty return 404 else display user
        if(user.length === 0) {
            res.status(404).json({message: `User ${id} was not found.`});
        } else {
            res.json(user[0]);   
        }
    });

    // export users under api
    app.use('/api', router);

    // start the server
    return app.listen(port);
}

module.exports = createServer;