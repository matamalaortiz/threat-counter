$(document).ready(function(){
  var username = 'anita';
  $('#banner').width($(window).width()*0.7);
  $.ajax({
    url: '/firebase/get/'+username,
    dataType: 'json',
    type: 'GET',
  }).done(function(result){
    var ks = Object.keys(result);
    var num = ks.length;
    plt(result);
    $('#count').html('<h2>Threat Count</h2><p>'+num+'</p>');
    makeLatest(result[ks[num-1]]);
    timel(result);
    piei(result);
    var hh = $('#latest').height();
    $('#count').height(hh);
    level(result);
  }).fail(function(error){
    console.log(error);
  });
});
var plt = function(result){
  var ks = Object.keys(result);
  var values = [];
  for(var i = 0; i < ks.length; i++){
    var k = ks[i];
    values.push(result[k]);
  }
  var byPlt = d3.nest()
    .key(function(d){
      return d.source;
    })
    .entries(values)
  var set = [];
  for(var i = 0; i < byPlt.length; i++){
    if(byPlt[i].key!='' && byPlt[i].key!='undefined'){
      var obj = {};
      obj.key = byPlt[i].key;
      obj.value = byPlt[i].values.length;
      set.push(obj);
    }
  }
  var margin = {
            top: 15,
            right: 25,
            bottom: 15,
            left: 60
        };

        var width = $('#plt').width() - margin.left - margin.right;
        var height = 250 - margin.top - margin.bottom;
        var svg = d3.select("#plt").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scale.linear()
            .range([0, width])
            .domain([0, d3.max(set, function (d) {
                return d.value;
            })]);

        var y = d3.scale.ordinal()
            .rangeRoundBands([height, 0], .1)
            .domain(set.map(function (d) {
                return d.key;
            }));

        //make y axis to show bar names
        var yAxis = d3.svg.axis()
            .scale(y)
            //no tick marks
            .tickSize(0)
            .orient("left");

        var gy = svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)

        var bars = svg.selectAll(".bar")
            .data(set)
            .enter()
            .append("g")

        //append rects
        bars.append("rect")
            .attr("class", "bar")
            .attr("y", function (d) {
                return y(d.key);
            })
            .attr("height", y.rangeBand())
            .attr("x", 0)
            .attr("width", function (d) {
                return x(d.value);
            });

        //add a value label to the right of each bar
        bars.append("text")
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .attr("y", function (d) {
                return y(d.key) + y.rangeBand() / 2 + 4;
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", function (d) {
                return x(d.value) + 3;
            })
            .text(function (d) {
                return d.value;
            });

}
/*
-----LEVEL---
*/
var level = function(result){
  var ks = Object.keys(result);
  var values = [];
  for(var i = 0; i < ks.length; i++){
    var k = ks[i];
    if(result[k].level) values.push(result[k]);
  }
  var byPlt = d3.nest()
    .key(function(d){
      return d.level;
    })
    .entries(values)
  var set = [];
  for(var i = 0; i < byPlt.length; i++){
      var obj = {};
      obj.key = byPlt[i].key;
      obj.value = byPlt[i].values.length;
      set.push(obj);
  }
  var h = $('#plt').height()*.8;
  var r = h/2-10;
  var w = r*2 + 20;
  var colorCode = {
    "Moderate": "#27ae60",
    "Substancial": "#f1c40f",
    "Severe": "#e74c3c"
  }
  var vis = d3.select("#level")
      .append("svg:svg")              //create the SVG element inside the <body>
      .data([set])                   //associate our data with the document
          .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
          .attr("height", h)
      .append("svg:g")                //make a group to hold our pie chart
          .attr("transform", "translate(" + r + "," + r + ")")
  var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
      .outerRadius(r);

  var pie = d3.layout.pie()           //this will create arc data for us given a list of values
      .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array

  var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
      .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
      .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
        .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
          .attr("class", "slice");    //allow us to style things in the slices (like text)

      arcs.append("svg:path")
          .attr("fill", function(d, i){
            return colorCode[set[i].key];})
          .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

      arcs.append("svg:text")                                     //add a label to each slice
          .attr("transform", function(d) {                    //set the label's origin to the center of the arc
                      //we have to make sure to set these before calling arc.centroid
          d.innerRadius = 0;
          d.outerRadius = r;
          return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
        })
        .attr("text-anchor", "middle")                          //center the text on it's origin
        .text(function(d, i) {
          return set[i].key;
        });
    var hh = $('#plt').height();
    $('#level').height(hh);
}

