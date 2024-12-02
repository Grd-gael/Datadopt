// const loader = document.querySelector('.loader');

// function fadeOut()
// {
//     loader.classList.add('fadeOut');
// }
//  setTimeout(fadeOut, 3000); 

// window.addEventListener('load', function(){
//     loader.classList.add('fadeOut');
// })


const range = document.getElementById('range');
let RangeValue = document.getElementById('range-value');

RangeValue.innerHTML = range.value;

range.addEventListener('input', (e) => {
    RangeValue.innerHTML = range.value;
});