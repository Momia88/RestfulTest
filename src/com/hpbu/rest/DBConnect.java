package com.hpbu.rest;

import java.sql.DriverManager;

import com.mysql.jdbc.Connection;

public class DBConnect {

	public Connection getConnection() throws Exception {
		try {
			String connectionURL = "jdbc:mysql://192.168.3.88:3306/chroma_log?useUnicode=true&characterEncoding=utf-8&&autoReconnect=true&useSSL=false";
//			String connectionURL = "jdbc:mysql://localhost:3306/chroma_log?useUnicode=true&characterEncoding=utf-8&&autoReconnect=true&useSSL=false";
			Connection connection = null;
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			connection = (Connection) DriverManager.getConnection(connectionURL, "chroma", "cindy7377");
			return connection;
		} catch (Exception e) {
			throw e;
		}
	}
}
