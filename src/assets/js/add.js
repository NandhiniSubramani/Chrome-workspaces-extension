// This script grabs the workspace data from the user's list of tabs & store them for later use
// https://developer.chrome.com/extensions/storage

let tabsList = document.getElementById("tabsList");
let saveBtn = document.getElementById("saveBtn");

chrome.tabs.query({}, function(tabs) {
  tabs.forEach(tab => {
    // Execluding the extension workspaces tab ( NOT GOOD WAY OF DOING IT  )
    if (tab.title != "Workspaces") {
      var item = document.createElement("li");
      item.innerText = tab.title;
      item.setAttribute("data-url", tab.url);
      tabsList.appendChild(item);
    }
  });
});

saveBtn.onclick = () => {
  chrome.storage.sync.get("WSarr", function(data) {
    var newWS = { title: "New Workspace", data: [] };
    console.log("Before", data.WSarr);

    // Add the URL of the tabs in the new workspace array
    Array.from(tabsList.children).forEach(item => {
      newWS.data.push(item.getAttribute("data-url"));
    });

    // Add the new workspace to WS object & store it
    data.WSarr.push(newWS);
    chrome.storage.sync.set({ WSarr: data.WSarr });
    chrome.storage.sync.get("WSarr", data => {
      console.log("After", data.WSarr);
    });
  });
};
