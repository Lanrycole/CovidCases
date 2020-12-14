

const csv = require('csv-parser');
const fs = require('fs')
const dClass = require('../Model/DataClass');
const storeCSV = require('../Database/connect');



//Global variable to store data.
let counter = 0;

/**
 * inserts CSV data into the database
 */

function insertIntoDatabase() {
	fs.createReadStream('../Dataset/InternationalCovid19Cases.csv')
	  .pipe(csv({}))
	  .on('data', function (data) {
		  //limits amount of data top be read.



		  //Decision making: limit amount of data to be 8
		  if (counter < 600) {
		  	//inserting Data into the database
			  storeCSV.insertDatabase(new dClass(data.id, data.date,
				  data.cases, data.death, data.name_fr, data.name_en));


		  }
		  ++counter;

	  })
	  .on('end', function () {

	  })

	  .on("error", (err) => {
		  console.log(err)
	  });

}


/**
 *
 * @param index
 * @param updateRec
 *
 */

function editData(cases_id, dates, updateRec) {

		//calling updateDatabase and passing in the index and new data
		// to be updated
		storeCSV.updateDatabase(cases_id, dates, new dClass(updateRec.id,
			updateRec.date, updateRec.cases,
			updateRec.name_fr, updateRec.name_en))


}
function sortData(	sortID, sortCases_id, sortDates, sortCases, sortDeath, ORDER){
	storeCSV.sortData(	sortID, sortCases_id, sortDates, sortCases, sortDeath, ORDER)
}



/**
 *
 * @param cases_id. Deletes row in database based on cases_id.
 * @param date. Deletes row in database based on date.
 */

//Delete dased on cases_id and date in the database
function deleteData(cases_id, date ) {
	storeCSV.deleteDatabase(cases_id, date);
}

/**
 *
 * @param id
 * @param date
 * @param cases
 * @param death
 * @param namefr
 * @param nameen
 *
 * Lets users store data.
 */

//Adding data to the database
function addData(id, date, cases, death, namefr, nameen) {
//Calling insertDatabase to insert the new data inserted by the user
		storeCSV.insertDatabase(new dClass(id, date, cases, death, namefr, nameen));

}


/**
 * prints data from csv to console
 */

function displayData() {
	storeCSV.readDatabase();
}



//exports functions to be used in other clases.
module.exports = {
	displayData: () => {
		return displayData();
	},
	readCsvRecord: () => {
		return insertIntoDatabase();
	},
	deleteData: (index, date) => {
		return deleteData(index, date);
	},
	addData: (id, date, cases, death, namefr, nameen) => {
		return addData(id, date, cases, death, namefr, nameen);
	},

	editData: (cases_id, dates,  newData) => {
		editData(cases_id, dates, newData);
	},
	sortData: (	sortID, sortCases_id, sortDates, sortCases, sortDeath, ORDER) => {
		sortData(	sortID, sortCases_id, sortDates, sortCases, sortDeath, ORDER);
	}
}

