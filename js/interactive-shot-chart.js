var drawShotChart = function(div, data, awaycolor, homecolor, playerNameClass){
  var width = parseFloat(d3.select(div).style('width')),
      height = width / 1.8857;
  var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 1);
  var svg = d3.select(div)
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);
  var g = svg.append("g")
  var node = g
      .selectAll("circle")
      .data(data.data)
      .enter().append("circle");
  node.attr("cx", function(d) {
        var cx = parseFloat(d.position_left)*width/ 100.0;
        return cx;
      })
      .attr("cy", function(d) {
        var cy = parseFloat(d.position_top)*height/ 100.0;
        return cy;
      })
      .attr("r", 5)
      .attr("stroke",function(d) {
          if (d.data_homeaway == "away") {return awaycolor;}
          else {return homecolor;}
      })
      .style("stroke-width", "1")
      .style("fill", function(d) {
          if ((d.madeMissClass == "made" || d.madeMissClass == "'made" ) && d.data_homeaway == "away") {
            return awaycolor;
          } else if ((d.madeMissClass == "made" || d.madeMissClass == "'made" ) && d.data_homeaway == "home"){
            return homecolor;
          } else{
            return "white";
          }
      })
      .attr("class", function(d){
          if (d.data_homeaway == "home"){
              return d.data_text.split(" ")[0].charAt(0) + "-" + d.data_text.split(" ")[1]+" home" +" period-" + d["data_period"] +" "+d["position"] +" "+d["madeMissClass"];
          }else{
              return d.data_text.split(" ")[0].charAt(0) + "-" + d.data_text.split(" ")[1]+" away" +" period-" + d["data_period"] +" "+d["position"] +" "+d["madeMissClass"];
          };
      });

  node
    .on("mouseover", function(d) {
        if ($(this).css("opacity")==1){
            tooltip.html(d.data_text)
            .style("opacity", 1)
             .style("left", (d3.event.pageX - 200) + "px")
             .style("top", (d3.event.pageY - 28) + "px");
        }
      })
    .on("mouseout", function(d) {
        tooltip.transition()
           .duration(500)
           .style("opacity", 0);
     });
  d3.selectAll("circle").attr("visibility", "hidden");
  d3.selectAll("circle").filter("."+playerNameClass).attr("visibility", "visible");
};

