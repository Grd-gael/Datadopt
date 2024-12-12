const loader = document.querySelector('.loader');

function fadeOut()
{
    loader.classList.add('fadeOut');
}
 setTimeout(fadeOut, 3000); 

function displayNone()
{
    loader.style.display = 'none';
}

setTimeout(displayNone, 4500);

// window.addEventListener('load', function(){
//     loader.classList.add('fadeOut');
// })


const range = document.getElementById('range');
let RangeValue = document.getElementById('range-value');
let CurrentYear = range.value;

// Initialiser l'année actuelle
RangeValue.innerHTML = range.value;

// Mettre à jour les graphiques en fonction de l'année sélectionnée
range.addEventListener('input', (e) => {
    RangeValue.innerHTML = range.value;
    CurrentYear = range.value;
    UpdateYear(DataDepartement);
    UpdateSomme(DataDepartement);
    UpdateMap(DataDepartement);
    UpdateGraphe2(DataAge);
});

// range.addEventListener('change', (e) => {
//     UpdateSomme(DataDepartement);
// });


// Graphique 1 Map

let NomDepartement;
let DataDepartement;
let NbrAdoption;

// Récupérer les données du fichier JSON

fetch('data-departement.json').then(response => response.json()).then(function (data) {
    DataDepartement = data;
    InitSomme(DataDepartement);
    UpdateMap(DataDepartement);
});

const section1Number = document.querySelector('.section1-number');
const SpanYear = document.querySelectorAll('.current-year');


const Departement = document.querySelectorAll('.map>svg>path');
const InfoDepartement = document.getElementById('info-departement');

// Animer les changements de nombre

// function AnimNumber(balise, nombre) {
//     if (parseInt(balise.innerHTML) >= nombre) {
//         const interval = setInterval(() => {
//             if (parseInt(balise.innerHTML) > nombre) {
//                 balise.innerHTML = parseInt(balise.innerHTML) - 1;
//             } else {
//                 clearInterval(interval);
//             }
//         }, 10);
//     }
//     else if (parseInt(balise.innerHTML) < nombre) {
//         const interval = setInterval(() => {
//             if (parseInt(balise.innerHTML) < nombre) {
//                 balise.innerHTML = parseInt(balise.innerHTML) + 1;
//             } else {
//                 clearInterval(interval);
//             }
//         }, 5);
//     }
// }

// Initialiser le nombre d'adoptions pour l'année en cours
function InitSomme(data) {
    let sommeAdoptions = 0;
    data.forEach(dep => {
        if (dep.annee == CurrentYear) {
            sommeAdoptions+=dep['nbr-adoption'];
        }
    })
    section1Number.innerHTML = sommeAdoptions;
    SpanYear.forEach(span => {
        span.innerHTML = CurrentYear;
    });
}


//  Mettre à jour le nombre d'adoptions pour l'année en cours
function UpdateSomme(data) {
    let sommeAdoptions = 0;
    data.forEach(dep => {
        if (dep.annee == CurrentYear) {
            sommeAdoptions+=dep['nbr-adoption'];
        }
    })
    section1Number.innerHTML = sommeAdoptions;
    // console.log(parseInt(section1Number.innerHTML)+2);
    // AnimNumber(section1Number, sommeAdoptions);
}

// Mettre à jour l'année
function UpdateYear() {
    SpanYear.forEach(span => {
        span.innerHTML = CurrentYear;
    })
}

// Mettre à jour les données de la cartes

