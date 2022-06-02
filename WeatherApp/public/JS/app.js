const body = document.getElementById('body');
const sidebarBtn = document.querySelector('.btn-sidebar');
const sidebar = document.querySelector('.sidebar');
const navbar = document.querySelector('.nav-bar');
const navWidth = navbar.getBoundingClientRect().width;
const main = document.querySelector('.main-container');
const mainContainer = document.querySelector('.main-container');



// sidebar script
let isDefault = 0;

sidebarBtn.onclick = () => {
    isDefault++;
    sidebar.classList.toggle('show-sidebar');
    sidebarBtn.classList.toggle('active');
}


function checkWidth() {
    const bodyWidth = body.getBoundingClientRect().width;
    if (bodyWidth > 600) {
        sidebar.classList.add('show-sidebar');
    }
    if (bodyWidth < 600 && isDefault === 0) {
        sidebar.classList.remove('show-sidebar');
    }
}
setInterval(checkWidth, 10);

//mainContainer width maintenance
mainContainer.style.width = `${navWidth} px`;


// get Data
const url = "https://api.waqi.info/search/?keyword=Agra&token=1901d33a6e603fc0440bfd58989829bde3bde73f";
const url2 = "https://api.openweathermap.org/data/2.5/weather?q=Agra,in&appid=f328047da69cf02de9d737ce3066d54d&units=metric";
fetch(url2).then((res) => {
    return res.json();
}).then((data) => {
    // console.log(data);
    const details = [data];
    Data = details.map((val) => {
        console.log(val);
    }).join("");
})

fetch(url).then((res) => {
    return res.json()
}).then((data) => {
    // console.log(data);
    const details = [data];
    Data = details.map((val) => {
        console.log(val);
    }).join("");
})

// select items to change


//first weather
$(".temp h3").text = "TEMP";
$(".temp p").text = "TEMP_MIN";