var appendShotChartMenu = function(thisNumber, team, player, sectionType){
  var div = ".shot-chart-right-"+thisNumber;
  $(div).append("<p>Show a quarter's shot</p>");
  $(div).append('<input type="checkbox" class="custom-control-input defaultUnchecked shot-chart-menu-first-quarter-checkbox popup-window-checkbox shot-chart-menu-checkbox" name="shot-chart-quarter" checked><label class="shot-chart-menu-first-quarter-label shot-chart-label" for="defaultUnchecked">&nbsp;&nbsp;First Quarter</label>');
  $(div).append('<input type="checkbox" class="custom-control-input defaultUnchecked shot-chart-menu-second-quarter-checkbox popup-window-checkbox shot-chart-menu-checkbox" name="shot-chart-quarter" checked><label class="shot-chart-menu-second-quarter-label shot-chart-label" for="defaultUnchecked">&nbsp;&nbsp;Second Quarter</label><br>');
  $(div).append('<input type="checkbox" class="custom-control-input defaultUnchecked shot-chart-menu-third-quarter-checkbox popup-window-checkbox shot-chart-menu-checkbox" name="shot-chart-quarter" checked><label class="shot-chart-menu-third-quarter-label shot-chart-label" for="defaultUnchecked">&nbsp;&nbsp;Third Quarter</label>');
  $(div).append('<input type="checkbox" class="custom-control-input defaultUnchecked shot-chart-menu-fourth-quarter-checkbox popup-window-checkbox shot-chart-menu-checkbox" name="shot-chart-quarter" checked><label class="shot-chart-menu-fourth-quarter-label shot-chart-label" for="defaultUnchecked">&nbsp;&nbsp;Fourth Quarter</label>');
  $(div).append("<p>Show positions' shot</p>");
  $(div).append('<input type="checkbox" class="custom-control-input defaultUnchecked shot-chart-menu-paint-checkbox popup-window-checkbox shot-chart-menu-checkbox" name="shot-chart-paint" checked><label class="shot-chart-menu-paint-label popup-window-label" for="defaultUnchecked">&nbsp;&nbsp;In the paint</label>');
  $(div).append('<input type="checkbox" class="custom-control-input defaultUnchecked shot-chart-menu-field-checkbox popup-window-checkbox shot-chart-menu-checkbox" name="shot-chart-field" checked><label class="shot-chart-menu-field-label popup-window-label" for="defaultUnchecked">&nbsp;&nbsp;Field goal</label>');
  $(div).append('<input type="checkbox" class="custom-control-input defaultUnchecked shot-chart-menu-three-point-checkbox popup-window-checkbox shot-chart-menu-checkbox" name="shot-chart-three" checked><label class="shot-chart-menu-three-point-label popup-window-label" for="defaultUnchecked">&nbsp;&nbsp;Three Point Goal</label>');
  $(div).append("<p>Show Make / Miss</p>");
  $(div).append('<input type="checkbox" class="custom-control-input defaultUnchecked shot-chart-menu-make-checkbox popup-window-checkbox shot-chart-menu-checkbox" name="shot-chart-make" checked><label class="shot-chart-menu-make-label popup-window-label" for="defaultUnchecked">&nbsp;&nbsp;Make</label>');
  $(div).append('<input type="checkbox" class="custom-control-input defaultUnchecked shot-chart-menu-miss-checkbox popup-window-checkbox shot-chart-menu-checkbox" name="shot-chart-miss" checked><label class="shot-chart-menu-miss-label popup-window-label" for="defaultUnchecked">&nbsp;&nbsp;Miss</label>');
  $(div).append('<p>Show ' + homeTeamName + ' shot');
  $(div).append("&nbsp;&nbsp;&nbsp;Player's shot:&nbsp;&nbsp;&nbsp;&nbsp;");
  $(div).append('<select class="home-shot-chart-players shot-chart-menu-checkbox"><option value="All">All Players</option></select>');
  $(div).append('<p>Show ' + awayTeamName + ' shot');
  $(div).append("&nbsp;&nbsp;&nbsp;Player's shot:&nbsp;&nbsp;&nbsp;&nbsp;");
  $(div).append('<select class="away-shot-chart-players shot-chart-menu-checkbox"><option value="All">All Players</option></select>');

  for (var i=0; i<homeTeamPlayers.length; i++) {
    $(div+' > .home-shot-chart-players')
       .append($("<option></option>")
          .attr("value",homeTeamPlayers[i])
          .text(homeTeamPlayers[i]));
  };
  for (var i=0; i<awayTeamPlayers.length; i++) {
    $(div+' > .away-shot-chart-players')
       .append($("<option></option>")
          .attr("value",awayTeamPlayers[i])
          .text(awayTeamPlayers[i]));
  };
  $(div+' > .shot-chart-menu-checkbox').on('change', function() {
    interactionData[sectionType].push($(this).attr("class"));
    gameResultShotChartMenuChangeFunction(thisNumber);
  });
  team == "HOME" ? $(div+' > .home-shot-chart-players option[value="'+player+'"]').prop("selected", true) : $(div+' > .away-shot-chart-players option[value="'+player+'"]').prop("selected", true)
}

