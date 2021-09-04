(() => {
  // src/index.ts
  var buttonContainer = document.querySelector(".css-5aeyry.e1h77j9v3");
  var buttonList = buttonContainer.querySelectorAll(".css-16523bz.e1h77j9v5");
  var templateButton = buttonList[0];
  if (buttonList.length >= 2)
    buttonList[1].remove();
  var button = templateButton.cloneNode(true);
  button.classList.add("upload");
  buttonContainer.insertBefore(button, templateButton.nextSibling);
})();
