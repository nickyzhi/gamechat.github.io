async function getInterVisualResponse() {
  let userText = $("#intervisual-user-input").val();
  $("#intervisual-chat-output").append('<div class="chat-user"><div class="message user-message">'+userText+'</div></div>');
  $("#intervisual-user-input").val("");
  var responseResults = classification_rules(userText);
  var responseTextList = responseResults[0];
  var responseVisualSpecifics = responseResults[1];
  // append function with delay
  async function showResponses() {
    await sleep(1000);
    for (var i=0; i<responseTextList.length; i++){
      $("#intervisual-chat-output").append('<div class="chat-bot"><div class="message bot-message">'+responseTextList[i]+'</div></div>');
    }
    appendInterVisualMessage(responseVisualSpecifics);
  }
  await showResponses();
  // var intents = intent_classifier(userText);
  $('.container').animate({ scrollTop: $('.container')[0].scrollHeight}, 500);

}
$("#intervisual-user-input-form").on("submit", function(e) {
//if enter key is pressed
  e.preventDefault();
  getInterVisualResponse();
});
$(".intervisual-user-input-send").on("click", function(e) {
//if enter key is pressed
  e.preventDefault();
  getInterVisualResponse();
});
var appendInterVisualMessage = function(responseVisualSpecifics){
  if (responseVisualSpecifics["chartType"] == "shot"){
    var thisTeam = responseVisualSpecifics["chartVariable"][0]["team"];
    var thisPlayer = responseVisualSpecifics["chartVariable"][0]["player"];
    var thisNumber = Math.floor(Math.random() * 1000000).toString();
    var thisLeftClassName = "shot-chart-left-"+thisNumber;
    var thisRightClassName = "shot-chart-right-"+thisNumber;
    $("#intervisual-chat-output").append('<div class="chat-bot"><div class="message bot-message">'+thisPlayer+' shot chart in this game:</div></div>');
    $("#intervisual-chat-output").append('<div class="chat-bot"><div class="message bot-message"><div class="shot-chart-whole"><div class= "shot-chart-left  '+thisLeftClassName+'"></div><div class="shot-chart-right  '+thisRightClassName+'"></div></div></div></div>');
    drawShotChart("."+thisLeftClassName, shotData, awayColor, homeColor, player_full_name_to_class_name(thisPlayer));
    appendShotChartMenu(thisNumber, thisTeam, thisPlayer, "explore");
  } else if (responseVisualSpecifics["chartType"] == "flow"){
    var thisNumber = Math.floor(Math.random() * 1000000).toString();
    var thisLeftClassName = "flow-chart-left-"+thisNumber;
    var thisRightClassName = "flow-chart-right-"+thisNumber;
    $("#intervisual-chat-output").append('<div class="chat-bot"><div class="message bot-message">Here is the flow chart of the game:</div></div>');
    $("#intervisual-chat-output").append('<div class="chat-bot"><div class="message bot-message"><div class="flow-chart-whole"><div class="flow-chart-left '+thisLeftClassName+'"></div><div class="flow-chart-right  '+thisRightClassName+'"></div></div></div></div>');
    drawFlowChart("."+thisLeftClassName, flowData, awayColor, homeColor);
    appendFlowChartMenu(thisNumber, "explore");
  } else if (responseVisualSpecifics["chartType"] == "player_season_bar"){
    var thisNumber = Math.floor(Math.random() * 1000000).toString();
    var thisLeftClassName = "player-season-bar-chart-left-"+thisNumber;
    var thisRightClassName = "player-season-bar-chart-right-"+thisNumber;
    var thisPlayerName = responseVisualSpecifics["chartVariable"][0]["player"];
    var thisTeam = responseVisualSpecifics["chartVariable"][0]["team"];
    var thisColor = thisTeam == "HOME" ? homeColor : awayColor;
    var thisStatsType = responseVisualSpecifics["chartVariable"][0]["statsType"];
    var thisSeasonData = responseVisualSpecifics["chartVariable"][0]["seasonData"];
    $("#intervisual-chat-output").append("<div class='chat-bot'><div class='message bot-message'>Here is the bar chart of " + thisPlayerName + "'s " + stats_abbrev_translate_dict[thisStatsType] +" this season:</div></div>");
    $("#intervisual-chat-output").append('<div class="chat-bot"><div class="message bot-message"><div class="bar-chart-whole"><div class="bar-chart-left '+thisLeftClassName+'"></div><div class="bar-chart-right  '+thisRightClassName+'"></div></div></div></div>');
    appendPlayerSeasonBarChartMenu(thisNumber, thisSeasonData, thisStatsType);
    drawPlayerSeasonBarChart(thisNumber, thisSeasonData, thisColor, thisPlayerName, thisStatsType, "explore");
  } else if (responseVisualSpecifics["chartType"] == "team_season_bar"){
    for (var i=0; i<responseVisualSpecifics["chartVariable"].length; i++){
      var thisNumber = Math.floor(Math.random() * 1000000).toString();
      var thisLeftClassName = "team-season-bar-chart-left-"+thisNumber;
      var thisRightClassName = "team-season-bar-chart-right-"+thisNumber;
      var thisTeam = responseVisualSpecifics["chartVariable"][i]["team"];
      var thisColor = thisTeam == "HOME" ? homeColor : awayColor;
      var thisSeasonData = responseVisualSpecifics["chartVariable"][i]["data"];
      var thisStatsType = responseVisualSpecifics["chartVariable"][i]["statsType"];
      $("#intervisual-chat-output").append("<div class='chat-bot'><div class='message bot-message'>Here is the bar chart of " + team_name_match_dict[thisTeam] + "'s " + stats_abbrev_translate_dict[thisStatsType] +" this season:</div></div>");
      $("#intervisual-chat-output").append('<div class="chat-bot"><div class="message bot-message"><div class="bar-chart-whole"><div class="bar-chart-left '+thisLeftClassName+'"></div><div class="bar-chart-right  '+thisRightClassName+'"></div></div></div></div>');
      appendTeamSeasonBarChartMenu(thisNumber, thisSeasonData, thisStatsType, thisTeam);
      drawTeamSeasonBarChart(thisNumber, thisSeasonData, thisColor, thisTeam, thisStatsType, "explore");
    }
  } else if (responseVisualSpecifics["chartType"] == "team_record_bar"){
    for (var i=0; i<responseVisualSpecifics["chartVariable"].length; i++){
      var thisNumber = Math.floor(Math.random() * 1000000).toString();
      var thisLeftClassName = "team-record-bar-chart-left-"+thisNumber;
      var thisRightClassName = "team-record-bar-chart-right-"+thisNumber;
      var thisTeam = responseVisualSpecifics["chartVariable"][i]["team"];
      var thisColor = thisTeam == "HOME" ? homeColor : awayColor;
      var thisSeasonData = responseVisualSpecifics["chartVariable"][i]["data"]; // awayTeamHistoryRecords
      $("#intervisual-chat-output").append("<div class='chat-bot'><div class='message bot-message'>Here is the bar chart of " + team_name_match_dict[thisTeam] + "'s season record so far:</div></div>");
      $("#intervisual-chat-output").append('<div class="chat-bot"><div class="message bot-message"><div class="bar-chart-whole"><div class="bar-chart-left '+thisLeftClassName+'"></div><div class="bar-chart-right  '+thisRightClassName+'"></div></div></div></div>');
      appendTeamRecordBarChartMenu(thisNumber, thisTeam);
      drawTeamRecordBarChart(thisNumber, thisSeasonData, team_name_match_dict[thisTeam], "explore");
    }
  }  else if (responseVisualSpecifics["chartType"] == "player_stats_game_bar"){
    for (var i=0; i<responseVisualSpecifics["chartVariable"].length; i++){
      var thisNumber = Math.floor(Math.random() * 1000000).toString();
      var thisLeftClassName = "players-stats-game-bar-chart-left-"+thisNumber;
      var thisRightClassName = "players-stats-game-bar-chart-right-"+thisNumber;
      var thisTeam = responseVisualSpecifics["chartVariable"][i]["team"];
      var thisColor = thisTeam == "HOME" ? homeColor : awayColor;
      var thisStatsType = responseVisualSpecifics["chartVariable"][i]["statsType"];
      var thisGameData = responseVisualSpecifics["chartVariable"][i]["data"];
      $("#intervisual-chat-output").append("<div class='chat-bot'><div class='message bot-message'>Here is the bar chart of all " + team_name_match_dict[thisTeam] + " players' " + stats_abbrev_translate_dict[thisStatsType] +" bar chart:</div></div>");
      $("#intervisual-chat-output").append('<div class="chat-bot"><div class="message bot-message"><div class="bar-chart-whole"><div class="bar-chart-left '+thisLeftClassName+'"></div><div class="bar-chart-right  '+thisRightClassName+'"></div></div></div></div>');
      appendPlayerStatsBarChartMenu(thisNumber, thisGameData, thisStatsType, thisTeam);
      drawPlayersGameBarChart(thisNumber, thisGameData, thisColor, thisStatsType, "explore");
    }
  }
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
