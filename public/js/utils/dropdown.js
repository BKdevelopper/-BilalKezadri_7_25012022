const dropdown = document.querySelector('.dropdown');
const blocLinks = document.querySelector('.bloc-links');
const btnDrop = document.querySelector('.btn-top');
const liItems = document.querySelectorAll('.dropdown li');
let toggleIndex;
btnDrop.addEventListener('click', toggleDropDown);
function toggleDropDown() {
    if (!toggleIndex) {
        blocLinks.style.height = `${blocLinks.scrollHeight}px`;
        toggleIndex = true;
        return;
    }
    blocLinks.style.height = 0;
    toggleIndex = false;
}
liItems.forEach(li => li.addEventListener('click', toggleDropDown))