/*
-----CATEGORY--------
*/
var piei = function(result){
  var ks = Object.keys(result);
  var values = [];
  for(var i = 0; i < ks.length; i++){
    var k = ks[i];
    values.push(result[k]);
  }
  var byPlt = d3.nest()
    .key(function(d){
      return d.category;
    })
    .entries(values)
  var set = [];
  for(var i = 0; i < byPlt.length; i++){
    if(byPlt[i].key!='' && byPlt[i].key!='undefined'){
      var obj = {};
      obj.key = byPlt[i].key;
      obj.value = byPlt[i].values.length;
      set.push(obj);
    }
  }
  var h = $('#plt').height()*.8;
  var r = h/2-10;
  var w = r*2 + 20;
  var colors = d3.scale.category20c();
  var vis = d3.select("#pie")
      .append("svg:svg")              //create the SVG element inside the <body>
      .data([set])                   //associate our data with the document
          .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
          .attr("height", h)
      .append("svg:g")                //make a group to hold our pie chart
          .attr("transform", "translate(" + r + "," + r + ")")
  var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
      .outerRadius(r);

  var pie = d3.layout.pie()           //this will create arc data for us given a list of values
      .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array

  var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
      .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
      .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
        .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
          .attr("class", "slice");    //allow us to style things in the slices (like text)

      arcs.append("svg:path")
          .attr("fill", function(d, i){return colors(i);})
          .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

      arcs.append("svg:text")                                     //add a label to each slice
          .attr("transform", function(d) {                    //set the label's origin to the center of the arc
                      //we have to make sure to set these before calling arc.centroid
          d.innerRadius = 0;
          d.outerRadius = r;
          return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
        })
        .attr("text-anchor", "middle")                          //center the text on it's origin
        .text(function(d, i) {
          return set[i].key.charAt(0).toUpperCase() + set[i].key.slice(1);
        });
    var hh = $('#plt').height();
    $('#pie').height(hh);
}

/*
-----TIMELINE--------
*/
var timel = function(result){
  var ks = Object.keys(result);
  var values = [];
  for(var i = 0; i < ks.length; i++){
    var k = ks[i];
    if(result[k].date == '') continue;
    values.push(result[k]);
  }

  var byDate = d3.nest()
    .key(function(d) {
       return d.date;
     })
    .entries(values);
  var format = d3.time.format("%Y-%m-%d");
  var dateCount = d3.nest()
    .key(function(d) { return d.key; })
    .rollup(function(v) { return v[0].values.length; })
    .entries(byDate);
  var	margin = {top: 10, right: 15, bottom: 25, left: 18};
  var width = $('#timeline').width() - margin.left - margin.right;
  var height = $('#latest').height()- margin.top - margin.bottom-5-50;
  // Parse the date / time
  var	parseDate = d3.time.format("%Y-%m-%d").parse;

  // Set the ranges
  var	x = d3.time.scale().range([0, width]);
  var	y = d3.scale.linear().range([height, 0]);


  // Get the data

  dateCount.forEach(function(d) {
  	d.date = parseDate(d.key);
    d.value = d.values;
  });

  // Scale the range of the data
  x.domain(d3.extent(dateCount, function(d) { return d.date; }));
  y.domain([0, d3.max(dateCount, function(d) { return d.value; })]);

  var domain = x.domain();
  var maxDay = new Date(domain[1]);
  maxDay.setDate(maxDay.getDate() + 1);
  var buckets = d3.time.days(domain[0], maxDay);

  var newData = [];

  formatDate = d3.time.format("%Y-%m-%d")
  for (var i=0;i<buckets.length;i++)
  	{
  		newData[i] = {};
  		newData[i]['date'] = buckets[i];
  		newData[i]['value'] = 0;

  		for (var z=0;z<dateCount.length;z++)
  			{
  				var date1 = newData[i]['date'];
  				var date2 = dateCount[z]['date'];
  				if (formatDate(date1) == formatDate(date2)) {
  					newData[i]['value'] = dateCount[z]['value'];
  					}
  			}
  	}

  // Define the axes
  var	xAxis = d3.svg.axis().scale(x)
  	.orient("bottom").ticks(8);

  var	yAxis = d3.svg.axis().scale(y)
  	.orient("left").ticks(5);

  // Define the line
  var	valueline = d3.svg.line()
  	.x(function(d) { return x(d.date); })
  	.y(function(d) { return y(d.value); });

  var	svg = d3.select("#timeline")
  	.append("svg")
  		.attr("width", width + margin.left + margin.right)
  		.attr("height", height + margin.top + margin.bottom)
  	.append("g")
  		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  	// Add the valueline path.
  	svg.append("path")
  		.attr("class", "line")
  		.attr("d", valueline(newData));

  	// Add the X Axis
  	svg.append("g")
  		.attr("class", "x axis")
  		.attr("transform", "translate(0," + height + ")")
  		.call(xAxis);

  	// Add the Y Axis
  	svg.append("g")
  		.attr("class", "y axis")
  		.call(yAxis);
  var hh = $('#latest').height();
  $('#timeline').height(hh);
}

var makeLatest = function(obj){
  var name = obj.username;
  var date = obj.date;
  var cat = obj.category;
  var src = obj.source;
  var content = obj.threat;
  var h = '<h2>Latest</h2><h4>@'+name+' <small>'+date+'</small></h4><p>'+cat+'</p><p>'+src+'</p><p style="background-color:#eeeeee">'+content+'</p>'
  $('#latest').html(h);

}
