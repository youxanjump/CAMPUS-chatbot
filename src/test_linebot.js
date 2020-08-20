// 引用LUIS SDK
const msRest = require("@azure/ms-rest-js");
const LUIS_Authoring = require("@azure/cognitiveservices-luis-authoring");
const LUIS_Prediction = require("@azure/cognitiveservices-luis-runtime");

// 引用linebot SDK
var linebot = require('linebot');

// 用於辨識Line Channel的資訊
var bot = linebot({
  channelId: '1654797428',
  channelSecret: '59fadb2dcb6c66e338ad7273806d5a10',
  channelAccessToken: 'dIiLIe5t6UO+BZo5VzGX951whXwdEMtXASzl6x8dP0spZG4Q8M1mbPMq/jqfdGz13X7p3bVzYbWBnTYhJenl8gSAC63W3QB9H0YdnGmb6aqZkgn5G5F34BTZHsixn6bWi5YXG1S52oQ4x1raGU2XrAdB04t89/1O/w1cDnyilFU='
});

// 當有人傳送訊息給Bot時
bot.on('message', function (event) {

  var requestPromise = require('request-promise');
  var queryString = require('querystring');
  var replyMsg;

  // Analyze a string utterance.
  getPrediction = async () => {

      //////////
      // Values to modify.

      // YOUR-APP-ID: The App ID GUID found on the www.luis.ai Application Settings page.
      const LUIS_appId = "9969903b-836b-47b6-8407-edf3b54e9c71";

      // YOUR-PREDICTION-KEY: Your LUIS authoring key, 32 character value.
      const LUIS_predictionKey = "e1a4a2cc5f1b40fbbb86eccedcca1c6f";

      // YOUR-PREDICTION-ENDPOINT: Replace this with your authoring key endpoint.
      // For example, "https://westus.api.cognitive.microsoft.com/"
      const LUIS_endpoint = "https://japaneast.api.cognitive.microsoft.com/";

      // The utterance you want to use.
      const utterance = event.message.text;
      //////////

      // Create query string
      const queryParams = {
          "show-all-intents": true,
          "verbose":  true,
          "query": utterance,
          "subscription-key": LUIS_predictionKey
      }

      // Create the URI for the REST call.
      const URI = `${LUIS_endpoint}luis/prediction/v3.0/apps/${LUIS_appId}/slots/production/predict?${queryString.stringify(queryParams)}`

      // Send the REST call.
      const response = await requestPromise(URI);

      // Display the response from the REST call.
      console.log(response);

      // Get the topIntent
      replyMsg = JSON.parse(response).prediction.topIntent;

      // 使用event.reply(要回傳的訊息)方法可將訊息回傳給使用者
      event.reply(replyMsg).then(function (data) {
        // 當訊息成功回傳後的處理
        console.log("success");
      }).catch(function (error) {
        // 當訊息回傳失敗後的處理
        console.log("fail");
      });

  }

  // Pass an utterance to the sample LUIS app
  getPrediction().then(()=>console.log("done")).catch((err)=>console.log(err));

});

// Bot所監聽的webhook路徑與port
bot.listen('/linewebhook', 3000, function () {
    console.log('[BOT已準備就緒]');
});
