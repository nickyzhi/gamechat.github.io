// parse and tag the input sentences into pre-defined tags
// tags include:
var clean_word = function(str){
  str = str.replace("'S", "");
  str = str.replace("'", "");
  return str.replace(/[^A-Za-z-\d]/g,'');
}

var text_to_trigram_list = function(text){
  var trigramList = [];
  var wordsList = text.split(" ");
  if (wordsList.length > 2){
    for (var i=2; i<wordsList.length; i++){
      trigramList.push([wordsList[i-2], wordsList[i-1], wordsList[i]].join(" "))
    }
    return trigramList;
  } else {
    return trigramList;
  }
}
var text_to_bigram_list = function(text){
  var bigramList = [];
  var wordsList = text.split(" ");
  if (wordsList.length > 1){
    for (var i=1; i<wordsList.length; i++){
      bigramList.push([wordsList[i-1], wordsList[i]].join(" "))
    }
    return bigramList;
  } else {
    return bigramList;
  }
}
// word to possible player list
var player_to_word_dict = function(playerList){
  var dict = {};
  if (typeof playerList == 'undefined'){
    alert("You need to select a game first!")
  }
  for (var i=0; i<playerList.length; i++){
    var playerWords = playerList[i].split(" ").map(x => x.toUpperCase());
    for (var j=0; j<playerWords.length; j++){
      if (playerWords[j] in dict) {
        dict[playerWords[j]].push(playerList[i]);
      } else {
        dict[playerWords[j]] = [];
        dict[playerWords[j]].push(playerList[i]);
      }
    }
    dict[playerList[i].toUpperCase()] = [playerList[i]];
  }
  return dict;
}

//PLAYERS TAGGING
var check_players_in_text = function(cleanText, wordHomePlayerDict, wordAwayPlayerDict) {
  var trigramList = text_to_trigram_list(cleanText);
  var homePlayersInList = [];
  var awayPlayersInList = [];
  for (var i=0; i<trigramList.length; i++){
    if (trigramList[i] in wordHomePlayerDict) {
      homePlayersInList.push(wordHomePlayerDict[trigramList[i]][0]);
      cleanText = cleanText.replace(trigramList[i], "");
    }
  }
  for (var i=0; i<trigramList.length; i++){
    if (trigramList[i] in wordAwayPlayerDict) {
      awayPlayersInList.push(wordAwayPlayerDict[trigramList[i]][0]);
      cleanText = cleanText.replace(trigramList[i], "");
    }
  }
  var bigramList = text_to_bigram_list(cleanText);
  for (var i=0; i<bigramList.length; i++){
    if (bigramList[i] in wordHomePlayerDict) {
      if (homePlayersInList.indexOf(bigramList[i]) == -1){
        homePlayersInList.push(wordHomePlayerDict[bigramList[i]][0]);
        cleanText = cleanText.replace(bigramList[i], "");
      }
    }
  }
  for (var i=0; i<bigramList.length; i++){
    if (bigramList[i] in wordAwayPlayerDict) {
      if (awayPlayersInList.indexOf(bigramList[i]) == -1){
        awayPlayersInList.push(wordAwayPlayerDict[bigramList[i]][0]);
        cleanText = cleanText.replace(bigramList[i], "");
      }
    }
  }
  var wordsList = cleanText.split(" ");
  for (var i=0; i<wordsList.length; i++){
    if (wordsList[i] in wordHomePlayerDict) {
      for (var j=0; j<wordHomePlayerDict[wordsList[i]].length; j++){
        if (homePlayersInList.indexOf(wordHomePlayerDict[wordsList[i]][j]) == -1){
          homePlayersInList.push(wordHomePlayerDict[wordsList[i]][j]);
        }
      }
    }
  }
  for (var i=0; i<wordsList.length; i++){
    if (wordsList[i] in wordAwayPlayerDict) {
      for (var j=0; j<wordAwayPlayerDict[wordsList[i]].length; j++){
        if (awayPlayersInList.indexOf(wordAwayPlayerDict[wordsList[i]][j]) == -1){
          awayPlayersInList.push(wordAwayPlayerDict[wordsList[i]][j]);
        }
      }
    }
  }
  return [homePlayersInList, awayPlayersInList];
}

