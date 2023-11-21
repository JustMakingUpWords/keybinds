console.log('content.js is running on this website');

// Event listener to capture keydown events
document.addEventListener('keydown', function(event)
{
    // Log the key code, key, and any modifiers (e.g., Shift, Ctrl)
    console.log("Key Pressed: ", event.keyCode);

    let ctrl = event.ctrlKey;
    let shift = event.shiftKey;
    let alt = event.altKey;
    let meta = event.metaKey;
    
    // You can also log the entire event object if needed
    //console.log("Event Object: ", event);

    chrome.storage.sync.get(null, function(items) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
        }
        for (let key in items) {
            chrome.storage.sync.get(key, function(data)
            {
                //console.log(`Key: ${key}`);
                //console.log(data[key]);
                let k = key.split(",");
                let d = data[key];
                //console.log(k, d);
                
                if ((k[0] === 'true') === ctrl &&
                    (k[1] === 'true') === shift &&
                    (k[2] === 'true') === alt &&
                    event.code === k[3])
                {
                    chrome.runtime.sendMessage({ action: "openNewTab", url: d});
                }
            });
        }
    });

    /*
    chrome.storage.sync.get(null, function(data)
    {
        // 'data' is an object containing all the stored elements
        console.log(data);
      
        // You can now work with the data as needed
        // For example, if the stored data is an array:
        const elements = data.elements;
        console.log(elements);
    });
    */
});

//m0 n h, spirit, aotd, m5 n c, l0 s c, l5 n h
//l0 n b, l0 n c, l5 n l