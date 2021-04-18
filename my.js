var arr = [];
var itemToUpdate = 0;

// for date function..
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;
document.getElementById('date').value = today;

//CRUD operation for this activity..
function display() {
    var a = "<tr><th>TASKS</th><th>STATUS</th><th>PRIORITY</th><th>DATE</th><th>DELETE</th><th>EDIT</th></tr>"
    
    for (let i = 0; i < arr.length; i++){
        if (arr[i].date1 == today) {
            
            a += "<tr>";
            a += "<td>" + arr[i].task1 + "</td>";
            a += "<td>" + arr[i].status1 + "</td>";
            a += "<td>" + arr[i].priority1 + "</td>";
            a += "<td>" + arr[i].date1 + "</td>";
            a += `<td><button onclick="deletes(${i})" class="btn btn-danger">Delete Item</button></td>`;
            a += `<td><button onclick="Edit(${i})" class="btn btn-success" id="editbtn">Edit Item</button></td>`;
            a += "</tr>"
        }
    }
    document.getElementById('disp').innerHTML = a;

    //for sort the table..
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById('disp');
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++){
            shouldSwitch = false;

            x = rows[i].getElementsByTagName('TD')[1];
            y = rows[i + 1].getElementsByTagName('TD')[1];
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true; 
        }
    }
}

//for create  the data..
function pushD() {
    var task1 = document.getElementById('task').value;
    var status1 = document.getElementById('status').value;
    var priority1 = document.getElementById('priority').value;
    var date1 = document.getElementById('date').value;

    if (task1 != "" && status1 != "" && priority1 != "" && date1) {
        arr.push({
            task1 : task1,
            status1 : status1,
            priority1 : priority1,
            date1 : date1
        });
        display();
        saveData();
    } else {
        alert("Please Fill all the details");
    }
    document.getElementById('task').value = "";
}

//for delete the data..
function deletes(i) {
    arr.splice(i, 1);
    localStorage.setItem('arr', JSON.stringify(arr));
    display();
}

//for edit the data..
function Edit(item) {
    $('.add-Save-button').text('Update Item').attr('onclick', `update(${item})`);
    itemToUpdate = item;

    document.getElementById('task').value = arr[item].task1;
    document.getElementById('status').value = arr[item].status1;
    document.getElementById('priority').value = arr[item].priority1;
    document.getElementById('date').value = arr[item].date1;

    console.log(arr, "Editted Button Successfully worked");      

}

//for update the data..
function update() {
    $('.add-Save-button').text('Add');
    var data = {};
    data['task1'] = document.getElementById('task').value;
    data['status1'] = document.getElementById('status').value;
    data['priority1'] = document.getElementById('priority').value;
    data['date1'] = document.getElementById('date').value;

    arr.splice(itemToUpdate, 1, data);
    display();
    saveData();

    document.getElementById('task').value = "";
}

//===LocalStorage===//
function saveData() {
    var str = (JSON.stringify(arr));
    localStorage.setItem('arr', str);
}

function getData() {
    var str = localStorage.getItem('arr');
    arr = JSON.parse(str);
    if (!arr) {
        arr = [];
    }
}
getData();
display();