// TEAM NAME TAGGING
var check_team_in_text = function(cleanText) {
  cleanText = cleanText.replace("SIXERS", "76ERS");
  if (((cleanText.indexOf(teamRecordData["homeTeam"]["long_name"].toUpperCase()) > -1 || cleanText.indexOf(teamRecordData["homeTeam"]["name"].toUpperCase()) > -1)        && (cleanText.indexOf(teamRecordData["awayTeam"]["long_name"].toUpperCase()) > -1 || cleanText.indexOf(teamRecordData["awayTeam"]["name"].toUpperCase()) > -1 )) || (cleanText.indexOf("TEAM") > -1) ){
    return "BOTH";
  }
  if (cleanText.indexOf(teamRecordData["homeTeam"]["long_name"].toUpperCase()) > -1 || cleanText.indexOf(teamRecordData["homeTeam"]["name"].toUpperCase()) > -1){
    return "HOME";
  } else if (teamRecordData["awayTeam"]["long_name"]=="LA"){
    if ( cleanText.indexOf(teamRecordData["awayTeam"]["name"].toUpperCase()) > -1){
      return "AWAY";
    } else{
      return "NONE";
    }
  } else if(cleanText.indexOf(teamRecordData["awayTeam"]["long_name"].toUpperCase()) > -1 || cleanText.indexOf(teamRecordData["awayTeam"]["name"].toUpperCase()) > -1){
    return "AWAY";
  } else {
    return "NONE";
  }

}
// STATS TAGGING
var check_stats_type_in_text = function(wordsList, cleanText) {
  cleanText = cleanText.toLowerCase();
  cleanText = cleanText.replace ("three", "3");
  var statsTypeList = [];

  if ((cleanText.indexOf("3 points") > -1 || cleanText.indexOf("3 pointers") > -1 || cleanText.indexOf("3-pointers") > -1 || cleanText.indexOf("3-point") > -1 || cleanText.indexOf("3-pointer") > -1 || cleanText.indexOf("3 point") > -1 || cleanText.indexOf("3 pointer") > -1 || cleanText.indexOf("3pt ") > -1) && (cleanText.indexOf("made") > -1 || cleanText.indexOf("make") > -1)){
    statsTypeList.push("3pm");
  }
  if ((cleanText.indexOf("free throws") > -1 || cleanText.indexOf("free throw") > -1 || cleanText.indexOf("ft ") > -1) && (cleanText.indexOf("made") > -1 || cleanText.indexOf("make") > -1 )){
    statsTypeList.push("ftm");
  }
  if ((cleanText.indexOf("shot") > -1 || cleanText.indexOf("shots") > -1 || cleanText.indexOf("shooting") > -1 || cleanText.indexOf("shoting") > -1 || cleanText.indexOf("field goals") > -1 || cleanText.indexOf("field goal") > -1 || cleanText.indexOf("fg ") > -1) && (cleanText.indexOf("made") > -1 || cleanText.indexOf("make") > -1 )){
    statsTypeList.push("fgm");
  }
  if ((cleanText.indexOf("3 points") > -1 || cleanText.indexOf("3 pointers") > -1 || cleanText.indexOf("3-pointers") > -1 || cleanText.indexOf("3-point") > -1 || cleanText.indexOf("3-pointer") > -1 || cleanText.indexOf("3 point") > -1 || cleanText.indexOf("3 pointer") > -1) && (cleanText.indexOf("missed") > -1 || cleanText.indexOf("miss") > -1)){
    statsTypeList.push("3pmiss");
  }
  if ((cleanText.indexOf("free throws") > -1 || cleanText.indexOf("free throw") > -1 || cleanText.indexOf("ft ") > -1) && (cleanText.indexOf("miss") > -1 || cleanText.indexOf("missed") > -1)){
    statsTypeList.push("ftmiss");
  }
  if ((cleanText.indexOf("shot") > -1 || cleanText.indexOf("shots") > -1 || cleanText.indexOf("shooting") > -1 || cleanText.indexOf("shoting") > -1 || cleanText.indexOf("field goals") > -1 || cleanText.indexOf("field goal") > -1) && (cleanText.indexOf("miss") > -1 || cleanText.indexOf("missed") > -1)){
    statsTypeList.push("fgmiss");
  }
  if ((cleanText.indexOf("3 points") > -1 || cleanText.indexOf("3 pointers") > -1 || cleanText.indexOf("3-pointers") > -1 || cleanText.indexOf("3-point") > -1 || cleanText.indexOf("3-pointer") > -1 || cleanText.indexOf("3 point") > -1 || cleanText.indexOf("3 pointer") > -1) && (cleanText.indexOf("total") > -1 || cleanText.indexOf("attempted") > -1 || cleanText.indexOf("attempt") > -1  || cleanText.indexOf("tried") > -1  || cleanText.indexOf("taken") > -1  || cleanText.indexOf("took") > -1  || cleanText.indexOf("take") > -1)){
    statsTypeList.push("3pa");
  }
  if ((cleanText.indexOf("free throws") > -1 || cleanText.indexOf("free throw") > -1 || cleanText.indexOf("ft ") > -1) && (cleanText.indexOf("total") > -1 || cleanText.indexOf("attempted") > -1 || cleanText.indexOf("attempt") > -1  || cleanText.indexOf("tried") > -1  || cleanText.indexOf("taken") > -1  || cleanText.indexOf("took") > -1  || cleanText.indexOf("take") > -1)){
    statsTypeList.push("fta");
  }
  if ((cleanText.indexOf("shot") > -1 || cleanText.indexOf("shots") > -1 || cleanText.indexOf("shooting") > -1 || cleanText.indexOf("shoting") > -1 || cleanText.indexOf("field goals") > -1 || cleanText.indexOf("field goal") > -1) && (cleanText.indexOf("total") > -1 || cleanText.indexOf("attempted") > -1 || cleanText.indexOf("attempt") > -1  || cleanText.indexOf("tried") > -1  || cleanText.indexOf("taken") > -1  || cleanText.indexOf("took") > -1  || cleanText.indexOf("take") > -1)){
    statsTypeList.push("fga");
  }
  if ((cleanText.indexOf("3 points") > -1 || cleanText.indexOf("3 pointers") > -1 || cleanText.indexOf("3-pointers") > -1 || cleanText.indexOf("3-point") > -1 || cleanText.indexOf("3-pointer") > -1 || cleanText.indexOf("3 point") > -1 || cleanText.indexOf("3 pointer") > -1) && (cleanText.indexOf("percent") > -1 || cleanText.indexOf("percents") > -1 || cleanText.indexOf("accuracy") > -1 || cleanText.indexOf("precise") > -1 || cleanText.indexOf("percentage") > -1 || cleanText.indexOf("percentages") > -1 || cleanText.indexOf("rate") > -1 || cleanText.indexOf("rates") > -1)){
    statsTypeList.push("3pp");
  }
  if ((cleanText.indexOf("free throws") > -1 || cleanText.indexOf("free throw") > -1 || cleanText.indexOf("ft ") > -1) && (cleanText.indexOf("percent") > -1 || cleanText.indexOf("percents") > -1 || cleanText.indexOf("accuracy") > -1 || cleanText.indexOf("precise") > -1 || cleanText.indexOf("percentage") > -1 || cleanText.indexOf("percentages") > -1 || cleanText.indexOf("rate") > -1 || cleanText.indexOf("rates") > -1)){
    statsTypeList.push("ftp");
  }
  if ((cleanText.indexOf("shot") > -1 || cleanText.indexOf("shots") > -1 || cleanText.indexOf("shooting") > -1 || cleanText.indexOf("shoting") > -1 || cleanText.indexOf("field goals") > -1 || cleanText.indexOf("field goal") > -1) && (cleanText.indexOf("percent") > -1 || cleanText.indexOf("percents") > -1 || cleanText.indexOf("accuracy") > -1 || cleanText.indexOf("precise") > -1 || cleanText.indexOf("percentage") > -1 || cleanText.indexOf("percentages") > -1 || cleanText.indexOf("rate") > -1 || cleanText.indexOf("rates") > -1)){
    statsTypeList.push("fgp");
  }
  if (cleanText.indexOf("how long") > -1){
    statsTypeList.push("time");
  }
  if (cleanText.indexOf("3 points") > -1 || cleanText.indexOf("3 pointers") > -1 || cleanText.indexOf("3-pointers") > -1 || cleanText.indexOf("3-point") > -1 || cleanText.indexOf("3-pointer") > -1 || cleanText.indexOf("3 point") > -1 || cleanText.indexOf("3 pointer") > -1 || cleanText.indexOf("3pt ") > -1){
    statsTypeList.push("3pm");
  }
  if (cleanText.indexOf("free throws") > -1 || cleanText.indexOf("free throw") > -1 || cleanText.indexOf("ft ") > -1){
    statsTypeList.push("ftm");
  }
  if (cleanText.indexOf("shot") > -1 || cleanText.indexOf("shots") > -1 || cleanText.indexOf("shooting") > -1 || cleanText.indexOf("shoting") > -1 || cleanText.indexOf("field goals") > -1 || cleanText.indexOf("field goal") > -1 || cleanText.indexOf("fg ") > -1) {
    statsTypeList.push("fgm");
  }

  var statsTypeDict = {
    "score": "pts",
    "scorer": "pts",
    "scores": "pts",
    "scored": "pts",
    "pts": "pts",
    "point": "pts",
    "points": "pts",
    "reb": "reb",
    "rebound": "reb",
    "rebounded": "reb",
    "rebounder": "reb",
    "rebounding": "reb",
    "rebounds": "reb",
    "ast": "ast",
    "assist": "ast",
    "assists": "ast",
    "stl": "stl",
    "steal": "stl",
    "stealer": "stl",
    "steals": "stl",
    "blk": "blk",
    "block": "blk",
    "blocker": "blk",
    "blocks": "blk",
    "foul": "pf",
    "fouled": "pf",
    "fouls": "pf",
    "turnover": "to",
    "turnovers": "to",
    "minutes": "time",
    "minute": "time",
    "time": "time"
  }
  for (var i=0; i<wordsList.length; i++){
    if (wordsList[i].toLowerCase() in statsTypeDict) {
      if (statsTypeDict[wordsList[i].toLowerCase()] == "reb" && cleanText.indexOf("defensive") > -1){
        statsTypeList.push("dreb")
      } else if (statsTypeDict[wordsList[i].toLowerCase()] == "reb" && cleanText.indexOf("offensive") > -1){
        statsTypeList.push("oreb")
      } else{
        statsTypeList.push(statsTypeDict[wordsList[i].toLowerCase()]);
      }
    }
  }
  // console.log(statsTypeList)
  return statsTypeList;
}
// SEASON TAGGING
var check_season_in_text = function(text){
  if (text.indexOf("SEASON") > -1 || text.indexOf("THIS YEAR") > -1 || text.indexOf("SO FAR") > -1 || text.indexOf("THUS FAR") > -1){
    return true;
  }
  return false;
}
// adjs TAGGING
var check_adjs_in_text = function(wordsList){
  var adjsTypeDict = {
    "high": "highest",
    "highest": "highest",
    "maximum": "highest",
    "longest": "highest",
    "mvp": "highest",
    "leading": "highest",
    "led": "highest",
    "leader": "highest",
    "biggest": "highest",
    "best": "highest",
    "most": "highest",
    "lowest": "lowest",
    "low": "lowest",
    "least": "lowest",
    "worst": "lowest",
    "average": "average",
    "averages": "average",
    "mean": "average"
  }
  var adjsTypeList = [];
  for (var i=0; i<wordsList.length; i++){
    if (wordsList[i].toLowerCase() in adjsTypeDict) {
      adjsTypeList.push(adjsTypeDict[wordsList[i].toLowerCase()]);
    }
  }
  return adjsTypeList;
}

