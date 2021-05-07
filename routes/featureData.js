const express = require("express");
var elasticsearch = require("elasticsearch");
const featureDataroute = express.Router();
const cors = require("cors");
featureDataroute.use(cors());

var client = new elasticsearch.Client({
  host: "http://ec2-34-237-52-87.compute-1.amazonaws.com:9200/",
});
client.ping(
  {
    // ping usually has a 3000ms timeout
    requestTimeout: 1000,
  },
  function (error) {
    if (error) {
      console.trace("elasticsearch cluster is down!");
    } else {
      console.log("All is well");
    }
  }
);


featureDataroute.post("/fetchedData", (req, res) => {
  const data = req.body.extractedData;
  const gender = req.body.gender;
  console.log("ExtractedFeature", data);
  // mustQuery.push(genderTerm);
  let genderTerm = {
    "term" : {"gender.keyword" : gender}
  };

  let elasticQuery = []

  data.fashion_items.forEach(key => {
    let overall = {}
    let mustTerm = {};
    let temp = getMustQuery(key)
    mustTerm["must"] = temp
    overall["bool"] = mustTerm
    elasticQuery.push(overall)
  })

  function getMustQuery(key) {
    let mustQuery = [];
    mustQuery.push(genderTerm);
    console.log(key);
    let tempItemTerm = {};
    tempItemTerm["term"] = {"predicted.fashion_items": key};
    mustQuery.push(tempItemTerm);

    //Confidence
    let tempConfidenceTerm = {};
    let tempConfidence = {};
    let tempConfidenceVal = {"gte" : 0.80};
    tempConfidence["predicted." + key + ".confidence"] = tempConfidenceVal;
    tempConfidenceTerm["range"] = tempConfidence;
    mustQuery.push(tempConfidenceTerm);


   //Colours high
   let tempColorsHighPercentTerm = {};
   let tempColorsHigh = {};
   let tempColorsHighVal = {"gte" : data[key].colors.high.percent - 30, "lte" : data[key].colors.high.percent + 30};
   tempColorsHigh["predicted." + key + ".colors.high.percent"] = tempColorsHighVal;
   tempColorsHighPercentTerm["range"] = tempColorsHigh;
   mustQuery.push(tempColorsHighPercentTerm);

   let tempColorsHighSpecificColorTerm = {};
   let tempColorsHighSpecificColor = {};
   tempColorsHighSpecificColor["predicted." + key + ".colors.high.specific_color"] = data[key].colors.high.specific_color;
   tempColorsHighSpecificColorTerm["term"] = tempColorsHighSpecificColor
   mustQuery.push(tempColorsHighSpecificColorTerm);

   let tempColorsHighApproxColorTerm = {};
   let tempColorsHighApproxColor = {};
   tempColorsHighApproxColor["predicted." + key + ".colors.high.approx_color"] = data[key].colors.high.approx_color;
   tempColorsHighApproxColorTerm["term"] = tempColorsHighApproxColor
   mustQuery.push(tempColorsHighApproxColorTerm);
   
   return mustQuery;

   // //Colors high h
   // let tempColorsHighHTerm = {};
   // let tempColorsHighH = {};
   // let tempColorsHighHVal = {"gte" : data[key].colors.high.h * 0.5 , "lte" : data[key].colors.high.h * 1.1};
   // tempColorsHighH["predicted." + key + ".colors.high.specific_color"] = tempColorsHighHVal;
   // tempColorsHighHTerm["range"] = tempColorsHighH;
   // elasticQuery.push(tempColorsHighHTerm);   

   // //Colors high l
   // let tempColorsHighLTerm = {};
   // let tempColorsHighL = {};
   // let tempColorsHighLVal = {"gte" : data[key].colors.high.l * 0.5 , "lte" : data[key].colors.high.l * 1.1};
   // tempColorsHighL["predicted." + key + ".colors.high.l"] = tempColorsHighLVal;
   // tempColorsHighLTerm["range"] = tempColorsHighL;
   // elasticQuery.push(tempColorsHighLTerm); 

   // //Colors high s
   // let tempColorsHighSTerm = {};
   // let tempColorsHighS = {};
   // let tempColorsHighSVal = {"gte" : data[key].colors.high.s * 0.5 , "lte" : data[key].colors.high.s * 1.1};
   // tempColorsHighS["predicted." + key + ".colors.high.s"] = tempColorsHighSVal;
   // tempColorsHighSTerm["range"] = tempColorsHighS;
   // elasticQuery.push(tempColorsHighSTerm); 
  }



let check ={
"query": {
  "bool": {
    "should":elasticQuery
  }
}
}

//console.log("**************************\ncheck\n\n",JSON.stringify(check));
//console.log("\n**********************");

  client
  .search({
    index: "deepfashion-instore",
    body: {

      "query": {
        "bool": {
          "should":elasticQuery
        }
      }
    
    }
       
  })
  .then((response) => {
    console.log(response);
    if(response.hits.total.value==0){
        return res.send(201);
    }
    else{
    let final=response.hits.hits.map(x=>x._source.image_url);
    return res.send(final);
  }
  })
  .catch((err) => {
    console.log(err);
    return res.send("error: " + err);
  });
});


