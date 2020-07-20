const express = require("express");
const router = express.Router();
const db = require("../models");

router.post('/new', (req, res) => {
    db.User.create({
        username: req.body.username,
        password: req.body.password
    }).then(newUser => res.send(newUser));
})

router.get('/all', (req, res) => {
    db.User.findAll({
        include: [db.Collection]
    }).then(allUsers => res.send(allUsers));
})

module.exports = router;




// const path = require("path");

// module.exports = function (app) {
//   app.post("/register", (req, res) => {
//     db.User.create({
//       email: req.body.email,
//       password: req.body.password,
//     })
//       .then(function () {
//         console.log(User);
//         res.redirect("/api/login");
//       })
//       .catch(function (err) {
//         res.status(401).json(err);
//       });
//   });
// };
