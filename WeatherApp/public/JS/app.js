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