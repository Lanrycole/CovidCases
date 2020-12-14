
const func = require('../Database/connect');


//Testing if data is successfully added/inserted into the database
test('Testing if data has been successfully added', ()=>{
   //Expectin insertData to be equal to 1 if the insertion is successful.
    // The method Insertdata() returns 1 if successful and 0 if unsuccessful
    expect(func.insertDatabase("EN","2020-02-23","3","0","Angola","Anglo"))
          .toEqual(1)

})
//Expectin readDatabase to be equal to 1 if data can be successfully read. .
// The method readDatabase() returns 1 if successful and 0 if unsuccessful
test('Testing if data is read', ()=>{
    //  expecting the length of the object to be +1 whenever a new data is added
    expect(func.readDatabase()).toEqual(1)
})
//Deleting Data from tthe database
test('Testing is succesfully deleted', ()=>{
    //Inserting record into the database
    func.insertDatabase("EN","2020-02-23","3","0","Angola","Anglo")
    //deleting the inserted data by inserting the record.
    //Expecing 1 to be returned if data is successfully deleted.
    expect(func.deleteDatabase(1)).toEqual(1)
})


//TEsting if inserted data is updated
test('Testing is succesfully updated', ()=>{
    //Inserting record into the database
    func.insertDatabase("EN", "2020-02-23","3","0","Angola","Anglo")
    //Changing data the inserted into the database by the index number
    expect(func.updateDatabase(1, "EN","2020-02-23","3","0","An","Ang")).toEqual(1)
})


