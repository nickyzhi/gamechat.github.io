// runKeyEventsData {"biggestLeadEvent":biggestLeadEvent, "smallestLeadEvent": smallestLeadEvent, "runEvent":runEvent}
//{"period":1,"seconds":27,"homeScore":0,"awayScore":2,"teamId":"1","id":"4009755999","text":"John Collins makes layup (Tyler Dorsey assists)",
// runevent:  [homeTeam]: {"awayTeamRunStartEvent": awayRunStartEvent, "awayTeamRunEndEvent": awayRunEndEvent, "awayTeamRunScore":
var getOffsetPosition = function(width, height, x, y){
  var results = [];
  if (x>width/2) {
    results.push(-30);
    results.push(20);
  } else {
    results.push(30);
    results.push(-20);
  }
  return results;
}

var appendRunRect = function(startEvent, endEvent, score, teamName, xScale, height, margin){
  var runScore1 = (teamName === "awayTeam") ? endEvent["awayScore"]-startEvent["awayScore"] : endEvent["homeScore"]-startEvent["homeScore"]
  var runScore2 = (teamName === "awayTeam") ? endEvent["homeScore"]-startEvent["homeScore"] : endEvent["awayScore"]-startEvent["awayScore"]
  var runAnnotations = {
    note:{
        title: teamRecordData[teamName]["name"]+" "+runScore1.toString()+":"+runScore2.toString()+" run",
        lineType: "none",
        align: "right",
        wrap: 50 //custom text wrapping
    },
    subject:{
        height: height,
        width: xScale(endEvent["seconds"]) - xScale(startEvent["seconds"])
    },
    type: d3.annotationCalloutRect,
    disable: ["connector"], // doesn't draw the connector
    //can pass "subject" "note" and "connector" as valid options
    dx: (xScale(endEvent["seconds"]) - xScale(startEvent["seconds"]))/2,
    x: xScale(startEvent["seconds"]),
    y: 0
  };
  return runAnnotations
}

