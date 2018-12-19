function loadHomepage() {
    console.log("loading...");
    var pageHtmlString = '<center>' +
    '<tr>' +
    '<td>Select a File to Load: </td>' +
    '<td><input type="file" text="blah" id="fileToLoad" onchange="checkFileExtension()" ></td>' + 
    '<br /><br /><td><button onclick="validateFileInput()" class="uploadButton">Let\'s Analyse!</button><td>' +
    '</tr>' +
    '<div id="warning"></div>';
    $("#main").html(pageHtmlString);
}

function validateFileInput() {
  var fileToLoad = document.getElementById("fileToLoad").files[0];
  if(typeof fileToLoad == 'undefined') {
      console.log("Select a .txt file to analyse!");
      displayNoFileSelectedWarning();
  } else {
      readFile(fileToLoad);
  }

}

function checkFileExtension() {
  var file = document.querySelector("#fileToLoad");
  if ( /\.(txt)$/i.test(file.files[0].name) === false ) { 
      displayWrongExtensionError(); 
  }
}

function readFile(file) {
    clearWarnings();
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) {
      var textFromFileLoaded = fileLoadedEvent.target.result;
      //console.log(textFromFileLoaded.slice(0,1000));
      var userData = processData(textFromFileLoaded);
        displayResults(userData);
  };
  fileReader.readAsText(file, "UTF-8");
}

function displayNoFileSelectedWarning() {
    var str = '<p class="warning">Please select a file to upload!</p>'
    $("#warning").html(str);
}

function displayWrongExtensionError() {
    var str = '<p class="warning">Wrong file type: must be a .txt file</p>'
    $("#warning").html(str);
}

function clearWarnings() {
    $("#warning").html("");
}

function displayResults(userData) {
    str = '<center>' +
                '<h1>What\'s in a Conversation?</h1><br /><br />';
    $("#main").html(str);
    
    
    displayResults(userData); // plots.js
    //displayGraphs(userData); // plots.js

    
}

