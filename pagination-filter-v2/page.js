/* Unit 2 - Pagination and Content Filter Project
  Tamar E. Chalker
  Problem: Instead of displaying all student records, display ten at a time
  Solution: add pagination links that correspond with every 10 students

  Exceeds Expectations:
  Problem: No way to search for specific students
  Solution: create search that will return only students that match the input
*/

// initial variables
var totalStudents = $('.student-item').length;
var allStudents = [];

// use function to save student records in list
$(".student-item").children(".student-details").each(function () {
  allStudents.push(this);
});

// message if no Results, start by hiding it
var noResults = $("<p class='no-result'>Search returned no results.</p>").insertAfter($(".student-list"));
noResults.hide();

// hide all students except first ten on startup
$(".student-item").hide().slice(0,10).show();

//PAGINATION
var pagContainer = $("<div class='pagination'><ul></ul></div>");
$(".page").append(pagContainer);

// loop to determine how many links to make
for(var i = 1; i<=Math.ceil(totalStudents/10); i++) {
  $(".pagination ul").append($('<li><a href="#">' + i + '</a></li>'));
}

// set active class for first page initially and for others on clicking the link
$(".pagination ul li a:first").addClass('active');
$(".pagination ul a").on('click', function () {
  $("li a").removeClass('active');
  $(this).addClass('active');
})

// display students according to page links clicked
$(".pagination li").on('click', function () {
  $(".student-item").hide().slice($(this).index() * 10, $(this).index() * 10 + 10).show();
  noResults.hide();
})

// SEARCH
var searchInput = $("<div class = 'student-search'><input value='' placeholder='Search records'><button>Search</button></div>");
$('.page-header').append(searchInput);
$('.student-search button').on('click', function () {
  noResults.hide();
  var studentSearch = [];
  var inputSearch = $('.student-search input').val();
  for(var i = 0; i < totalStudents.length; i++) {
    var name = allStudents[i].innerText;
    if(name.indexOf(inputSearch) !== -1) {
      $(".student-list li").css('display', 'none');
      studentSearch.push(allStudents[i]);
      $(".student-search input").val('');
    }
  }

  $(studentSearch).parent().show();

  if(studentSearch.length === 0) {
    $(".student-list li").css('display', 'none');
    $(".student-search input").val("");
    noResults.show();
  }

  if(inputSearch === '') {
    $('.student-item').hide().slice(0, 10).show();
    noResults.hide();
  }
})
