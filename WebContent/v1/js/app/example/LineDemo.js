$(function (){
	
	
	var canvas = document.getElementById("LineChart")
	var ctx = canvas.getContext('2d');
	
	var data = {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets:[
		{
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false,
		},
		{
			label: "The Second Dataset",
			fillColor: "rgba(76,0,153,0.2)",
			strokeColor: "rgba(76,0,153,1)",
			pointColor: "rgba(76,0,153,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill:"#fff",
			pointHightlightStroke: "rgba(76,0,153,1)",
			data: [28,48,40,19,86,27,90]
		}]
	};

	var myBarChart = new Chart(ctx, {
	    type: 'line',
	    data: data,
	    options: {
			responsive: false,
	        scales: {
	            xAxes: [{
	                stacked: false
	            }],
	            yAxes: [{
	                stacked: false
	            }]
	        }
	    } 
	});
	
	
});