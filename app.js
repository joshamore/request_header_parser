const express = require('express');
const path = require('path');

// Creating server
let app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 3000;

// Trusting proxy IP address details
app.set('trust proxy', true)

// Index route
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// User details route
app.get('/me', function(req, res) {
    // Data to be returned
    let userData = {
        'ipaddress': '',
        'language': '',
        'software': ''
    };

    // Pulls in user's IP address
    userData['ipaddress'] = req.ip;
    // Pulls in language
    userData['language'] = req.headers["accept-language"].slice(0, req.headers["accept-language"].indexOf(','));
    // Stores OS details
    userData['software'] = parseOS(req.headers['user-agent']);

    res.send(userData);
});

// Parses the user OS data and extracts hardware/software
function parseOS(user) {
    let start = user.indexOf('(');
    let end = user.indexOf(')')

    return userData = user.slice(start + 1, end);
}

// Listening on port
app.listen(port);

