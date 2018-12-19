function displayTextResults(userData) {

    displayFirstMessage(userData);
    displayLastMessage(userData);
    displayMessagingDuration(userData);

}

function displayFirstMessage(userData) {
    str = "<center><div class='resultEntry'>" +
                "<div class='resultTitle'>No message like the first...</div>" +
                "<div class='resultContent'>" +
                    "<b><div class='userA'>" + userData.a.name + "</div></b>" +
                    "<i> " + userData.a.messages[0].content + "</i>" +
                    "<br /><br />" +
                    "<b><div class='userB'>" + userData.b.name + "</div></b>" +
                    "<i> " + userData.b.messages[0].content + "</i>" +
                "</div>" +
            "</div><br /><br /></center>";
    appendTextToResults(str);
}

function displayLastMessage(userData) {
    str = "<center><div class='resultEntry'>" +
                "<div class='resultTitle'>... or the Last</div>" +
                "<div class='resultContent'>" +
                    "<b><div class='userA'>" + userData.a.name + "</div></b>" +
                    "<i> " + userData.a.messages[userData.a.messages.length-1].content + "</i>" +
                    "<br /><br />" +
                    "<b><div class='userB'>" + userData.b.name + "</div></b>" +
                    "<i> " + userData.b.messages[userData.b.messages.length-1].content + "</i>" +
                "</div>" +
            "</div><br /><br /></center>";
    appendTextToResults(str);
}

function displayMessagingDuration(userData) {
    var oneDay = 24*60*60*1000;
    firstDate = userData.ab.messages[userData.ab.messages.length-1].date;
    secondDate = userData.ab.messages[0].date;
    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
    str = "<center><div class='resultEntry'>" +
                "<div class='resultTitle'>You've been messaging for</div>" +
                "<div class='resultContentLarge'>" + diffDays.toString() + " days</div>" +
        "</div></center>"
    appendTextToResults(str);
}


function displayGraphs(userData) {
    plotNumberOfMessagesPerUser(userData);
    plotTestPlot(userData);
}

function plotTestPlot(userData) {
    var trace1 = {
          x: [1, 2, 3, 4],
          y: [10, 15, 13, 17],
          type: 'scatter',
        };

    var trace2 = {
      x: [1, 2, 3, 4],
      y: [16, 5, 11, 9],
      type: 'scatter'
    };

    var data = [trace1, trace2];
    var layout = {
    title: 'Test Scatter Plot!'
    
    };
    var newDiv = 'test';
    appendPlotToResults(newDiv, data, layout);
    //Plotly.newPlot('myDiv', data, layout, {displayModeBar: false});

}

function plotNumberOfMessagesPerUser(userData) {
    var trace1 = {
    x:['trees', 'flowers', 'hedges'],
    y: [90, 130, 40],
    type: 'bar'
};

var data = [trace1];

var layout = {
    title: 'Hide the Plotly Logo on the Modebar',
    showlegend: false
};
    appendPlotToResults('plotNumMessages', data, layout);
//Plotly.newPlot('test', data, layout, {displaylogo: false});
}

function appendPlotToResults(divName, data, layoutOptions) {
    str = $("#main").html();
    str += '<div id="' + divName + '"></div>'
    $("#main").html(str);
    Plotly.newPlot(divName, data, layoutOptions);
}

function appendTextToResults(newStr) {
    str = $("#main").html();
    str += newStr;
    $("#main").html(str);
}