package com.hpbu.rest;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map.Entry;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;
import com.hpbu.rest.JsonModel.ChromaObj;
import com.hpbu.rest.JsonModel.ReportObj;
import com.hpbu.rest.JsonModel.Util;

@Path("/v1/service")
public class WebService {

	AccessManager accessManager = new AccessManager();
	LinkedHashMap<String, Integer> lumen = new LinkedHashMap<>();

	@POST
	@Path("/chroma")
	@Produces("application/json")
	public String chroma(@FormParam("startTime") String startTime, @FormParam("endTime") String endTime) {
		String chroma = null;
		ReportObj reportObj = new ReportObj();
		
		ArrayList<ChromaObj> chromaList = new ArrayList<ChromaObj>();
		try {
			String sqlStr = "SELECT * FROM SFCS_RUNCARD_CHROMA_VIEW WHERE MODEL_NO = 'DHD850' AND P_DATE BETWEEN " + "'" + startTime + "'"  + " AND " + "'" +  endTime + "'" +  " ORDER BY P_DATE, TIME";
			System.out.println(sqlStr);

			chromaList = accessManager.getDBData(sqlStr);
			for (int i = 0; i < chromaList.size(); i++) {
				float light = Float.valueOf(chromaList.get(i).getANSI_LUMEN());
				lumen.put(chromaList.get(i).getPRODUCT_SN(), (int)light);
			}
			System.out.println(chromaList.size());
			List<String> lineTitleList = new ArrayList<>();
			List<Integer> lineValueList = new ArrayList<>();
			lineTitleList.addAll(lumen.keySet());
			lineValueList.addAll(lumen.values());
			reportObj.setLineTitles(lineTitleList);
			reportObj.setLineValues(lineValueList);
			
			reportObj.setMaxLight(Collections.max(lumen.values()));
			reportObj.setMinLight(Collections.min(lumen.values()));
			reportObj.setAverage(Util.getAverage(lumen.values()));
			HashMap<Integer, Integer> chartData = Util.getChartData(lumen);
			List<Integer> barTitleList = new ArrayList<>();
			List<Integer> barValueList = new ArrayList<>();
			barTitleList.addAll(chartData.keySet());
			barValueList.addAll(chartData.values());
			reportObj.setTitles(barTitleList);
			reportObj.setValues(barValueList);
			
			Gson gson = new Gson();
			chroma = gson.toJson(reportObj);
			System.out.println(chroma);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return chroma;
	}

	@GET
	@Path("/status")
	@Produces(MediaType.TEXT_HTML)
	public String returnTitle() {
		return "<p> Java Web Service. Hi~Hi~</p>";
	}

	@GET
	@Path("/hour")
	@Produces(MediaType.APPLICATION_JSON)
	public String getAnHour() {
		Client client = ClientBuilder.newClient();

		// String jsonStr = client
		// .target("http://10.2.1.37/SFCS/api/ChromaAnhourAgo")
		// .request(MediaType.APPLICATION_JSON)
		// .header("ApiKey", "uaEPLpCWk4Jmp9nxg83YG0pW0B780wqcU0O1aXPVI04=")
		// .header("ApiName", "ChromaAnhourAgo")
		// .get(String.class);

		String jsonStr = client
				.target("http://10.2.1.38/log/api/CreateSiteState?queryStartDateTime=20160107140000&queryEndDateTime=20160107150000")
				.request(MediaType.APPLICATION_JSON).header("ApiKey", "uaEPLpCWk4Jmp9nxg83YG0pW0B780wqcU0O1aXPVI04=")
				.header("ApiName", "CreateSiteState").get(String.class);

		return jsonStr;
	}

	@GET
	@Path("/duration")
	@Produces(MediaType.APPLICATION_JSON)
	public String getDuration() {
		Client client = ClientBuilder.newClient();
		String startTime = "20160810000000";
		String endTime = "20160810240000";

		String jsonStr = client
				.target("http://10.2.1.38/log/api/CreateSiteState?queryStartDateTime=" + startTime
						+ "&queryEndDateTime=" + endTime)
				.request(MediaType.APPLICATION_JSON).header("ApiKey", "uaEPLpCWk4Jmp9nxg83YG0pW0B780wqcU0O1aXPVI04=")
				.header("ApiName", "CreateSiteState").get(String.class);

		return jsonStr;
	}
}
