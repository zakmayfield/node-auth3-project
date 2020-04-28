//imports
require('dotenv').config();

//import server
const server = require('./api/server.js');

//the port from env or default
const PORT = process.env.PORT || 6000;

//server listen
server.listen(PORT, () => console.log(`\n Running on port ${PORT}`));