var gameResultShotChartMenuChangeFunction = function(thisNumber){
  var leftdiv = ".shot-chart-left-"+thisNumber;
  var rightdiv = ".shot-chart-right-"+thisNumber;
  var game_result_checkbox_to_class = {}
  var make_checkbox_class = rightdiv+" > .shot-chart-menu-make-checkbox";
  game_result_checkbox_to_class[make_checkbox_class] = ".made";
  var miss_checkbox_class = rightdiv+" > .shot-chart-menu-miss-checkbox";
  game_result_checkbox_to_class[miss_checkbox_class] = ".missed";
  var first_checkbox_class = rightdiv+" > .shot-chart-menu-first-quarter-checkbox";
  game_result_checkbox_to_class[first_checkbox_class] = ".period-1";
  var second_checkbox_class = rightdiv+" > .shot-chart-menu-second-quarter-checkbox";
  game_result_checkbox_to_class[second_checkbox_class] = ".period-2";
  var third_checkbox_class = rightdiv+" > .shot-chart-menu-third-quarter-checkbox";
  game_result_checkbox_to_class[third_checkbox_class] = ".period-3";
  var fourth_checkbox_class = rightdiv+" > .shot-chart-menu-fourth-quarter-checkbox";
  game_result_checkbox_to_class[fourth_checkbox_class] = ".period-4";
  var paint_checkbox_class = rightdiv+" > .shot-chart-menu-paint-checkbox";
  game_result_checkbox_to_class[paint_checkbox_class] = ".paint";
  var field_checkbox_class = rightdiv+" > .shot-chart-menu-field-checkbox";
  game_result_checkbox_to_class[field_checkbox_class] = ".two-point";
  var three_point_checkbox_class = rightdiv+" > .shot-chart-menu-three-point-checkbox";
  game_result_checkbox_to_class[three_point_checkbox_class] = ".three-point";
  d3.selectAll(leftdiv+" circle").attr("visibility", "visible");
  d3.selectAll(leftdiv+" circle").attr("opacity", "0")
  var selectHomePlayer = $(rightdiv+' > .home-shot-chart-players option:selected').val() == "All" ? "All" : player_full_name_to_class_name($(rightdiv+' > .home-shot-chart-players option:selected').val().replace("-", " "));
  var selectAwayPlayer =  $(rightdiv+' > .away-shot-chart-players option:selected').val() == "All" ? "All" : player_full_name_to_class_name($(rightdiv+' > .away-shot-chart-players option:selected').val().replace("-", " "));
  var checkedTimeCheckboxs = [rightdiv+" > .shot-chart-menu-first-quarter-checkbox", rightdiv+" > .shot-chart-menu-second-quarter-checkbox", rightdiv+" > .shot-chart-menu-third-quarter-checkbox", rightdiv+" > .shot-chart-menu-fourth-quarter-checkbox"].filter(checkbox => $(checkbox).is(':checked'));
  var checkedPositionCheckboxs = [rightdiv+" > .shot-chart-menu-paint-checkbox", rightdiv+" > .shot-chart-menu-field-checkbox", rightdiv+" > .shot-chart-menu-three-point-checkbox"].filter(checkbox => $(checkbox).is(':checked'));
  var checkedMakeMissCheckboxs = [rightdiv+" > .shot-chart-menu-make-checkbox", rightdiv+" > .shot-chart-menu-miss-checkbox"].filter(checkbox => $(checkbox).is(':checked'));
  checkedTimeCheckboxs.forEach(function (time, time_index) {
    console.log(time, game_result_checkbox_to_class[time], d3.selectAll(leftdiv+" circle").filter(game_result_checkbox_to_class[time]))
    var timeSelected = d3.selectAll(leftdiv+" circle").filter(game_result_checkbox_to_class[time])
    checkedPositionCheckboxs.forEach(function (position, position_index) {
      var positionSelected = timeSelected.filter(game_result_checkbox_to_class[position])
      checkedMakeMissCheckboxs.forEach(function (makeMiss, makemiss_index) {
        var makeMissSelected = positionSelected.filter(game_result_checkbox_to_class[makeMiss])
        if (selectHomePlayer == "All"){
          makeMissSelected.filter(".home").attr("opacity", "1")
        } else{
          makeMissSelected.filter(".home").filter("."+selectHomePlayer).attr("opacity", "1")
        }
        if (selectAwayPlayer == "All"){
          makeMissSelected.filter(".away").attr("opacity", "1")
        } else{
          makeMissSelected.filter(".away").filter("."+selectAwayPlayer).attr("opacity", "1")
        }
      })
    })
  })
}
