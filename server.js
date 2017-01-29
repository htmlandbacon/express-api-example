const server = require('./index');

// take the port or set it to 3000
const port = process.env.PORT || 3000;

// run the app
server(port);

console.log(`api started on ${port}`);