const btnInsertUpdate = document.getElementById("btnInsertUpdate");
const btnClearItems = document.getElementById("btnClearItems");
const btnClear = document.getElementById("btnClear");
const tblRecords = document.getElementById("tblRecords");

const sortBy = document.getElementById("sortBy");
const sortOrder = document.getElementById("sortOrder");
const saveBtn = document.getElementById("saveBtn");

let arrRecords = new Array();

const tblTHsLabels = [
    "First Name",
    "Middle Name",
    "Last Name",
    "Age",
    "Action"
];


// LOAD SAVED RECORDS
const savedRecords = localStorage.getItem("records");

if (savedRecords) {
    arrRecords = JSON.parse(savedRecords);
}


// DISPLAY INITIAL STATUS
if (arrRecords.length == 0) {

    document.getElementById("status").style.display = "inline";
    document.getElementById("status").innerHTML = "No Records...";

} else {

    document.getElementById("status").style.display = "none";

}


// INSERT / UPDATE
btnInsertUpdate.addEventListener("click", () => {

    const inputTxt = document.getElementsByTagName("input");


    // CHECK INPUTS
    for (const txt of inputTxt) {

        if (txt.value.trim() == "") {

            alert("Please complete all the text inputs!");
            return;

        }

    }


    // INSERT
    if (btnInsertUpdate.value == "insert") {

        let infoRecord = {

            fname: inputTxt[0].value,
            mname: inputTxt[1].value,
            lname: inputTxt[2].value,
            age: parseInt(inputTxt[3].value)

        };

        arrRecords.push(infoRecord);

    }


    // UPDATE
    else {

        let index = parseInt(btnInsertUpdate.value);

        arrRecords[index].fname = inputTxt[0].value;
        arrRecords[index].mname = inputTxt[1].value;
        arrRecords[index].lname = inputTxt[2].value;
        arrRecords[index].age = parseInt(inputTxt[3].value);

    }


    // DISPLAY RECORDS
    iterateRecords();


    // CLEAR INPUTS
    for (const txt of inputTxt) {

        txt.value = "";

    }


    // RESET BUTTON
    btnInsertUpdate.innerHTML = "Insert";
    btnInsertUpdate.value = "insert";

});


// CLEAR INPUTS
btnClear.addEventListener("click", () => {

    const inputTxt = document.getElementsByTagName("input");

    for (const txt of inputTxt) {

        txt.value = "";

    }

    btnInsertUpdate.innerHTML = "Insert";
    btnInsertUpdate.value = "insert";

});


// CLEAR ALL RECORDS
btnClearItems.addEventListener("click", () => {

    arrRecords = [];

    while (tblRecords.hasChildNodes()) {

        tblRecords.removeChild(
            tblRecords.firstChild
        );

    }

    document.getElementById("status").style.display = "inline";
    document.getElementById("status").innerHTML = "No Records...";

    btnInsertUpdate.innerHTML = "Insert";
    btnInsertUpdate.value = "insert";

});


