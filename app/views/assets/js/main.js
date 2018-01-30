
function rowsLoop(students){
  $('tbody').empty();
  $.each(students, function( index, student ) {
   let subjects = '';
   $.each(student.subjects, function(i,s) {
       subjects += `<button class="btn btn-sm btn-outline-info subject" title="view ${s}'s students">${s}</button> `;
     });

    $('tbody').append(`<tr><th scope="row">${index+1}</th><td>${student.name}</td><td><a href="#" class="age">${student.age}</a></td>
     <td><a href="#" class="gender">${student.gender}</a></td><td>${student._id}</td>
     <td>${subjects}
     <td><button class="btn btn-sm btn-outline-secondary edit" data-id="${student._id}">edit</button>
     <button class="btn btn-sm btn-outline-danger remove" data-id="${student._id}">delete</button></td></tr>`);
  });
}

function updateView(){
  // Load default
  $.ajax({
    url: "api/students"
  }).done(((students) => {
    console.log(students);
     rowsLoop(students);
    console.log("Loading completed");
  }));
}

$(document).ready(() => {
  updateView();
  $('.find').attr('disabled','disabled');
});

// Delete a user event
$(document).on("click", "button.remove" , function() {
  const studentId = $(this).attr("data-id");
  $.ajax({
      url: '/api/student/'+studentId,
      type: 'DELETE'
  }).done((data) => { 
    updateView();
    console.log("deleted");
  });
});

// Edit a user event
$(document).on("click", "button.edit" , function() {
  const studentId = $(this).attr("data-id");
  $.ajax({
      url: '/api/student/'+studentId
  })
  .done(((student) => { 
    $('#theModal').modal('show');
    $('#newStudent input[name=name]').val(student.name);
    $('#newStudent input[name=age]').val(student.age);
    $('#newStudent input[name=subjects]').val(student.subjects.join(' '));
    $(`#newStudent input[name=gender][value="${student.gender}"]`).prop('checked', true);
    $('#newStudent input[name=studentId]').val(student._id);
  }));

});

$(document).on("click", ".navbar-brand" , function(event) {
  event.preventDefault();
  updateView();
});

$(document).on("click", "button.new" , function() {
  $('#theModal').modal('show');
  //to avoid overwriting we force this empty
  $('#newStudent input[name=studentId]').val('');
});

$(document).on("click", "button.subject" , function(event) {
  event.preventDefault();
  subject = $(this).text(); //subject
  console.log(subject);
  $.ajax({
    url: '/api/search/subject/'+subject
  })
  .done(((students) => { 
    if(!students.message)
      rowsLoop(students);
    else{
      $('tbody').empty();
      $('tbody').append(`<td colspan="5">${students.message}</>`);
    }
    console.log(student);
  }))
});

$(document).on("click", "a.age" , function(event) {
  event.preventDefault();
  age = $(this).text();
  console.log(age);
  $.ajax({
    url: '/api/search/age/'+age
  })
  .done(((students) => { 
    if(!students.message)
      rowsLoop(students);
    else{
      $('tbody').empty();
      $('tbody').append(`<td colspan="5">${students.message}</>`);
    }
    console.log(student);
  }))
});

$(document).on("click", "a.gender" , function(event) {
  event.preventDefault();
  gender = $(this).text();
  console.log(gender);
  $.ajax({
    url: '/api/search/gender/'+gender
  })
  .done(((students) => { 
    if(!students.message)
      rowsLoop(students);
    else{
      $('tbody').empty();
      $('tbody').append(`<td colspan="5">${students.message}</>`);
    }
    console.log(student);
  }))
});
// Search ID
$(document).on("click", "button.find" , function(event) {
  event.preventDefault();
  studentId = $('.search').val();
  console.log(studentId);
  $.ajax({
    url: '/api/student/'+studentId
  })
  .done(((student) => { 
    if(!student.message)
      rowsLoop([student]);
    else{
      $('tbody').empty();
      $('tbody').append(`<td colspan="5">${student.message}</>`);
    }
    console.log(student);
  }))

});

$(document).on("keyup", "input[name=subjects]" , function() {
  $(this).val($(this).val().replace(/  +?/g, ' '));
  var subjectsCapitalize = $('#newStudent input[name=subjects]').val();
  $('#newStudent input[name=subjects]').val(subjectsCapitalize.replace(/^(.)|\s(.)/g, function($1){ return $1.toUpperCase( ); }));
});

$(document).on("keyup", ".search" , function() {
  $('.find').removeAttr('disabled');
});

$('#newStudent').on("submit", function(event) {
  event.preventDefault();
  $('#theModal').modal('hide');

  const subjects = $('#newStudent input[name=subjects]').val();
  const subjectsArr = subjects.split(" ");
  const studentId = $('#newStudent input[name=studentId]').val();
  const gender = $('input[name=gender]:checked').val();
  let type =  'PUT';

  if(studentId === ''){ 
    type =  'POST';
  }

  $.ajax({
      url: '/api/student/'+studentId,
      type: type,
      dataType : 'json',
      contentType : "application/json",
      data: JSON.stringify({
        name: $('#newStudent input[name=name]').val(), 
        age: $('#newStudent input[name=age]').val(),
        gender: gender,
        subjects: subjectsArr
      })
  })
  .done(() => { 
    updateView();
  });
});
