package com.hpbu.rest.JsonModel;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

public class ReportObj {

	List<Integer> titles;
	List<Integer> values;
	List<String> lineTitles;
	List<Integer> lineValues;
	int maxLight;
	int minLight;
	int average;
	int standard;


	public List<String> getLineTitles() {
		return lineTitles;
	}
	public void setLineTitles(List<String> lineTitles) {
		this.lineTitles = lineTitles;
	}
	public List<Integer> getLineValues() {
		return lineValues;
	}
	public void setLineValues(List<Integer> lineValues) {
		this.lineValues = lineValues;
	}
	public int getStandard() {
		return standard;
	}
	public void setStandard(int standard) {
		this.standard = standard;
	}
	public List<Integer> getTitles() {
		return titles;
	}
	public void setTitles(List<Integer> titles) {
		this.titles = titles;
	}
	public List<Integer> getValues() {
		return values;
	}
	public void setValues(List<Integer> values) {
		this.values = values;
	}
	public int getMaxLight() {
		return maxLight;
	}
	public void setMaxLight(int maxLight) {
		this.maxLight = maxLight;
	}
	public int getMinLight() {
		return minLight;
	}
	public void setMinLight(int minLight) {
		this.minLight = minLight;
	}
	public int getAverage() {
		return average;
	}
	public void setAverage(int average) {
		this.average = average;
	}
	public int getStendard() {
		return standard;
	}
	public void setStendard(int stendard) {
		this.standard = stendard;
	}
	
	
}
