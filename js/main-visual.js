async function getVisualResponse() {
  let userText = $("#visual-user-input").val();
  $("#visual-chat-output").append('<div class="chat-user"><div class="message user-message">'+userText+'</div></div>');
  $("#visual-user-input").val("");
  var responseResults = classification_rules(userText);
  var responseTextList = responseResults[0];
  var responseVisualSpecifics = responseResults[1];
  // append function with delay
  async function showResponses() {
    await sleep(1000);
    for (var i=0; i<responseTextList.length; i++){
      $("#visual-chat-output").append('<div class="chat-bot"><div class="message bot-message">'+responseTextList[i]+'</div></div>');
    }
    appendVisualMessage(responseVisualSpecifics);
  }
  await showResponses();
  visualExploreGoogleFormMessages[userText] = responseTextList;
  // var intents = intent_classifier(userText);
  if($(".container").length > 0){$('.container').animate({ scrollTop: $('.container')[0].scrollHeight}, 500);}
  if($(".chatbot-right-explore-2").length > 0){$('.chatbot-right').animate({ scrollTop: $('.chatbot-right-explore-2')[0].scrollHeight}, 500);}
}
$("#visual-user-input-form").on("submit", function(e) {
//if enter key is pressed
  e.preventDefault();
  getVisualResponse();
});
$(".visual-user-input-send").on("click", function(e) {
//if enter key is pressed
  e.preventDefault();
  getVisualResponse();
});
var appendVisualMessage = function(responseVisualSpecifics){
  if (responseVisualSpecifics["chartType"] == "shot"){
    var thisTeam = responseVisualSpecifics["chartVariable"][0]["team"];
    var thisPlayer = responseVisualSpecifics["chartVariable"][0]["player"];
    var thisClassName = "shot-chart-"+Math.floor(Math.random() * 1000000).toString();
    $("#visual-chat-output").append('<div class="chat-bot"><div class="message bot-message">'+thisPlayer+' shot chart in this game:</div></div>');
    $("#visual-chat-output").append('<div class="chat-bot"><div class="message bot-message"><div class= "shot-chart  '+thisClassName+'"></div></div></div>');
    drawVisualShotChart("."+thisClassName, shotData, awayColor, homeColor, player_full_name_to_class_name(thisPlayer));
  } else if (responseVisualSpecifics["chartType"] == "flow"){
    var thisClassName = "flow-chart-"+Math.floor(Math.random() * 1000000).toString();
    $("#visual-chat-output").append('<div class="chat-bot"><div class="message bot-message">Here is the flow chart of the game:</div></div>');
    $("#visual-chat-output").append('<div class="chat-bot"><div class="message bot-message"><div class="flow-chart '+thisClassName+'"></div></div></div>');
    drawVisualFlowChart("."+thisClassName, flowData, awayColor, homeColor, teamRecordData["homeTeam"]["name"],teamRecordData["awayTeam"]["name"]);
  } else if (responseVisualSpecifics["chartType"] == "player_season_bar"){
    var thisClassName = "player-season-bar-chart-"+Math.floor(Math.random() * 1000000).toString();
    var thisPlayerName = responseVisualSpecifics["chartVariable"][0]["player"];
    var thisTeam = responseVisualSpecifics["chartVariable"][0]["team"];
    var thisColor = thisTeam == "HOME" ? homeColor : awayColor;
    var thisStatsType = responseVisualSpecifics["chartVariable"][0]["statsType"];
    var thisSeasonData = responseVisualSpecifics["chartVariable"][0]["seasonData"];
    $("#visual-chat-output").append("<div class='chat-bot'><div class='message bot-message'>Here is the bar chart of " + thisPlayerName + "'s " + stats_abbrev_translate_dict[thisStatsType] +" this season:</div></div>");
    $("#visual-chat-output").append('<div class="chat-bot"><div class="message bot-message"><div class="bar-chart '+thisClassName+'"></div></div></div>');
    drawVisualPlayerSeasonBarChart("."+thisClassName, thisSeasonData, thisColor);
  } else if (responseVisualSpecifics["chartType"] == "team_season_bar"){
    for (var i=0; i<responseVisualSpecifics["chartVariable"].length; i++){
      var thisClassName = "team-season-bar-chart-"+Math.floor(Math.random() * 1000000).toString();
      var thisTeam = responseVisualSpecifics["chartVariable"][i]["team"];
      var thisColor = thisTeam == "HOME" ? homeColor : awayColor;
      var thisSeasonData = responseVisualSpecifics["chartVariable"][i]["data"];
      var thisStatsType = responseVisualSpecifics["chartVariable"][i]["statsType"];
      $("#visual-chat-output").append("<div class='chat-bot'><div class='message bot-message'>Here is the bar chart of " + team_name_match_dict[thisTeam] + "'s " + stats_abbrev_translate_dict[thisStatsType] +" this season:</div></div>");
      $("#visual-chat-output").append('<div class="chat-bot"><div class="message bot-message"><div class="bar-chart '+thisClassName+'"></div></div></div>');
      drawVisualTeamSeasonBarChart("."+thisClassName, thisSeasonData, thisColor);
    }
  } else if (responseVisualSpecifics["chartType"] == "team_record_bar"){
    for (var i=0; i<responseVisualSpecifics["chartVariable"].length; i++){
      var thisClassName = "team-record-bar-chart-"+Math.floor(Math.random() * 1000000).toString();
      var thisTeam = responseVisualSpecifics["chartVariable"][i]["team"];
      var thisColor = thisTeam == "HOME" ? homeColor : awayColor;
      var thisTeamRecord = thisTeam == "HOME" ? homeTeamRecord : awayTeamRecord;
      var thisInnerRecord = thisTeam == "HOME" ? homeTeamInnerRecord : awayTeamInnerRecord;
      var thisSeasonData = responseVisualSpecifics["chartVariable"][i]["data"];
      $("#visual-chat-output").append("<div class='chat-bot'><div class='message bot-message'>Here is the bar chart of " + team_name_match_dict[thisTeam] + "'s season record so far:</div></div>");
      $("#visual-chat-output").append('<div class="chat-bot"><div class="message bot-message"><div class="bar-chart '+thisClassName+'"></div></div></div>');
      drawVisualTeamRecordBarChart("."+thisClassName, thisSeasonData, thisColor, team_name_match_dict[thisTeam],gameYear, thisTeamRecord,thisInnerRecord);
    }
  }  else if (responseVisualSpecifics["chartType"] == "player_stats_game_bar"){
    for (var i=0; i<responseVisualSpecifics["chartVariable"].length; i++){
      var thisClassName = "players-stats-game-bar-chart-"+Math.floor(Math.random() * 1000000).toString();
      var thisTeam = responseVisualSpecifics["chartVariable"][i]["team"];
      var thisColor = thisTeam == "HOME" ? homeColor : awayColor;
      var thisStatsType = responseVisualSpecifics["chartVariable"][i]["statsType"];
      var thisGameData = responseVisualSpecifics["chartVariable"][i]["data"];
      console.log(thisGameData)
      $("#visual-chat-output").append("<div class='chat-bot'><div class='message bot-message'>Here is the bar chart of all " + team_name_match_dict[thisTeam] + " players' " + stats_abbrev_translate_dict[thisStatsType] +" bar chart:</div></div>");
      $("#visual-chat-output").append('<div class="chat-bot"><div class="message bot-message"><div class="bar-chart '+thisClassName+'"></div></div></div>');
      drawVisualPlayersGameBarChart("."+thisClassName, thisGameData, thisColor);
    }
  }
}

