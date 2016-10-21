function chromaDB() {

	var jsonData = $
			.ajax({
//				url : 'http://10.2.1.37/SFCS/api/ChromaAnhourAgo',
				url : 'http://10.2.1.38/log/api/CreateSiteState?queryStartDateTime=20160107140000&queryEndDateTime=20160107150000',
			    type: 'POST',
			    crossDomain: true,
			    dataType: 'json',
				headers: {
					"ApiKey":"uaEPLpCWk4Jmp9nxg83YG0pW0B780wqcU0O1aXPVI04=",
		            "ApiName":"CreateSiteState",
				},
			    success: function() { alert("Success"); },
			    error: function() { alert('Failed!'); },
			});
}

chromaDB();
