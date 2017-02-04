/* Unit 2 - Pagination and Content Filter Project
  Tamar E. Chalker
  Problem: Instead of displaying all student records, display ten at a time
  Solution: add pagination links that correspond with every 10 students
  Tested using Safari, Chrome, and Firefox
*/

// initial variables
var totalStudents = $('.student-item').length;
var numOfStu = $('.student-list').children();
var listStudents = [];
var studentPage = 10;

// use function to save student records in list
numOfStu.children(".student-details").each(function () {
  listStudents.push(this);
});

// message if no Results, start by hiding it
var noResults = $("<p class='no_result'>Search returned no results.</p>").insertAfter($(".student-list"));
noResults.hide();

// hide all students except first ten on startup
numOfStu.hide().slice(0, studentPage).show();

//PAGINATION
var pagContainer = $("<div class='pagination'><ul></ul></div>");
$(".page").append(pagContainer);

// loop to determine how many links to make
for(var i = 1; i<=Math.ceil(totalStudents / studentPage); i++) {
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
  numOfStu.hide().slice($(this).index() * 10, $(this).index() * 10 + 10).show();
  noResults.hide();
})
