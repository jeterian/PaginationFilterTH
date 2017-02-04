/*
  Project 2 - Pagination/Content filter
  Tamar E. Chalker
*/

// Pagination - split list of students into pages

// Selecting DOM elements for use in pagination
var studentRecord = document.getElementsByClassName('student-item cf');
var ulPagination = document.createElement('ul');
var divPagination = document.createElement('div');
var page = document.querySelector('.page');
ulPagination.className = 'pagi-list';
divPagination.className = 'pagination';
page.appendChild(divPagination);

// index of student records
var listOfStudents = document.getElementsByClassName('student-item');
var studentIndexDisplay = [];

//loop through student list
for (var i = 0; i < listOfStudents.length; i++){
  studentIndexDisplay.push(i);
}

// create pagination links
var createLinks = function(numStuDisplay, activePage) {
  var links = Math.ceil(numStuDisplay / 10);
  if (links !==1){
    for (var i = 0; i < links; i++) {

      //get list item
      var liElement = document.createElement('li');

      //get links
      var linkElement = document.createElement('a');
      linkElement.setAttribute('href', '#');
      linkElement.textContent = i++;

      //click listener to links
      linkElement.addEventListener('click', displayMax);
      if (i === activePage - 1) {
        linkElement.className = 'active';
      }
      liElement.appendChild(linkElement);
      ulPagination.appendChild(li);
    }
  }
}
