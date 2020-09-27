let library = [];
let dataCounter = 0;

function Book(title, author, pageNumber, read, data) {
    this.title = title.replace(/\s+/g,' ').trim();
    this.author = author;
    this.pageNumber = pageNumber;
    this.read = read;
    this.data = data;
    this.displayTitle = "";
    let temp = this.title.split(" ");
    let acc = 0;
    if(title.length > 55) {
        for(let i = 0; i < temp.length - 1; i++) {
            console.log(acc + i + temp[i].length, acc + temp[i].length + temp[i + 1].length + i + 1)
            if(acc + i + temp[i].length <= 55 && acc + temp[i].length + temp[i + 1].length + i + 1 > 47) {
                this.displayTitle = this.title.slice(0, acc + temp[i].length) + "..."
            }
            acc += temp[i].length + 1;
        }
    } else {
        this.displayTitle = this.title
    }
    console.log(this.displayTitle)
}

function addBook(title, author, pageNumber, read, data) {
    library.push(new Book(title, author, pageNumber, read, data));
    addBookHTML(library[library.length - 1])
    dataCounter++;
}

function addBookHTML(book) {
    let newBook = document.createElement("div");
    let title = document.createElement("p");
    title.innerText = book.displayTitle;
    title.setAttribute("class", "title");
    let author = document.createElement("p");
    author.innerText = "Author: " + book.author;
    author.setAttribute("class", "author");
    let pageNumber = document.createElement("p");
    pageNumber.innerText = "Pages: " + book.pageNumber;
    pageNumber.setAttribute("class", "page-number");
    let read = document.createElement("p");
    read.innerText = book.read ? "This book has been read" : "This book has not been read";
    read.setAttribute("class", "read");
    let deleteBook = document.createElement("div");
    deleteBook.innerText = "x";
    deleteBook.setAttribute("class", "delete-book");
    deleteBook.setAttribute("data-index", dataCounter);
    
    newBook.appendChild(deleteBook);
    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(pageNumber);
    newBook.appendChild(read);
    newBook.setAttribute("class", "book");
    newBook.setAttribute("data", library.indexOf(book));
     
    let parent = document.getElementById("books");
    let addBook = document.getElementById("add-book");
    parent.insertBefore(newBook, addBook);
    
}

let addButton = document.getElementById("add-book");
let addBookForm = document.getElementById("add-book-form")
addButton.addEventListener("click", () => {
    addBookForm.style.display = "block";
})
let closeBookForm = document.getElementById("close-form")
closeBookForm.addEventListener("click", () => {
    addBookForm.style.display = "none";
})

let submitNewBook = document.getElementById("add-book-button")
submitNewBook.addEventListener("click", () => {
    let titleInput = document.getElementById("title-input");
    let authorInput = document.getElementById("author-input");
    let numberInput = document.getElementById("number-input");
    let readInput = document.getElementById("read-input");

    if(titleInput.value && authorInput.value && numberInput) {
        addBook(titleInput.value, authorInput.value, numberInput.value, readInput.checked, dataCounter);
        addBookForm.style.display = "none";
        titleInput.value = "";
        authorInput.value = "";
        numberInput.value = 0;
        readInput.checked = false;
    }
})

document.addEventListener("click", e => {
    if(e.target.className === "delete-book") {
        library.forEach((elem, index) => {
            if(e.target.dataset.index == elem.data) {
                e.target.parentNode.remove()
                library.splice(index, 1);
            }
        })  
    }
     else if(e.target.className === "read") {
        library.forEach((elem, index) => {
            if(e.target.parentNode.getAttribute("data") == elem.data) {
                library[index].read = !library[index].read;
                e.target.innerText = library[index].read ? "This book has been read" : "This book has not been read";
            }
        }) 
    }
})
