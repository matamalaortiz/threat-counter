$(document).ready(function(){
  console.log("ready");
  $.ajax({
    url: '/anita',
    dataType: 'json',
    type: 'GET',
  }).done(function(result){
    var ks = Object.keys(result);
    //console.log(ks);
    for(var i = 0; i < ks.length; i++){
      var k = ks[i];
      console.log(result[k]);
    }
  }).fail(function(error){
    console.log(error);
  });
});
