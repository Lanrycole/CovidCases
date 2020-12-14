
const func = require('../Controller/controller');
const readline = require('readline');

/**
 *
 * @type {Interface} Module used to get user input from console.
 */
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

/**
 * Main function that handles menu
 */
function menu() {
	rl.question('Menu: \n ' +
		//Printing menu items to the user
		'1. Display data \n ' +
		'2. Add Data \n ' +'' +
		'3. Sort Data \n ' +
		'4. Load data from csv \n ' +
		'5. Edit data\n ' +
		'6. Delete data\n ' +
		'++++++++++++++++++++++++++++++ \n' +
		'Answer: '
		/**
		 * @param answer.
		 * this callback function takes in a parameter that stores the user input
		 */
		, (answer) => {
			console.log("++++++++++++++++++++++++++++++ \n");
			//switch case that renders menu to users based on the number they entered
			switch (answer) {
				case "1":
					func.displayData();
					rl.close();
					break
				case "2":
					addData();
					break
				case "3":
					sortData();
					break
				case "4":
					func.readCsvRecord();
					rl.close();
					break;
				case "5":
					editData();
					break;
				case "6":
					deleteData();
					break;
				default:
					console.log("Enter a valid number");
			}
		});
}

/**
 * This function asks for the ID of the data to be deleted.
 * It then passes the ID to the delete customer in the controller class
 */

function deleteData() {

	let cases_id ="";
	let dates = "";

	const question1 = () => {
		return new Promise((resolve, reject) => {
			rl.question('Enter the following information to add new Data \nEnter an ID: ', (answer) => {
				if(answer ==null){
					console.log("Please enter a value")
					reject();
				}else{
					cases_id = answer.toUpperCase();
					resolve()
				}

			})
		})
	}
	const question2 = () => {
		return new Promise((resolve, reject) => {
			rl.question('Enter date(XXXX-XX-XX): ', (answer) => {
				if(answer ===null){
					console.log("Can not be null");
					reject();
				}else{
					dates = answer;
					resolve()
				}

			})
		})
	}
	//waiting for the data from the user
	const main = async () => {
		await question1()
		await question2()
		//writting data to file by calling addData

			func.deleteData(cases_id,dates);
			rl.close()
		}

	main()

}

/**
 * Adding data function
 */
