var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const User = require('../models/user');
router.use(bodyParser.json());

router.post('/saveUsers', (req, res, next) => {
    var users = req.body;
    users.forEach(user => {
        User.create(user)
        .then((usr) => {
            console.log('user Created');
        }, (err) => next(err))
        .catch((err) => next(err));
    });
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.body);

  });

  module.exports = router;