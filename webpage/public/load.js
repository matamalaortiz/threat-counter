$(document).ready(function(){
  var username = 'anita';
  var level = {
    'Moderate': 'https://raw.githubusercontent.com/matamalaortiz/threat-counter/master/img/green-button-moderate.png',
    'Severe': 'https://raw.githubusercontent.com/matamalaortiz/threat-counter/master/img/red-button-sever.png',
    'Substancial': 'https://raw.githubusercontent.com/matamalaortiz/threat-counter/master/img/yellow-button-substantial.png'
  }
  $('#banner').width($(window).width()*0.7);
  $.ajax({
    url: '/firebase/get/'+username,
    dataType: 'json',
    type: 'GET',
  }).done(function(result){
    var ks = Object.keys(result);
    var largediv = $('#load');
    for(var i = 1; i < ks.length; i++){
      var k = ks[i];
      var obj = result[k];
      var le = obj.category;
      var fl = le.charAt(0).toUpperCase() + le.slice(1)
      largediv.append('<div><img class="s" src='+obj.screenshot+'><img class="l" src='+level[obj.level]+'><h4>@'+obj.username+' <small>'+obj.date+'</small></h4><p>'+fl+' | <a href='+obj.url+'>'+obj.source+'</p></a><p class="content"style="background-color:#eeeeee">'+obj.threat+'</p></div>');
    }
  }).fail(function(error){
    console.log(error);
  });
});
