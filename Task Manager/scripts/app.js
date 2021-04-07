var important = false;
var UI = {};
var serverUrl= "http://fsdi.azurewebsites.net/api";

function toggleImportant() {
    if(important) {
        $("#iconImp").removeClass('fas').addClass('far');
        important = false;
    }
    else {
        $("#iconImp").removeClass('far').addClass('fas');
        important = true;
    }  
}

function saveTask() {
    var title = UI.title.val();
    var description = UI.description.val();
    var dueDate = UI.dueDate.val();
    var location = UI.location.val();
    var alertText = UI.alertText.val();
    var status = UI.status.val();

    var task = new Task(title, description, important, dueDate, location, alertText, status);
    console.log(task);

    //save the task in BE
    
    $.ajax({
        type: "POST",
        url: serverUrl + "/tasks",
        data: JSON.stringify(task),
        contentType: 'application/json',
        success: function(res) {
            displayTask(res);
            console.log(res);
        },
        error: function(error) {
            console.log("Error", error);
        }
    });
}

function displayTask(task) {
    let syntax = 
    `<div class="task"> 
        <h5> ${task.title} </h5> 
        <p> ${task.description} </p>
    </div>`;

    $("#pendingTasks").append(syntax);
}

function fetchTasks() {
    $.ajax({
        type:"GET",
        url: serverUrl + "/tasks",
        success: function(data) {
            console.log(data);

            for(let i=0;i< data.length;i++) {
                let task = data[i];
                if (task.user === "Laura") {
                   displayTask(task); 
                } 
            }
        },
        error: function(errDetails) {
            console.error(errDetails);
        }
    });
}

function init() {
    console.log("Task Manager");
    UI.id = $("#txtId");
    UI.title = $("#txtTitle");
    UI.description = $("#txtDescription");
    UI.dueDate = $("#txtDueDate");
    UI.location = $("#txtLocation");
    UI.alertText = $("#txtAlert");
    UI.status = $("#selStatus");

    //load data
    fetchTasks();

    //hook events
    $("#iconImp").click(toggleImportant);
    $("#btnSave").click(saveTask);
}


function testAjax() {
    $.ajax({
        url: "https://restclass.azurewebsites.net/api/test",
        type: "GET",
        success: function( res ) {
            console.log("Yay! It worked!", res);
        },
        error: function( error ) {
            console.log("We have a problem :(", error);
        },
    });
}


window.onload = init;

/*
 *catch the click on the button
 *call a saveTask function
 *get the values from the input fields
 *console log the values
*/



