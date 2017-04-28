
console.log('here');

var date = document.getElementById('date');
var username = document.getElementById('username');
var content = document.getElementById('content');
var url = document.getElementById('url');
var category = document.getElementById('category');
var submit = document.getElementById('submit');

var db_vars = {};


chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
}, function(tabs) {
    var tab = tabs[0];
    db_vars.url, url.value = tab.url;
    db_vars.source = tab.url.split("://")[1].split(".")[0];
    if (db_vars.source === "twitter" ){
      db_vars.username =  tab.url.split("://")[1].split("/")[1];
      username.value = db_vars.username;
      console.log(db_vars.username);
    } else {
      db_vars.username = username.value;
    }

});

submit.addEventListener("click", data);

function data() {

  db_vars.date = date.value;
  db_vars.threat = content.value;
  db_vars.category = category.value;
  db_vars.url = url.value;

  database.ref('users/anita').push(db_vars);

  console.log('ok')

}
