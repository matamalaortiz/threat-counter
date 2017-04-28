$(document).ready(function(){
  console.log("ready");
  $.ajax({
    url: '/anita',
    dataType: 'json',
    type: 'GET',
  }).done(function(result){
    //console.log(result);
    //console.log(result.-KiH6JqoZ62tWMAplh0h);
    //$("#data").text(result.KiH6JqoZ62tWMAplh0h);
  }).fail(function(error){
    console.log(error);
  });
});
