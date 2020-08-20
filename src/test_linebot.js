// 引用LUIS SDK
const msRest = require("@azure/ms-rest-js");
const LUIS_Authoring = require("@azure/cognitiveservices-luis-authoring");
const LUIS_Prediction = require("@azure/cognitiveservices-luis-runtime");

// 引用linebot SDK
var linebot = require('linebot');

// 用於辨識Line Channel的資訊
var bot = linebot({
  channelId: '',
  channelSecret: '',
  channelAccessToken: ''
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
      const LUIS_appId = "";

      // YOUR-PREDICTION-KEY: Your LUIS authoring key, 32 character value.
      const LUIS_predictionKey = "";

      // YOUR-PREDICTION-ENDPOINT: Replace this with your authoring key endpoint.
      // For example, "https://westus.api.cognitive.microsoft.com/"
      const LUIS_endpoint = "";

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
