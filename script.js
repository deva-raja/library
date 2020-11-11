let form = document.querySelector("#form");
let display = document.querySelector("#display");
let add = document.querySelector("#add");

let defaultText = {
  title: "Harry Potter",
  author: " JK Rowling",
  pages: "645",
  read: "FINISHED",
};
let books = JSON.parse(localStorage.getItem("items")) || [];
books.push(defaultText);

// prettier-ignore
// takes any array and displays the content in destination html
function poppulateDisplay(anyArray=[],destination) {
           destination.innerHTML = anyArray.map((item,i)=>{
               return `
        <div class="folder" data-index=${i}>
        <div>${item.title}</div>
        <div>${item.author}</div>
        <div>${item.pages} pages</div>
        <div class="${item.read} toggle">${item.read}</div>
        <i class="fas fa-times delete"></i>
        </div>
               `;
           }).join(""); 
        }

function bookList(e) {
  e.preventDefault();
  let title = this.querySelector("[id=title]").value;
  let author = this.querySelector("[id=author]").value;
  let pages = this.querySelector("[id=pages]").value;
  let checkvalue = this.querySelector("[id=read]");
  // read or not  according to the checkbox
  let read = checkvalue.checked ? "FINISHED" : "UNFINISHED";
  let book = {
    title,
    author,
    pages,
    read,
  };
  books.push(book);
  localStorage.setItem("items", JSON.stringify(books));
  poppulateDisplay(books, display);
  this.reset();
  false;
  overlayToggle();
}

function deleteFolder(e) {
  if (!e.target.matches(".delete")) return;
  let el = e.target;
  let index = el.parentNode.dataset.index;
  books.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(books));
  poppulateDisplay(books, display);
}

function toogleDone(e) {
  if (!e.target.matches(".toggle")) return;
  let el = e.target;
  let index = el.parentNode.dataset.index;
  if (books[index].read === "FINISHED") {
    books[index].read = "UNFINISHED";
    localStorage.setItem("items", JSON.stringify(books));
    return poppulateDisplay(books, display);
  }
  if (books[index].read === "UNFINISHED") {
    books[index].read = "FINISHED";
    localStorage.setItem("items", JSON.stringify(books));
    return poppulateDisplay(books, display);
  }
}

function showForm(e) {
  form.style.display = "block";
  overlayToggle();
}

function overlayToggle() {
  overlay.classList.toggle("invisibility");
  overlay.classList.toggle("fade-in");
}

let overlay = document.querySelector(".overlay");
form.addEventListener("submit", bookList);
display.addEventListener("click", deleteFolder);
display.addEventListener("click", toogleDone);
add.addEventListener("click", showForm);
poppulateDisplay(books, display);

function clearForm() {
  this.parentNode.reset();
  overlayToggle();
}
let deleteForm = document.querySelector(".delete-form");
deleteForm.addEventListener("click", clearForm);

function deleteAll() {
  books = [];
  localStorage.setItem("items", JSON.stringify(books));
  poppulateDisplay(books, display);
}
let clearScreen = document.querySelector(".deleteAll");
clearScreen.addEventListener("click", deleteAll);
