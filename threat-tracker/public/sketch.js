$(document).ready(function(){
  $('#banner').width($(window).width()*0.7);
  $.ajax({
    url: '/anita',
    dataType: 'json',
    type: 'GET',
  }).done(function(result){
    var ks = Object.keys(result);
    var num = ks.length;
    $('#count').html('<h1>'+num+'</h1><p>Count</p>');
    makeLatest(result[ks[num-1]]);
    timel(result);
    //console.log(ks);
    // for(var i = 0; i < ks.length; i++){
    //   var k = ks[i];
    //   console.log(result[k]);
    // }
  }).fail(function(error){
    console.log(error);
  });
});
var timel = function(result){
  var ks = Object.keys(result);
  var values = [];
  for(var i = 1; i < ks.length; i++){
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
    .key(function(d) { return format.parse(d.key); })
    .rollup(function(v) { return v[0].values.length; })
    .entries(byDate);
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
