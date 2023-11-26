// test

console.log('background script is running');

chrome.windows.onCreated.addListener(function (window) {
  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    console.log(tabs);
    if (tabs[0].url == 'chrome://newtab/') {
      chrome.tabs.update(tabs[0].id, { url: 'https://google.com' });
    }
  });
});

chrome.commands.onCommand.addListener(command => {
  console.log(`Command: ${command}`);
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log(message);
  if (message.action === 'openNewTab') {
    // Open a new tab
    chrome.tabs.create({ url: message.url });
  }
  /*
    if (message.action === "getChecked")
    {
        const checkbox1 = document.getElementById('checkbox1');
        const checkbox2 = document.getElementById('checkbox2');
        const checkbox3 = document.getElementById('checkbox3');
        
        // Get the checked status of each checkbox
        const isChecked1 = checkbox1.checked;
        const isChecked2 = checkbox2.checked;
        const isChecked3 = checkbox3.checked;
        
        // Use the checked status as needed
        //console.log(isChecked1, isChecked2, isChecked3);

        sendResponse({ data: [isChecked1, isChecked2, isChecked3] });
    }
    */
});
