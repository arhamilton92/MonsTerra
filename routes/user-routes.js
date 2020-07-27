const express = require("express");
const router = express.Router();
const db = require("../models");
const path = require("path");
const bcryptjs = require("bcryptjs");
const passport = require("../config/passport");

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  router.post("/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
    console.log('success')
  });
  


router.post("/signup", (req, res) => {
  db.User.create({
    username: req.body.username,
    password: req.body.password,
  }).then((newUser) => {
    console.log(newUser.dataValues.id)
  db.Collection.create({
    name: "pets",
    UserId: newUser.dataValues.id,
    CollectionId: newUser.dataValues.id,
  })
    console.log("worked");
    res.send(newUser);
  });
});

router.get("/collection", (req, res) => {
  console.log(req.user.id);
  db.Collection.findAll({
    where: { UserId: req.user.id },
    include: [db.Pet],
  }).then((collection) => {
    console.log(collection[0].dataValues.Pets[0])
    let pets = [];
    for (i=0; i < collection[0].dataValues.Pets.length; i++) {
      pets.push(collection[0].dataValues.Pets[i].dataValues.color_src)
    }
    console.log(pets)

    res.render("inventory", {
      pets: pets,
  });
  });
});


  // Route for logging user out
  router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  router.get("/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's username and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        username: req.user.username,
        id: req.user.id
      });
    }
  });



module.exports = router;

