// this path works only in an ongoing game, which is neat, as later on we don't need move number prefixes
CHAT_ELEM = "#main-wrap > main > aside > section > div.mchat__content.discussion > input";

function setchatbox() {

  var chatbox = document.querySelector(CHAT_ELEM);
  
  if( chatbox == undefined ) {
    return;
  }

  var ison    = true;
  var isboth  = true;
  var isfront = true;

  var client;
  if( IsChrome() ){
      client= chrome;        
  } else if( IsFirefox() ) {
      client = browser;       
  }

  client.storage.sync.get({
    ison: true,
    isboth: true,
    isfront: true
  }, function(items) {
    ison    = items.ison;
    isboth  = items.isboth;
    isfront = items.isfront;
  });

  chatbox.onchange = function () { 

    if( !ison ) return;

    var movenum = document.getElementsByTagName("i5z").length;
    if( (movenum == undefined) || (movenum < 1) ) return;
   
    if( (chatbox.value.substring(0,2) == "/w") || (chatbox.value.substring(0,2) == "/W") )
      chatbox.value = isfront ? ('/w (' + movenum + ')' + chatbox.value.substring(2,200)) : ('/w' + chatbox.value.substring(2,200) + ' (' + movenum + ')'); 
    else if ( isboth )
      chatbox.value = isfront ? ('(' + movenum + ') ' + chatbox.value) : (chatbox.value + ' (' + movenum + ')'); 
  };

  clearTimeout(chatboxtimer);
}

// we set a timer because Lichess takes a while to load all DOM elements
var chatboxtimer = setTimeout(setchatbox, 1000);
