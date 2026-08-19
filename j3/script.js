const loadBtn = document.getElementById("loadBtn");
const clearBtn = document.getElementById("clearBtn");

const todoTable = document.getElementById("todoTable");
const tableBody = document.getElementById("tableBody");


// LOAD DATA FROM API
loadBtn.addEventListener("click", () => {

    fetch("https://jsonplaceholder.typicode.com/todos/")
        .then(response => response.json())
        .then(data => {

            // CLEAR OLD DATA
            tableBody.innerHTML = "";


            // DISPLAY DATA
            data.forEach(todo => {

                const row = document.createElement("tr");

                const userId = document.createElement("td");
                const taskId = document.createElement("td");
                const title = document.createElement("td");
                const status = document.createElement("td");


                // INSERT DATA
                userId.innerHTML = todo.userId;
                taskId.innerHTML = todo.id;
                title.innerHTML = todo.title;


                // CHECK STATUS
                if (todo.completed == true) {

                    status.innerHTML = "Completed";
                    status.className = "completed";

                } else {

                    status.innerHTML = "Not Completed";
                    status.className = "not-completed";

                }


                // ADD CELLS TO ROW
                row.appendChild(userId);
                row.appendChild(taskId);
                row.appendChild(title);
                row.appendChild(status);


                // ADD ROW TO TABLE
                tableBody.appendChild(row);

            });


            // SHOW TABLE
            todoTable.style.display = "table";

        })
        .catch(error => {

            console.log(error);

            alert("Error loading data from the API.");

        });

});


// CLEAR TABLE
clearBtn.addEventListener("click", () => {

    tableBody.innerHTML = "";

    todoTable.style.display = "none";

});