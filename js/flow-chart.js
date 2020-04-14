// runKeyEventsData {"biggestLeadEvent":biggestLeadEvent, "smallestLeadEvent": smallestLeadEvent, "runEvent":runEvent}
//{"period":1,"seconds":27,"homeScore":0,"awayScore":2,"teamId":"1","id":"4009755999","text":"John Collins makes layup (Tyler Dorsey assists)",
// runevent:  [homeTeam]: {"awayTeamRunStartEvent": awayRunStartEvent, "awayTeamRunEndEvent": awayRunEndEvent, "awayTeamRunScore":


var drawVisualFlowChart = function(div,flowData,awaycolor,homecolor,homeTeamName,awayTeamName){
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
      .text(homeTeamName);

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
      .text(awayTeamName);


}
