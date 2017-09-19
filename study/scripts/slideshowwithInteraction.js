var visOverInteraction = [];
var visOutInteraction = [];

function eliminateduplicates(oldlist){
  var newlist = [];
  $.each(oldlist, function(i, el){
            if($.inArray(el, newlist) === -1) newlist.push(el);
        });
  return newlist;
}

population={"Somalia":"Population: 83,843","Iran":"Population: 383,527","Iraq":"Population: 199,380","Syria":"Population: 84,035","Yemen":"Population: 50,501","Sudan":"Population: 40,663","Libya":"Population: 14,505",}

appendmap("#SomaliaChart","Somalia")
appendmap("#IraqChart","Iraq")
appendmap("#LibyaChart","Libya")
appendmap("#SudanChart","Sudan")
appendmap("#SyriaChart","Syria")
appendmap("#IranChart","Iran")
appendmap("#YemenChart","Yemen")

function appendmap(id,countryname){
  d3.json("data/uscountywithname.json", function(error, us) {
    if (error) throw error;
    var chartDiv = document.getElementById("storyVis");
    //console.log("topojson", us)
    var width = chartDiv.offsetWidth/3,
        height = 150,
        margin = {top: 50, right: 0, bottom: 0, left: 0};

    var path = d3.geoPath();
    var svg = d3.select(id).append("svg").attr("width", width).attr("height", height);

    var g = svg.append("g").attr("transform", "scale(" + 0.2 + ")"+"translate(50,200)");;

    var geojson = topojson.feature(us, us.objects.counties);
    var countypath = g.append("g")
      .selectAll("path")
      .data(geojson.features)
      .enter().append("path")
        .attr("d", path)
        .attr("fill","#e6dddc")
        .attr("class",function(d){
          var newid1 = d.id.replace(/ /g, "-");
          var newid2 = d.id.replace(/'/g, "-");
          return "counties countyname-"+newid2;
        });

    var countieskey = countryname+"Counties"
    var countiesList = mapCounties[countieskey]
    for (var j = 0; j<countiesList.length;j++){
        var processedName1 = countiesList[j].replace(/ /,"-");
        var processedName2 = processedName1.replace(/'/,"-");
        d3.select(id).selectAll(".countyname-"+processedName2).style("fill","steelblue")
    }

    g.on("mouseover", function () {
        d3.select(id).selectAll("path[style = 'fill: steelblue;']").style("fill","red");
        var sentenceList = []
        var id1 = id.replace("#","");
        var selectedcountryname = id1.replace("Chart","");
        for (var key in sentenceInfo){
          if (sentenceInfo[key].map.indexOf(selectedcountryname)>=0){
            sentenceList.push(key)
          };
        };
        for (var i=0;i<sentenceList.length;i++){
          $("span").filter(function() { return ($(this).text().indexOf(sentenceList[i]) > -1) }).css('background-color','yellow');
        };
        var hoverOverLogEvent = {};
        hoverOverLogEvent.classname = "hoverover";
        hoverOverLogEvent.currenttime = Date.now();
        hoverOverLogEvent.currenttext = id;
        visOverInteraction.push(hoverOverLogEvent);
      })
      .on("mouseout", function () {
          d3.select(id).selectAll("path[style = 'fill: red;']").style("fill","steelblue");
          $("span").css('background-color','');
          var hoverOutLogEvent = {};
          hoverOutLogEvent.currenttime = Date.now();
          hoverOutLogEvent.currenttext = id;
          visOutInteraction.push(hoverOutLogEvent);
      });

    g.append("path")
        .attr("class", "county-borders")
        .attr("d", path(topojson.mesh(us, us.objects.counties, function(a, b) { return a !== b; })));

    g.append("g")
    .append("text")
      .attr("x", width+50)
      .attr("y", -90)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-family", "sans-serif")
      .attr("font-weight", "bold")
      .attr("font-size", "40px")
      .attr("text-anchor", "center")
      .text(countryname);

    g.append("g")
    .append("text")
      .attr("x", width/2+90)
      .attr("y", -20)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-family", "sans-serif")
      .attr("font-size", "40px")
      .attr("text-anchor", "left")
      .text(population[countryname]); 
       
  });
}

d3.csv("data/countryDegree.csv", function(error, data) {
  if (error) throw error;
  var usdata = [14,57,18,11];
  var usdataName = ["U.S. average","U.S. average","U.S. average","U.S. average"];
  var headerNames = ["Country","Less than high school","High school/some college","Bachelor's degree","Advanced degree"];
  var chartDiv = document.getElementById("storyVis");
  var margin = {top: 30, right: 30, bottom: 0, left: 40},
    width = 85*chartDiv.offsetWidth/100 - margin.left - margin.right,
    height = 65*chartDiv.offsetHeight/100 - margin.top - margin.bottom;

  var barHeight = height/15,
      barPadding = barHeight,
      xPadding = width/8,
      barWidth = width/7,
      textXPadding = 13;
      textYPadding = 3; //vertical

  data.forEach(function(d) {
    d.lessHigh = +d.lessHigh;
    d.high = +d.high;
    d.bachelor = +d.bachelor;
    d.advanced = +d.advanced;
  });
  var x = d3.scaleLinear().range([0, barWidth]).domain([0,100]);

  var svg = d3.select("#degreeChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// header text
  svg.selectAll("header")
    .data(headerNames)
  .enter().append("text")
    .attr("class", "header")
    .text(function(d){return d})
      .attr("x", function(d,i) {
        if (i == 0) return -5; 
        else if (i == 1) return (xPadding*2)*i-32;
        else if (i == 2) return (xPadding*2)*i-18;
        else return (xPadding*2)*i-13;
      })
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .attr("font-weight", "bold")
      .attr("font-size", "10px");
//name
  svg.selectAll("countryname")
      .data(data)
    .enter().append("text")
      .attr("class", "countryname")
      .text(function(d){return d.country})
      .attr("x", -10)
      .attr("y", function(d,i) { return (barHeight+barPadding)*i+barHeight-textYPadding; })
      .attr("text-anchor", "middle")
      .attr("font-size", "12px");
//lesshigh
  svg.selectAll(".lesshighbar")
      .data(data)
    .enter().append("rect")
      .attr("class", function(d) { return "lesshighbar educationbar " + d.country; })
      .attr("x", xPadding)
      .style("fill","steelblue")
      .attr("width", function(d) { return x(d.lessHigh); })
      .attr("y", function(d,i) { return (barHeight+barPadding)*i; })
      .attr("height", barHeight);
  svg.selectAll(".lesshighcomplementarybar")
      .data(data)
    .enter().append("rect")
      .attr("class", "lesshighcomplementarybar")
      .attr("x", function(d) { return xPadding+x(d.lessHigh); })
      .style("fill","#e0dddd")
      .attr("width", function(d) { return barWidth - x(d.lessHigh); })
      .attr("y", function(d,i) { return (barHeight+barPadding)*i; })
      .attr("height", barHeight);
  svg.selectAll("lesshighbartext")
      .data(data)
    .enter().append("text")
      .attr("class", "lesshighbartext")
      .text(function(d,i){return (i>0) ? d.lessHigh : d.lessHigh+"%"})
      .attr("x", xPadding-textXPadding)
      .attr("y", function(d,i) { return (barHeight+barPadding)*i+barHeight-textYPadding; })
      .attr("text-anchor", "middle")
      .attr("font-size", "12px");

//high
  svg.selectAll(".highbar")
      .data(data)
    .enter().append("rect")
      .attr("class", function(d) { return "highbar educationbar " + d.country; })
      .attr("x", xPadding*3)
      .style("fill","steelblue")
      .attr("width", function(d) { return x(d.high); })
      .attr("y", function(d,i) { return (barHeight+barPadding)*i; })
      .attr("height", barHeight)
      .on("mouseover", function() {
        d3.select(this).style("fill", "#b46e46");
      })
      .on("mouseout", function() {
        d3.select(this).style("fill", "steelblue");
      });
  svg.selectAll(".highcomplementarybar")
      .data(data)
    .enter().append("rect")
      .attr("class", "highcomplementarybar")
      .attr("x", function(d) { return xPadding*3+x(d.high); })
      .style("fill","#e0dddd")
      .attr("width", function(d) { return barWidth - x(d.high); })
      .attr("y", function(d,i) { return (barHeight+barPadding)*i; })
      .attr("height", barHeight);
  svg.selectAll("highbartext")
      .data(data)
    .enter().append("text")
      .attr("class", "highbartext")
      .text(function(d,i){return (i>0) ? d.high : d.high+"%"})
      .attr("x", xPadding*3-textXPadding)
      .attr("y", function(d,i) { return (barHeight+barPadding)*i+barHeight-textYPadding; })
      .attr("text-anchor", "middle")
      .attr("font-size", "12px");

//bachelor
  svg.selectAll(".bachelorbar")
      .data(data)
    .enter().append("rect")
      .attr("class", function(d) { return "bachelorbar educationbar " + d.country; })
      .attr("x", xPadding*5)
      .style("fill","steelblue")
      .attr("width", function(d) { return x(d.bachelor); })
      .attr("y", function(d,i) { return (barHeight+barPadding)*i; })
      .attr("height", barHeight);
  svg.selectAll(".bachelorcomplementarybar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bachelorcomplementarybar")
      .attr("x", function(d) { return xPadding*5+x(d.bachelor); })
      .style("fill","#e0dddd")
      .attr("width", function(d) { return barWidth - x(d.bachelor); })
      .attr("y", function(d,i) { return (barHeight+barPadding)*i; })
      .attr("height", barHeight);
  svg.selectAll("bachelorbartext")
      .data(data)
    .enter().append("text")
      .attr("class", "bachelorbartext")
      .text(function(d,i){return (i>0) ? d.bachelor : d.bachelor+"%"})
      .attr("x", xPadding*5-textXPadding)
      .attr("y", function(d,i) { return (barHeight+barPadding)*i+barHeight-textYPadding; })
      .attr("text-anchor", "middle")
      .attr("font-size", "12px");

//advanced
  svg.selectAll(".advancedbar")
      .data(data)
    .enter().append("rect")
      .attr("class", function(d) { return "advancedbar educationbar " + d.country; })
      .attr("x", xPadding*7)
      .style("fill","steelblue")
      .attr("width", function(d) { return x(d.advanced); })
      .attr("y", function(d,i) { return (barHeight+barPadding)*i; })
      .attr("height", barHeight);
  svg.selectAll(".advancedcomplementarybar")
      .data(data)
    .enter().append("rect")
      .attr("class", "advancedcomplementarybar")
      .attr("x", function(d) { return xPadding*7+x(d.advanced); })
      .style("fill","#e0dddd")
      .attr("width", function(d) { return barWidth - x(d.advanced); })
      .attr("y", function(d,i) { return (barHeight+barPadding)*i; })
      .attr("height", barHeight);
  svg.selectAll("advancedbartext")
      .data(data)
    .enter().append("text")
      .attr("class", "advancedbartext")
      .text(function(d,i){return (i>0) ? d.advanced : d.advanced+"%"})
      .attr("x", xPadding*7-textXPadding)
      .attr("y", function(d,i) { return (barHeight+barPadding)*i+barHeight-textYPadding; })
      .attr("text-anchor", "middle")
      .attr("font-size", "12px");

  svg.selectAll("usline")
    .data(usdata)
  .enter().append("line")
    .attr("class","usline")
    .attr("x1", function(d,i) { return xPadding*(2*i+1) + x(d)})  //<<== change your code here
    .attr("y1", 0)
    .attr("x2", function(d,i) { return xPadding*(2*i+1) + x(d)})  //<<== and here
    .attr("y2", (barHeight+barPadding)*6+barHeight+3)
    .style("stroke-width", 1)
    .style("stroke", "black")
    .style("stroke-dasharray","2,2")
    .style("fill", "none");

  //us average name
  svg.selectAll("usname")
      .data(usdataName)
    .enter().append("text")
      .attr("class", "usname")
      .text(function(d){return d})
      .attr("x", function(d,i) { return xPadding*(2*i+1) +barWidth/2})
      .attr("y", (barHeight+barPadding)*6+barHeight+20)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px");

  svg.selectAll("rect[style = 'fill: steelblue;']")
      .on("mouseover", function(d) {
        d3.select(this).style("fill", "#b46e46");
        var sentenceList = []
        for (var key in sentenceInfo){
          if (sentenceInfo[key].education.indexOf(d.country)>=0){
            sentenceList.push(key)
          };
        };
        for (var i=0;i<sentenceList.length;i++){
          $("span").filter(function() { return ($(this).text().indexOf(sentenceList[i]) > -1) }).css('background-color','yellow');
        };
        var hoverOverLogEvent = {};
        hoverOverLogEvent.classname = "hoverover";
        hoverOverLogEvent.currenttime = Date.now();
        hoverOverLogEvent.currenttext =d3.select(this).attr("class");
        visOverInteraction.push(hoverOverLogEvent);
      })
      .on("mouseout", function() {
        d3.select(this).style("fill", "steelblue");
        $("span").css('background-color','');
        var hoverOutLogEvent = {};
        hoverOutLogEvent.currenttime = Date.now();
        hoverOutLogEvent.currenttext = d3.select(this).attr("class");
        visOutInteraction.push(hoverOutLogEvent); 
      });
});

d3.csv("data/countrySalary.csv", function(error, data) {
  if (error) throw error;
  var chartDiv = document.getElementById("storyVis");
  var margin = {top: 20, right: 10, bottom: 30, left: 60},
    width = 80*chartDiv.offsetWidth/100 - margin.left - margin.right,
    height = 60*chartDiv.offsetHeight/100 - margin.top - margin.bottom;

  var usdata = ["54645"];
  var usdataName = ["U.S. median:","$54,645"];
  var barHeight = height/13,
      barPadding = barHeight/3;

  data.forEach(function(d) {
    d.salary = +d.salary;
  });
  var x = d3.scaleLinear().range([0, width]).domain([0,d3.max(data, function(d) { return d.salary; })]);
  var y = d3.scaleBand().domain(data.map(function(d){ return d.country; })).range([0, height]).padding(0.1);


  var svg = d3.select("#salaryChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(6));

  svg.append("g")
    .call(d3.axisLeft(y));

  svg.selectAll(".salarybar")
      .data(data)
    .enter().append("rect")
      .attr("class", function(d) { return "salarybar salary-"+ d.country; })
      .attr("x", 0)
      .style("fill","steelblue")
      .attr("width", function(d) { return x(d.salary); })
      .attr("y", function(d,i) { return y(d.country); })
      .attr("height", y.bandwidth())
      .on("mouseover", function(d) {
        d3.select(this).style("fill", "#b46e46");
        var sentenceList = []
        for (var key in sentenceInfo){
          if (sentenceInfo[key].salary.indexOf(d.country)>=0){
            sentenceList.push(key)
          }
        };
        for (var i=0;i<sentenceList.length;i++){
          $("span").filter(function() { return ($(this).text().indexOf(sentenceList[i]) > -1) }).css('background-color','yellow'); 
        };
        var hoverOverLogEvent = {};
        hoverOverLogEvent.classname = "hoverover";
        hoverOverLogEvent.currenttime = Date.now();
        hoverOverLogEvent.currenttext =d3.select(this).attr("class");
        visOverInteraction.push(hoverOverLogEvent);
      })
      .on("mouseout", function() {
        d3.select(this).style("fill", "steelblue");
        $("span").css('background-color','');
        var hoverOutLogEvent = {};
        hoverOutLogEvent.classname = "hoverout";
        hoverOutLogEvent.currenttime = Date.now();
        hoverOutLogEvent.currenttext = d3.select(this).attr("class");
        visOutInteraction.push(hoverOutLogEvent);
      })
      ;

  svg.selectAll("usline")
    .data(usdata)
  .enter().append("line")
    .attr("x1", function(d,i) { return x(d)})  //<<== change your code here
    .attr("y1", -5)
    .attr("x2", function(d,i) { return x(d)})  //<<== and here
    .attr("y2", height)
    .style("stroke-width", 1)
    .style("stroke", "black")
    .style("stroke-dasharray","2,2")
    .style("fill", "none");

  //us average name
  svg.selectAll("usname")
      .data(usdataName)
    .enter().append("text")
      .attr("class", "usname")
      .text(function(d){return d})
      .attr("x", x(usdata[0])-15)
      .attr("y", function(d,i) { return height/3+i*10})
      .attr("font-size", "12px");

  svg.append("g")
    .append("text")
      .attr("x", 0)
      .attr("y", -5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("font-size", "12px")
      .attr("text-anchor", "start")
      .text("Median income");
});


d3.csv("data/countryCitizen.csv", function(error, data) {
  if (error) throw error;
  var chartDiv = document.getElementById("storyVis");
  var margin = {top: 20, right: 10, bottom: 30, left: 60},
    width = 80*chartDiv.offsetWidth/100 - margin.left - margin.right,
    height = 60*chartDiv.offsetHeight/100 - margin.top - margin.bottom;

  var usdata = ["46.6"];
  var usdataName = ["All foreign-born residents:","46.6% naturalized"];
  var barHeight = height/13,
      barPadding = barHeight/3;

  data.forEach(function(d) {
    d.citizen = +d.citizen;
  });
  var x = d3.scaleLinear().range([0, width]).domain([0,100]);
  var y = d3.scaleBand().domain(data.map(function(d){ return d.country; })).range([height,0]).padding(0.1);


  var svg = d3.select("#citizenChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
    .attr("transform", "translate(0," + (height) + ")")
    .call(d3.axisBottom(x).ticks(6));

  svg.append("g")
    .call(d3.axisLeft(y));

  svg.selectAll(".citizenbar")
      .data(data)
    .enter().append("rect")
      .attr("class", function(d) { return "citizenbar citizen-"+ d.country; })
      .attr("x", 0)
      .style("fill","steelblue")
      .attr("width", function(d) { return x(d.citizen); })
      .attr("y", function(d,i) { return y(d.country); })
      .attr("height", y.bandwidth())
      .on("mouseover", function(d) {
        d3.select(this).style("fill", "#b46e46");
        var sentenceList = []
        for (var key in sentenceInfo){
          if (sentenceInfo[key].citizen.indexOf(d.country)>=0){
            sentenceList.push(key)
          }
        };
        for (var i=0;i<sentenceList.length;i++){
          $("span").filter(function() { return ($(this).text().indexOf(sentenceList[i]) > -1) }).css('background-color','yellow'); 
        };
        var hoverOverLogEvent = {};
        hoverOverLogEvent.classname = "hoverover";
        hoverOverLogEvent.currenttime = Date.now();
        hoverOverLogEvent.currenttext =d3.select(this).attr("class");
        visOverInteraction.push(hoverOverLogEvent);
      })
      .on("mouseout", function() {
        d3.select(this).style("fill", "steelblue");
        $("span").css('background-color','');
        var hoverOutLogEvent = {};
        hoverOutLogEvent.classname = "hoverout";
        hoverOutLogEvent.currenttime = Date.now();
        hoverOutLogEvent.currenttext = d3.select(this).attr("class");
        visOutInteraction.push(hoverOutLogEvent);
      });

  svg.selectAll("usline")
    .data(usdata)
  .enter().append("line")
    .attr("x1", function(d,i) { return x(d)})  //<<== change your code here
    .attr("y1", -5)
    .attr("x2", function(d,i) { return x(d)})  //<<== and here
    .attr("y2", height)
    .style("stroke-width", 1)
    .style("stroke", "black")
    .style("stroke-dasharray","2,2")
    .style("fill", "none");

  //us average name
  svg.selectAll("usname")
      .data(usdataName)
    .enter().append("text")
      .attr("class", "usname")
      .text(function(d){return d})
      .attr("x", x(usdata[0])+15)
      .attr("y", function(d,i) { return 3*height/4+i*10})
      .attr("font-size", "12px");

  svg.append("g")
    .append("text")
      .attr("x", 0)
      .attr("y", -8)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("font-size", "12px")
      .attr("text-anchor", "start")
      .text("Naturalized rate");
});

d3.csv("data/countryArrival.csv", function(error, data) {
  if (error) throw error;
  var chartDiv = document.getElementById("storyVis");
  var margin = {top: 10, right: 20, bottom: 23, left: 30},
    width = 90*chartDiv.offsetWidth/100 - margin.left - margin.right,
    height = 60*chartDiv.offsetHeight/100 - margin.top - margin.bottom;

  data.forEach(function(d) {
    d.before1980s = +d.before1980s;
    d.in1980s = +d.in1980s;
    d.in1990s = +d.in1990s;
    d.in2000s = +d.in2000s;
    d.in2010s = +d.in2010s;
  });

  var keys = ["before1980s", "in1980s", "in1990s", "in2000s", "in2010s"];
  var x0 = d3.scaleBand().rangeRound([0, width]).domain(data.map(function(d) { return d.country; })).paddingInner(0.1);
  var x1 = d3.scaleBand().domain(keys).rangeRound([0, x0.bandwidth()]);
  var y = d3.scaleLinear().rangeRound([height, 0]).domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();


  var svg = d3.select("#arrivalChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

    var g = svg.append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

  g.append("g")
    .selectAll("g")
    .data(data)
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + x0(d.country) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return keys.map(function(key) { return {country: d.country,key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("class", function(d) { return "movebar move-"+ d.country; })
      .attr("x", function(d) { return x1(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x1.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", "steelblue")
      .on("mouseover", function(d) {
        d3.select(this).style("fill", "#b46e46");
        var sentenceList = []
        for (var key in sentenceInfo){
          if (sentenceInfo[key].move.indexOf(d.country)>=0){
            sentenceList.push(key)
          }
        };
        for (var i=0;i<sentenceList.length;i++){
          $("span").filter(function() { return ($(this).text().indexOf(sentenceList[i]) > -1) }).css('background-color','yellow'); 
        };
        var hoverOverLogEvent = {};
        hoverOverLogEvent.classname = "hoverover";
        hoverOverLogEvent.currenttime = Date.now();
        hoverOverLogEvent.currenttext =d3.select(this).attr("class");
        visOverInteraction.push(hoverOverLogEvent);
      })
      .on("mouseout", function() {
        d3.select(this).style("fill", "steelblue");
        $("span").css('background-color','');
        var hoverOutLogEvent = {};
        hoverOutLogEvent.classname = "hoverout";
        hoverOutLogEvent.currenttime = Date.now();
        hoverOutLogEvent.currenttext = d3.select(this).attr("class");
        visOutInteraction.push(hoverOutLogEvent);
      });


  g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("x", width/2-30)
      .attr("y", height+10)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("font-size", "12px")
      .attr("text-anchor", "start")
      .text("Population move to US");

  g.selectAll("axisname")
      .data(data)
    .enter().append("text")
      .attr("class", "axisname")
      .text(function(d,i){return d.country})
      .attr("x", function(d,i){return (x0.bandwidth()+5)*(i+0.5)})
      .attr("y", 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px");

  axistime = ["Before 1980s","80","90","00","2010&later"]
  g.selectAll("axistime")
      .data(axistime)
    .enter().append("text")
      .attr("class", "axistime")
      .text(function(d,i){return d})
      .attr("x", function(d,i){return (x1.bandwidth()+2)*i})
      .attr("y", function(d,i){
        if ((i>0) && (i<4)) return height+10;
        else  return height+20;
      })
      .attr("text-anchor", "middle")
      .attr("font-size", "8px");

  axisline = ["Before 1980s","2010&later"]
  g.selectAll("axisline")
    .data(axisline)
  .enter().append("line")
    .attr("x1", function(d,i) { 
      if (i==0) return 10;
      else  return (x1.bandwidth()+2)*4;
    })  //<<== change your code here
    .attr("y1", height)
    .attr("x2", function(d,i) { 
      if (i==0) return 10;
      else  return (x1.bandwidth()+2)*4;
    })
    .attr("y2", height+13)
    .attr("class","axisline")
    .style("stroke-width", 1)
    .style("stroke", "black")
    .style("fill", "none");
});

























