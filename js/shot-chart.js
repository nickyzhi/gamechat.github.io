var drawVisualShotChart = function(div, data, awaycolor, homecolor, playerNameClass){
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
              return d.data_text.replace(".", "").split(" ")[0].charAt(0) + "-" + d.data_text.replace(".", "").split(" ")[1]+" home" +" period-" + d["data_period"] +" "+d["position"] +" "+d["madeMissClass"];
          }else{
              return d.data_text.replace(".", "").split(" ")[0].charAt(0) + "-" + d.data_text.replace(".", "").split(" ")[1]+" away" +" period-" + d["data_period"] +" "+d["position"] +" "+d["madeMissClass"];
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
  if (playerNameClass == "All"){
    d3.selectAll("circle").attr("visibility", "visible");
  }else{
    d3.selectAll("circle").filter("."+playerNameClass).attr("visibility", "visible");
  }
};
