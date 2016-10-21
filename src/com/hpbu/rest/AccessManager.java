package com.hpbu.rest;

import java.util.ArrayList;

import com.hpbu.rest.JsonModel.ChromaObj;
import com.mysql.jdbc.Connection;

public class AccessManager {
	public ArrayList<ChromaObj> getDBData(String sqlStr) throws Exception {

		ArrayList<ChromaObj> courseList = new ArrayList<ChromaObj>();
		DBConnect dbConnect = new DBConnect();
		Connection con = dbConnect.getConnection();
		DataParser access = new DataParser();
		courseList = access.getCourses(con, sqlStr);
		return courseList;
	}
}
