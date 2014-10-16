var listTask = [];
var data = JSON.parse(localStorage.getItem("tasks"));

//HAVE I TEXT?
function haveText() {
  var contentAdd = $("#input").val();
  if (contentAdd != "") {
    $("#list").append("<li>" + contentAdd + "</li>");
    // console.log($("#input").val());
    createTask($("#input").val());
    //console.log(createTask());
  } 
}

//CREATE ELEMENT
function createTask(name) {
  var task = { 
    nameTask: name,
    doneTask: false,
  };

  listTask.push(task);
  localStorage.setItem("tasks", JSON.stringify(listTask));
  console.log(listTask);

  // var contentAdd = $("#input").val();
  // if (contentAdd != "") {
  //   $("#list").append("<li>" + contentAdd + "</li>");
  //   $("#input").val("");
  // } 
}

//EXTRACT JSON CONTENT
function extractingContent(response) {
  for (var i = 0; i < response.length; i++) {
    if (response[i].done == true) {
      $("#list").append("<li class='done'>" + response[i].task + "</li>");
    }else {
      $("#list").append("<li>" + response[i].task + "</li>");
    }
  }
}

//ENTER TASK
$("#input").focus(function() {
  $(document).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      haveText();
    }
  });
});

//ADD EVENT
$(document).on( "click", "#add", function() {
  haveText();
});
//CLEANALL EVENT
$(document).on( "click", "#cleanAll", function() {
  $("#list li").remove();
});
//CLEANDONE EVENT
$(document).on( "click", "#cleanDone", function() {
  $("#list .done").remove();
});
//DONEUNDONE STATE
$(document).on( "click", "#list li", function() {
  $(this).toggleClass("done");
});
//JSON ADD
$(document).on( "click", "#url", function() {
  var url = prompt("Insert a xhr-json url. For example: http://ironhack.com:3000/resources/todosample.json");
  $.get(url, function(responseText) {
    extractingContent(responseText);
  });
});