var thisGameData;
var awayTeamHistoryRecords;
var homeTeamHistoryRecords;
var awayTeamHomeTeamAllData;
var homeTeamAwayTeamAllData;
var teamRecordData;
var awayColor;
var homeColor;
var homeTeamName;
var awayTeamName;
var combinedTeamName;
var gameYear;
var shotData;
var flowData;
var teamStatsData;
var gameStatsData;
var runKeyEventsData;
var gameArenaName;
var awayTeamRecord;
var awayTeamInnerRecord;
var homeTeamRecord;
var homeTeamInnerRecord;
var awayTeamScore;
var homeTeamScore;
var awayWin;
var halfTeamStatsData;
var homeTeamAllSeasonData;
var awayTeamAllSeasonData;
var homeTeamPlayers;
var awayTeamPlayers;
var statsInsightData;
var totalHomeGameCountSeason;
var totalAwayGameCountSeason;
var team_name_match_dict;
var both_team_stats_abbrev_translate_dict;
var statsInsightData;
var awayTeamTripleDoublePlayers, awayTeamLeadPTSPlayers, awayTeamLeadREBPlayers, awayTeamLeadASTPlayers,  homeTeamTripleDoublePlayers, homeTeamLeadPTSPlayers, homeTeamLeadREBPlayers, homeTeamLeadASTPlayers;
var gameHighlightInsightText;
$(".text-game-option-button").click(function() {
  var thisGameID = $(this).attr('id');
  //initiate global variables
  thisGameData = gameData[thisGameID];
  awayTeamHistoryRecords = thisGameData["away_team_season_data"];
  homeTeamHistoryRecords = thisGameData["home_team_season_data"];
  awayTeamHomeTeamAllData = thisGameData["away_team_home_team_all_data"];
  homeTeamAwayTeamAllData = thisGameData["home_team_away_team_all_data"];
  teamRecordData = thisGameData["team_record_data"];
  awayColor = teamRecordData["awayTeam"]["color"];
  homeColor = teamRecordData["homeTeam"]["color"];
  homeTeamName = teamRecordData["homeTeam"]["long_name"] + " " + teamRecordData["homeTeam"]["name"];
  awayTeamName = teamRecordData["awayTeam"]["long_name"] + " " + teamRecordData["awayTeam"]["name"];
  combinedTeamName = awayTeamName+"-"+homeTeamName;
  gameYear = teamRecordData["gameYear"];
  shotData = thisGameData["shot_data"];
  flowData = thisGameData["flow_data"];
  teamStatsData = thisGameData["team_stats_data"];
  gameStatsData = thisGameData["game_stats_data"];
  halfTeamStatsData = thisGameData["halfTeamStatsData"];
  runKeyEventsData = thisGameData["team_run_key_plays_data"];
  gameArenaName = teamRecordData["gameArenaName"];
  awayTeamRecord = teamRecordData["awayTeam"]["record"];
  awayTeamInnerRecord = teamRecordData["awayTeam"]["inner_record"];
  homeTeamRecord = teamRecordData["homeTeam"]["record"];
  homeTeamInnerRecord = teamRecordData["homeTeam"]["inner_record"];
  awayTeamScore = parseInt(teamRecordData["awayTeam"]["score"]);
  homeTeamScore = parseInt(teamRecordData["homeTeam"]["score"]);
  awayWin = (awayTeamScore > homeTeamScore) ? true : false;
  homeTeamAllSeasonData = seasonData[teamRecordData["homeTeam"]["abbrev"].toLowerCase()]
  awayTeamAllSeasonData = seasonData[teamRecordData["awayTeam"]["abbrev"].toLowerCase()]
  homeTeamPlayers = Object.keys(homeTeamAllSeasonData["player_data"]);
  awayTeamPlayers = Object.keys(awayTeamAllSeasonData["player_data"]);
  statsInsightData = gen_players_stats_insights_data(gameStatsData);
  totalHomeGameCountSeason = parseInt(seasonData[teamRecordData["homeTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["win_count"]) + parseInt(seasonData[teamRecordData["homeTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["lost_count"]);
  totalAwayGameCountSeason = parseInt(seasonData[teamRecordData["awayTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["win_count"]) + parseInt(seasonData[teamRecordData["awayTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["lost_count"]);
  team_name_match_dict = {
    "HOME": homeTeamName,
    "AWAY": awayTeamName
  };
  both_team_stats_abbrev_translate_dict = {
    "HOMEpts":homeTeamScore,
    "HOMEreb":teamStatsData["homeTeamREB"],
    "HOMEoreb":teamStatsData["homeTeamOREB"],
    "HOMEdreb":teamStatsData["homeTeamDREB"],
    "HOMEpf":teamStatsData["homeTeamPF"],
    "HOMEast":teamStatsData["homeTeamAST"],
    "HOMEstl":teamStatsData["homeTeamSTL"],
    "HOMEblk":teamStatsData["homeTeamBLK"],
    "HOMEto":teamStatsData["homeTeamTO"],
    "HOMEftm":teamStatsData["homeTeamFTMade"],
    "HOMEftmiss":teamStatsData["homeTeamFTMiss"],
    "HOMEfta":teamStatsData["homeTeamFTTotal"],
    "HOMEftp":teamStatsData["homeTeamFTRate"],
    "HOME3pm":teamStatsData["homeTeam3PTMade"],
    "HOME3pmiss":teamStatsData["homeTeam3PTMiss"],
    "HOME3pa":teamStatsData["homeTeam3PTTotal"],
    "HOME3pp":teamStatsData["homeTeam3PTRate"],
    "HOMEfgm":teamStatsData["homeTeamFGMade"],
    "HOMEfgmiss":teamStatsData["homeTeamFGMiss"],
    "HOMEfga":teamStatsData["homeTeamFGTotal"],
    "HOMEfgp":teamStatsData["homeTeamFGRate"],
    "AWAYpts":awayTeamScore,
    "AWAYreb":teamStatsData["awayTeamREB"],
    "AWAYoreb":teamStatsData["awayTeamOREB"],
    "AWAYdreb":teamStatsData["awayTeamDREB"],
    "AWAYpf":teamStatsData["awayTeamPF"],
    "AWAYast":teamStatsData["awayTeamAST"],
    "AWAYstl":teamStatsData["awayTeamSTL"],
    "AWAYblk":teamStatsData["awayTeamBLK"],
    "AWAYto":teamStatsData["awayTeamTO"],
    "AWAYftm":teamStatsData["awayTeamFTMade"],
    "AWAYftmiss":teamStatsData["awayTeamFTMiss"],
    "AWAYfta":teamStatsData["awayTeamFTTotal"],
    "AWAYftp":teamStatsData["awayTeamFTRate"],
    "AWAY3pm":teamStatsData["awayTeam3PTMade"],
    "AWAY3pmiss":teamStatsData["awayTeam3PTMiss"],
    "AWAY3pa":teamStatsData["awayTeam3PTTotal"],
    "AWAY3pp":teamStatsData["awayTeam3PTRate"],
    "AWAYfgm":teamStatsData["awayTeamFGMade"],
    "AWAYfgmiss":teamStatsData["awayTeamFGMiss"],
    "AWAYfga":teamStatsData["awayTeamFGTotal"],
    "AWAYfgp":teamStatsData["awayTeamFGRate"]
  };
  statsInsightData = gen_players_stats_insights_data(gameStatsData);
  awayTeamTripleDoublePlayers = statsInsightData[0];
  awayTeamLeadPTSPlayers = statsInsightData[1];
  awayTeamLeadREBPlayers = statsInsightData[2];
  awayTeamLeadASTPlayers = statsInsightData[3];
  homeTeamTripleDoublePlayers = statsInsightData[4];
  homeTeamLeadPTSPlayers = statsInsightData[5];
  homeTeamLeadREBPlayers = statsInsightData[6];
  homeTeamLeadASTPlayers = statsInsightData[7];

  gameHighlightInsightText = get_game_highlight_insight(awayWin, awayTeamTripleDoublePlayers, awayTeamLeadPTSPlayers, homeTeamTripleDoublePlayers, homeTeamLeadPTSPlayers);
  $("#text-chat-output .chat-bot").remove();
  $("#text-chat-output .chat-user").remove();
  $(".text-game-option-button").css("background-color", "#6082e8");
  $(this).css("background-color", "#455da3");
  $("#text-chat-output").append('<div class="chat-bot"><div class="message bot-message">' + gameHighlightInsightText + '</div></div>');
  $("#text-chat-output").append('<div class="chat-bot"><div class="message bot-message">' + teamRecordData["homeTeam"]["name"] + ' players played in this game: ' + Object.keys(gameStatsData["homeTeam"]["players"]).join(", ") + '</div></div>');
  $("#text-chat-output").append('<div class="chat-bot"><div class="message bot-message">' + teamRecordData["awayTeam"]["name"] + ' players played in this game: ' + Object.keys(gameStatsData["awayTeam"]["players"]).join(", ") + '</div></div>');
  $("#text-chat-output").append('<div class="chat-bot"><div class="message bot-message">Ask me any question about this game!</div></div>');
})
$(".visual-game-option-button").click(function() {
  var thisGameID = $(this).attr('id');
  //initiate global variables
  thisGameData = gameData[thisGameID];
  awayTeamHistoryRecords = thisGameData["away_team_season_data"];
  homeTeamHistoryRecords = thisGameData["home_team_season_data"];
  awayTeamHomeTeamAllData = thisGameData["away_team_home_team_all_data"];
  homeTeamAwayTeamAllData = thisGameData["home_team_away_team_all_data"];
  teamRecordData = thisGameData["team_record_data"];
  awayColor = teamRecordData["awayTeam"]["color"];
  homeColor = teamRecordData["homeTeam"]["color"];
  homeTeamName = teamRecordData["homeTeam"]["long_name"] + " " + teamRecordData["homeTeam"]["name"];
  awayTeamName = teamRecordData["awayTeam"]["long_name"] + " " + teamRecordData["awayTeam"]["name"];
  combinedTeamName = awayTeamName+"-"+homeTeamName;
  gameYear = teamRecordData["gameYear"];
  shotData = thisGameData["shot_data"];
  flowData = thisGameData["flow_data"];
  teamStatsData = thisGameData["team_stats_data"];
  gameStatsData = thisGameData["game_stats_data"];
  halfTeamStatsData = thisGameData["halfTeamStatsData"];
  runKeyEventsData = thisGameData["team_run_key_plays_data"];
  gameArenaName = teamRecordData["gameArenaName"];
  awayTeamRecord = teamRecordData["awayTeam"]["record"];
  awayTeamInnerRecord = teamRecordData["awayTeam"]["inner_record"];
  homeTeamRecord = teamRecordData["homeTeam"]["record"];
  homeTeamInnerRecord = teamRecordData["homeTeam"]["inner_record"];
  awayTeamScore = parseInt(teamRecordData["awayTeam"]["score"]);
  homeTeamScore = parseInt(teamRecordData["homeTeam"]["score"]);
  awayWin = (awayTeamScore > homeTeamScore) ? true : false;
  homeTeamAllSeasonData = seasonData[teamRecordData["homeTeam"]["abbrev"].toLowerCase()]
  awayTeamAllSeasonData = seasonData[teamRecordData["awayTeam"]["abbrev"].toLowerCase()]
  homeTeamPlayers = Object.keys(homeTeamAllSeasonData["player_data"]);
  awayTeamPlayers = Object.keys(awayTeamAllSeasonData["player_data"]);
  statsInsightData = gen_players_stats_insights_data(gameStatsData);
  totalHomeGameCountSeason = parseInt(seasonData[teamRecordData["homeTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["win_count"]) + parseInt(seasonData[teamRecordData["homeTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["lost_count"]);
  totalAwayGameCountSeason = parseInt(seasonData[teamRecordData["awayTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["win_count"]) + parseInt(seasonData[teamRecordData["awayTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["lost_count"]);
  team_name_match_dict = {
    "HOME": homeTeamName,
    "AWAY": awayTeamName
  };
  both_team_stats_abbrev_translate_dict = {
    "HOMEpts":homeTeamScore,
    "HOMEreb":teamStatsData["homeTeamREB"],
    "HOMEoreb":teamStatsData["homeTeamOREB"],
    "HOMEdreb":teamStatsData["homeTeamDREB"],
    "HOMEpf":teamStatsData["homeTeamPF"],
    "HOMEast":teamStatsData["homeTeamAST"],
    "HOMEstl":teamStatsData["homeTeamSTL"],
    "HOMEblk":teamStatsData["homeTeamBLK"],
    "HOMEto":teamStatsData["homeTeamTO"],
    "HOMEftm":teamStatsData["homeTeamFTMade"],
    "HOMEftmiss":teamStatsData["homeTeamFTMiss"],
    "HOMEfta":teamStatsData["homeTeamFTTotal"],
    "HOMEftp":teamStatsData["homeTeamFTRate"],
    "HOME3pm":teamStatsData["homeTeam3PTMade"],
    "HOME3pmiss":teamStatsData["homeTeam3PTMiss"],
    "HOME3pa":teamStatsData["homeTeam3PTTotal"],
    "HOME3pp":teamStatsData["homeTeam3PTRate"],
    "HOMEfgm":teamStatsData["homeTeamFGMade"],
    "HOMEfgmiss":teamStatsData["homeTeamFGMiss"],
    "HOMEfga":teamStatsData["homeTeamFGTotal"],
    "HOMEfgp":teamStatsData["homeTeamFGRate"],
    "AWAYpts":awayTeamScore,
    "AWAYreb":teamStatsData["awayTeamREB"],
    "AWAYoreb":teamStatsData["awayTeamOREB"],
    "AWAYdreb":teamStatsData["awayTeamDREB"],
    "AWAYpf":teamStatsData["awayTeamPF"],
    "AWAYast":teamStatsData["awayTeamAST"],
    "AWAYstl":teamStatsData["awayTeamSTL"],
    "AWAYblk":teamStatsData["awayTeamBLK"],
    "AWAYto":teamStatsData["awayTeamTO"],
    "AWAYftm":teamStatsData["awayTeamFTMade"],
    "AWAYftmiss":teamStatsData["awayTeamFTMiss"],
    "AWAYfta":teamStatsData["awayTeamFTTotal"],
    "AWAYftp":teamStatsData["awayTeamFTRate"],
    "AWAY3pm":teamStatsData["awayTeam3PTMade"],
    "AWAY3pmiss":teamStatsData["awayTeam3PTMiss"],
    "AWAY3pa":teamStatsData["awayTeam3PTTotal"],
    "AWAY3pp":teamStatsData["awayTeam3PTRate"],
    "AWAYfgm":teamStatsData["awayTeamFGMade"],
    "AWAYfgmiss":teamStatsData["awayTeamFGMiss"],
    "AWAYfga":teamStatsData["awayTeamFGTotal"],
    "AWAYfgp":teamStatsData["awayTeamFGRate"]
  };
  statsInsightData = gen_players_stats_insights_data(gameStatsData);
  awayTeamTripleDoublePlayers = statsInsightData[0];
  awayTeamLeadPTSPlayers = statsInsightData[1];
  awayTeamLeadREBPlayers = statsInsightData[2];
  awayTeamLeadASTPlayers = statsInsightData[3];
  homeTeamTripleDoublePlayers = statsInsightData[4];
  homeTeamLeadPTSPlayers = statsInsightData[5];
  homeTeamLeadREBPlayers = statsInsightData[6];
  homeTeamLeadASTPlayers = statsInsightData[7];

  gameHighlightInsightText = get_game_highlight_insight(awayWin, awayTeamTripleDoublePlayers, awayTeamLeadPTSPlayers, homeTeamTripleDoublePlayers, homeTeamLeadPTSPlayers);
  $("#visual-chat-output .chat-bot").remove();
  $("#visual-chat-output .chat-user").remove();
  $(".visual-game-option-button").css("background-color", "#6082e8");
  $(this).css("background-color", "#455da3");
  $("#visual-chat-output").append('<div class="chat-bot"><div class="message bot-message">' + gameHighlightInsightText + '</div></div>');
  $("#visual-chat-output").append('<div class="chat-bot"><div class="message bot-message">' + teamRecordData["homeTeam"]["name"] + ' players played in this game: ' + Object.keys(gameStatsData["homeTeam"]["players"]).join(", ") + '</div></div>');
  $("#visual-chat-output").append('<div class="chat-bot"><div class="message bot-message">' + teamRecordData["awayTeam"]["name"] + ' players played in this game: ' + Object.keys(gameStatsData["awayTeam"]["players"]).join(", ") + '</div></div>');
  $("#visual-chat-output").append('<div class="chat-bot"><div class="message bot-message">Ask me any question about this game!</div></div>');
})
$(".intervisual-game-option-button").click(function() {
  var thisGameID = $(this).attr('id');
  //initiate global variables
  thisGameData = gameData[thisGameID];
  awayTeamHistoryRecords = thisGameData["away_team_season_data"];
  homeTeamHistoryRecords = thisGameData["home_team_season_data"];
  awayTeamHomeTeamAllData = thisGameData["away_team_home_team_all_data"];
  homeTeamAwayTeamAllData = thisGameData["home_team_away_team_all_data"];
  teamRecordData = thisGameData["team_record_data"];
  awayColor = teamRecordData["awayTeam"]["color"];
  homeColor = teamRecordData["homeTeam"]["color"];
  homeTeamName = teamRecordData["homeTeam"]["long_name"] + " " + teamRecordData["homeTeam"]["name"];
  awayTeamName = teamRecordData["awayTeam"]["long_name"] + " " + teamRecordData["awayTeam"]["name"];
  combinedTeamName = awayTeamName+"-"+homeTeamName;
  gameYear = teamRecordData["gameYear"];
  shotData = thisGameData["shot_data"];
  flowData = thisGameData["flow_data"];
  teamStatsData = thisGameData["team_stats_data"];
  gameStatsData = thisGameData["game_stats_data"];
  halfTeamStatsData = thisGameData["halfTeamStatsData"];
  runKeyEventsData = thisGameData["team_run_key_plays_data"];
  gameArenaName = teamRecordData["gameArenaName"];
  awayTeamRecord = teamRecordData["awayTeam"]["record"];
  awayTeamInnerRecord = teamRecordData["awayTeam"]["inner_record"];
  homeTeamRecord = teamRecordData["homeTeam"]["record"];
  homeTeamInnerRecord = teamRecordData["homeTeam"]["inner_record"];
  awayTeamScore = parseInt(teamRecordData["awayTeam"]["score"]);
  homeTeamScore = parseInt(teamRecordData["homeTeam"]["score"]);
  awayWin = (awayTeamScore > homeTeamScore) ? true : false;
  homeTeamAllSeasonData = seasonData[teamRecordData["homeTeam"]["abbrev"].toLowerCase()]
  awayTeamAllSeasonData = seasonData[teamRecordData["awayTeam"]["abbrev"].toLowerCase()]
  homeTeamPlayers = Object.keys(homeTeamAllSeasonData["player_data"]);
  awayTeamPlayers = Object.keys(awayTeamAllSeasonData["player_data"]);
  statsInsightData = gen_players_stats_insights_data(gameStatsData);
  totalHomeGameCountSeason = parseInt(seasonData[teamRecordData["homeTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["win_count"]) + parseInt(seasonData[teamRecordData["homeTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["lost_count"]);
  totalAwayGameCountSeason = parseInt(seasonData[teamRecordData["awayTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["win_count"]) + parseInt(seasonData[teamRecordData["awayTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["lost_count"]);
  team_name_match_dict = {
    "HOME": homeTeamName,
    "AWAY": awayTeamName
  };
  both_team_stats_abbrev_translate_dict = {
    "HOMEpts":homeTeamScore,
    "HOMEreb":teamStatsData["homeTeamREB"],
    "HOMEoreb":teamStatsData["homeTeamOREB"],
    "HOMEdreb":teamStatsData["homeTeamDREB"],
    "HOMEpf":teamStatsData["homeTeamPF"],
    "HOMEast":teamStatsData["homeTeamAST"],
    "HOMEstl":teamStatsData["homeTeamSTL"],
    "HOMEblk":teamStatsData["homeTeamBLK"],
    "HOMEto":teamStatsData["homeTeamTO"],
    "HOMEftm":teamStatsData["homeTeamFTMade"],
    "HOMEftmiss":teamStatsData["homeTeamFTMiss"],
    "HOMEfta":teamStatsData["homeTeamFTTotal"],
    "HOMEftp":teamStatsData["homeTeamFTRate"],
    "HOME3pm":teamStatsData["homeTeam3PTMade"],
    "HOME3pmiss":teamStatsData["homeTeam3PTMiss"],
    "HOME3pa":teamStatsData["homeTeam3PTTotal"],
    "HOME3pp":teamStatsData["homeTeam3PTRate"],
    "HOMEfgm":teamStatsData["homeTeamFGMade"],
    "HOMEfgmiss":teamStatsData["homeTeamFGMiss"],
    "HOMEfga":teamStatsData["homeTeamFGTotal"],
    "HOMEfgp":teamStatsData["homeTeamFGRate"],
    "AWAYpts":awayTeamScore,
    "AWAYreb":teamStatsData["awayTeamREB"],
    "AWAYoreb":teamStatsData["awayTeamOREB"],
    "AWAYdreb":teamStatsData["awayTeamDREB"],
    "AWAYpf":teamStatsData["awayTeamPF"],
    "AWAYast":teamStatsData["awayTeamAST"],
    "AWAYstl":teamStatsData["awayTeamSTL"],
    "AWAYblk":teamStatsData["awayTeamBLK"],
    "AWAYto":teamStatsData["awayTeamTO"],
    "AWAYftm":teamStatsData["awayTeamFTMade"],
    "AWAYftmiss":teamStatsData["awayTeamFTMiss"],
    "AWAYfta":teamStatsData["awayTeamFTTotal"],
    "AWAYftp":teamStatsData["awayTeamFTRate"],
    "AWAY3pm":teamStatsData["awayTeam3PTMade"],
    "AWAY3pmiss":teamStatsData["awayTeam3PTMiss"],
    "AWAY3pa":teamStatsData["awayTeam3PTTotal"],
    "AWAY3pp":teamStatsData["awayTeam3PTRate"],
    "AWAYfgm":teamStatsData["awayTeamFGMade"],
    "AWAYfgmiss":teamStatsData["awayTeamFGMiss"],
    "AWAYfga":teamStatsData["awayTeamFGTotal"],
    "AWAYfgp":teamStatsData["awayTeamFGRate"]
  };
  statsInsightData = gen_players_stats_insights_data(gameStatsData);
  awayTeamTripleDoublePlayers = statsInsightData[0];
  awayTeamLeadPTSPlayers = statsInsightData[1];
  awayTeamLeadREBPlayers = statsInsightData[2];
  awayTeamLeadASTPlayers = statsInsightData[3];
  homeTeamTripleDoublePlayers = statsInsightData[4];
  homeTeamLeadPTSPlayers = statsInsightData[5];
  homeTeamLeadREBPlayers = statsInsightData[6];
  homeTeamLeadASTPlayers = statsInsightData[7];

  gameHighlightInsightText = get_game_highlight_insight(awayWin, awayTeamTripleDoublePlayers, awayTeamLeadPTSPlayers, homeTeamTripleDoublePlayers, homeTeamLeadPTSPlayers);
  $("#intervisual-chat-output .chat-bot").remove();
  $("#intervisual-chat-output .chat-user").remove();
  $(".intervisual-game-option-button").css("background-color", "#6082e8");
  $(this).css("background-color", "#455da3");
  $("#intervisual-chat-output").append('<div class="chat-bot"><div class="message bot-message">' + gameHighlightInsightText + '</div></div>');
  $("#intervisual-chat-output").append('<div class="chat-bot"><div class="message bot-message">' + teamRecordData["homeTeam"]["name"] + ' players played in this game: ' + Object.keys(gameStatsData["homeTeam"]["players"]).join(", ") + '</div></div>');
  $("#intervisual-chat-output").append('<div class="chat-bot"><div class="message bot-message">' + teamRecordData["awayTeam"]["name"] + ' players played in this game: ' + Object.keys(gameStatsData["awayTeam"]["players"]).join(", ") + '</div></div>');
  $("#intervisual-chat-output").append('<div class="chat-bot"><div class="message bot-message">Ask me any question about this game!</div></div>');
})

$(".text-tutorial-game-option-button").click(function() {
  var thisGameID = $(this).attr('id');
  //initiate global variables
  thisGameData = gameData[thisGameID];
  awayTeamHistoryRecords = thisGameData["away_team_season_data"];
  homeTeamHistoryRecords = thisGameData["home_team_season_data"];
  awayTeamHomeTeamAllData = thisGameData["away_team_home_team_all_data"];
  homeTeamAwayTeamAllData = thisGameData["home_team_away_team_all_data"];
  teamRecordData = thisGameData["team_record_data"];
  awayColor = teamRecordData["awayTeam"]["color"];
  homeColor = teamRecordData["homeTeam"]["color"];
  homeTeamName = teamRecordData["homeTeam"]["long_name"] + " " + teamRecordData["homeTeam"]["name"];
  awayTeamName = teamRecordData["awayTeam"]["long_name"] + " " + teamRecordData["awayTeam"]["name"];
  combinedTeamName = awayTeamName+"-"+homeTeamName;
  gameYear = teamRecordData["gameYear"];
  shotData = thisGameData["shot_data"];
  flowData = thisGameData["flow_data"];
  teamStatsData = thisGameData["team_stats_data"];
  gameStatsData = thisGameData["game_stats_data"];
  halfTeamStatsData = thisGameData["halfTeamStatsData"];
  runKeyEventsData = thisGameData["team_run_key_plays_data"];
  gameArenaName = teamRecordData["gameArenaName"];
  awayTeamRecord = teamRecordData["awayTeam"]["record"];
  awayTeamInnerRecord = teamRecordData["awayTeam"]["inner_record"];
  homeTeamRecord = teamRecordData["homeTeam"]["record"];
  homeTeamInnerRecord = teamRecordData["homeTeam"]["inner_record"];
  awayTeamScore = parseInt(teamRecordData["awayTeam"]["score"]);
  homeTeamScore = parseInt(teamRecordData["homeTeam"]["score"]);
  awayWin = (awayTeamScore > homeTeamScore) ? true : false;
  homeTeamAllSeasonData = seasonData[teamRecordData["homeTeam"]["abbrev"].toLowerCase()]
  awayTeamAllSeasonData = seasonData[teamRecordData["awayTeam"]["abbrev"].toLowerCase()]
  homeTeamPlayers = Object.keys(homeTeamAllSeasonData["player_data"]);
  awayTeamPlayers = Object.keys(awayTeamAllSeasonData["player_data"]);
  statsInsightData = gen_players_stats_insights_data(gameStatsData);
  totalHomeGameCountSeason = parseInt(seasonData[teamRecordData["homeTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["win_count"]) + parseInt(seasonData[teamRecordData["homeTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["lost_count"]);
  totalAwayGameCountSeason = parseInt(seasonData[teamRecordData["awayTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["win_count"]) + parseInt(seasonData[teamRecordData["awayTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["lost_count"]);
  team_name_match_dict = {
    "HOME": homeTeamName,
    "AWAY": awayTeamName
  };
  both_team_stats_abbrev_translate_dict = {
    "HOMEpts":homeTeamScore,
    "HOMEreb":teamStatsData["homeTeamREB"],
    "HOMEoreb":teamStatsData["homeTeamOREB"],
    "HOMEdreb":teamStatsData["homeTeamDREB"],
    "HOMEpf":teamStatsData["homeTeamPF"],
    "HOMEast":teamStatsData["homeTeamAST"],
    "HOMEstl":teamStatsData["homeTeamSTL"],
    "HOMEblk":teamStatsData["homeTeamBLK"],
    "HOMEto":teamStatsData["homeTeamTO"],
    "HOMEftm":teamStatsData["homeTeamFTMade"],
    "HOMEftmiss":teamStatsData["homeTeamFTMiss"],
    "HOMEfta":teamStatsData["homeTeamFTTotal"],
    "HOMEftp":teamStatsData["homeTeamFTRate"],
    "HOME3pm":teamStatsData["homeTeam3PTMade"],
    "HOME3pmiss":teamStatsData["homeTeam3PTMiss"],
    "HOME3pa":teamStatsData["homeTeam3PTTotal"],
    "HOME3pp":teamStatsData["homeTeam3PTRate"],
    "HOMEfgm":teamStatsData["homeTeamFGMade"],
    "HOMEfgmiss":teamStatsData["homeTeamFGMiss"],
    "HOMEfga":teamStatsData["homeTeamFGTotal"],
    "HOMEfgp":teamStatsData["homeTeamFGRate"],
    "AWAYpts":awayTeamScore,
    "AWAYreb":teamStatsData["awayTeamREB"],
    "AWAYoreb":teamStatsData["awayTeamOREB"],
    "AWAYdreb":teamStatsData["awayTeamDREB"],
    "AWAYpf":teamStatsData["awayTeamPF"],
    "AWAYast":teamStatsData["awayTeamAST"],
    "AWAYstl":teamStatsData["awayTeamSTL"],
    "AWAYblk":teamStatsData["awayTeamBLK"],
    "AWAYto":teamStatsData["awayTeamTO"],
    "AWAYftm":teamStatsData["awayTeamFTMade"],
    "AWAYftmiss":teamStatsData["awayTeamFTMiss"],
    "AWAYfta":teamStatsData["awayTeamFTTotal"],
    "AWAYftp":teamStatsData["awayTeamFTRate"],
    "AWAY3pm":teamStatsData["awayTeam3PTMade"],
    "AWAY3pmiss":teamStatsData["awayTeam3PTMiss"],
    "AWAY3pa":teamStatsData["awayTeam3PTTotal"],
    "AWAY3pp":teamStatsData["awayTeam3PTRate"],
    "AWAYfgm":teamStatsData["awayTeamFGMade"],
    "AWAYfgmiss":teamStatsData["awayTeamFGMiss"],
    "AWAYfga":teamStatsData["awayTeamFGTotal"],
    "AWAYfgp":teamStatsData["awayTeamFGRate"]
  };
  statsInsightData = gen_players_stats_insights_data(gameStatsData);
  awayTeamTripleDoublePlayers = statsInsightData[0];
  awayTeamLeadPTSPlayers = statsInsightData[1];
  awayTeamLeadREBPlayers = statsInsightData[2];
  awayTeamLeadASTPlayers = statsInsightData[3];
  homeTeamTripleDoublePlayers = statsInsightData[4];
  homeTeamLeadPTSPlayers = statsInsightData[5];
  homeTeamLeadREBPlayers = statsInsightData[6];
  homeTeamLeadASTPlayers = statsInsightData[7];

  gameHighlightInsightText = get_game_highlight_insight(awayWin, awayTeamTripleDoublePlayers, awayTeamLeadPTSPlayers, homeTeamTripleDoublePlayers, homeTeamLeadPTSPlayers);
  $("#text-tutorial-chat-output .chat-bot").remove();
  $("#text-tutorial-chat-output .chat-user").remove();
  $(".text-tutorial-game-option-button").css("background-color", "#6082e8");
  $(this).css("background-color", "#455da3");
  $("#text-tutorial-chat-output").append('<div class="chat-bot"><div class="message bot-message">' + gameHighlightInsightText + '</div></div>');
  $("#text-tutorial-chat-output").append('<div class="chat-bot"><div class="message bot-message">' + teamRecordData["homeTeam"]["name"] + ' players played in this game: ' + Object.keys(gameStatsData["homeTeam"]["players"]).join(", ") + '</div></div>');
  $("#text-tutorial-chat-output").append('<div class="chat-bot"><div class="message bot-message">' + teamRecordData["awayTeam"]["name"] + ' players played in this game: ' + Object.keys(gameStatsData["awayTeam"]["players"]).join(", ") + '</div></div>');
  $("#text-tutorial-chat-output").append('<div class="chat-bot"><div class="message bot-message">Ask me any question about this game!</div></div>');
})
$(".visual-tutorial-game-option-button").click(function() {
  var thisGameID = $(this).attr('id');
  //initiate global variables
  thisGameData = gameData[thisGameID];
  awayTeamHistoryRecords = thisGameData["away_team_season_data"];
  homeTeamHistoryRecords = thisGameData["home_team_season_data"];
  awayTeamHomeTeamAllData = thisGameData["away_team_home_team_all_data"];
  homeTeamAwayTeamAllData = thisGameData["home_team_away_team_all_data"];
  teamRecordData = thisGameData["team_record_data"];
  awayColor = teamRecordData["awayTeam"]["color"];
  homeColor = teamRecordData["homeTeam"]["color"];
  homeTeamName = teamRecordData["homeTeam"]["long_name"] + " " + teamRecordData["homeTeam"]["name"];
  awayTeamName = teamRecordData["awayTeam"]["long_name"] + " " + teamRecordData["awayTeam"]["name"];
  combinedTeamName = awayTeamName+"-"+homeTeamName;
  gameYear = teamRecordData["gameYear"];
  shotData = thisGameData["shot_data"];
  flowData = thisGameData["flow_data"];
  teamStatsData = thisGameData["team_stats_data"];
  gameStatsData = thisGameData["game_stats_data"];
  halfTeamStatsData = thisGameData["halfTeamStatsData"];
  runKeyEventsData = thisGameData["team_run_key_plays_data"];
  gameArenaName = teamRecordData["gameArenaName"];
  awayTeamRecord = teamRecordData["awayTeam"]["record"];
  awayTeamInnerRecord = teamRecordData["awayTeam"]["inner_record"];
  homeTeamRecord = teamRecordData["homeTeam"]["record"];
  homeTeamInnerRecord = teamRecordData["homeTeam"]["inner_record"];
  awayTeamScore = parseInt(teamRecordData["awayTeam"]["score"]);
  homeTeamScore = parseInt(teamRecordData["homeTeam"]["score"]);
  awayWin = (awayTeamScore > homeTeamScore) ? true : false;
  homeTeamAllSeasonData = seasonData[teamRecordData["homeTeam"]["abbrev"].toLowerCase()]
  awayTeamAllSeasonData = seasonData[teamRecordData["awayTeam"]["abbrev"].toLowerCase()]
  homeTeamPlayers = Object.keys(homeTeamAllSeasonData["player_data"]);
  awayTeamPlayers = Object.keys(awayTeamAllSeasonData["player_data"]);
  statsInsightData = gen_players_stats_insights_data(gameStatsData);
  totalHomeGameCountSeason = parseInt(seasonData[teamRecordData["homeTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["win_count"]) + parseInt(seasonData[teamRecordData["homeTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["lost_count"]);
  totalAwayGameCountSeason = parseInt(seasonData[teamRecordData["awayTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["win_count"]) + parseInt(seasonData[teamRecordData["awayTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["lost_count"]);
  team_name_match_dict = {
    "HOME": homeTeamName,
    "AWAY": awayTeamName
  };
  both_team_stats_abbrev_translate_dict = {
    "HOMEpts":homeTeamScore,
    "HOMEreb":teamStatsData["homeTeamREB"],
    "HOMEoreb":teamStatsData["homeTeamOREB"],
    "HOMEdreb":teamStatsData["homeTeamDREB"],
    "HOMEpf":teamStatsData["homeTeamPF"],
    "HOMEast":teamStatsData["homeTeamAST"],
    "HOMEstl":teamStatsData["homeTeamSTL"],
    "HOMEblk":teamStatsData["homeTeamBLK"],
    "HOMEto":teamStatsData["homeTeamTO"],
    "HOMEftm":teamStatsData["homeTeamFTMade"],
    "HOMEftmiss":teamStatsData["homeTeamFTMiss"],
    "HOMEfta":teamStatsData["homeTeamFTTotal"],
    "HOMEftp":teamStatsData["homeTeamFTRate"],
    "HOME3pm":teamStatsData["homeTeam3PTMade"],
    "HOME3pmiss":teamStatsData["homeTeam3PTMiss"],
    "HOME3pa":teamStatsData["homeTeam3PTTotal"],
    "HOME3pp":teamStatsData["homeTeam3PTRate"],
    "HOMEfgm":teamStatsData["homeTeamFGMade"],
    "HOMEfgmiss":teamStatsData["homeTeamFGMiss"],
    "HOMEfga":teamStatsData["homeTeamFGTotal"],
    "HOMEfgp":teamStatsData["homeTeamFGRate"],
    "AWAYpts":awayTeamScore,
    "AWAYreb":teamStatsData["awayTeamREB"],
    "AWAYoreb":teamStatsData["awayTeamOREB"],
    "AWAYdreb":teamStatsData["awayTeamDREB"],
    "AWAYpf":teamStatsData["awayTeamPF"],
    "AWAYast":teamStatsData["awayTeamAST"],
    "AWAYstl":teamStatsData["awayTeamSTL"],
    "AWAYblk":teamStatsData["awayTeamBLK"],
    "AWAYto":teamStatsData["awayTeamTO"],
    "AWAYftm":teamStatsData["awayTeamFTMade"],
    "AWAYftmiss":teamStatsData["awayTeamFTMiss"],
    "AWAYfta":teamStatsData["awayTeamFTTotal"],
    "AWAYftp":teamStatsData["awayTeamFTRate"],
    "AWAY3pm":teamStatsData["awayTeam3PTMade"],
    "AWAY3pmiss":teamStatsData["awayTeam3PTMiss"],
    "AWAY3pa":teamStatsData["awayTeam3PTTotal"],
    "AWAY3pp":teamStatsData["awayTeam3PTRate"],
    "AWAYfgm":teamStatsData["awayTeamFGMade"],
    "AWAYfgmiss":teamStatsData["awayTeamFGMiss"],
    "AWAYfga":teamStatsData["awayTeamFGTotal"],
    "AWAYfgp":teamStatsData["awayTeamFGRate"]
  };
  statsInsightData = gen_players_stats_insights_data(gameStatsData);
  awayTeamTripleDoublePlayers = statsInsightData[0];
  awayTeamLeadPTSPlayers = statsInsightData[1];
  awayTeamLeadREBPlayers = statsInsightData[2];
  awayTeamLeadASTPlayers = statsInsightData[3];
  homeTeamTripleDoublePlayers = statsInsightData[4];
  homeTeamLeadPTSPlayers = statsInsightData[5];
  homeTeamLeadREBPlayers = statsInsightData[6];
  homeTeamLeadASTPlayers = statsInsightData[7];

  gameHighlightInsightText = get_game_highlight_insight(awayWin, awayTeamTripleDoublePlayers, awayTeamLeadPTSPlayers, homeTeamTripleDoublePlayers, homeTeamLeadPTSPlayers);
  $("#visual-tutorial-chat-output .chat-bot").remove();
  $("#visual-tutorial-chat-output .chat-user").remove();
  $(".visual-tutorial-game-option-button").css("background-color", "#6082e8");
  $(this).css("background-color", "#455da3");
  $("#visual-tutorial-chat-output").append('<div class="chat-bot"><div class="message bot-message">' + gameHighlightInsightText + '</div></div>');
  $("#visual-tutorial-chat-output").append('<div class="chat-bot"><div class="message bot-message">' + teamRecordData["homeTeam"]["name"] + ' players played in this game: ' + Object.keys(gameStatsData["homeTeam"]["players"]).join(", ") + '</div></div>');
  $("#visual-tutorial-chat-output").append('<div class="chat-bot"><div class="message bot-message">' + teamRecordData["awayTeam"]["name"] + ' players played in this game: ' + Object.keys(gameStatsData["awayTeam"]["players"]).join(", ") + '</div></div>');
  $("#visual-tutorial-chat-output").append('<div class="chat-bot"><div class="message bot-message">Ask me any question about this game!</div></div>');
})
$(".intervisual-tutorial-game-option-button").click(function() {
  var thisGameID = $(this).attr('id');
  //initiate global variables
  thisGameData = gameData[thisGameID];
  awayTeamHistoryRecords = thisGameData["away_team_season_data"];
  homeTeamHistoryRecords = thisGameData["home_team_season_data"];
  awayTeamHomeTeamAllData = thisGameData["away_team_home_team_all_data"];
  homeTeamAwayTeamAllData = thisGameData["home_team_away_team_all_data"];
  teamRecordData = thisGameData["team_record_data"];
  awayColor = teamRecordData["awayTeam"]["color"];
  homeColor = teamRecordData["homeTeam"]["color"];
  homeTeamName = teamRecordData["homeTeam"]["long_name"] + " " + teamRecordData["homeTeam"]["name"];
  awayTeamName = teamRecordData["awayTeam"]["long_name"] + " " + teamRecordData["awayTeam"]["name"];
  combinedTeamName = awayTeamName+"-"+homeTeamName;
  gameYear = teamRecordData["gameYear"];
  shotData = thisGameData["shot_data"];
  flowData = thisGameData["flow_data"];
  teamStatsData = thisGameData["team_stats_data"];
  gameStatsData = thisGameData["game_stats_data"];
  halfTeamStatsData = thisGameData["halfTeamStatsData"];
  runKeyEventsData = thisGameData["team_run_key_plays_data"];
  gameArenaName = teamRecordData["gameArenaName"];
  awayTeamRecord = teamRecordData["awayTeam"]["record"];
  awayTeamInnerRecord = teamRecordData["awayTeam"]["inner_record"];
  homeTeamRecord = teamRecordData["homeTeam"]["record"];
  homeTeamInnerRecord = teamRecordData["homeTeam"]["inner_record"];
  awayTeamScore = parseInt(teamRecordData["awayTeam"]["score"]);
  homeTeamScore = parseInt(teamRecordData["homeTeam"]["score"]);
  awayWin = (awayTeamScore > homeTeamScore) ? true : false;
  homeTeamAllSeasonData = seasonData[teamRecordData["homeTeam"]["abbrev"].toLowerCase()]
  awayTeamAllSeasonData = seasonData[teamRecordData["awayTeam"]["abbrev"].toLowerCase()]
  homeTeamPlayers = Object.keys(homeTeamAllSeasonData["player_data"]);
  awayTeamPlayers = Object.keys(awayTeamAllSeasonData["player_data"]);
  statsInsightData = gen_players_stats_insights_data(gameStatsData);
  totalHomeGameCountSeason = parseInt(seasonData[teamRecordData["homeTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["win_count"]) + parseInt(seasonData[teamRecordData["homeTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["lost_count"]);
  totalAwayGameCountSeason = parseInt(seasonData[teamRecordData["awayTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["win_count"]) + parseInt(seasonData[teamRecordData["awayTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["lost_count"]);
  team_name_match_dict = {
    "HOME": homeTeamName,
    "AWAY": awayTeamName
  };
  both_team_stats_abbrev_translate_dict = {
    "HOMEpts":homeTeamScore,
    "HOMEreb":teamStatsData["homeTeamREB"],
    "HOMEoreb":teamStatsData["homeTeamOREB"],
    "HOMEdreb":teamStatsData["homeTeamDREB"],
    "HOMEpf":teamStatsData["homeTeamPF"],
    "HOMEast":teamStatsData["homeTeamAST"],
    "HOMEstl":teamStatsData["homeTeamSTL"],
    "HOMEblk":teamStatsData["homeTeamBLK"],
    "HOMEto":teamStatsData["homeTeamTO"],
    "HOMEftm":teamStatsData["homeTeamFTMade"],
    "HOMEftmiss":teamStatsData["homeTeamFTMiss"],
    "HOMEfta":teamStatsData["homeTeamFTTotal"],
    "HOMEftp":teamStatsData["homeTeamFTRate"],
    "HOME3pm":teamStatsData["homeTeam3PTMade"],
    "HOME3pmiss":teamStatsData["homeTeam3PTMiss"],
    "HOME3pa":teamStatsData["homeTeam3PTTotal"],
    "HOME3pp":teamStatsData["homeTeam3PTRate"],
    "HOMEfgm":teamStatsData["homeTeamFGMade"],
    "HOMEfgmiss":teamStatsData["homeTeamFGMiss"],
    "HOMEfga":teamStatsData["homeTeamFGTotal"],
    "HOMEfgp":teamStatsData["homeTeamFGRate"],
    "AWAYpts":awayTeamScore,
    "AWAYreb":teamStatsData["awayTeamREB"],
    "AWAYoreb":teamStatsData["awayTeamOREB"],
    "AWAYdreb":teamStatsData["awayTeamDREB"],
    "AWAYpf":teamStatsData["awayTeamPF"],
    "AWAYast":teamStatsData["awayTeamAST"],
    "AWAYstl":teamStatsData["awayTeamSTL"],
    "AWAYblk":teamStatsData["awayTeamBLK"],
    "AWAYto":teamStatsData["awayTeamTO"],
    "AWAYftm":teamStatsData["awayTeamFTMade"],
    "AWAYftmiss":teamStatsData["awayTeamFTMiss"],
    "AWAYfta":teamStatsData["awayTeamFTTotal"],
    "AWAYftp":teamStatsData["awayTeamFTRate"],
    "AWAY3pm":teamStatsData["awayTeam3PTMade"],
    "AWAY3pmiss":teamStatsData["awayTeam3PTMiss"],
    "AWAY3pa":teamStatsData["awayTeam3PTTotal"],
    "AWAY3pp":teamStatsData["awayTeam3PTRate"],
    "AWAYfgm":teamStatsData["awayTeamFGMade"],
    "AWAYfgmiss":teamStatsData["awayTeamFGMiss"],
    "AWAYfga":teamStatsData["awayTeamFGTotal"],
    "AWAYfgp":teamStatsData["awayTeamFGRate"]
  };
  statsInsightData = gen_players_stats_insights_data(gameStatsData);
  awayTeamTripleDoublePlayers = statsInsightData[0];
  awayTeamLeadPTSPlayers = statsInsightData[1];
  awayTeamLeadREBPlayers = statsInsightData[2];
  awayTeamLeadASTPlayers = statsInsightData[3];
  homeTeamTripleDoublePlayers = statsInsightData[4];
  homeTeamLeadPTSPlayers = statsInsightData[5];
  homeTeamLeadREBPlayers = statsInsightData[6];
  homeTeamLeadASTPlayers = statsInsightData[7];

  gameHighlightInsightText = get_game_highlight_insight(awayWin, awayTeamTripleDoublePlayers, awayTeamLeadPTSPlayers, homeTeamTripleDoublePlayers, homeTeamLeadPTSPlayers);
  $("#intervisual-tutorial-chat-output .chat-bot").remove();
  $("#intervisual-tutorial-chat-output .chat-user").remove();
  $(".intervisual-tutorial-game-option-button").css("background-color", "#6082e8");
  $(this).css("background-color", "#455da3");
  $("#intervisual-tutorial-chat-output").append('<div class="chat-bot"><div class="message bot-message">' + gameHighlightInsightText + '</div></div>');
  $("#intervisual-tutorial-chat-output").append('<div class="chat-bot"><div class="message bot-message">' + teamRecordData["homeTeam"]["name"] + ' players played in this game: ' + Object.keys(gameStatsData["homeTeam"]["players"]).join(", ") + '</div></div>');
  $("#intervisual-tutorial-chat-output").append('<div class="chat-bot"><div class="message bot-message">' + teamRecordData["awayTeam"]["name"] + ' players played in this game: ' + Object.keys(gameStatsData["awayTeam"]["players"]).join(", ") + '</div></div>');
  $("#intervisual-tutorial-chat-output").append('<div class="chat-bot"><div class="message bot-message">Ask me any question about this game!</div></div>');
})

$(".text-task-game-option-button").click(function() {
  var thisGameID = $(this).attr('id');
  //initiate global variables
  thisGameData = gameData[thisGameID];
  awayTeamHistoryRecords = thisGameData["away_team_season_data"];
  homeTeamHistoryRecords = thisGameData["home_team_season_data"];
  awayTeamHomeTeamAllData = thisGameData["away_team_home_team_all_data"];
  homeTeamAwayTeamAllData = thisGameData["home_team_away_team_all_data"];
  teamRecordData = thisGameData["team_record_data"];
  awayColor = teamRecordData["awayTeam"]["color"];
  homeColor = teamRecordData["homeTeam"]["color"];
  homeTeamName = teamRecordData["homeTeam"]["long_name"] + " " + teamRecordData["homeTeam"]["name"];
  awayTeamName = teamRecordData["awayTeam"]["long_name"] + " " + teamRecordData["awayTeam"]["name"];
  combinedTeamName = awayTeamName+"-"+homeTeamName;
  gameYear = teamRecordData["gameYear"];
  shotData = thisGameData["shot_data"];
  flowData = thisGameData["flow_data"];
  teamStatsData = thisGameData["team_stats_data"];
  gameStatsData = thisGameData["game_stats_data"];
  halfTeamStatsData = thisGameData["halfTeamStatsData"];
  runKeyEventsData = thisGameData["team_run_key_plays_data"];
  gameArenaName = teamRecordData["gameArenaName"];
  awayTeamRecord = teamRecordData["awayTeam"]["record"];
  awayTeamInnerRecord = teamRecordData["awayTeam"]["inner_record"];
  homeTeamRecord = teamRecordData["homeTeam"]["record"];
  homeTeamInnerRecord = teamRecordData["homeTeam"]["inner_record"];
  awayTeamScore = parseInt(teamRecordData["awayTeam"]["score"]);
  homeTeamScore = parseInt(teamRecordData["homeTeam"]["score"]);
  awayWin = (awayTeamScore > homeTeamScore) ? true : false;
  homeTeamAllSeasonData = seasonData[teamRecordData["homeTeam"]["abbrev"].toLowerCase()]
  awayTeamAllSeasonData = seasonData[teamRecordData["awayTeam"]["abbrev"].toLowerCase()]
  homeTeamPlayers = Object.keys(homeTeamAllSeasonData["player_data"]);
  awayTeamPlayers = Object.keys(awayTeamAllSeasonData["player_data"]);
  statsInsightData = gen_players_stats_insights_data(gameStatsData);
  totalHomeGameCountSeason = parseInt(seasonData[teamRecordData["homeTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["win_count"]) + parseInt(seasonData[teamRecordData["homeTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["lost_count"]);
  totalAwayGameCountSeason = parseInt(seasonData[teamRecordData["awayTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["win_count"]) + parseInt(seasonData[teamRecordData["awayTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["lost_count"]);
  team_name_match_dict = {
    "HOME": homeTeamName,
    "AWAY": awayTeamName
  };
  both_team_stats_abbrev_translate_dict = {
    "HOMEpts":homeTeamScore,
    "HOMEreb":teamStatsData["homeTeamREB"],
    "HOMEoreb":teamStatsData["homeTeamOREB"],
    "HOMEdreb":teamStatsData["homeTeamDREB"],
    "HOMEpf":teamStatsData["homeTeamPF"],
    "HOMEast":teamStatsData["homeTeamAST"],
    "HOMEstl":teamStatsData["homeTeamSTL"],
    "HOMEblk":teamStatsData["homeTeamBLK"],
    "HOMEto":teamStatsData["homeTeamTO"],
    "HOMEftm":teamStatsData["homeTeamFTMade"],
    "HOMEftmiss":teamStatsData["homeTeamFTMiss"],
    "HOMEfta":teamStatsData["homeTeamFTTotal"],
    "HOMEftp":teamStatsData["homeTeamFTRate"],
    "HOME3pm":teamStatsData["homeTeam3PTMade"],
    "HOME3pmiss":teamStatsData["homeTeam3PTMiss"],
    "HOME3pa":teamStatsData["homeTeam3PTTotal"],
    "HOME3pp":teamStatsData["homeTeam3PTRate"],
    "HOMEfgm":teamStatsData["homeTeamFGMade"],
    "HOMEfgmiss":teamStatsData["homeTeamFGMiss"],
    "HOMEfga":teamStatsData["homeTeamFGTotal"],
    "HOMEfgp":teamStatsData["homeTeamFGRate"],
    "AWAYpts":awayTeamScore,
    "AWAYreb":teamStatsData["awayTeamREB"],
    "AWAYoreb":teamStatsData["awayTeamOREB"],
    "AWAYdreb":teamStatsData["awayTeamDREB"],
    "AWAYpf":teamStatsData["awayTeamPF"],
    "AWAYast":teamStatsData["awayTeamAST"],
    "AWAYstl":teamStatsData["awayTeamSTL"],
    "AWAYblk":teamStatsData["awayTeamBLK"],
    "AWAYto":teamStatsData["awayTeamTO"],
    "AWAYftm":teamStatsData["awayTeamFTMade"],
    "AWAYftmiss":teamStatsData["awayTeamFTMiss"],
    "AWAYfta":teamStatsData["awayTeamFTTotal"],
    "AWAYftp":teamStatsData["awayTeamFTRate"],
    "AWAY3pm":teamStatsData["awayTeam3PTMade"],
    "AWAY3pmiss":teamStatsData["awayTeam3PTMiss"],
    "AWAY3pa":teamStatsData["awayTeam3PTTotal"],
    "AWAY3pp":teamStatsData["awayTeam3PTRate"],
    "AWAYfgm":teamStatsData["awayTeamFGMade"],
    "AWAYfgmiss":teamStatsData["awayTeamFGMiss"],
    "AWAYfga":teamStatsData["awayTeamFGTotal"],
    "AWAYfgp":teamStatsData["awayTeamFGRate"]
  };
  statsInsightData = gen_players_stats_insights_data(gameStatsData);
  awayTeamTripleDoublePlayers = statsInsightData[0];
  awayTeamLeadPTSPlayers = statsInsightData[1];
  awayTeamLeadREBPlayers = statsInsightData[2];
  awayTeamLeadASTPlayers = statsInsightData[3];
  homeTeamTripleDoublePlayers = statsInsightData[4];
  homeTeamLeadPTSPlayers = statsInsightData[5];
  homeTeamLeadREBPlayers = statsInsightData[6];
  homeTeamLeadASTPlayers = statsInsightData[7];

  gameHighlightInsightText = get_game_highlight_insight(awayWin, awayTeamTripleDoublePlayers, awayTeamLeadPTSPlayers, homeTeamTripleDoublePlayers, homeTeamLeadPTSPlayers);
  $("#text-task-chat-output .chat-bot").remove();
  $("#text-task-chat-output .chat-user").remove();
  $(".text-task-game-option-button").css("background-color", "#6082e8");
  $(this).css("background-color", "#455da3");
  $("#text-task-chat-output").append('<div class="chat-bot"><div class="message bot-message">' + gameHighlightInsightText + '</div></div>');
  $("#text-task-chat-output").append('<div class="chat-bot"><div class="message bot-message">' + teamRecordData["homeTeam"]["name"] + ' players played in this game: ' + Object.keys(gameStatsData["homeTeam"]["players"]).join(", ") + '</div></div>');
  $("#text-task-chat-output").append('<div class="chat-bot"><div class="message bot-message">' + teamRecordData["awayTeam"]["name"] + ' players played in this game: ' + Object.keys(gameStatsData["awayTeam"]["players"]).join(", ") + '</div></div>');
  $("#text-task-chat-output").append('<div class="chat-bot"><div class="message bot-message">Ask me any question about this game!</div></div>');
})
$(".visual-task-game-option-button").click(function() {
  var thisGameID = $(this).attr('id');
  //initiate global variables
  thisGameData = gameData[thisGameID];
  awayTeamHistoryRecords = thisGameData["away_team_season_data"];
  homeTeamHistoryRecords = thisGameData["home_team_season_data"];
  awayTeamHomeTeamAllData = thisGameData["away_team_home_team_all_data"];
  homeTeamAwayTeamAllData = thisGameData["home_team_away_team_all_data"];
  teamRecordData = thisGameData["team_record_data"];
  awayColor = teamRecordData["awayTeam"]["color"];
  homeColor = teamRecordData["homeTeam"]["color"];
  homeTeamName = teamRecordData["homeTeam"]["long_name"] + " " + teamRecordData["homeTeam"]["name"];
  awayTeamName = teamRecordData["awayTeam"]["long_name"] + " " + teamRecordData["awayTeam"]["name"];
  combinedTeamName = awayTeamName+"-"+homeTeamName;
  gameYear = teamRecordData["gameYear"];
  shotData = thisGameData["shot_data"];
  flowData = thisGameData["flow_data"];
  teamStatsData = thisGameData["team_stats_data"];
  gameStatsData = thisGameData["game_stats_data"];
  halfTeamStatsData = thisGameData["halfTeamStatsData"];
  runKeyEventsData = thisGameData["team_run_key_plays_data"];
  gameArenaName = teamRecordData["gameArenaName"];
  awayTeamRecord = teamRecordData["awayTeam"]["record"];
  awayTeamInnerRecord = teamRecordData["awayTeam"]["inner_record"];
  homeTeamRecord = teamRecordData["homeTeam"]["record"];
  homeTeamInnerRecord = teamRecordData["homeTeam"]["inner_record"];
  awayTeamScore = parseInt(teamRecordData["awayTeam"]["score"]);
  homeTeamScore = parseInt(teamRecordData["homeTeam"]["score"]);
  awayWin = (awayTeamScore > homeTeamScore) ? true : false;
  homeTeamAllSeasonData = seasonData[teamRecordData["homeTeam"]["abbrev"].toLowerCase()]
  awayTeamAllSeasonData = seasonData[teamRecordData["awayTeam"]["abbrev"].toLowerCase()]
  homeTeamPlayers = Object.keys(homeTeamAllSeasonData["player_data"]);
  awayTeamPlayers = Object.keys(awayTeamAllSeasonData["player_data"]);
  statsInsightData = gen_players_stats_insights_data(gameStatsData);
  totalHomeGameCountSeason = parseInt(seasonData[teamRecordData["homeTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["win_count"]) + parseInt(seasonData[teamRecordData["homeTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["lost_count"]);
  totalAwayGameCountSeason = parseInt(seasonData[teamRecordData["awayTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["win_count"]) + parseInt(seasonData[teamRecordData["awayTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["lost_count"]);
  team_name_match_dict = {
    "HOME": homeTeamName,
    "AWAY": awayTeamName
  };
  both_team_stats_abbrev_translate_dict = {
    "HOMEpts":homeTeamScore,
    "HOMEreb":teamStatsData["homeTeamREB"],
    "HOMEoreb":teamStatsData["homeTeamOREB"],
    "HOMEdreb":teamStatsData["homeTeamDREB"],
    "HOMEpf":teamStatsData["homeTeamPF"],
    "HOMEast":teamStatsData["homeTeamAST"],
    "HOMEstl":teamStatsData["homeTeamSTL"],
    "HOMEblk":teamStatsData["homeTeamBLK"],
    "HOMEto":teamStatsData["homeTeamTO"],
    "HOMEftm":teamStatsData["homeTeamFTMade"],
    "HOMEftmiss":teamStatsData["homeTeamFTMiss"],
    "HOMEfta":teamStatsData["homeTeamFTTotal"],
    "HOMEftp":teamStatsData["homeTeamFTRate"],
    "HOME3pm":teamStatsData["homeTeam3PTMade"],
    "HOME3pmiss":teamStatsData["homeTeam3PTMiss"],
    "HOME3pa":teamStatsData["homeTeam3PTTotal"],
    "HOME3pp":teamStatsData["homeTeam3PTRate"],
    "HOMEfgm":teamStatsData["homeTeamFGMade"],
    "HOMEfgmiss":teamStatsData["homeTeamFGMiss"],
    "HOMEfga":teamStatsData["homeTeamFGTotal"],
    "HOMEfgp":teamStatsData["homeTeamFGRate"],
    "AWAYpts":awayTeamScore,
    "AWAYreb":teamStatsData["awayTeamREB"],
    "AWAYoreb":teamStatsData["awayTeamOREB"],
    "AWAYdreb":teamStatsData["awayTeamDREB"],
    "AWAYpf":teamStatsData["awayTeamPF"],
    "AWAYast":teamStatsData["awayTeamAST"],
    "AWAYstl":teamStatsData["awayTeamSTL"],
    "AWAYblk":teamStatsData["awayTeamBLK"],
    "AWAYto":teamStatsData["awayTeamTO"],
    "AWAYftm":teamStatsData["awayTeamFTMade"],
    "AWAYftmiss":teamStatsData["awayTeamFTMiss"],
    "AWAYfta":teamStatsData["awayTeamFTTotal"],
    "AWAYftp":teamStatsData["awayTeamFTRate"],
    "AWAY3pm":teamStatsData["awayTeam3PTMade"],
    "AWAY3pmiss":teamStatsData["awayTeam3PTMiss"],
    "AWAY3pa":teamStatsData["awayTeam3PTTotal"],
    "AWAY3pp":teamStatsData["awayTeam3PTRate"],
    "AWAYfgm":teamStatsData["awayTeamFGMade"],
    "AWAYfgmiss":teamStatsData["awayTeamFGMiss"],
    "AWAYfga":teamStatsData["awayTeamFGTotal"],
    "AWAYfgp":teamStatsData["awayTeamFGRate"]
  };
  statsInsightData = gen_players_stats_insights_data(gameStatsData);
  awayTeamTripleDoublePlayers = statsInsightData[0];
  awayTeamLeadPTSPlayers = statsInsightData[1];
  awayTeamLeadREBPlayers = statsInsightData[2];
  awayTeamLeadASTPlayers = statsInsightData[3];
  homeTeamTripleDoublePlayers = statsInsightData[4];
  homeTeamLeadPTSPlayers = statsInsightData[5];
  homeTeamLeadREBPlayers = statsInsightData[6];
  homeTeamLeadASTPlayers = statsInsightData[7];

  gameHighlightInsightText = get_game_highlight_insight(awayWin, awayTeamTripleDoublePlayers, awayTeamLeadPTSPlayers, homeTeamTripleDoublePlayers, homeTeamLeadPTSPlayers);
  $("#visual-task-chat-output .chat-bot").remove();
  $("#visual-task-chat-output .chat-user").remove();
  $(".visual-task-game-option-button").css("background-color", "#6082e8");
  $(this).css("background-color", "#455da3");
  $("#visual-task-chat-output").append('<div class="chat-bot"><div class="message bot-message">' + gameHighlightInsightText + '</div></div>');
  $("#visual-task-chat-output").append('<div class="chat-bot"><div class="message bot-message">' + teamRecordData["homeTeam"]["name"] + ' players played in this game: ' + Object.keys(gameStatsData["homeTeam"]["players"]).join(", ") + '</div></div>');
  $("#visual-task-chat-output").append('<div class="chat-bot"><div class="message bot-message">' + teamRecordData["awayTeam"]["name"] + ' players played in this game: ' + Object.keys(gameStatsData["awayTeam"]["players"]).join(", ") + '</div></div>');
  $("#visual-task-chat-output").append('<div class="chat-bot"><div class="message bot-message">Ask me any question about this game!</div></div>');
})
$(".intervisual-task-game-option-button").click(function() {
  var thisGameID = $(this).attr('id');
  //initiate global variables
  thisGameData = gameData[thisGameID];
  awayTeamHistoryRecords = thisGameData["away_team_season_data"];
  homeTeamHistoryRecords = thisGameData["home_team_season_data"];
  awayTeamHomeTeamAllData = thisGameData["away_team_home_team_all_data"];
  homeTeamAwayTeamAllData = thisGameData["home_team_away_team_all_data"];
  teamRecordData = thisGameData["team_record_data"];
  awayColor = teamRecordData["awayTeam"]["color"];
  homeColor = teamRecordData["homeTeam"]["color"];
  homeTeamName = teamRecordData["homeTeam"]["long_name"] + " " + teamRecordData["homeTeam"]["name"];
  awayTeamName = teamRecordData["awayTeam"]["long_name"] + " " + teamRecordData["awayTeam"]["name"];
  combinedTeamName = awayTeamName+"-"+homeTeamName;
  gameYear = teamRecordData["gameYear"];
  shotData = thisGameData["shot_data"];
  flowData = thisGameData["flow_data"];
  teamStatsData = thisGameData["team_stats_data"];
  gameStatsData = thisGameData["game_stats_data"];
  halfTeamStatsData = thisGameData["halfTeamStatsData"];
  runKeyEventsData = thisGameData["team_run_key_plays_data"];
  gameArenaName = teamRecordData["gameArenaName"];
  awayTeamRecord = teamRecordData["awayTeam"]["record"];
  awayTeamInnerRecord = teamRecordData["awayTeam"]["inner_record"];
  homeTeamRecord = teamRecordData["homeTeam"]["record"];
  homeTeamInnerRecord = teamRecordData["homeTeam"]["inner_record"];
  awayTeamScore = parseInt(teamRecordData["awayTeam"]["score"]);
  homeTeamScore = parseInt(teamRecordData["homeTeam"]["score"]);
  awayWin = (awayTeamScore > homeTeamScore) ? true : false;
  homeTeamAllSeasonData = seasonData[teamRecordData["homeTeam"]["abbrev"].toLowerCase()]
  awayTeamAllSeasonData = seasonData[teamRecordData["awayTeam"]["abbrev"].toLowerCase()]
  homeTeamPlayers = Object.keys(homeTeamAllSeasonData["player_data"]);
  awayTeamPlayers = Object.keys(awayTeamAllSeasonData["player_data"]);
  statsInsightData = gen_players_stats_insights_data(gameStatsData);
  totalHomeGameCountSeason = parseInt(seasonData[teamRecordData["homeTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["win_count"]) + parseInt(seasonData[teamRecordData["homeTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["lost_count"]);
  totalAwayGameCountSeason = parseInt(seasonData[teamRecordData["awayTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["win_count"]) + parseInt(seasonData[teamRecordData["awayTeam"]["abbrev"].toLowerCase()]["season_history"]["2019-20"]["lost_count"]);
  team_name_match_dict = {
    "HOME": homeTeamName,
    "AWAY": awayTeamName
  };
  both_team_stats_abbrev_translate_dict = {
    "HOMEpts":homeTeamScore,
    "HOMEreb":teamStatsData["homeTeamREB"],
    "HOMEoreb":teamStatsData["homeTeamOREB"],
    "HOMEdreb":teamStatsData["homeTeamDREB"],
    "HOMEpf":teamStatsData["homeTeamPF"],
    "HOMEast":teamStatsData["homeTeamAST"],
    "HOMEstl":teamStatsData["homeTeamSTL"],
    "HOMEblk":teamStatsData["homeTeamBLK"],
    "HOMEto":teamStatsData["homeTeamTO"],
    "HOMEftm":teamStatsData["homeTeamFTMade"],
    "HOMEftmiss":teamStatsData["homeTeamFTMiss"],
    "HOMEfta":teamStatsData["homeTeamFTTotal"],
    "HOMEftp":teamStatsData["homeTeamFTRate"],
    "HOME3pm":teamStatsData["homeTeam3PTMade"],
    "HOME3pmiss":teamStatsData["homeTeam3PTMiss"],
    "HOME3pa":teamStatsData["homeTeam3PTTotal"],
    "HOME3pp":teamStatsData["homeTeam3PTRate"],
    "HOMEfgm":teamStatsData["homeTeamFGMade"],
    "HOMEfgmiss":teamStatsData["homeTeamFGMiss"],
    "HOMEfga":teamStatsData["homeTeamFGTotal"],
    "HOMEfgp":teamStatsData["homeTeamFGRate"],
    "AWAYpts":awayTeamScore,
    "AWAYreb":teamStatsData["awayTeamREB"],
    "AWAYoreb":teamStatsData["awayTeamOREB"],
    "AWAYdreb":teamStatsData["awayTeamDREB"],
    "AWAYpf":teamStatsData["awayTeamPF"],
    "AWAYast":teamStatsData["awayTeamAST"],
    "AWAYstl":teamStatsData["awayTeamSTL"],
    "AWAYblk":teamStatsData["awayTeamBLK"],
    "AWAYto":teamStatsData["awayTeamTO"],
    "AWAYftm":teamStatsData["awayTeamFTMade"],
    "AWAYftmiss":teamStatsData["awayTeamFTMiss"],
    "AWAYfta":teamStatsData["awayTeamFTTotal"],
    "AWAYftp":teamStatsData["awayTeamFTRate"],
    "AWAY3pm":teamStatsData["awayTeam3PTMade"],
    "AWAY3pmiss":teamStatsData["awayTeam3PTMiss"],
    "AWAY3pa":teamStatsData["awayTeam3PTTotal"],
    "AWAY3pp":teamStatsData["awayTeam3PTRate"],
    "AWAYfgm":teamStatsData["awayTeamFGMade"],
    "AWAYfgmiss":teamStatsData["awayTeamFGMiss"],
    "AWAYfga":teamStatsData["awayTeamFGTotal"],
    "AWAYfgp":teamStatsData["awayTeamFGRate"]
  };
  statsInsightData = gen_players_stats_insights_data(gameStatsData);
  awayTeamTripleDoublePlayers = statsInsightData[0];
  awayTeamLeadPTSPlayers = statsInsightData[1];
  awayTeamLeadREBPlayers = statsInsightData[2];
  awayTeamLeadASTPlayers = statsInsightData[3];
  homeTeamTripleDoublePlayers = statsInsightData[4];
  homeTeamLeadPTSPlayers = statsInsightData[5];
  homeTeamLeadREBPlayers = statsInsightData[6];
  homeTeamLeadASTPlayers = statsInsightData[7];

  gameHighlightInsightText = get_game_highlight_insight(awayWin, awayTeamTripleDoublePlayers, awayTeamLeadPTSPlayers, homeTeamTripleDoublePlayers, homeTeamLeadPTSPlayers);
  $("#intervisual-task-chat-output .chat-bot").remove();
  $("#intervisual-task-chat-output .chat-user").remove();
  $(".intervisual-task-game-option-button").css("background-color", "#6082e8");
  $(this).css("background-color", "#455da3");

  $("#intervisual-task-chat-output").append('<div class="chat-bot"><div class="message bot-message">' + gameHighlightInsightText + '</div></div>');
  $("#intervisual-task-chat-output").append('<div class="chat-bot"><div class="message bot-message">' + teamRecordData["homeTeam"]["name"] + ' players played in this game: ' + Object.keys(gameStatsData["homeTeam"]["players"]).join(", ") + '</div></div>');
  $("#intervisual-task-chat-output").append('<div class="chat-bot"><div class="message bot-message">' + teamRecordData["awayTeam"]["name"] + ' players played in this game: ' + Object.keys(gameStatsData["awayTeam"]["players"]).join(", ") + '</div></div>');
  $("#intervisual-task-chat-output").append('<div class="chat-bot"><div class="message bot-message">Ask me any question about this game!</div></div>');
})

var stats_abbrev_translate_dict = {
  "pts": "points",
  "reb": "rebounds",
  "ast": "assists",
  "stl": "steals",
  "blk": "blocks",
  "to": "turnovers",
  "pf": "personal fouls",
  "oreb": "offensive rebounds",
  "dreb": "defensive rebounds",
  "time": "mins",
  "fgm": "field goal made",
  "fga": "field goal attempted",
  "fgmiss": "field goal missed",
  "fgp": "percent field goal",
  "ftm": "free throw made",
  "fta": "free throw attempted",
  "ftmiss": "free throw missed",
  "ftp": "percent free throw",
  "3pm": "three points made",
  "3pa": "three points attempted",
  "3pmiss": "three points missed",
  "3pp": "percent three points"
}
var team_stats_abbrev_translate_dict = {
  "pts": "score",
  "score": "points",
  "reb": "teamREB",
  "pf": "teamPF",
  "ast": "teamAST",
  "stl": "teamSTL",
  "blk": "teamBLK",
  "to": "teamTO"
}


var player_full_name_to_data_name = function(name){
  var words = name.split(" ");
  var newWords = [];
  if (words[0].indexOf(".") > -1){
    newWords.push(words[0]);
  }else{
    newWords.push(words[0][0]+".");
  }
  for (var i =1; i<words.length; i++){
    newWords.push(words[i].charAt(0).toUpperCase() + words[i].substring(1));
  }
  return newWords.join(" ");
}
var player_full_name_to_class_name = function(name){
  return player_full_name_to_data_name(name).replace(".", "").split(" ")[0].charAt(0)+"-"+player_full_name_to_data_name(name).replace(".", "").split(" ")[1];
}
var sort_dict_by_value = function(dict, attr){
  var items = Object.keys(dict).map(function(key) {
    return [key, dict[key][attr]];
  });
  // Sort the array based on the second element
  items.sort(function(first, second) {
    return second[1] - first[1];
  });
  return [items[0][0], items[0][1]];
}
var gen_players_stats_insights_data = function(gameStats){
    var awayTeamTripleDoublePlayers = [];
    Object.keys(gameStats["awayTeam"]["players"]).forEach(function(key){
      var stats = gameStats["awayTeam"]["players"][key];
      if ("pts" in stats  && !("-" in stats)){
        if (parseInt(stats["pts"]) > 9 && parseInt(stats["reb"])>9 && parseInt(stats["ast"])>9) {
          awayTeamTripleDoublePlayers.append(tripleDoublePlayers);
        }
      }
    })
    var leadPTS = sort_dict_by_value(gameStats["awayTeam"]["players"], "pts");
    var awayTeamLeadPTSPlayers = {"name": leadPTS[0], "pts": leadPTS[1]};
    var leadREB = sort_dict_by_value(gameStats["awayTeam"]["players"], "reb");
    var awayTeamLeadREBPlayers = {"name": leadREB[0], "reb": leadREB[1]};
    var leadAST = sort_dict_by_value(gameStats["awayTeam"]["players"], "ast");
    var awayTeamLeadASTPlayers = {"name": leadAST[0], "ast": leadAST[1]};

    var homeTeamTripleDoublePlayers = [];
    Object.keys(gameStats["homeTeam"]["players"]).forEach(function(key){
      var stats = gameStats["homeTeam"]["players"][key];
      if ("pts" in stats  && !("-" in stats)){
        if (parseInt(stats["pts"]) > 9 && parseInt(stats["reb"])>9 && parseInt(stats["ast"])>9) {
          homeTeamTripleDoublePlayers.append(tripleDoublePlayers);
        }
      }
    })
    var leadPTS = sort_dict_by_value(gameStats["homeTeam"]["players"], "pts");
    var homeTeamLeadPTSPlayers = {"name": leadPTS[0], "pts": leadPTS[1]};
    var leadREB = sort_dict_by_value(gameStats["homeTeam"]["players"], "reb");
    var homeTeamLeadREBPlayers = {"name": leadREB[0], "reb": leadREB[1]};
    var leadAST = sort_dict_by_value(gameStats["homeTeam"]["players"], "ast");
    var homeTeamLeadASTPlayers = {"name": leadAST[0], "ast": leadAST[1]};

    return [awayTeamTripleDoublePlayers, awayTeamLeadPTSPlayers, awayTeamLeadREBPlayers, awayTeamLeadASTPlayers,  homeTeamTripleDoublePlayers, homeTeamLeadPTSPlayers, homeTeamLeadREBPlayers, homeTeamLeadASTPlayers]
}
var get_game_highlight_insight = function(awayWin, awayTeamTripleDoublePlayers, awayTeamLeadPTSPlayers, homeTeamTripleDoublePlayers, homeTeamLeadPTSPlayers){
 if (awayWin) {
   if (awayTeamTripleDoublePlayers.length > 0) {
     var tripleDoublePlayerName = awayTeamTripleDoublePlayers[0]["name"];
     return tripleDoublePlayerName + "'s triple-double leads " + awayTeamName + " past " + homeTeamName + ", " + awayTeamScore.toString() + "-" + homeTeamScore.toString();
   } else {
     var leadPtsPlayerName = awayTeamLeadPTSPlayers["name"];
     var leadPtsPlayerPts = awayTeamLeadPTSPlayers["pts"];
     return leadPtsPlayerName + " scores " + leadPtsPlayerPts + ", leads " + awayTeamName + " past " + homeTeamName + ", " + awayTeamScore.toString() + "-" + homeTeamScore.toString();
   }
 } else {
   if (homeTeamTripleDoublePlayers.length > 0) {
     var tripleDoublePlayerName = homeTeamTripleDoublePlayers[0]["name"];
     return tripleDoublePlayerName + "'s triple-double leads " + homeTeamName + " past " + awayTeamName + ", " + homeTeamScore.toString() + "-" + awayTeamScore.toString();
   } else {
     var leadPtsPlayerName = homeTeamLeadPTSPlayers["name"];
     var leadPtsPlayerPts = homeTeamLeadPTSPlayers["pts"];
     return leadPtsPlayerName + " scores " + leadPtsPlayerPts + ", leads " + homeTeamName + " past " + awayTeamName + ", " + homeTeamScore.toString() + "-" + awayTeamScore.toString();
   }
 }
}
