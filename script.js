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
	const inputs = document.querySelectorAll('input');
	let title = inputs[0].value,
		author = inputs[1].value,
		pages = inputs[2].value,
		state = inputs[3].checked;  // bool: true if checked
	
	const newBook = new Book(title, author, pages, state);  // create new book
	myLibrary.push(newBook);  // add new book to library
	displayBook(newBook);
	console.log(myLibrary);
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
	//document.querySelector('#modal').style.display = 'none';

}
// ------------------------- DISPLAY LIBRARY --------------------------------
function displayBook(book) {
	// this function makes visible the book information
	const library = document.querySelector('#library');
	const bookDiv = document.createElement('div');
	bookDiv.classList.add('book');

	for (const [key, value] of Object.entries(book)) {
		// if the book is read show it with another background color
		if (key !== 'state') {
			const div = document.createElement('div');
			div.textContent = value;
			bookDiv.appendChild(div);
		}
		else if (value === true) {
			bookDiv.classList.add('read');
		} else {
			bookDiv.classList.add('not-read');
		}
	}
	library.appendChild(bookDiv);
}

// test books
myLibrary.push(new Book('Lolita', 'Nabokov, V.', 300, false));
myLibrary.push(new Book('Don Quijote de la Mancha', 'Saavedra, M.', 1000, false));
myLibrary.push(new Book('Surely You\'re Joking Mr. Feynman', 'Feynman, R.', 350, true));
displayBook(myLibrary[0]);
displayBook(myLibrary[1]);
displayBook(myLibrary[2]);

// ---------------------- BUTTON FUNCTIONALITY --------------------------
// add a new book button functionality
document.querySelector('#save-button').addEventListener('click', addBookToLibrary);
// display the modal to add a new book 
document.querySelector('#icon button').addEventListener('click', () => {
	const modal = document.querySelector('#modal');
	modal.style.display = 'flex';
})
// hide the modal and clean the inputs when pressing excape button
document.querySelector('#esc-button button').addEventListener('click', hideModal);