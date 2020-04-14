// tags: {"players": {"homeTeamPlayers": homePlayersInTextList, "awayTeamPlayers": awayPlayersInTextList}, "teams": teamNameInText, "statsTypes": statsTypeInText, "season": seasonInText, "adjWords": adjWordsInText}


var tag_to_code = function(tags){
  var code = "";
  (tags["players"]["homeTeamPlayers"].length>0 || tags["players"]["awayTeamPlayers"].length>0) ? code += "1" : code += "0";
  tags["teams"] == "NONE" ? code += "0" : code += "1";
  tags["statsTypes"].length>0 ? code += "1" : code += "0";
  tags["season"] ? code += "1" : code += "0";
  tags["adjWords"].length>0 ? code += "1" : code += "0";
  return code;
}

var classification_rules = function(text){
  var tags = tag_text(text);
  var code = tag_to_code(tags);
  var responses = [];
  var visualSpecifics = {};
  if (code == "10000" || code == "11000"){
    var returnedResponses = get_player_game_stats_response(tags["players"], "", tags["teams"]);
    responses = responses.concat(returnedResponses[0]);
    visualSpecifics["chartType"] = "shot";
    visualSpecifics["chartVariable"] = returnedResponses[1];
  }
  if (code == "11011" || code == "11001"  || code == "10011"  || code == "10001"){
    var returnedResponses = get_player_season_stats_response(tags["players"], "pts", tags["adjWords"][0], tags["teams"]);
    responses = responses.concat(returnedResponses[0]);
    visualSpecifics["chartType"] = "player_season_bar";
    visualSpecifics["chartVariable"] = returnedResponses[1];
  }
  if (code == "11111" || code == "11101"  || code == "10111"  || code == "10101"){
    var returnedResponses = get_player_season_stats_response(tags["players"], tags["statsTypes"][0], tags["adjWords"][0], tags["teams"]);
    responses = responses.concat(returnedResponses[0]);
    visualSpecifics["chartType"] = "player_season_bar";
    visualSpecifics["chartVariable"] = returnedResponses[1];
  }
  if (code == "11010" || code == "10010"){
    var returnedResponses = get_player_season_stats_response(tags["players"], "pts", "average", tags["teams"]);
    responses = responses.concat(returnedResponses[0]);
    visualSpecifics["chartType"] = "player_season_bar";
    visualSpecifics["chartVariable"] = returnedResponses[1];
  }
  if (code == "11110" || code=="10110"){
    var returnedResponses = get_player_season_stats_response(tags["players"], tags["statsTypes"][0], "average", tags["teams"]);
    responses = responses.concat(returnedResponses[0]);
    visualSpecifics["chartType"] = "player_season_bar";
    visualSpecifics["chartVariable"] = returnedResponses[1];
  }
  if (code == "11100" || code == "10100"){
    var returnedResponses = get_player_game_stats_response(tags["players"], tags["statsTypes"][0], tags["teams"]);
    responses = responses.concat(returnedResponses[0]);
    visualSpecifics["chartType"] = "shot";
    visualSpecifics["chartVariable"] = returnedResponses[1];
  }
  if (code == "00101"){
    var returnedResponses = get_both_adj_stats_response(tags["adjWords"][0], tags["statsTypes"][0], "NONE");
    responses = responses.concat(returnedResponses[0]);
    visualSpecifics["chartType"] = "player_stats_game_bar";
    visualSpecifics["chartVariable"] = returnedResponses[1];
  }
  if (code == "00001"){
    var returnedResponses = get_both_adj_stats_response(tags["adjWords"][0], "pts", "NONE");
    responses = responses.concat(returnedResponses[0]);
    visualSpecifics["chartType"] = "player_stats_game_bar";
    visualSpecifics["chartVariable"] = returnedResponses[1];
  }
  if (code=="01001"){
    var returnedResponses = get_both_adj_stats_response(tags["adjWords"][0], "pts", tags["teams"]);
    responses = responses.concat(returnedResponses[0]);
    visualSpecifics["chartType"] = "player_stats_game_bar";
    visualSpecifics["chartVariable"] = returnedResponses[1];
  }
  if (code == "00011" || code == "01011" ){
    var returnedResponses = get_team_season_stats_response(tags["adjWords"][0], "pts", tags["teams"]);
    responses = responses.concat(returnedResponses[0]);
    visualSpecifics["chartType"] = "team_season_bar";
    visualSpecifics["chartVariable"] = returnedResponses[1];
  }
  if (code == "01111" || code == "00111"){
    var returnedResponses = get_team_season_stats_response(tags["adjWords"][0], tags["statsTypes"][0], tags["teams"]);
    responses = responses.concat(returnedResponses[0]);
    visualSpecifics["chartType"] = "team_season_bar";
    visualSpecifics["chartVariable"] = returnedResponses[1];
  }
  if (code == "01101"){
    var returnedResponses = get_both_adj_stats_response(tags["adjWords"][0], tags["statsTypes"][0], tags["teams"]);
    responses = responses.concat(returnedResponses[0]);
    visualSpecifics["chartType"] = "player_stats_game_bar";
    visualSpecifics["chartVariable"] = returnedResponses[1];
  }
  if (code == "01110"){
    var returnedResponses = get_team_season_stats_response("average", tags["statsTypes"][0], tags["teams"]);
    responses = responses.concat(returnedResponses[0]);
    visualSpecifics["chartType"] = "team_season_bar";
    visualSpecifics["chartVariable"] = returnedResponses[1];
  }
  if (code == "00110"){
    var returnedResponses = get_team_season_stats_response("average", tags["statsTypes"][0], tags["teams"]);
    responses = responses.concat(returnedResponses[0]);
    visualSpecifics["chartType"] = "team_season_bar";
    visualSpecifics["chartVariable"] = returnedResponses[1];
  }
  if (code == "00100" || code == "01100"){
    var returnedResponses = get_team_game_stats_response(tags["statsTypes"][0], tags["teams"]);
    responses = responses.concat(returnedResponses[0]);
    visualSpecifics["chartType"] = "player_stats_game_bar";
    visualSpecifics["chartVariable"] = returnedResponses[1];
  }
  if (code == "01010" || code == "01000" || code=="00010"){
    var returnedResponses = get_team_season_record_stats_response(tags["teams"]);
    responses = responses.concat(returnedResponses[0]);
    visualSpecifics["chartType"] = "team_record_bar";
    visualSpecifics["chartVariable"] = returnedResponses[1];
  }
  if (responses.length == 0){
    var returnedResponses = get_exception_responses(text);
    responses = responses.concat(returnedResponses[0]);
    visualSpecifics["chartType"] = "flow";
    visualSpecifics["chartVariable"] = returnedResponses[1];
  }
  console.log(code, tags, responses, visualSpecifics);
  return [responses, visualSpecifics];
}
var get_time_exception_responses = function(text){
  var textResponses = [];
  var visualArgs = [];
  console.log(text)
  if (text.indexOf("QUARTER") > -1 && (text.indexOf("FIRST") > -1 || text.indexOf("1") > -1)){
    textResponses.push("The first quarter score is: " + team_name_match_dict["HOME"] + " " + halfTeamStatsData["homeTeamFirstQuarterPts"].toString() + ":" + halfTeamStatsData["awayTeamFirstQuarterPts"].toString() + " " + team_name_match_dict["AWAY"]);
  }
  if (text.indexOf("QUARTER") > -1 && (text.indexOf("SECOND") > -1 || text.indexOf("2") > -1)){
    textResponses.push("The second quarter score is: " + team_name_match_dict["HOME"] + " " + halfTeamStatsData["homeTeamSecondQuarterPts"].toString() + ":" + halfTeamStatsData["awayTeamSecondQuarterPts"].toString() + " " + team_name_match_dict["AWAY"]);
  }
  if (text.indexOf("QUARTER") > -1 && (text.indexOf("THIRD") > -1 || text.indexOf("3") > -1)){
    textResponses.push("The third quarter score is: " + team_name_match_dict["HOME"] + " " + halfTeamStatsData["homeTeamThirdQuarterPts"].toString() + ":" + halfTeamStatsData["awayTeamThirdQuarterPts"].toString() + " " + team_name_match_dict["AWAY"]);
  }
  if (text.indexOf("QUARTER") > -1 && (text.indexOf("FORTH") > -1 || text.indexOf("FOURTH") > -1 || text.indexOf("4") > -1)){
    textResponses.push("The fourth quarter score is: " + team_name_match_dict["HOME"] + " " + halfTeamStatsData["homeTeamFourthQuarterPts"].toString() + " " + halfTeamStatsData["awayTeamFourthQuarterPts"].toString() + " " + team_name_match_dict["AWAY"]);
  }
  if (text.indexOf("HALF") > -1 && (text.indexOf("FIRST") > -1 || text.indexOf("1") > -1)){
    textResponses.push("The first half score is: " + team_name_match_dict["HOME"] + " " + halfTeamStatsData["homeTeamFirstHalfPts"].toString() + ":" + halfTeamStatsData["awayTeamFirstHalfPts"].toString() + " " + team_name_match_dict["AWAY"]);
  }
  if (text.indexOf("HALF") > -1 && (text.indexOf("SECOND") > -1 || text.indexOf("2") > -1)){
    textResponses.push("The second half score is: " + team_name_match_dict["HOME"] + " " + halfTeamStatsData["homeTeamSecondHalfPts"].toString() + ":" + halfTeamStatsData["awayTeamSecondHalfPts"].toString() + " " + team_name_match_dict["AWAY"]);
  }
  visualArgs.push({"data": flowData})
  return [textResponses, visualArgs]
}
var get_exception_responses = function(text){
  text = text.toUpperCase();
  var wordsList = text.split(" ").map(x => clean_word(x));
  var cleanText = wordsList.join(" ");
  if (cleanText.indexOf("QUARTER") > -1 || cleanText.indexOf("HALF") > -1){
    return get_time_exception_responses(cleanText);
  } else if (cleanText.indexOf("WON") > -1 || cleanText.indexOf("WIN") > -1 || cleanText.indexOf("RESULT") > -1) {
    var textResponses = [];
    var visualArgs = [];
    textResponses.push(gameHighlightInsightText);
    visualArgs.push({"data": flowData})
    return [textResponses, visualArgs]
  }
  else{
    var textResponses = [];
    var visualArgs = [];
    textResponses.push("Sorry, I have trouble understanding you, in this game:");
    textResponses.push(gameHighlightInsightText);
    // textResponses.push("Here is a flow chart to give you an overview of the game");
    textResponses.push("what else do you want to know?");
    visualArgs.push({"data": flowData})
    return [textResponses, visualArgs]
  }
}
var get_player_season_stats_response = function(playersDict, statsTypes, adj, teams){
  var textResponses = [];
  var visualArgs = [];
  playersDict = filter_players_dict_by_teams(playersDict, teams);
  if (adj == "average"){
    if (playersDict["homeTeamPlayers"].length > 0){
      for (var i =0; i<playersDict["homeTeamPlayers"].length; i++){
        var thisStats = homeTeamAllSeasonData["player_data"][playersDict["homeTeamPlayers"][i]][statsTypes];
        textResponses.push(playersDict["homeTeamPlayers"][i] + " averaged " + thisStats + " " + stats_abbrev_translate_dict[statsTypes] +  " this season in the past " + totalHomeGameCountSeason.toString() + " games");
        var thisNameInData = player_full_name_to_data_name(playersDict["homeTeamPlayers"][i]);
        var thisSeasonData = get_player_season_stats(homeTeamHistoryRecords, thisNameInData, statsTypes, "2");
        visualArgs.push({"team": "HOME", "player": playersDict["homeTeamPlayers"][i], "statsType": statsTypes, "seasonData": thisSeasonData});
      }
    }
    if (playersDict["awayTeamPlayers"].length > 0){
      for (var i =0; i<playersDict["awayTeamPlayers"].length; i++){
        var thisStats = awayTeamAllSeasonData["player_data"][playersDict["awayTeamPlayers"][i]][statsTypes];
        textResponses.push(playersDict["awayTeamPlayers"][i] + " averaged " + thisStats + " " + stats_abbrev_translate_dict[statsTypes] +  " this season in the past " + totalAwayGameCountSeason.toString() + " games");
        var thisNameInData = player_full_name_to_data_name(playersDict["awayTeamPlayers"][i]);
        var thisSeasonData = get_player_season_stats(awayTeamHistoryRecords, thisNameInData, statsTypes, "2");
        visualArgs.push({"team": "AWAY", "player": playersDict["awayTeamPlayers"][i], "statsType": statsTypes, "seasonData": thisSeasonData});
      }
    }
    return [textResponses, visualArgs];
  }
  if (adj == "highest"){
    if (playersDict["homeTeamPlayers"].length > 0){
      for (var i =0; i<playersDict["homeTeamPlayers"].length; i++){
        var thisNameInData = player_full_name_to_data_name(playersDict["homeTeamPlayers"][i]);
        if (thisNameInData in gameStatsData["homeTeam"]["players"]){
          var thisSeasonHighInfo = get_player_season_stats(homeTeamHistoryRecords, thisNameInData, statsTypes, "1");
          textResponses.push(playersDict["homeTeamPlayers"][i] + " got his season high " + thisSeasonHighInfo["stats"] + " " + stats_abbrev_translate_dict[statsTypes] + " on " + thisSeasonHighInfo["date"] + " against " + thisSeasonHighInfo["opponent"] + ".");
          var thisSeasonData = get_player_season_stats(homeTeamHistoryRecords, thisNameInData, statsTypes, "2");
          visualArgs.push({"team": "HOME", "player": playersDict["homeTeamPlayers"][i], "statsType": statsTypes, "seasonData": thisSeasonData});
        }
      }
    }
    if (playersDict["awayTeamPlayers"].length > 0){
      for (var i =0; i<playersDict["awayTeamPlayers"].length; i++){
        var thisNameInData = player_full_name_to_data_name(playersDict["awayTeamPlayers"][i]);
        if (thisNameInData in gameStatsData["awayTeam"]["players"]){
          var thisSeasonHighInfo = get_player_season_stats(awayTeamHistoryRecords, thisNameInData, statsTypes, "1");
          textResponses.push(playersDict["awayTeamPlayers"][i] + " got his season high " + thisSeasonHighInfo["stats"] + " " + stats_abbrev_translate_dict[statsTypes] + " on " + thisSeasonHighInfo["date"] + " against " + thisSeasonHighInfo["opponent"] + ".");
          var thisSeasonData = get_player_season_stats(awayTeamHistoryRecords, thisNameInData, statsTypes, "2");
          visualArgs.push({"team": "AWAY", "player": playersDict["awayTeamPlayers"][i], "statsType": statsTypes, "seasonData": thisSeasonData});
        }
      }
    }
    return [textResponses, visualArgs];
  }
  if (adj == "lowest"){
    if (playersDict["homeTeamPlayers"].length > 0){
      for (var i =0; i<playersDict["homeTeamPlayers"].length; i++){
        var thisNameInData = player_full_name_to_data_name(playersDict["homeTeamPlayers"][i]);
        if (thisNameInData in gameStatsData["homeTeam"]["players"]){
          var thisSeasonLowInfo = get_player_season_stats(homeTeamHistoryRecords, thisNameInData, statsTypes, "0");
          console.log(thisSeasonLowInfo)
          textResponses.push(playersDict["homeTeamPlayers"][i] + " got his season lowest " + thisSeasonLowInfo["stats"] + " " + stats_abbrev_translate_dict[statsTypes] + " on " + thisSeasonLowInfo["date"] + " against " + thisSeasonLowInfo["opponent"] + ".");
          var thisSeasonData = get_player_season_stats(homeTeamHistoryRecords, thisNameInData, statsTypes, "2");
          visualArgs.push({"team": "HOME", "player": playersDict["homeTeamPlayers"][i], "statsType": statsTypes, "seasonData": thisSeasonData});
        }
      }
    }
    if (playersDict["awayTeamPlayers"].length > 0){
      for (var i =0; i<playersDict["awayTeamPlayers"].length; i++){
        var thisNameInData = player_full_name_to_data_name(playersDict["awayTeamPlayers"][i]);
        if (thisNameInData in gameStatsData["awayTeam"]["players"]){
          var thisSeasonLowInfo = get_player_season_stats(awayTeamHistoryRecords, thisNameInData, statsTypes, "0");
          textResponses.push(playersDict["awayTeamPlayers"][i] + " got his season lowest " + thisSeasonLowInfo["stats"] + " " + stats_abbrev_translate_dict[statsTypes] + " on " + thisSeasonLowInfo["date"] + " against " + thisSeasonLowInfo["opponent"] + ".");
          var thisSeasonData = get_player_season_stats(awayTeamHistoryRecords, thisNameInData, statsTypes, "2");
          visualArgs.push({"team": "AWAY", "player": playersDict["awayTeamPlayers"][i], "statsType": statsTypes, "seasonData": thisSeasonData});
        }
      }
    }
    return [textResponses, visualArgs];
  }
}
// sort: descending, 1 high, 0 lowest, 2: return original order
var get_player_season_stats = function(oldItems, name, statsType, sort){
  var items = oldItems.filter(function (el) { // filter out players not play the game
    return name in el["playersStats"];
  });
  if (sort == "2"){
    var playerSeasonAllStats = [];
    console.log(items)
    for (var i=0; i<items.length; i++){
      playerSeasonAllStats.push({"stats": items[i]["playersStats"][name][statsType], "opponent": items[i]["opponent"].slice(0, -1), "date": items[i]["date"], "pts": items[i]["playersStats"][name]["pts"], "pf": items[i]["playersStats"][name]["pf"],"to": items[i]["playersStats"][name]["to"],"blk": items[i]["playersStats"][name]["blk"],"stl": items[i]["playersStats"][name]["stl"],"ast": items[i]["playersStats"][name]["ast"],"reb": items[i]["playersStats"][name]["reb"],"oreb": items[i]["playersStats"][name]["oreb"],"dreb": items[i]["playersStats"][name]["dreb"],"fgm": items[i]["playersStats"][name]["fgm"],"fga": items[i]["playersStats"][name]["fga"],"fgp": items[i]["playersStats"][name]["fgp"],"ftm": items[i]["playersStats"][name]["ftm"],"fta": items[i]["playersStats"][name]["fta"],"ftp": items[i]["playersStats"][name]["ftp"],"3pm": items[i]["playersStats"][name]["3pm"],"3pa": items[i]["playersStats"][name]["3pa"],"3pp": items[i]["playersStats"][name]["3pp"]});
    }
    return playerSeasonAllStats;
  } else{
    // Sort the array based on the second element
    items.sort(function(first, second) {
      return second["playersStats"][name][statsType] - first["playersStats"][name][statsType];
    });
    if (sort == "1"){
      return {"stats": items[0]["playersStats"][name][statsType], "opponent": items[0]["opponent"].slice(0, -1), "date": items[0]["date"]}
    }else{
      for (var i = items.length - 1; i >=0; i--) {
        if (statsType in items[i]["playersStats"][name]){
          return {"stats": items[i]["playersStats"][name][statsType], "opponent": items[i]["opponent"].slice(0, -1), "date": items[i]["date"]};
        }
      }
    }
  }
}
var get_both_adj_stats_response = function(adj, statsTypes, teams){
  var textResponses = [];
  var visualArgs = [];
  var homeAdjValues = get_adj_stats_type_stats(gameStatsData["homeTeam"]["players"], statsTypes);
  var awayAdjValues = get_adj_stats_type_stats(gameStatsData["awayTeam"]["players"], statsTypes);
  var teamsToAdjValues = {"HOME": homeAdjValues, "AWAY": awayAdjValues};
  var teamsToTotalCountSeasonGames = {"HOME": totalHomeGameCountSeason, "AWAY": totalAwayGameCountSeason};
  if (teams == "BOTH" || teams == "NONE"){
    if (adj == "average"){
      textResponses.push("The average " + stats_abbrev_translate_dict[statsTypes] + " of the " + homeTeamName + " is " + homeAdjValues["average"].toString());
      textResponses.push("The average " + stats_abbrev_translate_dict[statsTypes] + " of the " + awayTeamName + " is " + awayAdjValues["average"].toString());
    }
    if (adj == "highest"){
      textResponses.push(homeAdjValues["highest"][0] +" got the highest " + homeAdjValues["highest"][1] + " " + stats_abbrev_translate_dict[statsTypes] + " for the " + homeTeamName);
      textResponses.push(awayAdjValues["highest"][0] +" got the highest " + awayAdjValues["highest"][1] + " " + stats_abbrev_translate_dict[statsTypes] + " for the " + awayTeamName);
    }
    if (adj == "lowest"){
      textResponses.push(homeAdjValues["lowest"][0] +" got the least " + homeAdjValues["lowest"][1] + " " + stats_abbrev_translate_dict[statsTypes] + " for the " + homeTeamName);
      textResponses.push(awayAdjValues["lowest"][0] +" got the least " + awayAdjValues["lowest"][1] + " " + stats_abbrev_translate_dict[statsTypes] + " for the " + awayTeamName);
    }
    visualArgs.push({"team": "HOME", "data": teamsToAdjValues["HOME"]["data"], "statsType": statsTypes});
    visualArgs.push({"team": "AWAY", "data": teamsToAdjValues["AWAY"]["data"], "statsType": statsTypes});
  }else{
    if (adj == "average"){
      textResponses.push("The average " + stats_abbrev_translate_dict[statsTypes] + " of the " + team_name_match_dict[teams] + " is " + teamsToAdjValues[teams]["average"].toString());
    }
    if (adj == "highest"){
      textResponses.push(teamsToAdjValues[teams]["highest"][0] +" got the highest " + teamsToAdjValues[teams]["highest"][1] + " " + stats_abbrev_translate_dict[statsTypes] + " for the " + team_name_match_dict[teams]);
    }
    if (adj == "lowest"){
      textResponses.push(teamsToAdjValues[teams]["lowest"][0] +" got the least " + teamsToAdjValues[teams]["lowest"][1] + " " + stats_abbrev_translate_dict[statsTypes] + " for the " + team_name_match_dict[teams]);
    }
    visualArgs.push({"team": teams, "data": teamsToAdjValues[teams]["data"], "statsType": statsTypes});
  }

  return [textResponses, visualArgs];
}
var get_adj_stats_type_stats = function(statsData, statsType){
  var playerStatsList = Object.keys(statsData).map(x => [x, statsData[x][statsType], statsData[x]["pts"], statsData[x]["reb"], statsData[x]["ast"], statsData[x]["stl"], statsData[x]["blk"], statsData[x]["to"], statsData[x]["oreb"], statsData[x]["dreb"], statsData[x]["pf"], statsData[x]["time"], statsData[x]["3pm"], statsData[x]["3pa"], statsData[x]["3pp"], statsData[x]["ftm"], statsData[x]["fta"], statsData[x]["ftp"], statsData[x]["fgm"], statsData[x]["fga"], statsData[x]["fgp"]]);
  playerStatsList = playerStatsList.filter(function (el) { // filter out players not play the game
    return el[1];
  });
  var dataList = playerStatsList.map(function(x) {
      return {
          "name": x[0],
          "value": x[1],
          "pts": x[2],
          "reb": x[3],
          "ast": x[4],
          "stl": x[5],
          "blk": x[6],
          "to": x[7],
          "oreb": x[8],
          "dreb": x[9],
          "pf": x[10],
          "time": x[11],
          "3pm": x[12],
          "3pa": x[13],
          "3pp": x[14],
          "ftm": x[15],
          "fta": x[16],
          "ftp": x[17],
          "fgm": x[18],
          "fga": x[19],
          "fgp": x[20]
      }
  })
  var newPlayerStatsList = playerStatsList.sort(function(first, second) {
    return second[1] - first[1];
  });
  var totalValue = 0
  for(i=0;i<newPlayerStatsList.length;i++){
    totalValue += parseInt(newPlayerStatsList[i][1]);
  }
  return {"highest": newPlayerStatsList[0], "lowest": newPlayerStatsList[newPlayerStatsList.length-1], "average": (totalValue/newPlayerStatsList.length).toFixed(2), "data": dataList}
}
var get_team_game_stats_response = function(statsTypes, teams){
  var textResponses = [];
  var visualArgs = [];
  var homeAdjValues = get_adj_stats_type_stats(gameStatsData["homeTeam"]["players"], statsTypes);
  var awayAdjValues = get_adj_stats_type_stats(gameStatsData["awayTeam"]["players"], statsTypes);
  var teamsToAdjValues = {"HOME": homeAdjValues, "AWAY": awayAdjValues};
  if (teams == "BOTH" || teams == "NONE"){
    textResponses.push(team_name_match_dict["HOME"] + " got " + both_team_stats_abbrev_translate_dict["HOME"+statsTypes] + " " + stats_abbrev_translate_dict[statsTypes] + " in this game");
    textResponses.push(team_name_match_dict["AWAY"] + " got " + both_team_stats_abbrev_translate_dict["AWAY"+statsTypes] + " " + stats_abbrev_translate_dict[statsTypes] + " in this game");
    visualArgs.push({"team": "HOME", "data": teamsToAdjValues["HOME"]["data"], "statsType": statsTypes});
    visualArgs.push({"team": "AWAY", "data": teamsToAdjValues["AWAY"]["data"], "statsType": statsTypes});
  }else{
    textResponses.push(team_name_match_dict[teams] + " got " + both_team_stats_abbrev_translate_dict[teams+statsTypes] + " " + stats_abbrev_translate_dict[statsTypes] + " in this game");
    visualArgs.push({"team": teams, "data": teamsToAdjValues[teams]["data"], "statsType": statsTypes});
  }
  return [textResponses, visualArgs];
}
var get_team_season_record_stats_response = function(teams){
  var textResponses = [];
  var visualArgs = [];
  var awayResultVerb = awayWin? "improved" : "dropped";
  var homeResultVerb = (awayResultVerb == "dropped") ? "improved" : "dropped";
  if (teams == "BOTH" || teams == "NONE"){
    textResponses.push(team_name_match_dict["HOME"] + " " + homeResultVerb + " to " + homeTeamInnerRecord + " at home and " + homeTeamRecord + " overall.");
    textResponses.push(team_name_match_dict["AWAY"] + " " + awayResultVerb + " to " + awayTeamInnerRecord + " on the road and " + awayTeamRecord + " overall.");
    visualArgs.push({"team": "HOME", "data": homeTeamHistoryRecords});
    visualArgs.push({"team": "AWAY", "data": awayTeamHistoryRecords});
  }else if (teams == "HOME"){
    textResponses.push(team_name_match_dict["HOME"] + " " + homeResultVerb + " to " + homeTeamInnerRecord + " at home and " + homeTeamRecord + " overall.");
    visualArgs.push({"team": "HOME", "data": homeTeamHistoryRecords});
  }else{
    textResponses.push(team_name_match_dict["AWAY"] + " " + awayResultVerb + " to " + awayTeamInnerRecord + " on the road and " + awayTeamRecord + " overall.");
    visualArgs.push({"team": "AWAY", "data": awayTeamHistoryRecords});
  }
  return [textResponses, visualArgs];
}

