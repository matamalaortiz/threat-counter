document.addEventListener('DOMContentLoaded', function() {

  console.log('here');

  var date = document.getElementById('date');
  var username = document.getElementById('username');
  var content = document.getElementById('content');
  var url = document.getElementById('url');
  var level = document.getElementById('level');
  var category = document.getElementById('category');
  var submit = document.getElementById('submit');
  var urlTab;

  var db_vars = {};
  var id = 100;

  if (selectedText != "") {
    content.value = selectedText;
  } else {
    content.value = "";

  }

  chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
  }, function(tabs) {
      var tab = tabs[0];
      db_vars.url, url.value = tab.url;
      var site = new URL(tab.url);
      var a = site.host.split('.');
      if(a.length == 3){
        db_vars.source = a[1];
      }else{
        db_vars.source = a[0];
      }


      if (db_vars.source === "twitter" ){
        console.log(db_vars.source);
        db_vars.username =  tab.url.split("://")[1].split("/")[1];
        username.value = db_vars.username;
        console.log(db_vars.username);
      }




  });

  submit.addEventListener("click", data);

  chrome.tabs.query({
        'active': true,
        'lastFocusedWindow': true
    }, function(tabs) {
        urlTab = tabs[0].url;
        // console.log(urlTab);

        chrome.tabs.captureVisibleTab(function(screenshotUrl) {
            var viewTabUrl = chrome.extension.getURL('screenshot.html?id=' + id++)

            var img = screenshotUrl.replace(/data:image\/(png|jpeg|jpg|gif);base64,/, '');
            // console.log(img);
            // var myBlob = new Blob([screenshotUrl], {type : "image/jpg"});
            var date = Date.now();
            var storageRef = firebase.storage().ref("screenshots/" + date + ".jpg");
            var imageLink = "https://firebasestorage.googleapis.com/v0/b/threat-1186e.appspot.com/o/screenshots%2F" + date + ".jpg?alt=media&token=a44ee886-f170-4c67-bdf6-b215eb97222f";
            // console.log(imageLink);
            db_vars.screenshot = imageLink;

            var task = storageRef.putString(img, 'base64').then(function(snapshot) {
              console.log('Uploaded a base64 string!');
              console.log(storageRef);
            });

        });

    });

  function data() {

    db_vars.date = date.value;
    db_vars.threat = content.value;
    db_vars.category = category.value;
    db_vars.level = level.value;
    db_vars.url = url.value;
    db_vars.username = username.value;

    database.ref('users/anita').push(db_vars);

    console.log('ok')

  }

});
