var randomScalingFactor = function() {
	return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
};
var randomColorFactor = function() {
	return Math.round(Math.random() * 255);
};

function drawChart() {
	var sTime = document.getElementById("startdatepicker").value;
	var eTime = document.getElementById("enddatepicker").value;
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
			var title = [];
			var value = [];
			var backColor = [];
			var borderColor = [];
			var r, g, b;
			for (var i = 0; i < barChartData.length; i++) {
				title.push(barChartData[i]['PRODUCT_SN']);
				value.push(barChartData[i]['ANSI_LUMEN'].split(".")[0]);
				r = randomColorFactor();
				g = randomColorFactor();
				b = randomColorFactor();
				backColor.push('rgba(' + r + "," + g + "," + b + ",0.2)");
				borderColor.push('rgba(' + r + "," + g + "," + b + ",1)");
			}

			var data = {
				labels : title,
				datasets : [ {
					label : [ "DWU850 20160801 - 20160825" ],
					backgroundColor : backColor,
					borderColor : borderColor,
					borderWidth : 1,
					data : value,
				} ],
				lineAtIndex : 2
			};

			var ctx = $('#BarChart').get(0).getContext("2d");

			// show line and value
			var originalLineDraw = Chart.controllers.bar.prototype.draw;
			var stdValue = 1024;

			Chart.helpers.extend(Chart.controllers.bar.prototype, {
				draw : function() {
					originalLineDraw.apply(this, arguments);

					var chart = this.chart;
					var ctx = chart.chart.ctx;

					var index = chart.config.data.lineAtIndex;
					if (index) {
						var xaxis = chart.scales['x-axis-0'];
						var yaxis = chart.scales['y-axis-0'];
						ctx.fillStyle = "#0000FF";
						ctx.textAlign = "center";
						ctx.textBaseline = "bottom";
						ctx.save();
						ctx.beginPath();
						ctx.moveTo(xaxis.getPixelForValue(undefined, index),
								yaxis.top);
						ctx.strokeStyle = '#FF0000';
						ctx.lineTo(xaxis.getPixelForValue(undefined, index),
								yaxis.bottom);
						ctx.stroke();
						ctx.restore();
						ctx.fillText(stdValue, xaxis.getPixelForValue(
								undefined, index), yaxis.top - 5);

					}
				}
			});

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
					responsive : true,
					scales : {
						xAxes : [ {
							stacked : true,
						} ],
						yAxes : [ {
							stacked : true
						} ]
					},
					animation : {

					}
				}
			});
		},

		error : function() {
			alert("ERROR!!!");
		}
	});
};
