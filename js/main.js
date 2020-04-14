async function getTextResponse() {
  let userText = $("#text-user-input").val();
  $("#text-chat-output").append('<div class="chat-user"><div class="message user-message">'+userText+'</div></div>');
  $("#text-user-input").val("");
  var responseResults = classification_rules(userText);
  var responseTextList = responseResults[0];
  var responseVisualSpecifics = responseResults[1];
  // append function with delay
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async function showResponses() {
    await sleep(800);
    for (var i=0; i<responseTextList.length; i++){
      $("#text-chat-output").append('<div class="chat-bot"><div class="message bot-message">'+responseTextList[i]+'</div></div>');
    }
  }
  await showResponses();
  textExploreGoogleFormMessages[userText] = responseTextList;
  // var intents = intent_classifier(userText);
  if($(".container").length > 0){$('.container').animate({ scrollTop: $('.container')[0].scrollHeight}, 800);}
  if($(".chatbot-right-explore-1").length > 0){$('.chatbot-right').animate({ scrollTop: $('.chatbot-right-explore-1')[0].scrollHeight}, 800);}

}
$("#text-user-input-form").on("submit", function(e) {
//if enter key is pressed
  e.preventDefault();
  getTextResponse();
});
$(".text-user-input-send").on("click", function(e) {
//if enter key is pressed
  e.preventDefault();
  getTextResponse();
});
// tutorial chatbot
async function getTextTutorialResponse() {
  let userText = $("#text-tutorial-user-input").val();
  $("#text-tutorial-chat-output").append('<div class="chat-user"><div class="message user-message">'+userText+'</div></div>');
  $("#text-tutorial-user-input").val("");
  var responseResults = classification_rules(userText);
  var responseTextList = responseResults[0];
  var responseVisualSpecifics = responseResults[1];
  // append function with delay
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async function showResponses() {
    await sleep(800);
    for (var i=0; i<responseTextList.length; i++){
      $("#text-tutorial-chat-output").append('<div class="chat-bot"><div class="message bot-message">'+responseTextList[i]+'</div></div>');
    }
  }
  await showResponses();
  textTutorailGoogleFormMessages[userText] = responseTextList;
  // var intents = intent_classifier(userText);
  if($(".container").length > 0){$('.container').animate({ scrollTop: $('.container')[0].scrollHeight}, 800);}
  if($(".chatbot-right-tutorial-1").length > 0){$('.chatbot-right').animate({ scrollTop: $('.chatbot-right-tutorial-1')[0].scrollHeight}, 800);}

}
$("#text-tutorial-user-input-form").on("submit", function(e) {
//if enter key is pressed
  e.preventDefault();
  getTextTutorialResponse();
});
$(".text-tutorial-user-input-send").on("click", function(e) {
//if enter key is pressed
  e.preventDefault();
  getTextTutorialResponse();
});
// task chatbot
async function getTextTaskResponse() {
  let userText = $("#text-task-user-input").val();
  $("#text-task-chat-output").append('<div class="chat-user"><div class="message user-message">'+userText+'</div></div>');
  $("#text-task-user-input").val("");
  var responseResults = classification_rules(userText);
  var responseTextList = responseResults[0];
  var responseVisualSpecifics = responseResults[1];
  // append function with delay
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async function showResponses() {
    await sleep(800);
    for (var i=0; i<responseTextList.length; i++){
      $("#text-task-chat-output").append('<div class="chat-bot"><div class="message bot-message">'+responseTextList[i]+'</div></div>');
    }
  }
  await showResponses();
  textTaskGoogleFormMessages[userText] = responseTextList;
  // var intents = intent_classifier(userText);
  if($(".container").length > 0){$('.container').animate({ scrollTop: $('.container')[0].scrollHeight}, 800);}
  if($(".chatbot-right-task-1").length > 0){$('.chatbot-right').animate({ scrollTop: $('.chatbot-right-task-1')[0].scrollHeight}, 800);}

}
$("#text-task-user-input-form").on("submit", function(e) {
//if enter key is pressed
  e.preventDefault();
  getTextTaskResponse();
});
$(".text-task-user-input-send").on("click", function(e) {
//if enter key is pressed
  e.preventDefault();
  getTextTaskResponse();
});