function UpdateMap(data) {
    // Récupérer tous les éléments SVG ayant un ID correspondant à un département
    let allPaths = document.querySelectorAll('[id^="FR-"]');

    // Détermine le nombre maximum d'adoptions pour l'année en cours
    let maxAdoptions = Math.max(...data.filter(dep => dep.annee == CurrentYear).map(dep => dep['nbr-adoption']));

    allPaths.forEach(path => {
        let departementId = path.id.replace('FR-', '');
        let departement = data.find(dep => dep.id == departementId && dep.annee == CurrentYear);
        if (departement) {
            if (departement['nbr-adoption'] > 0) {
                let intensity = 255 - Math.floor((departement['nbr-adoption'] / maxAdoptions) * 255); 

                path.style.fill = `rgb(130, 170, ${intensity})`; // Couleur en niveaux de gris
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

// Afficher les informations du département au survol
Departement.forEach(departement => {

    departement.addEventListener('mouseenter', (event) => {
        originalFill = departement.style.fill;
        if (departement.style.fill == 'black') {
            departement.style.fill = '#000058';
        }
        else {
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

// Graphique 2

fetch('data-age.json').then(response => response.json()).then(function (data) {
    DataAge = data;
    AfficheAge.innerHTML = "0 à 6 mois";
    ButtonSubstractAge.disabled = true;
    ButtonSubstractAge.style.backgroundColor = "var(--darkblue)";
    ButtonSubstractAge.style.color = "var(--blue)";
    UpdateGraphe2(DataAge);
});


const ButtonAddAge = document.getElementById('add');
const ButtonSubstractAge = document.getElementById('substract');
const AfficheAge = document.getElementById('affiche-age');

let Age = -1;

ButtonAddAge.addEventListener('click', () => {
    ButtonSubstractAge.disabled = false;
    ButtonSubstractAge.style.backgroundColor = "var(--lightblue)";
    ButtonSubstractAge.style.color = "var(--darkblue)";
    ButtonSubstractAge.classList.add('btn-active');
    Age++;
    console.log(Age);
    AfficheAge.innerHTML = Age + " ans";
    if (Age == 0) {
        AfficheAge.innerHTML = "6 à 12 mois";
    }
    if (Age == 5) {
        AfficheAge.innerHTML = "5 et 6 ans";
    }
    if (Age == 6) {
        AfficheAge.innerHTML = "7 ans et +";
        ButtonAddAge.disabled = true;
        ButtonAddAge.style.backgroundColor = "var(--darkblue)";
        ButtonAddAge.style.color = "var(--blue)";
        ButtonAddAge.classList.remove('btn-active');
    }
    UpdateGraphe2(DataAge);
});

ButtonSubstractAge.addEventListener('click', () => {
    ButtonAddAge.disabled = false;
    ButtonAddAge.style.backgroundColor = "var(--lightblue)";
    ButtonAddAge.style.color = "var(--darkblue)";
    ButtonAddAge.classList.add('btn-active');
    Age--;
    console.log(Age);
    AfficheAge.innerHTML = Age + " ans";
    if (Age == 0) {
        AfficheAge.innerHTML = "6 à 12 mois";
    }
    if (Age == -1) {
        AfficheAge.innerHTML = "0 à 6 mois";
        ButtonSubstractAge.disabled = true;
        ButtonSubstractAge.style.backgroundColor = "var(--darkblue)";
        ButtonSubstractAge.style.color = "var(--blue)";
        ButtonSubstractAge.classList.remove('btn-active');
    }
    if (Age == 5) {
        AfficheAge.innerHTML = "5 et 6 ans";
    }
    UpdateGraphe2(DataAge);
});

const AdopParAge = document.getElementById('adop-par-age');
const gradientCircle = document.querySelector('.gradient-circle');

function UpdateGraphe2(dataAge) {
    // if (dataAge.find(age => age.id_age_enfant === Age)) {
    //     AdopParAge.innerHTML = dataAge[CurrentYear];
    // }
    dataAge.forEach(age => {
        if (age.id_age_enfant === Age) {
            const gradientHeight = Math.min(100, (age[CurrentYear]/ 100) * 100);
            AdopParAge.innerHTML = age[CurrentYear];
            gradientCircle.style.background = `linear-gradient(180deg,rgba(255, 255, 255, 1) ${100 - gradientHeight}%,var(--blue) 100%)`;
        }
    });
};
