var drawVisualTeamRecordBarChart = function(div, data, color, teamName, gameYear, thisTeamRecord, thisTeamInnerRecord){
  // set the dimensions and margins of the graph
  var margin = {top: 5, right: 60, bottom: 30, left: 70},
  width = parseFloat(d3.select(div).style('width')) - margin.left - margin.right,
  height = parseFloat(d3.select(div).style('height')) - margin.top - margin.bottom;

  // set the ranges
  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select(div).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
    // Scale the range of the data in the domains
    x.domain(data.map(function(d) { return d.date; }));

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.date); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return d.away==1 ? height/2 : height/8 })
        .attr("height", height*3/8)
        .style("fill", function(d){
          if (d.result=="L"){
            return "#ef8a62"
          }
          else{
            return "#67a9cf"
          }
        });
        // .on("mouseover", function(d) {
        //   if (teamName.indexOf("-")>0) {
        //     if (d.away==1){
        //       var text = teamName.split("-")[0] + " @ " + teamName.split("-")[1] + " " + d.score.toString()+":"+d.opponent_score.toString()+" on "+d.date+" "+d.year
        //     } else {
        //       var text = teamName.split("-")[0] + " vs " + teamName.split("-")[1] + " " + d.score.toString()+":"+d.opponent_score.toString()+" on "+d.date+" "+d.year
        //     }
        //   } else {
        //     if (d.away==1){
        //       var text = teamName + " @ "+d.opponent + " " + d.score.toString()+":"+d.opponent_score.toString()+" on "+d.date
        //     } else {
        //       var text = teamName + " vs "+d.opponent + " " + d.score.toString()+":"+d.opponent_score.toString()+" on "+d.date
        //     }
        //   }
        //
        //   tooltip.transition()
        //        .duration(200)
        //        .style("opacity", .9);
        //   tooltip.html(text)
        //        .style("left", (d3.event.pageX + 5) + "px")
        //        .style("top", (d3.event.pageY - 28) + "px");
        // })
        // .on("mouseout", function(d) {
        //     tooltip.transition()
        //          .duration(500)
        //          .style("opacity", 0);
        // });

    svg.append("line")
        .attr("x1", -margin.left)
        .attr("y1", height/2)
        .attr("x2", width+margin.right+margin.left)
        .attr("y2", height/2)
        .attr("stroke-width", 2)
        .attr("stroke", "black");

    svg.append("text")
      .attr("x", -margin.left + 30)
      .attr("y", height*3/8)
      .attr("text-anchor", "middle")
      .style("font-size", "13px")
      .text("Home");

    svg.append("text")
      .attr("x", -margin.left + 30)
      .attr("y", height*5/8)
      .attr("text-anchor", "middle")
      .style("font-size", "13px")
      .text("Away");

    svg.append("text")
      .attr("x", width/2)
      .attr("y", height)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text(teamName.split(" ")[teamName.split(" ").length-1]+" "+(parseInt(gameYear)-1).toString()+"-"+gameYear+" overall season record: "+ thisTeamRecord + " and home games record: "+thisTeamInnerRecord);

    // svg.append("g")
    //   .attr("class", "legendOrdinal")
    //   .attr("transform", "translate(" + (width+5) + "," + 30 + ")");
    //
    // var colorOrdinal = d3.scaleOrdinal()
    //   .domain(["Win", "Lose"])
    //   .range([ "#67a9cf", "#ef8a62"]);
    //
    // var legendOrdinal = d3.legendColor()
    //   .shapeWidth(20)
    //   .scale(colorOrdinal);
    //
    // svg.select(".legendOrdinal")
    //   .call(legendOrdinal);

    svg.append("circle")
      .attr("cx", width+5)
      .attr("cy", 30)
      .attr("r", 5)
      .attr("stroke", "#67a9cf")
      .attr("class", "legend")
      .style("stroke-width", "1")
      .style("fill", "#67a9cf")

    svg.append("text")
      .attr("x", width+25)
      .attr("y", 35)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .attr("class", "legend")
      .attr("fill", "black")
      .text("Win");

      svg.append("circle")
        .attr("cx", width+5)
        .attr("cy", 50)
        .attr("r", 5)
        .attr("stroke", "#ef8a62")
        .attr("class", "legend")
        .style("stroke-width", "1")
        .style("fill", "#ef8a62")

      svg.append("text")
        .attr("x", width+25)
        .attr("y", 55)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .attr("class", "legend")
        .attr("fill", "black")
        .text("Lose");
}
