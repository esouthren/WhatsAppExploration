var COLOR_A_RGB = 'rgba(255,69,0,1)';
var COLOR_B_RGB = 'rgba(0, 90, 156,1)';

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
    displayBusiestHour(userData);
    plotMessageTimeOfDay(userData);
    displayNumberOfQuestions(userData);

    
    // most common words
    // number of words as a relation to works of literature (e.g your messages equal 1984!)
    // most use of emojis
    // who swears the most
    // messages by time of day
    // messages per day over time
    // who asks the most questions

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

function displayBusiestHour(userData) {
    var busiestHour = userData.ab.getBusiestHour();
    console.log(busiestHour.toString());
    var output = "is between ";
    switch(busiestHour) {
        case 0: output+="midnight and 1am"; break;
        case 1: output+="1am and 2am"; break;
        case 2: output+="2am and 3am"; break;
        case 3: output+="3am and 4am"; break;
        case 4: output+="4am and 5am"; break;
        case 5: output+="5am and 6am"; break;
        case 6: output+="6am and 7am"; break;
        case 7: output+="7am and 8am"; break;
        case 8: output+="8am and 9am"; break;
        case 9: output+="9am and 10am"; break;
        case 10: output+="10am and 11am"; break;
        case 11: output+="11am and midday"; break;
        case 12: output+="midday and 1pm"; break;
        case 13: output+="1pm and 2pm"; break;
        case 14: output+="2pm and 3pm"; break;
        case 15: output+="3pm and 4pm"; break;
        case 16: output+="4pm and 5pm"; break;
        case 17: output+="5pm and 6pm"; break;
        case 18: output+="6pm and 7pm"; break;
        case 19: output+="7pm and 8pm"; break;
        case 20: output+="8pm and 9pm"; break;
        case 21: output+="9pm and 10pm"; break;
        case 22: output+="10pm and 11pm"; break;
        case 23: output+="11pm and midnight"; break;
        default: output+="...";
    }
            str = "<center><div class='resultEntry'>" +
                "<div class='resultTitle'>The busiest time for messaging</div>" +
                "<div class='resultContent'>" +
                    "<b><div class='userBLarge'>" + output + "</div></b>" +
                "</div>" +
            "</div><br /><br /></center>";
    appendTextToResults(str);
}

function displayNumberOfQuestions(userData) {
    var aNum = userData.a.getQuantityOfCharacter('?');
    var bNum = userData.b.getQuantityOfCharacter('?');
    var output = userData.a.name + " asks the most questions";
    if(bNum > aNum) { output = userData.b.name + " asks the most questions"; }
    if(bNum===aNum) { output = "You ask the same number of questions"}
    
    str = "<center><div class='resultEntry'>" +
                "<div class='resultTitle'>" + output + "</div>" +
                "<div class='resultContent'>" +
                    "<b><div class='userA'>" + userData.a.name + "</div></b>" +
                    "<i> " + aNum + " questions</i>" +
                    "<br /><br />" +
                    "<b><div class='userB'>" + userData.b.name + "</div></b>" +
                    "<i> " +bNum + " questions</i>" +
                "</div>" +
            "</div><br /><br /></center>";
    appendTextToResults(str);
}
function plotMessageTimeOfDay(userData) {
    hours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
    var trace1 = {
        y: userData.a.getMessagesByHour(),
        x: hours,
        type: 'scatter',
        name: userData.a.name,
        line: {
            color: COLOR_A_RGB
        }
    };

    var trace2 = {
      y: userData.b.getMessagesByHour(),
      x: hours,
      type: 'scatter',
      name: userData.b.name,
      line: {
      color: COLOR_B_RGB
        }
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
        color: [COLOR_A_RGB, COLOR_B_RGB]
    }
};

    var data = [trace1];

    var layout = {
        title: 'Messages Sent',
        showlegend: false,
        yaxis: {
            title: 'Number of Messages'
        },
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