var drawFlowChart = function(div,flowData,awaycolor,homecolor){
    var margin = {top: 40, right: 20, bottom: 30, left: 30},
        width = parseFloat(d3.select(div).style('width')) - margin.left - margin.right,
        height = parseFloat(d3.select(div).style('height')) - margin.top - margin.bottom;
    // set the ranges
    var xScale = d3.scaleLinear().range([0, width]);
    var yScale = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
        .x(function(d) { return xScale(d.seconds); })
        .y(function(d) { return yScale(d.homeScore); });
    // define the line
    var valueline2 = d3.line()
        .x(function(d) { return xScale(d.seconds); })
        .y(function(d) { return yScale(d.awayScore); });

    var svg = d3.select(div).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform",
                      "translate(" + margin.left + "," + margin.top + ")");

    var data = flowData.data
    data.forEach(function(d) {
        d.seconds = +d.seconds;
        d.homeScore = +d.homeScore;
        d.awayScore = +d.awayScore;
    });
    // Scale the range of the data
    xScale.domain(d3.extent(data, function(d) { return d.seconds; }));
    yScale.domain([0, d3.max(data, function(d) {
      return Math.max(d.homeScore, d.awayScore);
    })]);

    // Add the valueline path.
    svg.append("path")
      .data([data])
      .attr("class","line")
      //.attr("class", "line Cleveland-Cavaliers Cleveland Cavaliers")
      .style("stroke", homecolor)
      .attr("d", valueline);
    // Add the valueline path.
    svg.append("path")
      .data([data])
      .attr("class","line")
      //.attr("class","line Golden-State-Warriors Golden-State Warriors")
      .style("stroke", awaycolor)
      .attr("d", valueline2);
    // Add the X Axis

    // gridlines in x axis function
    function make_x_gridlines() {
        return d3.axisBottom(xScale)
            .ticks(4)
    }
    // gridlines in y axis function
    function make_y_gridlines() {
        return d3.axisLeft(yScale)
            .ticks(6)
    }


    var ticks = [0,720,1440,2160];
    var tickLabels = ['1st','2nd','3rd','4th']
    // Define the axes
    var xAxis = d3.axisBottom(xScale)
        .tickValues(ticks)
        .tickFormat(function(d,i){ return tickLabels[i]});

    var yAxis = d3.axisLeft(yScale)
        .ticks(6);

      // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
            .style("font-size","13px")
            .style("text-anchor", "end")
            .attr("dx", width/10)
            .attr("dy", ".5em")
            .attr('transform', 'translate(' + width/20 + ',0)');

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .selectAll("text")
            .style("font-size","10px")
            .style("text-anchor", "end");

    // add the X gridlines
    svg.append("g")
        .attr("class", "gridline")
        .attr("transform", "translate(0," + height + ")")
        .call(make_x_gridlines()
            .tickSize(-height)
            .tickValues(ticks)
            .tickFormat("")
        )

    // add the Y gridlines
    svg.append("g")
        .attr("class", "gridline")
        .call(make_y_gridlines()
            .tickSize(-width)
            .tickFormat("")
        )
    // var mouseG = svg.append("g")
    //   .attr("class", "mouse-over-effects");
    //
    // mouseG.append("path") // this is the black vertical line to follow mouse
    //   .attr("class", "mouse-line")
    //   .style("stroke", "black")
    //   .style("stroke-width", "1px")
    //   .style("opacity", "0");

    svg.append("circle")
      .attr("cx", width-200)
      .attr("cy", -20)
      .attr("r", 5)
      .attr("stroke", homecolor)
      .attr("class", "legend")
      .style("stroke-width", "1")
      .style("fill", homecolor)

    svg.append("text")
      .attr("x", width-160)
      .attr("y", -15)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .attr("class", "legend")
      .attr("fill", "black")
      .text(teamRecordData["homeTeam"]["name"]);

    svg.append("circle")
      .attr("cx", width-100)
      .attr("cy",-20)
      .attr("r", 5)
      .attr("stroke", awaycolor)
      .attr("class", "legend")
      .style("stroke-width", "1")
      .style("fill", awaycolor)

    svg.append("text")
      .attr("x", width-60)
      .attr("y", -15)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .attr("class", "legend")
      .attr("fill", "black")
      .text(teamRecordData["awayTeam"]["name"]);

    awayLeadOffsetPosition = getOffsetPosition(width, height, xScale(runKeyEventsData["biggestLeadEvent"]["seconds"]), yScale(runKeyEventsData["biggestLeadEvent"]["awayScore"]));
    homeLeadOffsetPosition = getOffsetPosition(width, height, xScale(runKeyEventsData["smallestLeadEvent"]["seconds"]), yScale(runKeyEventsData["smallestLeadEvent"]["awayScore"]));
    var awayLeadEventAnnotations = [{
      note: {
        label: teamRecordData["awayTeam"]["name"]+" "+runKeyEventsData["biggestLeadEvent"]["awayScore"].toString()+":"+runKeyEventsData["biggestLeadEvent"]["homeScore"].toString()+" "+teamRecordData["homeTeam"]["name"],
        title: teamRecordData["awayTeam"]["name"]+" Biggest Lead"
      },
      subject:{
        radius: 5,
        fill: awayColor
      },
      x: xScale(runKeyEventsData["biggestLeadEvent"]["seconds"]),
      y: yScale(runKeyEventsData["biggestLeadEvent"]["awayScore"]),
      dy: awayLeadOffsetPosition[1],
      dx: awayLeadOffsetPosition[0]
    }]
    var makeAwayLeadAnnotations = d3.annotation()
      .editMode(true)
      .type(d3.annotationLabel)
      .annotations(awayLeadEventAnnotations)
    svg
      .append("g")
      .attr("class", "away-lead")
      .style("font-size", "10px")
      .attr("opacity", "0")
      .call(makeAwayLeadAnnotations)

    var homeLeadEventAnnotations = [{
      note: {
        label: teamRecordData["homeTeam"]["name"]+" "+runKeyEventsData["smallestLeadEvent"]["homeScore"].toString()+":"+runKeyEventsData["smallestLeadEvent"]["awayScore"].toString()+" "+teamRecordData["awayTeam"]["name"],
        title: teamRecordData["homeTeam"]["name"]+" Biggest Lead"
      },
      subject:{
        radius: 5,
        fill: homeColor
      },
      x: xScale(runKeyEventsData["smallestLeadEvent"]["seconds"]),
      y: yScale(runKeyEventsData["smallestLeadEvent"]["homeScore"]),
      dy: homeLeadOffsetPosition[1],
      dx: homeLeadOffsetPosition[0]
    }]
    var makeHomeLeadAnnotations = d3.annotation()
      .editMode(true)
      .type(d3.annotationLabel)
      .annotations(homeLeadEventAnnotations)
    svg
      .append("g")
      .attr("class", "home-lead")
      .style("font-size", "10px")
      .attr("opacity", "0")
      .call(makeHomeLeadAnnotations)

    var awayRunAnnotations = []
    for (var i=0; i<runKeyEventsData["runEvent"]["awayTeam"].length; i++){
      var runAnnotation = appendRunRect(runKeyEventsData["runEvent"]["awayTeam"][i]["awayTeamRunStartEvent"], runKeyEventsData["runEvent"]["awayTeam"][i]["awayTeamRunEndEvent"], runKeyEventsData["runEvent"]["awayTeam"][i]["awayTeamRunScore"], "awayTeam", xScale, height, margin)
      awayRunAnnotations.push(runAnnotation);
    }
    var makeAwayRunAnnotations = d3.annotation().annotations(awayRunAnnotations)
    svg
      .append("g")
      .attr("class", "away-run")
      .style("font-size", "10px")
      .attr("opacity", "0")
      .call(makeAwayRunAnnotations)

    var homeRunAnnotations = []
    for (var i=0; i<runKeyEventsData["runEvent"]["homeTeam"].length; i++){
      var runAnnotation = appendRunRect(runKeyEventsData["runEvent"]["homeTeam"][i]["homeTeamRunStartEvent"], runKeyEventsData["runEvent"]["homeTeam"][i]["homeTeamRunEndEvent"], runKeyEventsData["runEvent"]["homeTeam"][i]["homeTeamRunScore"], "homeTeam", xScale, height, margin)
      homeRunAnnotations.push(runAnnotation);
    }
    var makeHomeRunAnnotations = d3.annotation().annotations(homeRunAnnotations)
    svg
      .append("g")
      .attr("class", "home-run")
      .style("font-size", "10px")
      .attr("opacity", "0")
      .call(makeHomeRunAnnotations)
}


