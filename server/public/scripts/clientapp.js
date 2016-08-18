$(document).ready(function () {
  getAnimal(); //calls ajax get request, appends to DOM;

  // add an animal //event listener
  $('#zoosubmit').on('click', postAnimal); //create post animal function
});

//Retrieve animals from server and append to DOM

function getAnimal() {
  $.ajax({
    type: 'GET',                                              //GET a specific resource, turn it into a javascript object, make it useable
    url: '/random',                                            //made-up
    success: function (animalobject) {                               //response could be data or anything else
      console.log('GET /random returns:', animalobject);
      animalobject.forEach(function (animalobject) {                         // object that is passed in
        var $el = $('<li></li>');
        $el.append('<strong>' + animalobject.id + '</strong>');   //capture indexnumer??
        $el.append(' <em>' + animalobject.name + '</em');
        $el.append(' <em>' + animalobject.total + '</em>');
        $('#zoolist').append($el);                          //appends to <ul id="zoolist">
      });
    },

    error: function (response) {
      console.log('GET /random fail.');
    },
  });
}

/**
 * Add a new book to the database and refresh the DOM
 */
function postAnimal() {
  event.preventDefault();

  var zooobject = {};

  $.each($('#zooform').serializeArray(), function (i, field) {
    zooobject[field.name] = field.value;
  });



  $.ajax({
    type: 'POST',
    url: '/random', //made up
    data: zooobject,//must match object variable
    success: function () {
      console.log('POST /random works!');
      $('#zoolist').empty();
      getAnimal();
    },

    error: function (response) {
      console.log('POST /random does not work');
    },
  });
}
