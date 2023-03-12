chrome.contextMenus.create({
    "id": "myContextMenu",
    "title": "Option maison ",
    "contexts": ["selection"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "myContextMenu") {
        const selectedText = info.selectionText;
        window.open("popup.html?text=" + encodeURIComponent(selectedText));
    }
});