var appendFlowChartMenu = function(thisNumber, sectionType){
  var div = ".flow-chart-right-"+thisNumber;
  $(div).append("<p>Customize Flow Chart</p>");
  $(div).append('<div class="flow-chart-menu-block custom-checkbox"><input type="checkbox" class="custom-control-input defaultUnchecked flow-chart-menu-home-run-checkbox flow-chart-checkbox flow-chart-menu-checkbox" name="flow-chart-home-run"><label class="flow-chart-menu-home-run-label popup-window-label" for="defaultUnchecked">&nbsp;&nbsp;Show '+homeTeamName+' Run Event</label></div>');
  $(div).append('<div class="flow-chart-menu-block custom-checkbox"><input type="checkbox" class="custom-control-input defaultUnchecked flow-chart-menu-home-lead-checkbox flow-chart-checkbox flow-chart-menu-checkbox" name="flow-chart-home-lead"><label class="flow-chart-menu-home-lead-label popup-window-label" for="defaultUnchecked">&nbsp;&nbsp;Show '+homeTeamName+' Biggest Lead Event</label></div>');
  $(div).append('<div class="flow-chart-menu-block custom-checkbox"><input type="checkbox" class="custom-control-input defaultUnchecked flow-chart-menu-away-run-checkbox flow-chart-checkbox flow-chart-menu-checkbox" name="flow-chart-away-run"><label class="flow-chart-menu-away-run-label popup-window-label" for="defaultUnchecked">&nbsp;&nbsp;Show '+awayTeamName+' Run Event</label></div>');
  $(div).append('<div class="flow-chart-menu-block custom-checkbox"><input type="checkbox" class="custom-control-input defaultUnchecked flow-chart-menu-away-lead-checkbox flow-chart-checkbox flow-chart-menu-checkbox" name="flow-chart-away-lead"><label class="flow-chart-menu-away-lead-label popup-window-label" for="defaultUnchecked">&nbsp;&nbsp;Show '+awayTeamName+' Biggest Lead Event</label></div>');

  $('.flow-chart-menu-checkbox').change(function() {
      interactionData[sectionType].push($(this).attr("class"));
      flowChartMenuChangeFunction(thisNumber);
  });
}

var flowChartMenuChangeFunction = function(thisNumber){
  var leftdiv = ".flow-chart-left-"+thisNumber;
  var rightdiv = ".flow-chart-right-"+thisNumber;
  if($(rightdiv+' .flow-chart-menu-home-run-checkbox').is(':checked')) {
    $(leftdiv+" g[class='home-run']").attr("opacity", "1");
  } else {
    $(leftdiv+" g[class='home-run']").attr("opacity", "0");
  }
  if($(rightdiv+' .flow-chart-menu-away-run-checkbox').is(':checked')) {
    $(leftdiv+" g[class='away-run']").attr("opacity", "1");
  } else {
    $(leftdiv+" g[class='away-run']").attr("opacity", "0");
  }
  if($(rightdiv+' .flow-chart-menu-home-lead-checkbox').is(':checked')) {
    $(leftdiv+" g[class='home-lead']").attr("opacity", "1");
  } else {
    $(leftdiv+" g[class='home-lead']").attr("opacity", "0");
  }
  if($(rightdiv+' .flow-chart-menu-away-lead-checkbox').is(':checked')) {
    $(leftdiv+" g[class='away-lead']").attr("opacity", "1");
  } else {
    $(leftdiv+" g[class='away-lead']").attr("opacity", "0");
  }
}
