// var allSectionClassNames = ["introduction", "demographic", "fans-confimation", "tutorial-intro", "tutorial-1", "tutorial-vis", "tutorial-2", "tutorial-3", "task-intro"]   "exploration-intro",  "exploration-questions", "final-intro"];
var taskClassArray = ["task-1", "task-2", "task-3", "task-4"];
taskClassArray = shuffle(taskClassArray);
var explorationClassArray = ["exploration-1", "exploration-2", "exploration-3"]
explorationClassArray = shuffle(explorationClassArray);
var allSectionClassNames = ["introduction", "demographic", "fans-confimation", "tutorial-intro", "tutorial-1", "tutorial-vis", "tutorial-2", "tutorial-3", "task-intro"].concat(taskClassArray).concat(["exploration-intro"]).concat(explorationClassArray).concat(["exploration-questions"])

var currentPage = "introduction";
$(".section").hide();
$("."+currentPage).show();
$(".last-button").click(function() {
  if (currentPage != "introduction"){
    $(".section").hide();
    var currentIndex = allSectionClassNames.indexOf(currentPage);
    $("."+allSectionClassNames[currentIndex-1]).show();
    currentPage = allSectionClassNames[currentIndex-1];
    if (currentPage != "exploration-questions"){
      $(".next-button").show();
    }
  }
})
$(".next-button").click(function() {
  if (currentPage != "exploration-questions"){
    $(".section").hide();
    if (currentPage == "task-1"){
      sectionTimes["task-1-time"] = Math.floor(Date.now()/1000) - task1StartTime;
    }
    if (currentPage == "task-2"){
      sectionTimes["task-2-time"] = Math.floor(Date.now()/1000) - task2StartTime;
    }
    if (currentPage == "task-3"){
      sectionTimes["task-3-time"] = Math.floor(Date.now()/1000) - task3StartTime;
    }
    if (currentPage == "task-4"){
      sectionTimes["task-4-time"] = Math.floor(Date.now()/1000) - task4StartTime;
    }
    var currentIndex = allSectionClassNames.indexOf(currentPage);
    $("."+allSectionClassNames[currentIndex+1]).show();
    sectionTimes[currentPage] = Math.floor(Date.now()/1000) - sectionStartTime;
    sectionStartTime = Math.floor(Date.now()/1000);
    currentPage = allSectionClassNames[currentIndex+1];
    if (currentPage == "exploration-questions"){
      $(".next-button").hide();
    }
  }
})

