var drawVisualTeamSeasonBarChart = function(div, data, color){
  // x[team_stats_abbrev_translate_dict[statsTypes]], x["date"], x["opponent"], x["score"], x["opponent_score"]

  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 20, bottom: 50, left: 40},
      width = parseFloat(d3.select(div).style('width')) - margin.left - margin.right,
      height = parseFloat(d3.select(div).style('height')) - margin.top - margin.bottom;

  // set the ranges
  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  var y = d3.scaleLinear()
            .range([height, 0]);

    // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select(div).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // format the data
    data.forEach(function(d) {
      d.stats = +d.stats;
    });

    // Scale the range of the data in the domains
    x.domain(data.map(function(d) { return d.date.split(", ")[1]; }));
    y.domain([0, d3.max(data, function(d) { return d.stats; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("stroke", "white")
        .style("fill", color)
        .attr("x", function(d) { return x(d.date.split(", ")[1]); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.stats); })
        .attr("height", function(d) { return height - y(d.stats); });

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
        .call(d3.axisLeft(y));
}
