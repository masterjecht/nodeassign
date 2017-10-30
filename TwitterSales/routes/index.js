// setting modules
var express = require('express');
var Twitter = require('twitter');
var fs = require('fs');
var natural = require('natural');



var router = express.Router();

// twitter data
var TweetCount = 0;
var TweetID = [];
var TweetText = [];
var TweetHashtag = [];
var TweetLastText = [];
var TweetSimilar = [];


// this post occurs when a user enters some next text
router.post('/', function(req, res, next) {
    // global varibles for the functions loops
    results = "" + req.body.search.split(" ").join("+");
        console.log(results);
    var TweetName = results;
// local functions for callbacks

  var tweets = "none"
  tweets = GetTweets(TweetName, render);

  function render(data){

            if (data.statuses.length !== 0){
         TweetCount ++;
         TweetID[TweetCount] = data.statuses[0].id;
         TweetText[TweetCount] = data.statuses[0].text;
         TweetHashtag[TweetCount] = TweetName;
         TweetLastText[TweetCount] = "";
             console.log(TweetHashtag[1] + TweetText[1] + TweetID[1]);
         res.render('index',{tags:TweetHashtag, texts:TweetText});
       }
  }

});

// this is the check posts
router.post('/check', function(req, res, next) {
// this is where the program will check fro any updates
var TweetList = [];
var i = 1;
var TweetTest = 0;
StartWaterfall();


  function StartWaterfall(){
  GetTweets(TweetHashtag[i],checkdata);
}

      function checkdata(data) {
        // check if there is data to be compared to
        if (data.statuses.length !== 0){
TweetTest = data.statuses[0].id
        // check tweets

        // add all tweet text to list
        for (var k = 0; k < data.statuses.length; k ++){

            TweetList.push(data.statuses[k].text);
            console.log(data.statuses[k].text + " ADDED");
        }
        console.log(TweetList.length);
        if (TweetID[i] === TweetTest){
        } else {
                // if there is a change we will update the data
                TweetID[i] = TweetTest;
                TweetLastText[i] = TweetText[i];
                TweetText[i] = data.statuses[0].text;
        }
                                }
        if (i != TweetCount){
          i ++
          console.log('relooping');
          StartWaterfall();
        } else {
//          fs.writeFile("C:/Users/Daniel/Desktop/Cloud Computing/test.txt", "Hey there! adding", function(err) {
//    if(err) {
  //      return console.log(err);
  //  } else {
//          console.log("The file was saved!");
  //  }


//});
        // this checks how similar strings are
        Similarity();
        SimlarityWithSelf(data);
        res.render('index',{tags:TweetHashtag, texts:TweetText});
        }
      }

      function SimlarityWithSelf(data){
        var count = 0;
        var total = 0;

        for (var k = 1; k < data.statuses.length; k ++){
          for (var u = 0; u < TweetList.length; u ++){
        var similarRatio = natural.JaroWinklerDistance(data.statuses[k].text,TweetList[u]);
      //  console.log("the ration between " + data.statuses[k].text + "And "  + TweetList[u] + "is: " + similarRatio);
      //    total =total + similarRatio;
        }

      if (k === data.statuses.length - 1){
        total = similarRatio / total;
      //  console.log("the ratio from the last " + data.statuses.length + "tweets is : " + total);
      }
        }
      }

});



// functions

