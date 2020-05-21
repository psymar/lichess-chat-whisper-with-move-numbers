// we set a timer because Lichess takes a while to load all DOM elements

function setchatbox() {

  var chatbox = document.querySelector("#main-wrap > main > aside > section > div.mchat__content.discussion > input");
  
  if( chatbox == undefined ) {
    return;
  }

  var ison    = true;
  var isboth  = true;
  var isfront = true;

  chrome.storage.sync.get({
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

    var movenum = document.querySelectorAll("#main-wrap > main > div.round__app.variant-standard > div.rmoves > div.moves > index").length;
    if( (movenum == undefined) || (movenum < 1) ) return;
    
    if( chatbox.value.substring(0,2) == "/w" )
      chatbox.value = isfront ? ('/w (' + movenum + ')' + chatbox.value.substring(2,200)) : ('/w' + chatbox.value.substring(2,200) + ' (' + movenum + ')'); 
    else if ( isboth )
      chatbox.value = isfront ? ('(' + movenum + ') ' + chatbox.value) : (chatbox.value + ' (' + movenum + ')'); 
  };

  clearTimeout(chatboxtimer);
}

var chatboxtimer = setTimeout(setchatbox, 1000);

// todo - Chess 960 move number is at #main-wrap > main > div.round__app.variant-chess960 > div.rmoves > div.moves > index
// 