function addData() {
	let id = "";
	let date = "";
	let cases = "";
	let death = "";
	let name_fr = "";
	let name_en = "";
//getting user input
	const question1 = () => {
		return new Promise((resolve, reject) => {
			rl.question('Enter the following information to add new Data \nEnter an ID: ', (answer) => {
				id = answer;
				resolve()
			})
		})
	}
	const question2 = () => {
		return new Promise((resolve, reject) => {
			rl.question('Enter date: ', (answer) => {
				date = answer;
				resolve()
			})
		})
	}
	const question3 = () => {
		return new Promise((resolve, reject) => {
			rl.question('Enter cases: ', (answer) => {
				cases = answer;
				resolve()
			})
		})
	}
	const question4 = () => {
		return new Promise((resolve, reject) => {
			rl.question('Enter death: ', (answer) => {
				death = answer;
				resolve()
			})
		})
	}
	const question5 = () => {
		return new Promise((resolve, reject) => {
			rl.question('Name in French: ', (answer) => {
				name_fr = answer;
				resolve()
			})
		})
	}
	const question6 = () => {
		return new Promise((resolve, reject) => {
			rl.question('Name in English: ', (answer) => {
				name_en = answer;
				resolve()
			})
		})
	}

//waiting for the data from the user
	const main = async () => {
		await question1()
		await question2()
		await question3()
		await question4()
		await question5()
		await question6()
//writting data to file by calling addData
		func.addData(id, date, cases, death, name_fr, name_en)
		console.log("Data successfully added")
		rl.close()
	}

	main()
}
function sortData() {
	let order = "";
	let sortID = "";
	let sortCases_id = "";
	let sortDates = "";
	let sortCases = "";
	let sortDeath = "";
	const yes = "y"
	const no = "n"

//getting user input
	const question1 = () => {
		return new Promise((resolve, reject) => {
			rl.question('Enter the Sorting order  \n ASC or DESC: ', (answer) => {
				order = answer;
				resolve()
			})
		})
	}
	const question2 = () => {
		return new Promise((resolve, reject) => {
			rl.question('Sort by ID? Y|N ', (answer) => {
				if(answer === yes){
					sortID = "ID,";
				}
				resolve()
			})
		})
	}
	const question3 = () => {
		return new Promise((resolve, reject) => {
			rl.question('Sort by CaseID? Y|N ', (answer) => {
				if(answer === yes){
					sortCases_id = "cases_id,";
				}
				resolve()
			})
		})
	}
	const question4 = () => {
		return new Promise((resolve, reject) => {
			rl.question('Sort by Date? Y|N ', (answer) => {
				if(answer === yes){
					sortDates = "dates,";
				}
				resolve()
			})
		})
	}
	const question5 = () => {
		return new Promise((resolve, reject) => {
			rl.question('Sort by Cases? Y|N ', (answer) => {
				if(answer === yes){
					sortCases = "cases,";
				}
				resolve()
			})
		})
	}
	const question6 = () => {
		return new Promise((resolve, reject) => {
			rl.question('Sort by Death? Y|N ', (answer) => {
				if(answer === yes){
					sortDeath = "death";
				}
				resolve()
			})
		})
	}

//waiting for the data from the user
	const main = async () => {
		await question1()
		await question2()
		await question3()
		await question4()
		await question5()
		await question6()
//writting data to file by calling addData
		func.sortData(sortID, sortCases_id, sortDates, sortCases, sortDeath, order)
		console.log("Data successfully sorted")
		rl.close()
	}

	main()
}


function editData() {

	let casesToEdit = "";
	let dateToEdit="";
	let newid = "";
	let newdate = "";
	let newcases = "";
	let newdeath = "";
	let newname_fr = "";
	let newname_en = "";

//getting user input
	const question1 = () => {
		return new Promise((resolve, reject) => {
			rl.question('Enter cases id to edit: ', (answer) => {
				casesToEdit = answer.toUpperCase();
				resolve()
			})
		})
	}
	const question2 = () => {
		return new Promise((resolve, reject) => {
			rl.question('Enter date to edit: ', (answer) => {
				dateToEdit = answer;
				resolve()
			})
		})
	}
	const question3 = () => {
		return new Promise((resolve, reject) => {
			rl.question('Enter Data ID: ', (answer) => {
				newid = answer;
				resolve()
			})
		})
	}
	const question4 = () => {
		return new Promise((resolve, reject) => {
			rl.question('Enter date: ', (answer) => {
				newdate = answer;
				resolve()
			})
		})
	}
	const question5 = () => {
		return new Promise((resolve, reject) => {
			rl.question('Enter cases: ', (answer) => {
				newcases = answer;
				resolve()
			})
		})
	}
	const question6 = () => {
		return new Promise((resolve, reject) => {
			rl.question('Enter death: ', (answer) => {
				newdeath = answer;
				resolve()
			})
		})
	}
	const question7 = () => {
		return new Promise((resolve, reject) => {
			rl.question('Name in French: ', (answer) => {
				newname_fr = answer;
				resolve()
			})
		})
	}
	const question8 = () => {
		return new Promise((resolve, reject) => {
			rl.question('Name in English: ', (answer) => {
				newname_en = answer;
				resolve()
			})
		})
	}

//waiting for the data from the user
	const main = async () => {

		await question1()
		await question2()
		await question3()
		await question4()
		await question5()
		await question6()
		await question7()
		await question8()
//writting data to file by calling addData

		let updatedData =
			{
				id: newid,
				date: newdate,
				cases: newcases,
				death: newdeath,
				name_fr: newname_fr,
				name_en: newname_en

			}

		rl.close()
		func.editData(casesToEdit, dateToEdit, updatedData)


	}

	main()
}

menu();
