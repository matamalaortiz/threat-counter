$(document).ready(function(){
  console.log("ready");
  $.ajax({
    url: '/anita',
    dataType: 'json',
    type: 'GET',
  }).done(function(result){
<<<<<<< HEAD
    ks = Object.keys
    console.log(ks);
    console.log(result);
    //console.log(result.-KiH6JqoZ62tWMAplh0h);
    //$("#data").text(result.KiH6JqoZ62tWMAplh0h);
=======
    var ks = Object.keys(result);
    //console.log(ks);
    for(var i = 0; i < ks.length; i++){
      var k = ks[i];
      console.log(result[k]);
    }
>>>>>>> b6b9f69d6d28da47a5209cdd94b2c5adddb8d748
  }).fail(function(error){
    console.log(error);
  });
});
