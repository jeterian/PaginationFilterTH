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
var noResults = $("<p class='no_return'>Search returned no results.</p>").insertAfter($(".student-list"));
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


// SEARCH

  //adds input box/button
function createSearch() {
    var searchdiv = $("<div></div>").addClass("student-search");
    $("h2").after(searchdiv);
    var searchInput = $("<input></input>").attr("placeholder","Search for students").addClass("searchBox");
    $(".student-search").append(searchInput);
    var button = $("<button></button>").text("Search");
    $(".student-search").append(button);
}

//calls
createSearch();


// adds attribute to compare search result with list
$('.student-details h3').each(function(){
$(this).parent().parent().attr('searchTerm', $(this).text().toLowerCase());
});

// event listener triggers search
$("button").on("click", function(){
    // Takes input on click
    var enteredInput = $("input[class=searchBox]").val().toLowerCase();
    $(".student-list li").removeClass("search-result");
    numOfStu.hide();
    $(".pageLinks").hide();
    $(".no-result").remove();

    //Search filter comparing the search against student names
    $('.student-item').each(function(){
        if ($(this).filter('[searchTerm *= ' + enteredInput + ']').length > 0 || enteredInput.length === 0) {
            $(this).addClass("search-result");
        } else {
            $(this).removeClass("search-result");
        }
    });

    // store results of search
    var searchResults = $(".search-result");

    // Figures out pagination for search results
        if (searchResults.length === 0) {
            //Displays message if no search results found
            var emptyResult = $("<h3>No match found.</h3>").addClass("no-result");
            $(".page").append(emptyResult);
        } else if (searchResults.length > 10) {
             //Paginates if search results is more than 10
            searchResults.show();
            numOfStu = searchResults;
            $(numOfStu).slice(studentsPerPage, numOfStu.length).hide();
            links = Math.ceil(numOfStu.length / 10);
            $(".pageLinks:nth-child(-n+" + links + ")").show();
            $(".pageLinks a").removeClass("active");
            $("li a:first").addClass("active");
        } else {
            //No pagination
            searchResults.show();
        }
    });