// DISPLAY TABLE
function iterateRecords() {

    while (tblRecords.hasChildNodes()) {

        tblRecords.removeChild(
            tblRecords.firstChild
        );

    }


    // NO RECORDS
    if (arrRecords.length == 0) {

        document.getElementById("status").style.display = "inline";
        document.getElementById("status").innerHTML = "No Records...";

        return;

    }


    document.getElementById("status").style.display = "none";


    // TABLE HEADER
    const tblHeaderRow = document.createElement("tr");
    const tblHeader = document.createElement("thead");

    tblHeaderRow.style.borderTop = "1px solid black";
    tblHeaderRow.style.borderBottom = "1px solid black";


    for (let i = 0; i < 5; i++) {

        const tblTHs = document.createElement("th");

        tblTHs.style.padding = "5px";

        if (i != 4) {

            tblTHs.style.borderRight = "1px solid black";

        }

        tblTHs.innerHTML = tblTHsLabels[i];

        tblHeaderRow.appendChild(tblTHs);

    }


    tblHeader.appendChild(tblHeaderRow);

    tblRecords.appendChild(tblHeader);


    // TABLE BODY
    const tblBody = document.createElement("tbody");


    arrRecords.forEach((rec, i) => {

        const tblRow = document.createElement("tr");

        const tbdataFname = document.createElement("td");
        const tbdataMname = document.createElement("td");
        const tbdataLname = document.createElement("td");
        const tbdataAge = document.createElement("td");
        const tbdataActionBtn = document.createElement("td");

        const btnDelete = document.createElement("button");
        const btnUpdate = document.createElement("button");


        // CELLS
        tbdataFname.innerHTML = rec.fname;
        tbdataMname.innerHTML = rec.mname;
        tbdataLname.innerHTML = rec.lname;
        tbdataAge.innerHTML = rec.age;


        // CELL STYLE
        tbdataFname.style.borderRight = "1px solid black";
        tbdataFname.style.padding = "10px";

        tbdataMname.style.borderRight = "1px solid black";
        tbdataMname.style.padding = "10px";

        tbdataLname.style.borderRight = "1px solid black";
        tbdataLname.style.padding = "10px";

        tbdataAge.style.borderRight = "1px solid black";
        tbdataAge.style.padding = "10px";

        tbdataActionBtn.style.padding = "10px";

        tblRow.style.borderBottom = "1px solid black";


        // DELETE
        btnDelete.innerHTML = "Delete";

        btnDelete.style.marginRight = "5px";

        btnDelete.setAttribute(
            "onclick",
            `deleteData(${i})`
        );


        // EDIT
        btnUpdate.innerHTML = "Edit";

        btnUpdate.setAttribute(
            "onclick",
            `updateData(${i})`
        );


        // ACTION BUTTONS
        tbdataActionBtn.appendChild(btnDelete);
        tbdataActionBtn.appendChild(btnUpdate);


        // ROW
        tblRow.appendChild(tbdataFname);
        tblRow.appendChild(tbdataMname);
        tblRow.appendChild(tbdataLname);
        tblRow.appendChild(tbdataAge);
        tblRow.appendChild(tbdataActionBtn);

        tblBody.appendChild(tblRow);

    });


    tblRecords.appendChild(tblBody);

}


// DELETE
function deleteData(i) {

    arrRecords.splice(i, 1);

    iterateRecords();

}


// EDIT
function updateData(i) {

    const inputTxt = document.getElementsByTagName("input");

    inputTxt[0].value = arrRecords[i].fname;
    inputTxt[1].value = arrRecords[i].mname;
    inputTxt[2].value = arrRecords[i].lname;
    inputTxt[3].value = arrRecords[i].age;

    btnInsertUpdate.innerHTML = "Update";
    btnInsertUpdate.value = `${i}`;

}


// SORT
sortBy.addEventListener("change", sortRecords);
sortOrder.addEventListener("change", sortRecords);


function sortRecords() {

    const field = sortBy.value;
    const order = sortOrder.value;


    if (field == "") {
        return;
    }


    arrRecords.sort((a, b) => {

        // AGE
        if (field == "age") {

            if (order == "asc") {

                return a.age - b.age;

            } else {

                return b.age - a.age;

            }

        }


        // TEXT FIELDS
        let valueA = a[field].toLowerCase();
        let valueB = b[field].toLowerCase();


        if (valueA < valueB) {

            return order == "asc" ? -1 : 1;

        }


        if (valueA > valueB) {

            return order == "asc" ? 1 : -1;

        }


        return 0;

    });


    iterateRecords();

}


// SAVE TO LOCAL STORAGE
saveBtn.addEventListener("click", () => {

    localStorage.setItem(
        "records",
        JSON.stringify(arrRecords)
    );

    alert("Records saved to Local Storage.");

});


// DISPLAY SAVED RECORDS
iterateRecords();