 
      let form = document.querySelector("#form");
      let display = document.querySelector("#display");
      let add = document.querySelector("#add");
      let books = JSON.parse(localStorage.getItem("items")) || [];

      // prettier-ignore
      function poppulateDisplay(anyArray=[],destination) {
           destination.innerHTML = anyArray.map((item,i)=>{
               return `
        <div class="folder" data-index=${i}>
        <div>${item.title}</div>
        <div>${item.author}</div>
        <div>${item.pages}</div>
        <div class="${item.read} toggle">${item.read}</div>
        <button class="delete">delete</button>
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
        let read = checkvalue.checked ? "read" : "no-read";
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
        if (!e.target.matches("button")) return;
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
        if (books[index].read === "read") {
          books[index].read = "no-read";
          localStorage.setItem("items", JSON.stringify(books));
          return poppulateDisplay(books, display);
        }
        if (books[index].read === "no-read") {
          books[index].read = "read";
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

      let overlay = document.querySelector('.overlay')
      form.addEventListener("submit", bookList);
      display.addEventListener("click", deleteFolder);
      display.addEventListener("click", toogleDone);
      add.addEventListener("click", showForm);
      poppulateDisplay(books, display);
    