drawVisualFlowChart(".tutorial-vis-block-flow", gameData["game_401161557"]["flow_data"], gameData["game_401161557"]["team_record_data"]["awayTeam"]["color"], gameData["game_401161557"]["team_record_data"]["homeTeam"]["color"], "Lakers", "76ers");
drawVisualShotChart(".tutorial-vis-block-shot", gameData["game_401161557"]["shot_data"], gameData["game_401161557"]["team_record_data"]["awayTeam"]["color"], gameData["game_401161557"]["team_record_data"]["homeTeam"]["color"], "All");
drawVisualTeamRecordBarChart(".tutorial-vis-block-team-record", gameData["game_401161557"]["away_team_season_data"],gameData["game_401161557"]["team_record_data"]["homeTeam"]["color"], "Los Angeles Lakers", "2020", "47-13");
var tempData = [
  {
    "name": "A. Davis",
    "value": 37,
    "pts": "37",
    "reb": "13",
    "ast": "2",
    "stl": "4",
    "blk": "2",
    "to": "2",
    "oreb": "3",
    "dreb": "10",
    "pf": "1",
    "time": "39"
  },
  {
    "name": "L. James",
    "value": 22,
    "pts": "22",
    "reb": "7",
    "ast": "14",
    "stl": "1",
    "blk": "2",
    "to": "3",
    "oreb": "1",
    "dreb": "6",
    "pf": "1",
    "time": "34"
  },
  {
    "name": "J. McGee",
    "value": 6,
    "pts": "6",
    "reb": "5",
    "ast": "0",
    "stl": "0",
    "blk": "1",
    "to": "1",
    "oreb": "1",
    "dreb": "4",
    "pf": "2",
    "time": "15"
  },
  {
    "name": "A. Bradley",
    "value": 10,
    "pts": "10",
    "reb": "5",
    "ast": "3",
    "stl": "2",
    "blk": "0",
    "to": "0",
    "oreb": "0",
    "dreb": "5",
    "pf": "1",
    "time": "34"
  },
  {
    "name": "D. Green",
    "value": 7,
    "pts": "7",
    "reb": "5",
    "ast": "2",
    "stl": "0",
    "blk": "0",
    "to": "1",
    "oreb": "3",
    "dreb": "2",
    "pf": "2",
    "time": "26"
  },
  {
    "name": "M. Morris",
    "value": 2,
    "pts": "2",
    "reb": "0",
    "ast": "0",
    "stl": "0",
    "blk": "1",
    "to": "2",
    "oreb": "0",
    "dreb": "0",
    "pf": "0",
    "time": "13"
  },
  {
    "name": "K. Kuzma",
    "value": 7,
    "pts": "7",
    "reb": "5",
    "ast": "0",
    "stl": "0",
    "blk": "0",
    "to": "1",
    "oreb": "1",
    "dreb": "4",
    "pf": "3",
    "time": "20"
  },
  {
    "name": "J. Dudley",
    "value": 0,
    "pts": "0",
    "reb": "1",
    "ast": "0",
    "stl": "0",
    "blk": "0",
    "to": "0",
    "oreb": "0",
    "dreb": "1",
    "pf": "0",
    "time": "1"
  },
  {
    "name": "D. Howard",
    "value": 11,
    "pts": "11",
    "reb": "1",
    "ast": "0",
    "stl": "1",
    "blk": "0",
    "to": "0",
    "oreb": "0",
    "dreb": "1",
    "pf": "1",
    "time": "13"
  },
  {
    "name": "R. Rondo",
    "value": 8,
    "pts": "8",
    "reb": "0",
    "ast": "3",
    "stl": "1",
    "blk": "0",
    "to": "2",
    "oreb": "0",
    "dreb": "0",
    "pf": "4",
    "time": "20"
  },
  {
    "name": "Q. Cook",
    "value": 0,
    "pts": "0",
    "reb": "0",
    "ast": "1",
    "stl": "0",
    "blk": "0",
    "to": "1",
    "oreb": "0",
    "dreb": "0",
    "pf": "0",
    "time": "1"
  },
  {
    "name": "K. Caldwell-Pope",
    "value": 10,
    "pts": "10",
    "reb": "1",
    "ast": "0",
    "stl": "0",
    "blk": "0",
    "to": "0",
    "oreb": "1",
    "dreb": "0",
    "pf": "3",
    "time": "24"
  }
]
drawVisualPlayersGameBarChart(".tutorial-vis-block-lakers-player-game", tempData, gameData["game_401161557"]["team_record_data"]["homeTeam"]["color"]);

$(".task-1-start-button").click(function() {
  task1StartTime = Math.floor(Date.now()/1000);
})
$(".task-2-start-button").click(function() {
  task2StartTime = Math.floor(Date.now()/1000);
})
$(".task-3-start-button").click(function() {
  task3StartTime = Math.floor(Date.now()/1000);
})
$(".task-4-start-button").click(function() {
  task4StartTime = Math.floor(Date.now()/1000);
})

$(".task-4-question").hide();
$(".task-4-button").hide();
$(".task-4-finish").hide();
$(".task-4-start-button").click(function() {
  $(".task-4-start-button").hide();
  $(".task-4-question").hide();
  $(".task-4-button").hide();
  $(".task-4-result-question").show();
  $(".task-4-result-question-button").show();
})
$(".task-4-result-question-button").click(function() {
  $(".task-4-question").hide();
  $(".task-4-button").hide();
  $(".task-4-player-high-question").show();
  $(".task-4-player-high-question-button").show();
})
$(".task-4-player-high-question-button").click(function() {
  $(".task-4-question").hide();
  $(".task-4-button").hide();
  $(".task-4-player-higher-question").show();
  $(".task-4-player-higher-question-button").show();
})
$(".task-4-player-higher-question-button").click(function() {
  $(".task-4-question").hide();
  $(".task-4-button").hide();
  $(".task-4-team-record-question").show();
  $(".task-4-team-record-question-button").show();
})
$(".task-4-team-record-question-button").click(function() {
  $(".task-4-question").hide();
  $(".task-4-button").hide();
  $(".task-4-team-lower-question").show();
  $(".task-4-team-lower-question-button").show();
})
$(".task-4-team-lower-question-button").click(function() {
  $(".task-4-question").hide();
  $(".task-4-button").hide();
  $(".task-4-team-season-high-question").show();
  $(".task-4-team-season-high-question-button").show();
})
$(".task-4-team-season-high-question-button").click(function() {
  $(".task-4-question").hide();
  $(".task-4-button").hide();
  $(".task-4-finish").show();
})


