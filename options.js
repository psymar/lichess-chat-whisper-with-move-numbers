
// Saves options to chrome.storage
function save_options() {
    var ison    = document.getElementById('ison').checked;
    var isboth  = document.getElementById('isboth').checked;
    var isfront = document.getElementById('isfront').checked;
  
    chrome.storage.sync.set({
      ison: ison,
      isboth: isboth,
      isfront: isfront
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    chrome.storage.sync.get({
      ison: true,
      isboth: true,
      isfront: true
    }, function(items) {
      document.getElementById('ison').checked    = items.ison;
      document.getElementById('isboth').checked  = items.isboth;
      document.getElementById('isfront').checked = items.isfront;
    });
  }
  
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click', save_options);
  
  