async function getVisualTutorialResponse() {
  let userText = $("#visual-tutorial-user-input").val();
  $("#visual-tutorial-chat-output").append('<div class="chat-user"><div class="message user-message">'+userText+'</div></div>');
  $("#visual-tutorial-user-input").val("");
  var responseResults = classification_rules(userText);
  var responseTextList = responseResults[0];
  var responseVisualSpecifics = responseResults[1];
  // append function with delay

  async function showResponses() {
    await sleep(1000);
    for (var i=0; i<responseTextList.length; i++){
      $("#visual-tutorial-chat-output").append('<div class="chat-bot"><div class="message bot-message">'+responseTextList[i]+'</div></div>');
    }
    appendVisualTutorialMessage(responseVisualSpecifics);
  }
  await showResponses();
  visualTutorailGoogleFormMessages[userText] = responseTextList;
  // var intents = intent_classifier(userText);
  if($(".container").length > 0){$('.container').animate({ scrollTop: $('.container')[0].scrollHeight}, 500);}
  if($(".chatbot-right-tutorial-2").length > 0){$('.chatbot-right').animate({ scrollTop: $('.chatbot-right-tutorial-2')[0].scrollHeight}, 500);}
}
$("#visual-tutorial-user-input-form").on("submit", function(e) {
//if enter key is pressed
  e.preventDefault();
  getVisualTutorialResponse();
});
$(".visual-tutorial-user-input-send").on("click", function(e) {
//if enter key is pressed
  e.preventDefault();
  getVisualTutorialResponse();
});
var appendVisualTutorialMessage = function(responseVisualSpecifics){
  if (responseVisualSpecifics["chartType"] == "shot"){
    var thisTeam = responseVisualSpecifics["chartVariable"][0]["team"];
    var thisPlayer = responseVisualSpecifics["chartVariable"][0]["player"];
    var thisClassName = "shot-chart-"+Math.floor(Math.random() * 1000000).toString();
    $("#visual-tutorial-chat-output").append('<div class="chat-bot"><div class="message bot-message">'+thisPlayer+' shot chart in this game:</div></div>');
    $("#visual-tutorial-chat-output").append('<div class="chat-bot"><div class="message bot-message"><div class= "shot-chart  '+thisClassName+'"></div></div></div>');
    drawVisualShotChart("."+thisClassName, shotData, awayColor, homeColor, player_full_name_to_class_name(thisPlayer));
  } else if (responseVisualSpecifics["chartType"] == "flow"){
    var thisClassName = "flow-chart-"+Math.floor(Math.random() * 1000000).toString();
    $("#visual-tutorial-chat-output").append('<div class="chat-bot"><div class="message bot-message">Here is the flow chart of the game:</div></div>');
    $("#visual-tutorial-chat-output").append('<div class="chat-bot"><div class="message bot-message"><div class="flow-chart '+thisClassName+'"></div></div></div>');
    drawVisualFlowChart("."+thisClassName, flowData, awayColor, homeColor, teamRecordData["homeTeam"]["name"],teamRecordData["awayTeam"]["name"]);
  } else if (responseVisualSpecifics["chartType"] == "player_season_bar"){
    var thisClassName = "player-season-bar-chart-"+Math.floor(Math.random() * 1000000).toString();
    var thisPlayerName = responseVisualSpecifics["chartVariable"][0]["player"];
    var thisTeam = responseVisualSpecifics["chartVariable"][0]["team"];
    var thisColor = thisTeam == "HOME" ? homeColor : awayColor;
    var thisStatsType = responseVisualSpecifics["chartVariable"][0]["statsType"];
    var thisSeasonData = responseVisualSpecifics["chartVariable"][0]["seasonData"];
    $("#visual-tutorial-chat-output").append("<div class='chat-bot'><div class='message bot-message'>Here is the bar chart of " + thisPlayerName + "'s " + stats_abbrev_translate_dict[thisStatsType] +" this season:</div></div>");
    $("#visual-tutorial-chat-output").append('<div class="chat-bot"><div class="message bot-message"><div class="bar-chart '+thisClassName+'"></div></div></div>');
    drawVisualPlayerSeasonBarChart("."+thisClassName, thisSeasonData, thisColor);
  } else if (responseVisualSpecifics["chartType"] == "team_season_bar"){
    for (var i=0; i<responseVisualSpecifics["chartVariable"].length; i++){
      var thisClassName = "team-season-bar-chart-"+Math.floor(Math.random() * 1000000).toString();
      var thisTeam = responseVisualSpecifics["chartVariable"][i]["team"];
      var thisColor = thisTeam == "HOME" ? homeColor : awayColor;
      var thisSeasonData = responseVisualSpecifics["chartVariable"][i]["data"];
      var thisStatsType = responseVisualSpecifics["chartVariable"][i]["statsType"];
      $("#visual-tutorial-chat-output").append("<div class='chat-bot'><div class='message bot-message'>Here is the bar chart of " + team_name_match_dict[thisTeam] + "'s " + stats_abbrev_translate_dict[thisStatsType] +" this season:</div></div>");
      $("#visual-tutorial-chat-output").append('<div class="chat-bot"><div class="message bot-message"><div class="bar-chart '+thisClassName+'"></div></div></div>');
      drawVisualTeamSeasonBarChart("."+thisClassName, thisSeasonData, thisColor);
    }
  } else if (responseVisualSpecifics["chartType"] == "team_record_bar"){
    for (var i=0; i<responseVisualSpecifics["chartVariable"].length; i++){
      var thisClassName = "team-record-bar-chart-"+Math.floor(Math.random() * 1000000).toString();
      var thisTeam = responseVisualSpecifics["chartVariable"][i]["team"];
      var thisColor = thisTeam == "HOME" ? homeColor : awayColor;
      var thisTeamRecord = thisTeam == "HOME" ? homeTeamRecord : awayTeamRecord;
      var thisInnerRecord = thisTeam == "HOME" ? homeTeamInnerRecord : awayTeamInnerRecord;
      var thisSeasonData = responseVisualSpecifics["chartVariable"][i]["data"];
      $("#visual-tutorial-chat-output").append("<div class='chat-bot'><div class='message bot-message'>Here is the bar chart of " + team_name_match_dict[thisTeam] + "'s season record so far:</div></div>");
      $("#visual-tutorial-chat-output").append('<div class="chat-bot"><div class="message bot-message"><div class="bar-chart '+thisClassName+'"></div></div></div>');
      drawVisualTeamRecordBarChart("."+thisClassName, thisSeasonData, thisColor, team_name_match_dict[thisTeam],gameYear,thisTeamRecord,thisInnerRecord);
    }
  }  else if (responseVisualSpecifics["chartType"] == "player_stats_game_bar"){
    for (var i=0; i<responseVisualSpecifics["chartVariable"].length; i++){
      var thisClassName = "players-stats-game-bar-chart-"+Math.floor(Math.random() * 1000000).toString();
      var thisTeam = responseVisualSpecifics["chartVariable"][i]["team"];
      var thisColor = thisTeam == "HOME" ? homeColor : awayColor;
      var thisStatsType = responseVisualSpecifics["chartVariable"][i]["statsType"];
      var thisGameData = responseVisualSpecifics["chartVariable"][i]["data"];
      console.log(thisGameData)
      $("#visual-tutorial-chat-output").append("<div class='chat-bot'><div class='message bot-message'>Here is the bar chart of all " + team_name_match_dict[thisTeam] + " players' " + stats_abbrev_translate_dict[thisStatsType] +" bar chart:</div></div>");
      $("#visual-tutorial-chat-output").append('<div class="chat-bot"><div class="message bot-message"><div class="bar-chart '+thisClassName+'"></div></div></div>');
      drawVisualPlayersGameBarChart("."+thisClassName, thisGameData, thisColor);
    }
  }
}


