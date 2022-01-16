const myLibrary = [];  // will contain all books

// -------------------- ADDING BOOKS FUNCTIONALLITY ---------------------------
function Book(title, author, pages, state){
	// constructor of book object
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.state = state;
}
Book.prototype.info = function() {
	return `${this.titlle}, by ${this.author}, with ${this.pages} pages. State: ${this.state}`;
}

function addBookToLibrary() {
	// add a new book to the library array using the input information

	// catch all the input values [title, author, pages, readState]
	const inputs = document.querySelectorAll('.modal-element input');
	let title = inputs[0].value,
			author = inputs[1].value,
			pages = inputs[2].value,
			state = inputs[3].checked;  // bool: true if checked
	
	const newBook = new Book(title, author, pages, state);  // create new book
	myLibrary.push(newBook);  // add new book to library
	displayBook(newBook, myLibrary.length-1);
}

function hideModal() {
	// this function clear the inputs and hide the modal

	// clear all inputs;
	const inputs = document.querySelectorAll('input');
	inputs.forEach(element => {
		element.value = "";
	});
	inputs[inputs.length-1].checked = false;
	// hide the modal
	document.querySelector('#modal-container').style.display = 'none';
}

function deleteBook(bookId){
	// this function deletes a book from the library
	
	// delete from the library display
	const library = document.querySelector('#library');
	//const bookId = '#book' + index;
	const toDeleteBook = library.querySelector(bookId);
	library.removeChild(toDeleteBook);
	// delete from the array
	const index = Number(bookId.slice(5));  // index in array is storaged in id
	delete myLibrary[index];
}

function changeStatus(bookId){
	// this function changes the read status of the book

	const bookDisplay = document.querySelector(bookId);
	const index = Number(bookId.slice(5));
	const book = myLibrary[index];
	
	if (book.state === true){
		book.state = false;
		bookDisplay.classList.remove('read');
		bookDisplay.classList.add('not-read');
	} else {
		book.state = true;
		bookDisplay.classList.remove('not-read');
		bookDisplay.classList.add('read');
	}
}
// ------------------------- DISPLAY LIBRARY --------------------------------
function displayBook(book, index) {
	// this function makes visible the book information

	const library = document.querySelector('#library');
	const bookDiv = document.createElement('div');
	bookDiv.classList.add('book');
	bookDiv.id = 'book' + index;

	// add button to change read status
	const changeStatusButton = document.createElement('input');
	changeStatusButton.classList.add('status-button');
	changeStatusButton.type = "checkbox";
	bookDiv.appendChild(changeStatusButton);

	for (const [key, value] of Object.entries(book)) {
		// if the book is read show it with another background color
		if (key !== 'state') {
			const div = document.createElement('div');
			div.textContent = value;
			bookDiv.appendChild(div);
		}
		else if (value === true) {
			bookDiv.classList.add('read');
			changeStatusButton.checked = true;
		} else {
			bookDiv.classList.add('not-read');
			changeStatusButton.checked = false;
		}
	}

	// add delete button
	const deleteBookButton = document.createElement('button');
	deleteBookButton.classList.add('delete-button');
	deleteBookButton.textContent = 'DEL';
	bookDiv.appendChild(deleteBookButton);

	// add delete button functionality
	deleteBookButton.addEventListener('click', () => {
		const bookId = deleteBookButton.parentNode.id;
		deleteBook('#' + bookId);
	});
	
	// add read state button functionality
	changeStatusButton.addEventListener('change', () => {
		const bookId = changeStatusButton.parentNode.id;
		console.log(bookId);
		changeStatus('#' + bookId);
	});

	// add book to library
	library.appendChild(bookDiv);

}

// ---------------------- BUTTON FUNCTIONALITY --------------------------
// add a new book button functionality
document.querySelector('#save-button').addEventListener('click', addBookToLibrary);

// display the modal to add a new book 
document.querySelector('#icon button').addEventListener('click', () => {
	const modal = document.querySelector('#modal-container');
	modal.style.display = 'flex';
});

// hide the modal and clean the inputs when pressing excape button
document.querySelector('#esc-button button').addEventListener('click', hideModal);