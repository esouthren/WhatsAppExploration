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
    plotMessageTimeOfDay(userData);

    
    // most common words
    // number of words as a relation to works of literature (e.g your messages equal 1984!)
    // most use of emojis
    // who swears the most
    // messages by time of day
    // messages per day over time

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
                    "<i> " + userData.b.getAverageMessageLength().toString() + " words per message</i>" +
                "</div>" +
            "</div><br /><br /></center>";
    appendTextToResults(str);
}


function plotMessageTimeOfDay(userData) {
    hours = [00, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    var trace1 = {
        y: userData.a.getMessagesByHour(),
        x: hours,
        type: 'scatter',
        name: userData.a.name,
    };

    var trace2 = {
      y: userData.b.getMessagesByHour(),
      x: hours,
      type: 'scatter',
        name: userData.b.name,
    };

    var data = [trace1, trace2];
    var layout = {
        xaxis: {
            type: 'category',
            title: 'Time by Hour'
        },
        yaxis: {
            title: 'Number of Messages'
        },
        title: 'Messages By Hour',
    };
    var newDiv = 'plotMessagesByHour';
    appendPlotToResults(newDiv, data, layout, 90);
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
    appendPlotToResults('plotNumMessages', data, layout, 60);
//Plotly.newPlot('test', data, layout, {displaylogo: false});
}

function appendPlotToResults(divName, data, layoutOptions, width) {
    str = $("#main").html();
    str += '<div id="' + divName + '" style="width: ' + width + '%; margin: 0px auto"></div>'
    $("#main").html(str);
    Plotly.newPlot(divName, data, layoutOptions);
}

function appendTextToResults(newStr) {
    str = $("#main").html();
    str += newStr;
    $("#main").html(str);
}