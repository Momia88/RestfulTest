package com.hpbu.rest.JsonModel;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;

import javax.xml.stream.events.StartDocument;

public class Util {

	public static LinkedHashMap<Integer, Integer> getChartData(HashMap<String, Integer> lumen) {
		LinkedHashMap<Integer, Integer> chartMap = new LinkedHashMap<>();
		int maxValue = Collections.max(lumen.values());
		int minValue = Collections.min(lumen.values());
		int increase = (maxValue - minValue) / 10;
		int half = increase / 2;
		int[] count = new int[11];

		try {
			for (int value : lumen.values()) {
				int key = (value - (minValue - half)) / increase;
				count[key]++;
			}
			chartMap.put(minValue - increase, 0);
			for (int i = 0; i < 11; i++) {
				int title = minValue + increase * i;
				chartMap.put(title, count[i]);
			}
			chartMap.put(maxValue + increase, 0);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return chartMap;
	}

	public static int getAverage(Collection<Integer> values) {
		int total = 0;
		List<Integer> list = new ArrayList<>();
		for (int i : values) {
			total += i;
			list.add(i);
		}
		Collections.sort(list);
		int avg = total / values.size();
		return avg;
	}
	

}
