//HAVE I TEXT?
function haveText() {
  var contentAdd = $("#input").val();
  if (contentAdd != "") {
    $("#list").append("<li>" + contentAdd + "</li>");
    $("#input").val("");
  } 
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

//BUTTON EVENTS
$(document).on( "click", "#add, #cleanAll, #cleanDone, #list li, #url", function() {
  if ($(this).attr('id') == "add") {
    haveText();
  }else if ($(this).attr('id') == "cleanAll") {
    $("#list li").remove();
  }else if ($(this).attr('id') == "cleanDone") {
    $("#list .done").remove();
  }else if ($(this).parent().attr('id') == "list") {
    $(this).toggleClass("done");
  }else if ($(this).attr('id') == "url") {
    var url = prompt("Insert a xhr-json url. For example: http://ironhack.com:3000/resources/todosample.json");
    $.get(url, function(responseText) {
      extractingContent(responseText);
    });
  }
});