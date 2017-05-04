$(document).ready(function(){
  $('#banner').width($(window).width()*0.7);
  $.ajax({
    url: '/anita',
    dataType: 'json',
    type: 'GET',
  }).done(function(result){
    var ks = Object.keys(result);
    var num = ks.length;
    makeLatest(result[ks[num-1]]);
    timeline(result);
    //console.log(ks);
<<<<<<< HEAD
    for(var i = 0; i < ks.length; i++){
      var k = ks[i];
      console.log(result[k]);
    }
=======
    // for(var i = 0; i < ks.length; i++){
    //   var k = ks[i];
    //   console.log(result[k]);
    // }
>>>>>>> c24e928a9c7480cf20efcc792394b4d88aef215e
  }).fail(function(error){
    console.log(error);
  });
});
var timeline = function(result){
  var ONE_DAY = 1000 * 60 * 60 * 24;
  var ks = Object.keys(result);
  var min = new Date(result[ks[0]].date);
  var max = new Date(result[ks[0]].date);
  for(var i = 1; i < ks.length; i++){
    var k = ks[i];
    var b = new Date(result[k].date);
    if(b < min) min = b;
    if(b > max) max = b;
  }
  var totald = (max-min)/ONE_DAY+1;
  var datedata = [];
  for(var i = 0; i < totald; i++) datedata[i] = 0;
  for(var i = 0; i < ks.length; i++){
    var k = ks[i];
    var b = new Date(result[k].date);
    var index = (b-min)/ONE_DAY;
    if(!index) continue;
    datedata[index] += 1;
  }
  console.log(datedata);
  var w = $('#timeline').width();
  var h = $('#timeline').height();
  var barWidth = w/totald;
  var barOffset = 10;
  d3.select('#timeline').append('svg')
  .attr('width', w)
  .attr('height', h)
  .style('background', '#dff0d8')
  .selectAll('rect').data(datedata)
  .enter().append('rect')
    .style({'fill': '#3c763d', 'stroke': '#d6e9c6', 'stroke-width': '5'})
    .attr('width', barWidth)
    .attr('height', function (data) {
        return data;
    })
    .attr('x', function (data, i) {
        return i * (barWidth + barOffset);
    })
    .attr('y', function (data) {
        return height - data;
    });
}
var makeLatest = function(obj){
  var name = obj.username;
  var date = obj.date;
  var cat = obj.category;
  var src = obj.source;
  var content = obj.threat;
  var h = '<h2>Latest Threat</h2><h4>@'+name+' <small>'+date+'</small></h4><p>'+cat+'</p><p>'+src+'</p><p style="background-color:#eeeeee">'+content+'</p>'
  $('#latest').html(h);
}
