var appendPlayerSeasonBarChartMenu = function(thisNumber, data, thisStatsType){
  var div = "player-season-bar-chart-right-"+thisNumber;
  $("."+div).append("<p>Select player's season stats:</p>");
  $("."+div).append("<div class='"+div+"-flex bar-chart-right-flex'"+"><div class='"+div+"-flex-left bar-chart-right-flex-left'"+"></div><div class='"+div+"-flex-right bar-chart-right-flex-right'"+"></div></div>");
  for (var i=0; i < parseInt(Object.keys(data[0]).length/2)+2; i++){
    if (Object.keys(data[0])[i] in stats_abbrev_translate_dict){
      $("."+div+"-flex-left").append('<input type="radio" class="custom-control-input defaultUnchecked player-season-bar-chart-'+Object.keys(data[0])[i]+'-radio popup-window-radio player-season-bar-chart-menu-radio" name="player-season-bar-chart" value="'+Object.keys(data[0])[i]+'"><label class="player-season-bar-chart-menu-'+Object.keys(data[0])[i]+'-label player-season-bar-chart-label" for="defaultUnchecked">&nbsp;&nbsp;'+stats_abbrev_translate_dict[Object.keys(data[0])[i]]+'</label><br>');
    }
  }
  for (var i=parseInt(Object.keys(data[0]).length/2)+2; i < Object.keys(data[0]).length; i++){
    if (Object.keys(data[0])[i] in stats_abbrev_translate_dict){
      $("."+div+"-flex-right").append('<input type="radio" class="custom-control-input defaultUnchecked player-season-bar-chart-'+Object.keys(data[0])[i]+'-radio popup-window-radio player-season-bar-chart-menu-radio" name="player-season-bar-chart" value="'+Object.keys(data[0])[i]+'"><label class="player-season-bar-chart-menu-'+Object.keys(data[0])[i]+'-label player-season-bar-chart-label" for="defaultUnchecked">&nbsp;&nbsp;'+stats_abbrev_translate_dict[Object.keys(data[0])[i]]+'</label><br>');
    }
  }
  $("."+div+' .player-season-bar-chart-'+thisStatsType+'-radio').attr('checked', true);
}
var drawPlayerSeasonBarChart = function(thisNumber, data, color, thisPlayerName, thisStatsType, sectionType){
  var leftdiv = ".player-season-bar-chart-left-"+thisNumber;
  var rightdiv = ".player-season-bar-chart-right-"+thisNumber;
  // playerSeasonAllStats.push({"stats": items[i]["playersStats"][name][statsType], "opponent": items[i]["opponent"].slice(0, -1), "date": items[i]["date"]});

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

  $(rightdiv+' .player-season-bar-chart-menu-radio').on('change', function() {
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
        var text = thisPlayerName + " got " + d[dataType].toString() + " " + thisStatsName + " on " + d.date.split(", ")[1] + " versus " + d.opponent;
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
