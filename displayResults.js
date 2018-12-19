function displayResults(userData) {
    str = '<center>' +
                '<h1>What\'s in a Conversation?</h1><br /><br />';
    $("#main").html(str);

    displayFirstMessage(userData);
    displayLastMessage(userData);
    displayMessagingDuration(userData);
    displayMessageCount(userData);
    plotMessageCount(userData);
    displayAveragePerDay(userData);
    displayAverageMessageLength(userData);
    
    // most common words
    // average message length

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
            "<div class='resultTitle'>... or the last</div>" +
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

function displayMessageCount(userData) {
    str = "<center><div class='resultEntry'>" +
            "<div class='resultTitle'>Together, you've written</div>" +
            "<div class='resultContent'>" +
                "<b><div class='userBLarge'>" + userData.ab.messages.length + " messages</div></b>" +
            "</div>" +
        "</div><br /><br /></center>";
    appendTextToResults(str);
}

function displayAveragePerDay(userData) {
    var avg = userData.ab.messages.length / getDaysDuration(userData);
    avg = Math.round(avg);
    
        str = "<center><div class='resultEntry'>" +
                "<div class='resultTitle'>That\'s an average of</div>" +
                "<div class='resultContent'>" +
                    "<b><div class='userALarge'>" + avg + " messages per day</div></b>" +
                "</div>" +
            "</div><br /><br /></center>";
    appendTextToResults(str);
}

function getDaysDuration(userData) {
    var oneDay = 24*60*60*1000;
    firstDate = userData.ab.messages[userData.ab.messages.length-1].date;
    secondDate = userData.ab.messages[0].date;
    
    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
}

function displayMessagingDuration(userData) {
    
    str = "<center><div class='resultEntry'>" +
                "<div class='resultTitle'>You've been messaging for</div>" +
                "<div class='resultContentLarge'>" + getDaysDuration(userData).toString() + " days</div>" +
        "</div></center><br /><br />"
    appendTextToResults(str);
}

function displayAverageMessageLength(userData) {
    var shortUser = userData.a.name;
    if(userData.a.getAverageMessageLength() > userData.b.getAverageMessageLength()) {
        shortUser = userData.b.name;
    }
    str = "<center><div class='resultEntry'>" +
                "<div class='resultTitle'>"+ shortUser + " sends shorter messages</div>" +
                "<div class='resultContent'>" +
                    "<b><div class='userA'>" + userData.a.name + "</div></b>" +
                    "<i> " + userData.a.getAverageMessageLength().toString() + " words per message</i>" +
                    "<br /><br />" +
                    "<b><div class='userB'>" + userData.b.name + "</div></b>" +
                    "<i> " + userData.b.getAverageMessageLength().toString() + " words per messages</i>" +
                "</div>" +
            "</div><br /><br /></center>";
    appendTextToResults(str);
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

function plotMessageCount(userData) {
    
    var trace1 = {
    x:[userData.a.name, userData.b.name],
    y: [userData.a.messages.length, userData.b.messages.length],
    type: 'bar',
    marker:{
        color: ['rgba(255,69,0,1)', 'rgba(0, 90, 156,1)']
    }
};

    var data = [trace1];

    var layout = {
        title: 'Messages Sent',
        showlegend: false
    };
    appendPlotToResults('plotNumMessages', data, layout);
//Plotly.newPlot('test', data, layout, {displaylogo: false});
}

function appendPlotToResults(divName, data, layoutOptions) {
    str = $("#main").html();
    str += '<div id="' + divName + '" style="width: 60%; margin: 0px auto"></div>'
    $("#main").html(str);
    Plotly.newPlot(divName, data, layoutOptions);
}

function appendTextToResults(newStr) {
    str = $("#main").html();
    str += newStr;
    $("#main").html(str);
}