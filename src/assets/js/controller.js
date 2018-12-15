let addBtn = document.getElementById("addBtn");
let WSlist = document.getElementById("WSlist");

// Open the add workspace page
addBtn.onclick = function(element) {
  chrome.tabs.create({ url: "src/pages/add.html" });
};

// List all the available workspaces
chrome.storage.sync.get("WSarr", data => {
  if (data.WSarr.length) {
    data.WSarr.forEach(element => {
      var item = document.createElement("li");
      item.innerText = element.title;
      WSlist.appendChild(item);
    });
  }
});
