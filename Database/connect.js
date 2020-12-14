
//Importing mysql module to be used inside the peogram.
let mysql = require('mysql');

//con holds the information to connect to the database
let con = mysql.createConnection({
	//database host username
	host: 'localhost',
	//database username
	user: 'root',
	//database password
	password: 'Iphone7s',
	//name of database
	database: 'CsvData'
});

//connection to  the database
function connected() {

	con.connect(function (err) {
		if (err) {
			console.error('error: ' + err.message);
			return 0;
		} else {
			console.log('Connected to the MySQL server.');
			return 1;
		}
	});
}

/**
 *
 * @returns {1}
 */
function readDatabase() {
	//Checking if connection is successful

	if (connected) {
		//Retrieving data from the database
		con.query("SELECT * FROM CovidCsv",
			function (err, result, fields) {
			if (err) {
				console.log(err);
			return 0;
			}
			else{
				console.log(result);
			}
		});
	}

	//returns 1 if connection is good and data can be retrieved
	//from the database
	return 1;
}

function sortData(sortID, sortCases_id, sortDates, sortCases, sortDeath, ORDER) {

	//Checking if connection is successful

	if (connected) {
		let query= "SELECT * FROM CovidCsv order by id ";

		if(sortID!== "" && ORDER !== "" ) {

			query= `SELECT * FROM CovidCsv order by ${sortID} ${ORDER}`;
		}
		if(sortCases_id!== "" && ORDER !== "") {

			query= `SELECT * FROM CovidCsv order by ${sortID} ${sortCases_id} ${ORDER}`;
		}
		if(sortDates!== "" && ORDER !== "") {

			query= `SELECT * FROM CovidCsv order by ${sortID} ${sortCases_id} ${sortDates} ${ORDER}`;
		}
		if(sortCases!== "" && ORDER !== "") {

			query= `SELECT * FROM CovidCsv order by ${sortID} ${sortCases_id} ${sortCases} ${ORDER}`;
		}
		if(sortDeath!== "" && ORDER !== "") {
 			query= `SELECT * FROM CovidCsv order by ${sortID} ${sortCases_id} ${sortCases} ${sortDeath} ${ORDER}`;
		}
		// Retrieving data from the database
		con.query(query,
			function (err, result, fields) {
			console.log("Generated SQL is : "+ query);

			if (err) {
				console.log(err);
			return 0;
			}
			else{
				console.log(result);
			}
		});
	}

	//returns 1 if connection is good and data can be retrieved
	//from the database
	return 1;

}
// sortData("", " ", " ", "cases","" , "DESC");
/**
 *
 * @param record
 * @returns {1}
 */
function insertDatabase(record) {

	//Checking if connection is successful

	if (connected) {
		//inserting record into the database
		var sql = "INSERT INTO CovidCsv (cases_id,dates,cases,death,name_fr,name_en) " +
			"VALUES ('" + record.id + "', '"
			+ record.date + "', '" + record.cases + "', '" + record.death + "', '"
			+ record.name_fr + "', '" + record.name_en + "')";
		con.query(sql, function (err, result) {
			if (err) {
				console.log(err);

			}else{
				console.log( result.affectedRows + "row successfully inserted");

			}

		});
		return 1;
	}

}

/**
 *
 * @param cases_id
 * @param date
 * @returns {1}
 */
//delete from database
function deleteDatabase(cases_id, date) {


	//Checking if connection is successful
	if (connected) {
//Deleting data from the database based in the provided cases_id and date

			var sql = "DELETE FROM CovidCsv WHERE cases_id = '" + cases_id + "' and dates = '"+ date+ "'";
			con.query(sql, function (err, result) {
				if (err) {

					console.log(err)
					return  0;
				}else{
					console.log( result.affectedRows + "row successfully deleted");
				}
			});

	}
	return 1;
}

/**
 *
 * @param cases_id to update
 * @param dates to update
 * @returns {1}
 */
function updateDatabase(cases_id, dates, dataToUpdate) {
	//Checking if connection is successful
	if (connected) {
		//record is updated bases on cases id and dates inserted by the user
		var sql = "UPDATE CovidCsv SET cases_id ='" + dataToUpdate.id + "', dates ='"
			+ dataToUpdate.date + "', cases ='" + dataToUpdate.cases + "', death ='"
			+ dataToUpdate.death + "', name_fr ='" + dataToUpdate.name_fr + "', name_en = '"
			+ dataToUpdate.name_en + "' WHERE cases_id = '" + cases_id + "' and dates = '"+ dates+ "'";
			con.query(sql, function (err, result) {
			if (err){
				console.log(err);
				return 0;
			}else{
				console.log( result.affectedRows + "row successfully updated");
			}
		});

	}
	return 1;
}

//Exporting CRUD methods to be used in other classes

module.exports = {
	insertDatabase: (record) => {
		return insertDatabase(record);
	},
	connection: () => {
		return connected();
	},
	readDatabase: () => {
		return readDatabase();
	},
	deleteDatabase: (cases_id, date, ) => {
		return deleteDatabase(cases_id, date);
	},
	updateDatabase: (cases_id, dates,  dataToUpdate) => {
		return updateDatabase(cases_id, dates, dataToUpdate);

	},
	sortData: (	sortID, sortCases_id, sortDates, sortCases, sortDeath, ORDER) => {
		return sortData(	sortID, sortCases_id, sortDates, sortCases, sortDeath, ORDER);

	},

}
