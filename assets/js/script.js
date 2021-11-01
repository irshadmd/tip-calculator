//Tip calculator class
class TipCalculator {
    constructor() {
        //bill amount
        this.bill = 0.00
        //tip amount
        this.tip = 0
        //num of people
        this.num_people = 1
    }
    //get the current bill amount
    getBill() {
        return this.bill
    }
    //set bill amount
    setBill(bill) {
        this.bill = bill
    }
    //get the current tip percent
    getTip() {
        return this.tip
    }
    //set tip percent
    setTip(tip) {
        this.tip = tip
    }
    //get the number of people 
    getNumPeople() {
        return this.num_people
    }
    //set number of people
    setNumPeople(np) {
        this.num_people = np
    }
}
//creating obj of TipCalculator
var obj = new TipCalculator();

//changes the value of bill amount field and update the object
function billChange() {
    //get the value from input field
    billVal = document.getElementById("bill-input").value;
    //checks if billVal only contains floating point and decimal value
    if ((/^\d+\.\d+$/.test(billVal)) || (/^\d+$/.test(billVal))) {
        obj.setBill(billVal);
        //recalculate tip and total bill
        calculate();
    } else {
        //reset the bill amount input field with old value if user enters any character 
        // other than floating point and decimal numbers
        document.getElementById("bill-input").value = obj.getBill();
    }
}

//changes the value of tip percent and update the object
function tipChange() {
    //get the value from input field
    tipVal = document.getElementById("tip-input").value;
    //check if tipVal only contains decimal values 
    if (/^\d+$/.test(tipVal)) {
        //tip percent should not be greater then 100
        if (tipVal <= 100) {
            obj.setTip(tipVal);
            //recalculate tip and total bill
            calculate();
        } else {
            //if user entered tip percent > 100 update with old value
            document.getElementById("tip-input").value = obj.getTip();
        }
    } else {
        //if user entered any chanracter other than decimal update with old value
        document.getElementById("tip-input").value = obj.getTip();
    }
}

//decrease the tip percent by 1
function minusTip() {
    let tip = obj.getTip();
    //only decrease tip if tip percent > 0
    if (tip > 0) {
        tip = tip - 1;
        obj.setTip(tip);
        //recalculate tip and total bill after decreasing tip percent
        calculate();
        //update tip input field with updated tip percent value
        document.getElementById("tip-input").value = tip;
    }
}

//increase the tip percent by 1
function plusTip() {
    let tip = obj.getTip();
    //only increase tip if tip percent <100
    if (tip < 100) {
        tip = parseInt(tip) + 1;
        obj.setTip(tip);
        //recalculate tip and total bill after decreasing tip percent
        calculate();
        //update tip input field with updated tip percent value
        document.getElementById("tip-input").value = tip;
    }
}

//changes the value of num of people and update the object
function numPeopleChange() {
    numPeopleVal = document.getElementById("num-people-input").value;
    //check if numPeopleVal only contains decimal value
    if (/^\d+$/.test(numPeopleVal)) {
        //check if numPeopleVal not equal to 0
        if (numPeopleVal != 0) {
            obj.setNumPeople(numPeopleVal);
            //recalculate tip and total bill
            calculate();
            //check if numPeopleVal is 1 it should not show per person below tip and total 
            if (numPeopleVal == 1) {
                //hiding
                document.getElementById("ti-pp").style.display = 'none';
                document.getElementById("to-pp").style.display = 'none';
            } else {
                //show if numPeople > 1
                document.getElementById("ti-pp").style.display = 'block';
                document.getElementById("to-pp").style.display = 'block';
            }
        } else {
            //if user enter 0 in num of people fields set to 1
            obj.setNumPeople(1);
            //recalculate tip and total bill
            calculate();
            document.getElementById("ti-pp").style.display = 'none';
            document.getElementById("to-pp").style.display = 'none';
            document.getElementById("num-people-input").value = 1;
        }
    } else {
        //if numPeopleVal if any character other than decimal update with old value
        document.getElementById("num-people-input").value = obj.getNumPeople();
    }
}

//decrease numPeople value by 1
function minusNumPeople() {
    let np = obj.getNumPeople();
    //decrease only if it is greater than 1
    if (np > 1) {
        np = np - 1;
        obj.setNumPeople(np);
        //recalculate tip and bill amount
        calculate();
        //check if numPeopleVal is 1 it should not show per person below tip and total 
        if (np == 1) {
            document.getElementById("ti-pp").style.display = 'none';
            document.getElementById("to-pp").style.display = 'none';
        }
        document.getElementById("num-people-input").value = np;
    }
}

// increase numPeople value by 1
function plusNumPeople() {
    let np = obj.getNumPeople();
    np = parseInt(np) + 1;
    obj.setNumPeople(np);
    calculate();
    //check if numPeopleVal is >1 it should show per person below tip and total 
    if (np > 1) {
        document.getElementById("ti-pp").style.display = 'block';
        document.getElementById("to-pp").style.display = 'block';
    }
    document.getElementById("num-people-input").value = np;
}

//calculate the tip and bill amount
function calculate() {
    //get the values from object
    let bill = parseInt(obj.getBill());
    let tip = parseInt(obj.getTip());
    let numPeople = parseInt(obj.getNumPeople());

    //calculating tip amount
    let tipAmt = (bill * (tip / 100)) / numPeople;
    //rounding off the tip amount to 2 decimal places
    tipAmt = parseFloat(tipAmt).toFixed(2);
    //update the tip amount 
    document.getElementById("tip-amt").innerHTML = tipAmt;

    //calculating total bill
    var totalBill = bill + (bill * tip / 100);
    //divide bill per person
    let perPerson = totalBill / numPeople;
    //round off the total amount to 2 decimal places
    perPerson = parseFloat(perPerson).toFixed(2);
    //update the total amount
    document.getElementById("total-amt").innerHTML = perPerson;
}