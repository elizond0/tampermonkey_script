(function() {
  "use strict";
  function setClipboardText(event) {
    event.preventDefault();
    var node = document.createElement("div");
    node.appendChild(
      window
        .getSelection()
        .getRangeAt(0)
        .cloneContents()
    );
    var htmlData = node.innerHTML;
    var textData = window.getSelection().getRangeAt(0);
    if (event.clipboardData) {
      event.clipboardData.setData("text/html", htmlData);
      event.clipboardData.setData("text/plain", textData);
    } else if (window.clipboardData) {
      return window.clipboardData.setData("text", textData);
    }
  }
  document.addEventListener("copy", function(e) {
    setClipboardText(e);
  });
})();
