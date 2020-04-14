var appendTeamSeasonBarChartMenu = function(thisNumber, data, thisStatsType, thisTeam){
  var div = "team-season-bar-chart-right-"+thisNumber;
  $("."+div).append("<p>"+team_name_match_dict[thisTeam]+"'s player game stats:</p>");
  $("."+div).append("<div class='"+div+"-flex bar-chart-right-flex'"+"><div class='"+div+"-flex-left bar-chart-right-flex-left'"+"></div><div class='"+div+"-flex-right bar-chart-right-flex-right'"+"></div></div>");

  for (var i=0; i < parseInt(Object.keys(data[0]).length/2)+2; i++){
    if (Object.keys(data[0])[i] in stats_abbrev_translate_dict){
      $("."+div+"-flex-left").append('<input type="radio" class="custom-control-input defaultUnchecked team-season-bar-chart-'+Object.keys(data[0])[i]+'-radio popup-window-radio team-season-bar-chart-menu-radio" name="team-season-bar-chart" value="'+Object.keys(data[0])[i]+'"><label class="team-season-bar-chart-menu-'+Object.keys(data[0])[i]+'-label team-season-bar-chart-label" for="defaultUnchecked">&nbsp;&nbsp;'+stats_abbrev_translate_dict[Object.keys(data[0])[i]]+'</label><br>');
    }
  }
  for (var i=parseInt(Object.keys(data[0]).length/2)+2; i < Object.keys(data[0]).length; i++){
    if (Object.keys(data[0])[i] in stats_abbrev_translate_dict){
      $("."+div+"-flex-right").append('<input type="radio" class="custom-control-input defaultUnchecked team-season-bar-chart-'+Object.keys(data[0])[i]+'-radio popup-window-radio team-season-bar-chart-menu-radio" name="team-season-bar-chart" value="'+Object.keys(data[0])[i]+'"><label class="team-season-bar-chart-menu-'+Object.keys(data[0])[i]+'-label team-season-bar-chart-label" for="defaultUnchecked">&nbsp;&nbsp;'+stats_abbrev_translate_dict[Object.keys(data[0])[i]]+'</label><br>');
    }
  }
  $("."+div+' .team-season-bar-chart-'+thisStatsType+'-radio').attr('checked', true);
}
var drawTeamSeasonBarChart = function(thisNumber, data, color, thisTeam, thisStatsType, sectionType){
  // x[team_stats_abbrev_translate_dict[statsTypes]], x["date"], x["opponent"], x["score"], x["opponent_score"]
  var leftdiv = ".team-season-bar-chart-left-"+thisNumber;
  var rightdiv = ".team-season-bar-chart-right-"+thisNumber;
  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 20, bottom: 50, left: 40},
      width = parseFloat(d3.select(leftdiv).style('width')) - margin.left - margin.right,
      height = parseFloat(d3.select(leftdiv).style('height')) - margin.top - margin.bottom;
  // set the ranges
  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  var y = d3.scaleLinear()
            .range([height, 0]);
    // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select(leftdiv).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
  var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  var xAxis = d3.axisBottom(x);
  var yAxis = d3.axisLeft(y);
  // add the x Axis
  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-85)");
  // add the y Axis
  svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(y));


  update(data, "stats");

  $(rightdiv+' .team-season-bar-chart-menu-radio').on('change', function() {
    var thisDataType = $(this).val();
    interactionData[sectionType].push($(this).attr("class"));
    update(data, thisDataType);
  });

  function update(data, dataType){
    // format the data
    data.forEach(function(d) {
      d[dataType] = +d[dataType];
    });
    // Scale the range of the data in the domains
    x.domain(data.map(function(d) { return d.date.split(", ")[1]; }));
    y.domain([0, d3.max(data, function(d) { return d[dataType]; })]);
  	//select all bars on the graph, take them out, and exit the previous data set.
  	//then you can add/enter the new data set
  	var bars = svg.selectAll(".bar")
  					.remove()
  					.exit()
  					.data(data)
  	//now actually give each rectangle the corresponding data
  	bars.enter().append("rect")
      .attr("class", "bar")
      .attr("stroke", "white")
      .style("fill", color)
      .attr("x", function(d) { return x(d.date.split(", ")[1]); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d[dataType]); })
      .attr("height", function(d) { return height - y(d[dataType]); })
      .on("mouseover", function(d) {
        var thisStatsName = dataType == "stats" ? stats_abbrev_translate_dict[thisStatsType] : stats_abbrev_translate_dict[dataType];
        var text = team_name_match_dict[thisTeam] + " got " + d[dataType].toString() + " " + thisStatsName + " on " + d.date.split(", ")[1] + " versus " + d.opponent;
        tooltip.transition()
             .duration(200)
             .style("opacity", .9);
        tooltip.html(text)
             .style("left", (d3.event.pageX + 5) + "px")
             .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });
    // add the x Axis
    svg.select('.axis')
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-85)");
      // add the y Axis
      svg.select('.y')
          .attr("class", "y axis")
          .call(d3.axisLeft(y));
  }//end update
}