//aggregate tags
var aggregate_tags = function(homePlayersInTextList, awayPlayersInTextList, teamNameInText, statsTypeInText, seasonInText, adjWordsInText){
  return {"players": {"homeTeamPlayers": homePlayersInTextList, "awayTeamPlayers": awayPlayersInTextList}, "teams": teamNameInText, "statsTypes": statsTypeInText, "season": seasonInText, "adjWords": adjWordsInText}
}

var tag_text = function(text){
  text = text.toUpperCase();
  var wordsList = text.split(" ").map(x => clean_word(x));
  var cleanText = wordsList.join(" ");
  var wordHomePlayerDict = player_to_word_dict(homeTeamPlayers);
  var wordAwayPlayerDict = player_to_word_dict(awayTeamPlayers);
  var playersInTextResults = check_players_in_text(cleanText, wordHomePlayerDict, wordAwayPlayerDict);
  var homePlayersInTextList = playersInTextResults[0];
  var awayPlayersInTextList = playersInTextResults[1];
  var teamNameInText = check_team_in_text(cleanText);
  var seasonInText = check_season_in_text(cleanText)
  var statsTypeInText = check_stats_type_in_text(wordsList, cleanText);
  var adjWordsInText = check_adjs_in_text(wordsList);
  var aggregatedTagsInText = aggregate_tags(homePlayersInTextList, awayPlayersInTextList, teamNameInText, statsTypeInText, seasonInText, adjWordsInText);
  return aggregatedTagsInText;
}
