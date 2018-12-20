function loadHomepage() {

    var instructions = [
        "Open the WhatsApp conversation you'd like to examine and click the 3-dot menu icon", "Select 'More'", 
        "Select 'Export chat'", 
        "Choose 'Without Media'", 
        "Email the chat file to yourself"
    ];
    
    var pageHtmlString = "<div class='fileUploadWrapper'>" +
        "<button class='uploadButton'>Upload a .txt File</button>" +     
        "<input type='file' id='fileToLoad' onchange='checkFileExtension()' />" +  
    "</div>" +
    "<br /><br />" +
    "<div id='warning'></div>" +
    "<div class='analyseButtonDiv'></div>" +
    "<br /><br /><h2>How do I get a chat file?</h2><br /><br />";
    
    for(var i = 0; i < instructions.length; ++i) {
        pageHtmlString += "<div class='resultScrollBox' data-aos='fade-up'>" +
        "<div class='resultEntry'>" +
            "<div class='resultTitleInstruction'><h3>" + instructions[i] +
            "</h3></div>" +
            "<div class='resultContentInstruction'>" +
                "<div class='userBLarge'><img src='img/" + (i+1).toString() + ".png' alt='" + instructions[i] + "' class='instructionImg' /></div>" +
            "</div>" + 
        "</div></div><br /><br /><br />";
    }
    $('#main').html(pageHtmlString);
}

function validateFileInput() {
  var fileToLoad = document.getElementById('fileToLoad').files[0];
  if(typeof fileToLoad == 'undefined') {
      displayNoFileSelectedWarning();
  } else {
      readFile(fileToLoad);
  }

}

function checkFileExtension() {
  var file = document.querySelector('#fileToLoad');
  if ( /\.(txt)$/i.test(file.files[0].name) === false ) { 
      displayWrongExtensionError(); 
  } else {
      displayAnalyseButton();
  }
}

function displayAnalyseButton() {
    $('.analyseButtonDiv').html("<div onclick='validateFileInput()' class='analyseButton'>Let\'s Analyse!</div>");
}

function readFile(file) {
    clearWarnings();
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) {
      var textFromFileLoaded = fileLoadedEvent.target.result;
      var userData = processData(textFromFileLoaded);
        $('#main').html('');
        displayResults(userData); // displayResults.js
  };
  fileReader.readAsText(file, 'UTF-8');
}

function displayNoFileSelectedWarning() {
    var str = "<p class='warning'>Please select a file to upload!</p>"
    $('#warning').html(str);
}

function displayWrongExtensionError() {
    var str = "<p class='warning'>Wrong file type: must be a .txt file</p>"
    $('#warning').html(str);
}

function clearWarnings() {
    $('#warning').html('');
}


