const express = require('express');
const items = require('./fakeDb');
const routes = require('./router');
const ExpressError = require("./expressError")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/items", routes);

app.use(function (req, res, next) {
    return new ExpressError("Not Found", 404);
  });
  

  
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
  
    return res.json({
      error: err.message,
    });
  });

app.listen(3000, function() {
    console.log("Server is listening on port 3000");
  });

  module.exports = app;