function GetTweets(hashtag, callback) {

    var client = new Twitter({
    consumer_key: 'mFaxC8RtkhFi5TOdbuRbjMOMI',
    consumer_secret: 'sBiIu8PqCZbVjSzDqYjayloP5tP7XISR1634yFD9pA9NUyLAg3',
    access_token_key: '916933942971834368-76xM43oOgnNTMwz1wVctpf8jJ0tcUIt',
    access_token_secret: 'BEybjQuYFRRGniJveeTpdJAouAKNKWfFVvLlLJ614hOf0'
  });

  var client2 = new Twitter({
  consumer_key: 'ff93U7NRMXb8xBlYJa1MsFEtJ',
  consumer_secret: 'ziPu8McA4J01pUM9y0C96WXhjkmsfKQzHp49UMzjrbwzSqji7i',
  access_token_key: '923113515052761088-Y9d8LEkptDeBdPdanXGGxgY7hDtS8IO',
  access_token_secret: 'qpe4hQ2m4FNCaJuouy4tmXgJZRZboPmb2gDsXoJLYHIBg'
});

var client3 = new Twitter({
consumer_key: 'dUqURxMDZjOBeM2gPlqndeHnM',
consumer_secret: 'HhTVX6e5397ShwNN8Ek7wksu1s0nFjGPhNWbT1R4EfTApiokwR',
access_token_key: '2365443590-P6ES9JOcV8pn7QVw8S7rez1KBSHa5oxwypAfvHN',
access_token_secret: '0ibm4ZEGkAl1MGEsylP4WoKgDQFwTklOCYArurGQLF2R4'
});

var client4 = new Twitter({
consumer_key: '	hsTvlRPZZBB4TXCWh49pJ1l2E',
consumer_secret: 'jYYFDZWzKME9Nsg9BA1mjIHKzmIkTgkAaLuksjIlrN1T6PhNWW',
access_token_key: '925139252228136960-QPayQc6TuDxQnow4aNeyzwUNd3i6dIi',
access_token_secret: '3GaaJDBQDOZsRg8f1xsJ5AewL96jQCG5RwLfzpp6oRh1W'
});

var client5 = new Twitter({
consumer_key: '	RIqQtGUpXwDkklOizk6UirdKs',
consumer_secret: '0GRSTsRkA4k5wfKnGk2GonzmCBKGoAfxFpFlkdEtBcW8LQkubl',
access_token_key: '925140284513468416-z9q0XLi6YZXFKrH2RKgN64YIySWlf9f',
access_token_secret: 'h53KCgbTTwULJbRxt47vlf8atI8piod71pbMX4lwidjlt'
});

// check if there is a tweetid
    var params = {q:hashtag, count: 100, lang: 'en'};

  client.get('search/tweets', params, function(error, tweets, response) {
    if (!error) {
                          callback(tweets);
      } else {
                      console.log("entering tweet account 2");
        client2.get('search/tweets', params, function(error, tweets, response) {
          if (!error) {
                                callback(tweets);
            } else {
              console.log("entering tweet account 3");
              client3.get('search/tweets', params, function(error, tweets, response) {
                if (!error) {
                                      callback(tweets);
                  } else {
                                  console.log("entering tweet account 4");
                    client4.get('search/tweets', params, function(error, tweets, response) {
                      if (!error) {
                                            callback(tweets);
                        } else {
                                        console.log("entering tweet account 5");
                          client5.get('search/tweets', params, function(error, tweets, response) {
                            if (!error) {
                                                  callback(tweets);
                              } else {

                              }
                        }
                  }

              });
            }

        });
      }

  });
}

function Test(){
  return "it worked";
}

// this function uses natural to check how similar two sequencal tweets are also checks against eveyr other tweet in the list

function Similarity(){
  var u = 1;
  for (u = 1; u < TweetCount+1; u ++){
// check if there is previous text
console.log("last text is: " + TweetLastText[u]);
if (TweetLastText[u] !== ""){
TweetSimilar[u] = natural.JaroWinklerDistance(TweetLastText[u],TweetText[u]);
console.log("the words similarity is: " + TweetSimilar[u]);
                            }
// check tweet against all others
var o = 1;
  for (o = 1; o < TweetCount+1; o ++){
if (TweetText[o] !== TweetText[u]){
  console.log(natural.JaroWinklerDistance(TweetText[u],TweetText[o]));
}
  }



                                  }
}



module.exports = router;
