// prettier-ignore
window.onload = function()
{
    console.log("popup.js is running");

    // logs every key in storage
    chrome.storage.sync.get(null, function(items) {
        const keybindList = document.getElementById("keybindList");
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
        }
        for (let key in items) {
            chrome.storage.sync.get(key, function(data)
            {
                // updates list in popup.html for every keybind
                console.log(`Key: ${key}`);
                console.log(data[key]);

                // const li = document.createElement("li");
                
                let text = "";
                let splitKey = key.split(",");
                
                if (splitKey[0] == 'true')
                {
                    text += "Ctrl + ";
                }
                if (splitKey[1] == 'true')
                {
                    text += "Shift + ";
                }
                if (splitKey[2] == 'true')
                {
                    text += "Alt + ";
                }
                text += splitKey[3];
                text += data[key];

                // const div1 = document.createElement('div');
                // div1.style.float = 'left';
                // div1.style.width = '200px';
                // div1.innerHTML = text;

                // const button = document.createElement('button');
                // button.style.float = 'right';
                // button.style.width = '30px';
                // button.style.height = '30px';
                // button.style.marginTop = '5px';
                // button.style.background = 'none';
                // button.style.border = 'none';
                
                // // on click button next to keybind text

                // const buttonX = document.createElement('img');
                // buttonX.src = "x.svg";
                // buttonX.id = "myImage";
                // button.appendChild(buttonX);

                // const linebreak = document.createElement('p');
                // linebreak.innerHTML = "<br><br><hr>";

                // li.appendChild(div1);
                // li.appendChild(button);
                // li.appendChild(linebreak);
                // keybindList.appendChild(li);

                keybindList.innerHTML = `${keybindList.innerHTML}
                <div>
                <div style="float: left; width: 200px;">
                new ${text}<br>
                </div>
                <button id="key-${key}"><img src="x.svg" id="myImage">
                </button>
                </div>
                `
                
                document.getElementById(`key-${key}`).onclick = () => {
                  chrome.storage.sync.remove(key, function()
                  {
                    console.log("removed", key);
                    location.reload();
                  });
                }

            });
        }
    });

    // setting a keybind that the user inputs
    let scanKey = false;
    const keybindButton = document.getElementById("keybindButton");
    const keyFound = document.getElementById("key");
    let currentKey = "";

    const resetButtonText = () => // reset "set keybind" button to default
    {
        scanKey = false;
        keybindButton.innerHTML = "Click to set Key";
    }

    keybindButton.onclick = function()
    {
        scanKey = !scanKey;
        
        if (scanKey)
        {
            keybindButton.innerHTML = "Awaiting Input";
        }
        else
        {
            resetButtonText();
        }
    }

    document.addEventListener('keydown', function(event) { // scan key
        if (scanKey)
        {   
            keyFound.innerHTML = event.key.toUpperCase();
            currentKey = event.code;
            resetButtonText();
        }
    });

    //chrome.storage.sync.get('numCommands', function(data) {console.log(data.numCommands);});
    // saves keybind to chrome.storage.sync
    document.getElementById("save").onclick = function()
    {
        console.log("Balls");
        const keybind = [];
        var website = document.getElementById('website').value;

        const ctrl = document.getElementById('ctrl');
        const shift = document.getElementById('shift');
        const alt = document.getElementById('alt');
        const command = document.getElementById('command');

        const ctrlCheck = ctrl.checked;
        const shiftCheck = shift.checked;
        const altCheck = alt.checked;
        const commandCheck = command.checked;

        if (ctrlCheck)
        {
            keybind.push(true);
        }
        else
        {
            keybind.push(false);
        }
        if (shiftCheck)
        {
            keybind.push(true);
        }
        else
        {
            keybind.push(false);
        }
        if (altCheck)
        {
            keybind.push(true);
        }
        else
        {
            keybind.push(false);
        }

        keybind.push(currentKey);

        let sampObject = {};
        sampObject[keybind] = website;

        chrome.storage.sync.set(sampObject, function(data)
        {
            console.log(data);
        });
        // alert("Successfully added");
        location.reload(); // reloads the popup from the extension
    }

    document.getElementById("reset").onclick = function()
    {
        console.log("Balls");
        chrome.storage.sync.clear();
        alert("Successfully cleared");
        location.reload();
    }
}
