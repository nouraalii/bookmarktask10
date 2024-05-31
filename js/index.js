

JSON


var BookmarkName= document.getElementById("BookmarkName");
var WebsiteURL= document.getElementById("WebsiteURL");
var rowData = document.getElementById('bookMarkInfo');
var box=document.getElementById('box');
var closeBtn=document.getElementById('closeBtn');
var bookMarkList;

if (localStorage.getItem('bookMarkList') != null) {
    bookMarkList = JSON.parse(localStorage.getItem('bookMarkList'));
    displayBookMark(bookMarkList);
} else {
    bookMarkList = [];
}



// ---- Add function--------
function addBookMark() {
    var bookMark = {
        name:BookmarkName.value,
        WebUrl:WebsiteURL.value
    };
       if (BookmarkName.classList.contains('is-valid')&&WebsiteURL.classList.contains('is-valid')) {
        bookMarkList.push(bookMark);
        localStorage.setItem('bookMarkList', JSON.stringify(bookMarkList));
        console.log(bookMarkList);
        clearInfo();
        displayBookMark(bookMarkList);
        box.classList.add('d-none');
       }
       else{
        box.classList.remove('d-none');
       }
}


function closeCard()   {
    box.classList.add('d-none');
}

function clearInfo() {
    BookmarkName.value = '';
    WebsiteURL.value = '';
}

function displayBookMark(list) {
    var cartona = '';
    var index=1;
    for (var i = 0; i < list.length; i++) {
        cartona += `<tbody id="tableContent">
        <tr>
          <td>${index}</td>
          <td>${list[i].name}</td>              
          <td>
          <a href="${list[i].WebUrl}">
            <button class="btn btn-visit" data-index="0">
              <i class="fa-solid fa-eye pe-2"></i>Visit
            </button>
          </a>
          </td>
          <td>
          <button class="btn btn-delete" onclick="deleteBookMark(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button>
          </td>
      </tr>
      </tbody>`;
      index++;
    }
    rowData.innerHTML = cartona;
}


function deleteBookMark(index) {

    bookMarkList.splice(index,1)
    localStorage.setItem('bookMarkList', JSON.stringify(bookMarkList));
    displayBookMark(bookMarkList);
}


function validateInput(element){
    
    var regex={
        BookmarkName:/(.*[a-z]){3}/,
        WebsiteURL:/.+\.[a-zA-Z]{2,}/,
    };
    
    if (regex[element.id].test(element.value)) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
    }
    else{
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
    }
}