var get_team_season_stats_response = function(adj, statsTypes, teams){
  var textResponses = [];
  var visualArgs = [];
  var homeTeamAdjValues = get_team_adj_stats_type_response(homeTeamHistoryRecords, statsTypes);
  var awayTeamAdjValues = get_team_adj_stats_type_response(awayTeamHistoryRecords, statsTypes);
  var teamsToAdjValues = {"HOME": homeTeamAdjValues, "AWAY": awayTeamAdjValues};
  var teamsToTotalCountSeasonGames = {"HOME": totalHomeGameCountSeason, "AWAY": totalAwayGameCountSeason};
  if (teams == "BOTH" || teams == "NONE"){
    if (adj == "average"){
      textResponses.push(team_name_match_dict["HOME"] + " averaged " + teamsToAdjValues["HOME"]["average"] + " " + stats_abbrev_translate_dict[statsTypes] + " this season in the past " + teamsToTotalCountSeasonGames["HOME"].toString() + " games");
      textResponses.push(team_name_match_dict["AWAY"] + " averaged " + teamsToAdjValues["AWAY"]["average"] + " " + stats_abbrev_translate_dict[statsTypes] + " this season in the past " + teamsToTotalCountSeasonGames["AWAY"].toString() + " games");
    }
    if (adj == "highest"){
      textResponses.push(team_name_match_dict["HOME"] + " got the highest " + teamsToAdjValues["HOME"]["highest"][team_stats_abbrev_translate_dict[statsTypes]] + " " + stats_abbrev_translate_dict[statsTypes] + " in this season on " + teamsToAdjValues["HOME"]["highest"]["date"] + " against " + teamsToAdjValues["HOME"]["highest"]["opponent"].substring(0, teamsToAdjValues["HOME"]["highest"]["opponent"].length - 1) + ".");
      textResponses.push(team_name_match_dict["AWAY"] + " got the highest " + teamsToAdjValues["AWAY"]["highest"][team_stats_abbrev_translate_dict[statsTypes]] + " " + stats_abbrev_translate_dict[statsTypes] + " in this season on " + teamsToAdjValues["AWAY"]["highest"]["date"] + " against " + teamsToAdjValues["AWAY"]["highest"]["opponent"].substring(0, teamsToAdjValues["AWAY"]["highest"]["opponent"].length - 1) + ".");
    }
    if (adj == "lowest"){
      textResponses.push(team_name_match_dict["HOME"] + " got the lowest " + teamsToAdjValues["HOME"]["lowest"][team_stats_abbrev_translate_dict[statsTypes]] + " " + stats_abbrev_translate_dict[statsTypes] + " in this season on " + teamsToAdjValues["HOME"]["lowest"]["date"] + " against " + teamsToAdjValues["HOME"]["lowest"]["opponent"].substring(0, teamsToAdjValues["HOME"]["lowest"]["opponent"].length - 1) + ".");
      textResponses.push(team_name_match_dict["AWAY"] + " got the lowest " + teamsToAdjValues["AWAY"]["lowest"][team_stats_abbrev_translate_dict[statsTypes]] + " " + stats_abbrev_translate_dict[statsTypes] + " in this season on " + teamsToAdjValues["AWAY"]["lowest"]["date"] + " against " + teamsToAdjValues["AWAY"]["lowest"]["opponent"].substring(0, teamsToAdjValues["AWAY"]["lowest"]["opponent"].length - 1) + ".");
    }
    visualArgs.push({"team": "HOME", "data": teamsToAdjValues["HOME"]["data"], "statsType": statsTypes});
    visualArgs.push({"team": "AWAY", "data": teamsToAdjValues["AWAY"]["data"], "statsType": statsTypes});
    return [textResponses, visualArgs]
  }else{
    if (adj == "average"){
      textResponses.push(team_name_match_dict[teams] + " averaged " + teamsToAdjValues[teams]["average"] + " " + stats_abbrev_translate_dict[statsTypes] + " this season in the past " + teamsToTotalCountSeasonGames[teams].toString() + " games");
    }
    if (adj == "highest"){
      textResponses.push(team_name_match_dict[teams] + "got the highest " + teamsToAdjValues[teams]["highest"][team_stats_abbrev_translate_dict[statsTypes]] + " " + stats_abbrev_translate_dict[statsTypes] + " in this season on " + teamsToAdjValues[teams]["highest"]["date"] + " against " + teamsToAdjValues[teams]["highest"]["opponent"].substring(0, teamsToAdjValues[teams]["highest"]["opponent"].length - 1) + ".");
    }
    if (adj == "lowest"){
      textResponses.push(team_name_match_dict[teams] + "got the lowest " + teamsToAdjValues[teams]["lowest"][team_stats_abbrev_translate_dict[statsTypes]] + " " + stats_abbrev_translate_dict[statsTypes] + " in this season on " + teamsToAdjValues[teams]["lowest"]["date"] + " against " + teamsToAdjValues[teams]["lowest"]["opponent"].substring(0, teamsToAdjValues[teams]["lowest"]["opponent"].length - 1) + ".");
    }
    visualArgs.push({"team": teams, "data": teamsToAdjValues[teams]["data"], "statsType": statsTypes});
    return [textResponses, visualArgs]
  }
}
var get_team_adj_stats_type_response = function(statsData, statsTypes){
  var dataList = statsData.map(function(x) {
      return {
          "stats": x[team_stats_abbrev_translate_dict[statsTypes]],
          "date": x["date"],
          "opponent": x["opponent"],
          "pts": x["score"],
          "opponent_score": x["opponent_score"],
          "to": x["teamTO"],
          "blk": x["teamBLK"],
          "stl": x["teamSTL"],
          "ast": x["teamAST"],
          "reb": x["teamREB"],
          "dreb": x["teamDREB"],
          "pf": x["teamPF"],
          "oreb": x["teamOREB"],
          "fgm": x["teamFGMade"],
          "fgmiss": x["teamFGMiss"],
          "fga": x["teamFGTotal"],
          "fgp": x["teamFGRate"],
          "3pm": x["team3PTMade"],
          "3pmiss": x["team3PTMiss"],
          "3pa": x["team3PTTotal"],
          "3pp": x["team3PTRate"],
          "ftm": x["teamFTMade"],
          "ftmiss": x["teamFTMiss"],
          "fta": x["teamFTTotal"],
          "ftp": x["teamFTRate"]
      }
  })
  var statsList = statsData.map(x => x[team_stats_abbrev_translate_dict[statsTypes]]);
  statsList = statsList.filter(function (el) { // filter out undefined
    return el;
  });
  var newStatsData = statsData.sort(function(first, second) {
    return second[team_stats_abbrev_translate_dict[statsTypes]] - first[team_stats_abbrev_translate_dict[statsTypes]];
  });
  var totalValue = statsList.reduce((a, b) => a + b, 0);
  return {"highest": newStatsData[0], "lowest": newStatsData[newStatsData.length-1], "average": (totalValue/statsList.length).toFixed(2), "data": dataList}
}
var filter_players_dict_by_teams = function(playersDict, teams){
  if (teams == "NONE" || teams == "BOTH"){
    return playersDict;
  }else if (teams == "HOME") {
    var newDict = {"homeTeamPlayers": playersDict["homeTeamPlayers"], "awayTeamPlayers": []};
    return newDict;
  }else{
    var newDict = {"awayTeamPlayers": playersDict["awayTeamPlayers"], "homeTeamPlayers":[]};
    return newDict;
  }
}
var get_player_game_stats_response = function(playersDict, statsTypes, teams){
  var textResponses = [];
  var visualArgs = [];
  playersDict = filter_players_dict_by_teams(playersDict, teams);
  if (statsTypes == ""){
    if (playersDict["homeTeamPlayers"].length > 0){
      for (var i =0; i<playersDict["homeTeamPlayers"].length; i++){
        var thisNameInData = player_full_name_to_data_name(playersDict["homeTeamPlayers"][i]);
        if (thisNameInData in gameStatsData["homeTeam"]["players"]){
          visualArgs.push({"team": "HOME", "player": playersDict["homeTeamPlayers"][i]});
          var thisPts = gameStatsData["homeTeam"]["players"][thisNameInData]["pts"];
          var thisReb = gameStatsData["homeTeam"]["players"][thisNameInData]["reb"];
          var thisAst = gameStatsData["homeTeam"]["players"][thisNameInData]["ast"];
          textResponses.push(playersDict["homeTeamPlayers"][i] + " got " + thisPts + " points, " + thisReb + " rebounds, and " + thisAst + " assists.")
        }
      }
    }
    if (playersDict["awayTeamPlayers"].length > 0){
      for (var i =0; i<playersDict["awayTeamPlayers"].length; i++){
        var thisNameInData = player_full_name_to_data_name(playersDict["awayTeamPlayers"][i]);
        if (thisNameInData in gameStatsData["awayTeam"]["players"]){
          visualArgs.push({"team": "AWAY", "player": playersDict["awayTeamPlayers"][i]});
          var thisPts = gameStatsData["awayTeam"]["players"][thisNameInData]["pts"];
          var thisReb = gameStatsData["awayTeam"]["players"][thisNameInData]["reb"];
          var thisAst = gameStatsData["awayTeam"]["players"][thisNameInData]["ast"];
          textResponses.push(playersDict["awayTeamPlayers"][i] + " got " + thisPts + " points, " + thisReb + " rebounds, and " + thisAst + " assists.")
        }
      }
    }
    return [textResponses, visualArgs];
  }else{
    if (playersDict["homeTeamPlayers"].length > 0){
      for (var i =0; i<playersDict["homeTeamPlayers"].length; i++){
        var thisNameInData = player_full_name_to_data_name(playersDict["homeTeamPlayers"][i]);
        if (thisNameInData in gameStatsData["homeTeam"]["players"]){
          visualArgs.push({"team": "HOME", "player": playersDict["homeTeamPlayers"][i]});
          var thisStats = gameStatsData["homeTeam"]["players"][thisNameInData][statsTypes];
          textResponses.push(playersDict["homeTeamPlayers"][i] + " got " + thisStats + " " + stats_abbrev_translate_dict[statsTypes] +  " in this game.");
        }
      }
    }
    if (playersDict["awayTeamPlayers"].length > 0){
      console.log(gameStatsData)
      for (var i =0; i<playersDict["awayTeamPlayers"].length; i++){
        var thisNameInData = player_full_name_to_data_name(playersDict["awayTeamPlayers"][i]);
        if (thisNameInData in gameStatsData["awayTeam"]["players"]){
          visualArgs.push({"team": "AWAY", "player": playersDict["awayTeamPlayers"][i]});
          var thisStats = gameStatsData["awayTeam"]["players"][thisNameInData][statsTypes];
          textResponses.push(playersDict["awayTeamPlayers"][i] + " got " + thisStats + " " + stats_abbrev_translate_dict[statsTypes] +  " in this game.");
        }
      }
    }
    return [textResponses, visualArgs];
  }
}