async function getVisualTaskResponse() {
  let userText = $("#visual-task-user-input").val();
  $("#visual-task-chat-output").append('<div class="chat-user"><div class="message user-message">'+userText+'</div></div>');
  $("#visual-task-user-input").val("");
  var responseResults = classification_rules(userText);
  var responseTextList = responseResults[0];
  var responseVisualSpecifics = responseResults[1];
  // append function with delay
  async function showResponses() {
    await sleep(1000);
    for (var i=0; i<responseTextList.length; i++){
      $("#visual-task-chat-output").append('<div class="chat-bot"><div class="message bot-message">'+responseTextList[i]+'</div></div>');
    }
    appendVisualTaskMessage(responseVisualSpecifics);
  }
  await showResponses();
  visualTaskGoogleFormMessages[userText] = responseTextList;
  // var intents = intent_classifier(userText);
  if($(".container").length > 0){$('.container').animate({ scrollTop: $('.container')[0].scrollHeight}, 500);}
  if($(".chatbot-right-task-2").length > 0){$('.chatbot-right').animate({ scrollTop: $('.chatbot-right-task-2')[0].scrollHeight}, 500);}
}
$("#visual-task-user-input-form").on("submit", function(e) {
//if enter key is pressed
  e.preventDefault();
  getVisualTaskResponse();
});
$(".visual-task-user-input-send").on("click", function(e) {
//if enter key is pressed
  e.preventDefault();
  getVisualTaskResponse();
});
var appendVisualTaskMessage = function(responseVisualSpecifics){
  if (responseVisualSpecifics["chartType"] == "shot"){
    var thisTeam = responseVisualSpecifics["chartVariable"][0]["team"];
    var thisPlayer = responseVisualSpecifics["chartVariable"][0]["player"];
    var thisClassName = "shot-chart-"+Math.floor(Math.random() * 1000000).toString();
    $("#visual-task-chat-output").append('<div class="chat-bot"><div class="message bot-message">'+thisPlayer+' shot chart in this game:</div></div>');
    $("#visual-task-chat-output").append('<div class="chat-bot"><div class="message bot-message"><div class= "shot-chart  '+thisClassName+'"></div></div></div>');
    drawVisualShotChart("."+thisClassName, shotData, awayColor, homeColor, player_full_name_to_class_name(thisPlayer));
  } else if (responseVisualSpecifics["chartType"] == "flow"){
    var thisClassName = "flow-chart-"+Math.floor(Math.random() * 1000000).toString();
    $("#visual-task-chat-output").append('<div class="chat-bot"><div class="message bot-message">Here is the flow chart of the game:</div></div>');
    $("#visual-task-chat-output").append('<div class="chat-bot"><div class="message bot-message"><div class="flow-chart '+thisClassName+'"></div></div></div>');
    drawVisualFlowChart("."+thisClassName, flowData, awayColor, homeColor, teamRecordData["homeTeam"]["name"],teamRecordData["awayTeam"]["name"]);
  } else if (responseVisualSpecifics["chartType"] == "player_season_bar"){
    var thisClassName = "player-season-bar-chart-"+Math.floor(Math.random() * 1000000).toString();
    var thisPlayerName = responseVisualSpecifics["chartVariable"][0]["player"];
    var thisTeam = responseVisualSpecifics["chartVariable"][0]["team"];
    var thisColor = thisTeam == "HOME" ? homeColor : awayColor;
    var thisStatsType = responseVisualSpecifics["chartVariable"][0]["statsType"];
    var thisSeasonData = responseVisualSpecifics["chartVariable"][0]["seasonData"];
    $("#visual-task-chat-output").append("<div class='chat-bot'><div class='message bot-message'>Here is the bar chart of " + thisPlayerName + "'s " + stats_abbrev_translate_dict[thisStatsType] +" this season:</div></div>");
    $("#visual-task-chat-output").append('<div class="chat-bot"><div class="message bot-message"><div class="bar-chart '+thisClassName+'"></div></div></div>');
    drawVisualPlayerSeasonBarChart("."+thisClassName, thisSeasonData, thisColor);
  } else if (responseVisualSpecifics["chartType"] == "team_season_bar"){
    for (var i=0; i<responseVisualSpecifics["chartVariable"].length; i++){
      var thisClassName = "team-season-bar-chart-"+Math.floor(Math.random() * 1000000).toString();
      var thisTeam = responseVisualSpecifics["chartVariable"][i]["team"];
      var thisColor = thisTeam == "HOME" ? homeColor : awayColor;
      var thisSeasonData = responseVisualSpecifics["chartVariable"][i]["data"];
      var thisStatsType = responseVisualSpecifics["chartVariable"][i]["statsType"];
      $("#visual-task-chat-output").append("<div class='chat-bot'><div class='message bot-message'>Here is the bar chart of " + team_name_match_dict[thisTeam] + "'s " + stats_abbrev_translate_dict[thisStatsType] +" this season:</div></div>");
      $("#visual-task-chat-output").append('<div class="chat-bot"><div class="message bot-message"><div class="bar-chart '+thisClassName+'"></div></div></div>');
      drawVisualTeamSeasonBarChart("."+thisClassName, thisSeasonData, thisColor);
    }
  } else if (responseVisualSpecifics["chartType"] == "team_record_bar"){
    for (var i=0; i<responseVisualSpecifics["chartVariable"].length; i++){
      var thisClassName = "team-record-bar-chart-"+Math.floor(Math.random() * 1000000).toString();
      var thisTeam = responseVisualSpecifics["chartVariable"][i]["team"];
      var thisColor = thisTeam == "HOME" ? homeColor : awayColor;
      var thisTeamRecord = thisTeam == "HOME" ? homeTeamRecord : awayTeamRecord;
      var thisInnerRecord = thisTeam == "HOME" ? homeTeamInnerRecord : awayTeamInnerRecord;
      var thisSeasonData = responseVisualSpecifics["chartVariable"][i]["data"];
      $("#visual-task-chat-output").append("<div class='chat-bot'><div class='message bot-message'>Here is the bar chart of " + team_name_match_dict[thisTeam] + "'s season record so far:</div></div>");
      $("#visual-task-chat-output").append('<div class="chat-bot"><div class="message bot-message"><div class="bar-chart '+thisClassName+'"></div></div></div>');
      drawVisualTeamRecordBarChart("."+thisClassName, thisSeasonData, thisColor, team_name_match_dict[thisTeam],gameYear,thisTeamRecord,thisInnerRecord);
    }
  }  else if (responseVisualSpecifics["chartType"] == "player_stats_game_bar"){
    for (var i=0; i<responseVisualSpecifics["chartVariable"].length; i++){
      var thisClassName = "players-stats-game-bar-chart-"+Math.floor(Math.random() * 1000000).toString();
      var thisTeam = responseVisualSpecifics["chartVariable"][i]["team"];
      var thisColor = thisTeam == "HOME" ? homeColor : awayColor;
      var thisStatsType = responseVisualSpecifics["chartVariable"][i]["statsType"];
      var thisGameData = responseVisualSpecifics["chartVariable"][i]["data"];
      console.log(thisGameData)
      $("#visual-task-chat-output").append("<div class='chat-bot'><div class='message bot-message'>Here is the bar chart of all " + team_name_match_dict[thisTeam] + " players' " + stats_abbrev_translate_dict[thisStatsType] +" bar chart:</div></div>");
      $("#visual-task-chat-output").append('<div class="chat-bot"><div class="message bot-message"><div class="bar-chart '+thisClassName+'"></div></div></div>');
      drawVisualPlayersGameBarChart("."+thisClassName, thisGameData, thisColor);
    }
  }
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