$(".task-3-question").hide();
$(".task-3-button").hide();
$(".task-3-finish").hide();
$(".task-3-start-button").click(function() {
  $(".task-3-start-button").hide();
  $(".task-3-question").hide();
  $(".task-3-button").hide();
  $(".task-3-result-question").show();
  $(".task-3-result-question-button").show();
})
$(".task-3-result-question-button").click(function() {
  $(".task-3-question").hide();
  $(".task-3-button").hide();
  $(".task-3-player-high-question").show();
  $(".task-3-player-high-question-button").show();
})
$(".task-3-player-high-question-button").click(function() {
  $(".task-3-question").hide();
  $(".task-3-button").hide();
  $(".task-3-player-higher-question").show();
  $(".task-3-player-higher-question-button").show();
})
$(".task-3-player-higher-question-button").click(function() {
  $(".task-3-question").hide();
  $(".task-3-button").hide();
  $(".task-3-team-record-question").show();
  $(".task-3-team-record-question-button").show();
})
$(".task-3-team-record-question-button").click(function() {
  $(".task-3-question").hide();
  $(".task-3-button").hide();
  $(".task-3-team-lower-question").show();
  $(".task-3-team-lower-question-button").show();
})
$(".task-3-team-lower-question-button").click(function() {
  $(".task-3-question").hide();
  $(".task-3-button").hide();
  $(".task-3-team-season-high-question").show();
  $(".task-3-team-season-high-question-button").show();
})
$(".task-3-team-season-high-question-button").click(function() {
  $(".task-3-question").hide();
  $(".task-3-button").hide();
  $(".task-3-finish").show();
})


$(".task-2-question").hide();
$(".task-2-button").hide();
$(".task-2-finish").hide();
$(".task-2-start-button").click(function() {
  $(".task-2-start-button").hide();
  $(".task-2-question").hide();
  $(".task-2-button").hide();
  $(".task-2-result-question").show();
  $(".task-2-result-question-button").show();
})
$(".task-2-result-question-button").click(function() {
  $(".task-2-question").hide();
  $(".task-2-button").hide();
  $(".task-2-player-high-question").show();
  $(".task-2-player-high-question-button").show();
})
$(".task-2-player-high-question-button").click(function() {
  $(".task-2-question").hide();
  $(".task-2-button").hide();
  $(".task-2-player-higher-question").show();
  $(".task-2-player-higher-question-button").show();
})
$(".task-2-player-higher-question-button").click(function() {
  $(".task-2-question").hide();
  $(".task-2-button").hide();
  $(".task-2-team-record-question").show();
  $(".task-2-team-record-question-button").show();
})
$(".task-2-team-record-question-button").click(function() {
  $(".task-2-question").hide();
  $(".task-2-button").hide();
  $(".task-2-team-lower-question").show();
  $(".task-2-team-lower-question-button").show();
})
$(".task-2-team-lower-question-button").click(function() {
  $(".task-2-question").hide();
  $(".task-2-button").hide();
  $(".task-2-team-season-high-question").show();
  $(".task-2-team-season-high-question-button").show();
})
$(".task-2-team-season-high-question-button").click(function() {
  $(".task-2-question").hide();
  $(".task-2-button").hide();
  $(".task-2-finish").show();
})


$(".task-1-question").hide();
$(".task-1-button").hide();
$(".task-1-finish").hide();
$(".task-1-start-button").click(function() {
  $(".task-1-start-button").hide();
  $(".task-1-question").hide();
  $(".task-1-button").hide();
  $(".task-1-result-question").show();
  $(".task-1-result-question-button").show();
})
$(".task-1-result-question-button").click(function() {
  $(".task-1-question").hide();
  $(".task-1-button").hide();
  $(".task-1-player-high-question").show();
  $(".task-1-player-high-question-button").show();
})
$(".task-1-player-high-question-button").click(function() {
  $(".task-1-question").hide();
  $(".task-1-button").hide();
  $(".task-1-player-higher-question").show();
  $(".task-1-player-higher-question-button").show();
})
$(".task-1-player-higher-question-button").click(function() {
  $(".task-1-question").hide();
  $(".task-1-button").hide();
  $(".task-1-team-record-question").show();
  $(".task-1-team-record-question-button").show();
})
$(".task-1-team-record-question-button").click(function() {
  $(".task-1-question").hide();
  $(".task-1-button").hide();
  $(".task-1-team-lower-question").show();
  $(".task-1-team-lower-question-button").show();
})
$(".task-1-team-lower-question-button").click(function() {
  $(".task-1-question").hide();
  $(".task-1-button").hide();
  $(".task-1-team-season-high-question").show();
  $(".task-1-team-season-high-question-button").show();
})
$(".task-1-team-season-high-question-button").click(function() {
  $(".task-1-question").hide();
  $(".task-1-button").hide();
  $(".task-1-finish").show();
})

var copyTextareaBtn = document.querySelector('.copy-button');

copyTextareaBtn.addEventListener('click', function(event) {
  var copyTextarea = document.querySelector('.turker-id');
  copyTextarea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }
});

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
