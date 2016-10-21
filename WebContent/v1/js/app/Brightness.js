/**
 * 
 */
var randomScalingFactor = function() {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
};
var randomColorFactor = function() {
    return Math.round(Math.random() * 255);
};

$('#sumitBtn').click(

function drawBarChart() {
    var sTime = document.getElementById("startdatepicker").value;
    var eTime = document.getElementById("enddatepicker").value;
    Date.prototype.dateDiff = function(interval, objDate) {
	var dtEnd = new Date(objDate);
	if (isNaN(dtEnd))
	    return null;
	switch (interval) {
	case "s":
	    return parseInt((dtEnd - this) / 1000);
	case "n":
	    return parseInt((dtEnd - this) / 60000);
	case "h":
	    return parseInt((dtEnd - this) / 3600000);
	case "d":
	    return parseInt((dtEnd - this) / 86400000);
	case "w":
	    return parseInt((dtEnd - this) / (86400000 * 7));
	case "m":
	    return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - this.getFullYear()) * 12) - (this.getMonth() + 1);
	case "y":
	    return dtEnd.getFullYear() - this.getFullYear();
	}
    }
    var s = new Date(sTime);
    var e = new Date(eTime);
    if (s.dateDiff("m", e) > 12 || s.dateDiff("m", e) == null) {
	alert("日期錯誤或超過12個月!");
	return;
    }
    jsonData = $.ajax({
	url : 'http://localhost:8080/RestfulTest/api/v1/service/chroma',
	type : "POST",
	data : {
	    startTime : sTime,
	    endTime : eTime
	},
	dataType : 'json',
	success : function(barChartData) {
	    // Split timestamp and data into
	    // separate arrays
	    $('#BarChart').remove();
	    $('#graph-container').append('<canvas id="BarChart" width="600" height="480"><canvas>');
	    var title = barChartData.titles;
	    var value = barChartData.values;
	    var backColor = [];
	    var borderColor = [];
	    var r, g, b;
	    var maxValue = barChartData.maxLight;
	    var minValue = barChartData.minLight;
	    var avgValue = barChartData.average;
	    var stdValue = barChartData.standard;
	    document.getElementById('maxlight').innerHTML = maxValue;
	    document.getElementById('minlight').innerHTML = maxValue;
	    document.getElementById('average').innerHTML = avgValue;
	    document.getElementById('standard').innerHTML = avgValue;

	    for (var i = 0; i < title.length; i++) {
		r = randomColorFactor();
		g = randomColorFactor();
		b = randomColorFactor();
		backColor.push('rgba(' + r + "," + g + "," + b + ",0.5)");
		borderColor.push('rgba(' + r + "," + g + "," + b + ",1)");
	    }
	    var avgIndex = (avgValue - minValue) / (maxValue - minValue) * 10 + 2;
	    var data = {
		labels : title,
		datasets : [ {
		    label : [ "DWU850 20160801 - 20160825" ],
		    backgroundColor : backColor,
		    borderColor : borderColor,
		    borderWidth : 1,
		    data : value,
		} ],
		lineAtIndex : avgIndex
	    };

	    var ctx = $('#BarChart').get(0).getContext("2d");

	    // show line and value
	    // 20160120 remove

	    new Chart(ctx, {
		type : 'bar',
		data : data,
		options : {
		    title : {
			display : true,
			text : "Chart.js Bar Chart - Stacked"
		    },
		    tooltips : {
			mode : 'index'
		    },
		    responsive : false,
		    scales : {
			xAxes : [ {
			    stacked : false,
			} ],
			yAxes : [ {
			    stacked : false,
			} ]
		    },
		    animation : {
			/* show value */
			onComplete : function() {
			    var chartInstance = this.chart;
			    var ctx = chartInstance.ctx;
			    ctx.fillStyle = "#FF0000";
			    ctx.textAlign = "center";
			    ctx.textBaseline = "bottom";

			    Chart.helpers.each(this.data.datasets.forEach(function(dataset, i) {
				var meta = chartInstance.controller.getDatasetMeta(i);
				Chart.helpers.each(meta.data.forEach(function(bar, index) {
				    ctx.fillText(dataset.data[index], bar._model.x, bar._model.y - 10);
				}), this)
			    }), this);
			}
		    }
		}
	    });
	    drawLineChart(barChartData);
	},

	error : function() {
	    alert("ERROR!!!");
	}
    });

});

function drawLineChart(barChartData) {

    var lineTitle = [];
    var lineValue = [];
    var backColor = [];
    var borderColor = [];
    var r, g, b;
    var lineTitle = barChartData.lineTitles;
    var lineValue = barChartData.lineValues;
    $('#BrightLineChart').remove();
    $('#graph-container').append('<canvas id="BrightLineChart" width="1024" height="480"><canvas>');

    var canvas = document.getElementById("BrightLineChart")
    var ctx = canvas.getContext('2d');
    var data = {
	labels : lineTitle,
	datasets : [ {
	    label : "My First dataset",
	    fill : false,
	    lineTension : 0.1,
	    backgroundColor : "rgba(75,192,192,0.4)",
	    borderColor : "rgba(75,192,192,1)",
	    borderCapStyle : 'butt',
	    borderDash : [],
	    borderDashOffset : 0.0,
	    borderJoinStyle : 'miter',
	    pointBorderColor : "rgba(75,192,192,1)",
	    pointBackgroundColor : "#fff",
	    pointBorderWidth : 1,
	    pointHoverRadius : 5,
	    pointHoverBackgroundColor : "rgba(75,192,192,1)",
	    pointHoverBorderColor : "rgba(220,220,220,1)",
	    pointHoverBorderWidth : 2,
	    pointRadius : 1,
	    pointHitRadius : 10,
	    data : lineValue,
	    spanGaps : false,
	} ]
    };

    var myBarChart = new Chart(ctx, {
	type : 'line',
	data : data,
	options : {
	    responsive : false,
	    scales : {
		xAxes : [ {
		    stacked : false
		} ],
		yAxes : [ {
		    stacked : true
		} ]
	    }
	}
    });
}