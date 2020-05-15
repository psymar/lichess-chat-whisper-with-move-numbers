// we set a timer because Lichess takes a while to load all DOM elements

function setchatbox() {

  var chatbox = document.querySelector("#main-wrap > main > aside > section > div.mchat__content.discussion > input");
  
  if( chatbox == undefined ) {
    return;
  }

  chatbox.onchange = function () { 

    var movenum = document.querySelectorAll("#main-wrap > main > div.round__app.variant-standard > div.rmoves > div.moves > index").length;
    
    if( chatbox.value.substring(0,2) == "/w" )
      chatbox.value = '/w (' + movenum + ')' + chatbox.value.substring(2,200); 
    else
      chatbox.value = '(' + movenum + ') ' + chatbox.value; 
  };

  clearTimeout(chatboxtimer);
}

var chatboxtimer = setTimeout(setchatbox, 1000);
