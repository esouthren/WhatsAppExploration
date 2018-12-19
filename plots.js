function plotTestPlot() {
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

function plotNumberOfMessagesPerUser() {
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