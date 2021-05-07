var express = require("express");
var cors = require("cors");
var path = require("path");

//var bodyParser = require('body-parser') 
var app = express();
var elasticsearch = require('elasticsearch');
var port = process.env.PORT || 5000;
//app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: false
  })
);
// var client = new elasticsearch.Client({
//   host: 'http://3b3de705f06b.ngrok.io',
// });
// client.ping({
//   // ping usually has a 3000ms timeout
//   requestTimeout: 1000
// }, function (error) {
//   if (error) {
//     console.trace('elasticsearch cluster is down!');
//   } else {
//     console.log('All is well');
//   }
// });

// const searchText = "short_sleeved_shirt"
//     client.search({
//         index: "deepfashion-instore",
//         body: {
//             query: {
//                 match: {"predicted.fashion_items":"trousers"}
//             }
//         }
//     })
//     .then(response => {
//         return response;
//     })
//     .catch(err => {
//         return res.status(500).json({"message": "Error"})
//     })

var Users = require("./routes/Users");

var featureData = require("./routes/featureData");
app.use("/users", Users);

app.use("/featureData",featureData);
app.listen(port, function() {
  console.log("Server is running on port: " + port);
});
module.exports = app;