featureDataroute.post("/instagramFetched", (req, res) => {
  const data = req.body.extractedData;
  const gender = req.body.gender;
  console.log("Instagram Features passed", data);
  let genderTerm = {
    "term" : {"gender.keyword" : gender}
  };

  let elasticQuery = []

  data.fashion_items.forEach(key => {
    let overall = {}
    let mustTerm = {};
    let temp = getMustQuery(key)
    mustTerm["must"] = temp
    overall["bool"] = mustTerm
    elasticQuery.push(overall)
  })

  function getMustQuery(key) {
    let mustQuery = [];
    mustQuery.push(genderTerm);
    console.log(key);
    let tempItemTerm = {};
    tempItemTerm["term"] = {"predicted.fashion_items": key};
    mustQuery.push(tempItemTerm);

    //Confidence
    let tempConfidenceTerm = {};
    let tempConfidence = {};
    let tempConfidenceVal = {"gte" : 0.80};
    tempConfidence["predicted." + key + ".confidence"] = tempConfidenceVal;
    tempConfidenceTerm["range"] = tempConfidence;
    mustQuery.push(tempConfidenceTerm);


   
   
   return mustQuery;
  }
let check ={
"query": {
  "bool": {
    "must":elasticQuery
  }
}
}

//console.log("**************************\ncheck\n\n",JSON.stringify(check));
//console.log("\n**********************");

  client
  .search({
    index: "deepfashion-instagram",
    body: {

      "query": {
        "bool": {
          "must":elasticQuery
        }
      }
    
    }
       
  })
  .then((response) => {
    console.log(response);
    if(response.hits.total.value==0){
        return res.send("Not available");
    }
    else{
    let final=response.hits.hits.map(x=>x._source.image_url);
    return res.send(final);
  }
  })
  .catch((err) => {
    console.log(err);
    return res.send("error: " + err);
  });
});


featureDataroute.post("/styleIndex", (req, res) => {
  const data = req.body.extractedData;
  const styleIndexValue = req.body.styleIndex;
  const gender = req.body.gender;
  console.log("Style Features passed", data);
  let genderTerm = {
    "term" : {"gender.keyword" : gender}
  };

  let elasticQuery = []
  data.fashion_items.forEach(key => {
    let overall = {}
    let mustTerm = {};
    let temp = getMustQuery(key)
    mustTerm["must"] = temp
    overall["bool"] = mustTerm
    elasticQuery.push(overall)
  })

  function getMustQuery(key) {
    let mustQuery = [];
    mustQuery.push(genderTerm);
    console.log(key);
    let tempItemTerm = {};
    tempItemTerm["term"] = {"predicted.fashion_items": key};
    mustQuery.push(tempItemTerm);

    //Confidence
    let tempConfidenceTerm = {};
    let tempConfidence = {};
    let tempConfidenceVal = {"gte" : 0.80};
    tempConfidence["predicted." + key + ".confidence"] = tempConfidenceVal;
    tempConfidenceTerm["range"] = tempConfidence;
    mustQuery.push(tempConfidenceTerm);
   
  let queryString = {};
  let fields=[];
  let finalQueryString = {};

 let feildString = "predicted." + key + ".colors.high.approx_color";
 fields.push(feildString);

  queryString["query"] = styleIndexValue
  queryString["fields"] = fields

  finalQueryString["query_string"] = queryString
  mustQuery.push(finalQueryString);



   return mustQuery;
  }
  debugger;
let check ={
"query": {
  "bool": {
    "should":elasticQuery
  }
}
}

//console.log("**************************\ncheck\n\n",JSON.stringify(check));
//console.log("\n**********************");

  client
  .search({
    index: "deepfashion-instore",
    body: {

      "query": {
        "bool": {
          "should":elasticQuery
        }
      }
    
    }
       
  })
  .then((response) => {
    console.log(response);
    if(response.hits.total.value==0){
        return res.send("Not available");
    }
    else{
    let final=response.hits.hits.map(x=>x._source.image_url);
    return res.send(final);
  }
  })
  .catch((err) => {
    console.log(err);
    return res.send("error: " + err);
  });
});


module.exports = featureDataroute;
