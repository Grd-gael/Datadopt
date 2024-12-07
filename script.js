// const loader = document.querySelector('.loader');

// function fadeOut()
// {
//     loader.classList.add('fadeOut');
// }
//  setTimeout(fadeOut, 3000); 

// window.addEventListener('load', function(){
//     loader.classList.add('fadeOut');
// })

let NomDepartement;
let DataDepartement;
let NbrAdoption;

fetch('data-departement.json').then(response => response.json()).then(function (data) {
    DataDepartement = data;
    InitSomme(DataDepartement);
    UpdateMap(DataDepartement);
});

const range = document.getElementById('range');
let RangeValue = document.getElementById('range-value');
let CurrentYear = range.value;

RangeValue.innerHTML = range.value;

range.addEventListener('input', (e) => {
    RangeValue.innerHTML = range.value;
    CurrentYear = range.value;
    UpdateYear(DataDepartement);
    UpdateMap(DataDepartement);
});

range.addEventListener('change', (e) => {
    UpdateSomme(DataDepartement);
});

const section1Number = document.querySelector('.section1-number');
const section1Year = document.querySelector('.section1-year');


const Departement = document.querySelectorAll('.map>svg>path');
const InfoDepartement = document.getElementById('info-departement');


function AnimNumber(balise, nombre){
    if (parseInt(balise.innerHTML) >= nombre){
        const interval = setInterval(() => {
            if (parseInt(balise.innerHTML) > nombre){
                balise.innerHTML = parseInt(balise.innerHTML) - 1;
            } else {
                clearInterval(interval);
            }
        }, 100);
    }
    else if (parseInt(balise.innerHTML) < nombre){
        const interval = setInterval(() => {
            if (parseInt(balise.innerHTML) < nombre){
                balise.innerHTML = parseInt(balise.innerHTML) + 1;
            } else {
                clearInterval(interval);
            }
        }, 90);
    }
}

function InitSomme(data){
    let sommeAdoptions= 0;
    data.forEach(dep => {
        if (dep.annee == CurrentYear){
            sommeAdoptions++;
        }
    })
    section1Number.innerHTML=sommeAdoptions;
    section1Year.innerHTML=CurrentYear;
}



function UpdateSomme(data){
    let sommeAdoptions= 0;
    data.forEach(dep => {
        if (dep.annee == CurrentYear){
            sommeAdoptions++
        }
    })
    // console.log(parseInt(section1Number.innerHTML)+2);
    AnimNumber(section1Number, sommeAdoptions);
}

function UpdateYear(){
    section1Year.innerHTML=CurrentYear;
}


function UpdateMap(data) {
    // Récupérer tous les éléments SVG ayant un ID correspondant à un département
    let allPaths = document.querySelectorAll('[id^="FR-"]');

    allPaths.forEach(path => {
        let departementId = path.id.replace('FR-', '');
        let departement = data.find(dep => dep.id == departementId && dep.annee == CurrentYear);
        if (departement) {
            if (departement['nbr-adoption'] > 0) {
                path.style.fill = 'var(--blue)';
            } else {
                path.style.fill = 'black';
            }
        } else {
            // Si le département n'existe pas pour l'année en cours
            path.style.fill = 'black';
        }
    });
}

const tooltip = document.getElementById('info-departement');

Departement.forEach(departement => {

    departement.addEventListener('mouseenter', (event) => {
        originalFill = departement.style.fill; 
        if (departement.style.fill == 'black') {
            departement.style.fill = '#000058';
        }
        else{
        departement.style.fill = 'var(--ivoire)';
        } 

        const departementId = event.target.id.replace('FR-', '');
        const departementData = DataDepartement.find(d => d.id == departementId && d.annee == CurrentYear);

        if (departementData && departementData['nbr-adoption'] > 0) {
            tooltip.innerHTML = `<strong>${departementData.departement}</strong><br>Adoptions: ${departementData['nbr-adoption']}`;
            tooltip.style.display = 'block';
            tooltip.style.left = event.pageX + 10 + 'px';
            tooltip.style.top = event.pageY + 10 + 'px';
        }
    });

    departement.addEventListener('mousemove', (event) => {
        tooltip.style.left = event.pageX + 10 + 'px';
        tooltip.style.top = event.pageY + 10 + 'px';
    });

    departement.addEventListener('mouseleave', () => {
        departement.style.fill = originalFill;
        tooltip.style.display = 'none';
    });
});