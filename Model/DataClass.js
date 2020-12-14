/*
* @author (original) Lanre Oreyomi
*
*/

//The data class is an object that stores the structure of the CSV file.
class DataClass {
    /**
     *
     * @param id
     * @param date
     * @param cases
     * @param death
     * @param name_fr
     * @param name_en
     *
     * The constructuor is used to make an instance of the class. The construtor
     *takes 5 parameters representing the first row in the CSV.
     *
     */
    constructor(id, date, cases, death, name_fr, name_en) {

        //setting the constructor parameter/argument  inserted into the paramater to the class variables.
        this.id = id;
        this.date = date;
        this.cases = cases;
        this.death = death;
        this.name_fr = name_fr;
        this.name_en = name_en;

    };
    //setters for class variables.
    /**
     *
     * @param id
     */
   setid(id){
        this.id=id;
    }
    /**
     *
     * @param date
     */
    setdate(date){
        this.date=date;
    }
    /**
     *
     * @param death
     */
    setcases(death){
        this.death=death;
    }
    /**
     *
     * @param death
     */
    setdeath(death){
        this.death=death;
    }
    /**
     * @param name_fr
     */
    setname_fr(name_fr){
        this.name_fr=name_fr;
    }
    /**
     * @param name_en
     */
    setname_en(name_en){
        this.name_en=name_en;
    }

    /**
     * @returns {*}
     */
    //Getters for the class variables.
      getId() {
            return this.id;
        };
    /**
     * @returns {*}
     */
    getDate() {
            return this.date;
        };
    /**
     *
     * @returns {*}
     */
        get getCases() {
            return this.cases;
        };
    /**
     *
     * @returns {*}
     */
    get getDeath() {
            return this.death;
        };
    /**
     *
     * @returns {*}
     */
        get getName_fr() {
            return this.name_fr;
        };
    /**
     *
     * @returns {*}
     */
        get getName_en() {
            return this.name_en;
        }

};
//Exporting class to be used in another class.
module.exports = DataClass;