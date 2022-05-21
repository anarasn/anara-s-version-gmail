import {primary} from './primary.js'

console.log(primary)

const emailList = document.querySelector('.email-list')
const pageInfoSpan = document.querySelector('.pageinfo')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const selectedEmails = document.querySelector('.selected-email')


let itemNumber = 0;
let limit = 15;


const search = document.querySelector('.middle')
const searchInput = document.querySelector('#search')
const forDelete = document.querySelector('.for-delete')


const currentYear = new Date().toLocaleDateString()

function createLi(emails){

    if(itemNumber<=0){
        prevBtn.disabled = true
    } else {
        prevBtn.disabled = false
    }

    const lastPage = Math.floor(emails.length/limit)
    if (itemNumber>=lastPage){
        nextBtn.disabled = true
    }else{
        nextBtn.disabled = false
    }
    
    const start = itemNumber*limit
    const end =(itemNumber +1) * limit;
    const partOfEmails = emails.slice(start,end);
    pageInfoSpan.innerHTML = ` ${start}- ${end} of ${emails.length}`



    for(let item of partOfEmails){
        const el = `<li class="email-item">
        <input type="checkbox" name ="${item.id}" id="${item.id}">
        <span class="material-icons" style="color:#9B9E9E "> star_border </span>            
        <span class="email-senderName">${item.senderName}</span>
        <span style="visibility:hidden">${item.senderEmail}</span>
        <span class=" email-message">${item.messageTitle}</span>
        <span class="email-content">${item.messages[0].message}</span>
        <span class="email-time">${currentYear}</span>
    </li>`/*<span class="material-icons"> label_important </span>    */
    emailList.innerHTML += el
    }
}
createLi(primary)

prevBtn.addEventListener ('click',function(){
    emailList.innerHTML = ''
    itemNumber --;
    createLi(primary)
})

nextBtn.addEventListener('click', function(){
    emailList.innerHTML = ''
    itemNumber ++;
    createLi(primary)
})

let searchBtn = document.createElement('button')
search.appendChild(searchBtn)

let searchBtnIcon = document.createElement('img')
searchBtnIcon.src= "./images/search-icon.png"
searchBtn.appendChild(searchBtnIcon)


let emailData = primary
searchInput.addEventListener("input", function(event){
    const email = event.target.value
    let filteredData = emailData.filter((el)=>{
       return el.senderEmail, el.senderName.toLowerCase().includes(email)
    
    })
    console.log (filteredData)   
    
    searchBtn.addEventListener("click", function(){
        emailList.innerHTML = ""
        createLi (filteredData)       
    
    })


    const deleteBtn = document.createElement('div');
    deleteBtn.setAttribute('class', 'delete')
    let deleteBtnIcon = document.createElement('img')

    deleteBtnIcon.src = 'https://www.seekpng.com/png/small/856-8561426_close-icon-grey-handcoded-gray-close.png'
    deleteBtn.addEventListener('click', function(){
        
       
         search.removeChild(searchInput);   
    })
    forDelete.appendChild(deleteBtn);
    deleteBtn.appendChild(deleteBtnIcon)

   
    searchBtn.value = "";

})
const calendarValue = document.querySelector('#calendar')
const calendarBtnIcon = document.querySelector('.calendar-btn-icon')
const calendarClose = document.querySelector(".calendar-close")


calendarBtnIcon.onclick = function(){
  calendarValue.style.display = "block";
 
};

calendarClose.onclick = function(){
  calendarValue.style.display = "none"
}
window.onclick = function (e) {
if (e.target == calendarValue ){ 
    calendarValue.style.display = "none"
}
}

function createCalendar(elem, year, month) {

    let mon = month -1; // месяцы в JS идут от 0 до 11, а не от 1 до 12
    let d = new Date(year, mon);

    let table = '<table><tr><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th><th>S</th></tr><tr>';

    // пробелы для первого ряда
    // с понедельника до первого дня месяца
    // * * * 1  2  3  4
    for (let i = 0; i < getDay(d); i++) {
      table += '<td></td>';
    }

    // <td> ячейки календаря с датами
    while (d.getMonth() == mon) {
      table += '<td>' + d.getDate() + '</td>';

      if (getDay(d) % 7 == 6) { // вс, последний день - перевод строки
        table += '</tr><tr>';
      }

      d.setDate(d.getDate() + 1);
    }

    // добить таблицу пустыми ячейками, если нужно
    // 29 30 31 * * * *
    if (getDay(d) != 0) {
      for (let i = getDay(d); i < 7; i++) {
        table += '<td></td>';
      }
    }

    // закрыть таблицу
    table += '</tr></table>';

    elem.innerHTML = table;
  }

  function getDay(date) { // получить номер дня недели, от 0 (пн) до 6 (вс)
    let day = date.getDay();
    if (day == 0) day = 7; // сделать воскресенье (0) последним днем
    return day - 1;
  }
  createCalendar(calendar, 2022, 5);

 

calendarIcon.addEventListener('click', createCalendar)

