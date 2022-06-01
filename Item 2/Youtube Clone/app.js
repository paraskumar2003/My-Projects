const body = document.querySelector('#body');
let availWidth;
const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.querySelector('.menu');
const container = document.querySelector('.container');
var isDefault = 0;
// Checking only in case of default
function checkWidth() {
    if (availWidth > 1024 && isDefault == 0) {
        toggleBtn.onclick = () => {
            if (sidebar.classList.contains('small-sidebar')) {
                sidebar.classList.remove('small-sidebar');
                if (container.classList.contains('large-container')) {
                    container.classList.remove('large-container');
                }
            } else {
                container.classList.add('large-container');
                sidebar.classList.add('small-sidebar');
            }
        }

    }
    if (availWidth <= 1024 && availWidth >= 794) {
        if (!sidebar.classList.contains('small-sidebar') && isDefault == 0) {
            sidebar.classList.add('small-sidebar')
        }
        if (!container.classList.contains('large-container') && isDefault == 0) {
            container.classList.add('large-container');
        }
        toggleBtn.onclick = () => {
            isDefault++;
            sidebar.classList.toggle('small-sidebar')
            container.classList.toggle('large-container')
        }
    }
    if (availWidth <= 794) {
        toggleBtn.onclick = () => {
            sidebar.classList.remove('small-sidebar')
            sidebar.classList.toggle('show-sidebar');
        }
    }
}

function giveWidth() {
    availWidth = body.getBoundingClientRect().width;
    console.log(availWidth);
}
setInterval(checkWidth, 10);
setInterval(giveWidth, 10);