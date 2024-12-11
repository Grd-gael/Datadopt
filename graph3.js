const labels = document.querySelectorAll('.section3 .label')
const values = document.querySelectorAll('.section3 .value')
const rects = document.querySelectorAll('.section3 rect')
const total = document.querySelector('.nb_adoptions')
let dataPodium

const animationPodium = [
    { transform: "translateY(-20%)scale(1,0)" },
    { transform: "translateY(0%)scale(1,1)" },
  ];
  
  const animationNumbers = [
    { opacity: 0 },
    { opacity: 0 },
    { opacity: 0 },
    { opacity: 1 },
  ];
  
function getPodium(data, annee) {
    let traitement = data
        .map(item => ({
            pays: item.élément,
            nb: parseInt(item['nb_adoptions_' + annee], 10)
        }))
        .filter(item => !isNaN(item.nb))
        .sort((a, b) => b.nb - a.nb)
        .slice(0, 3);
    return traitement
}

function displayData(data) {
    let podium = getPodium(data,slider.value)
    let n=0
    labels.forEach(function (label){
        label.innerHTML = podium[n].pays
        label.animate(animationNumbers,timing)
        n++
    })
    n=0
    values.forEach(function (value){
        value.innerHTML = podium[n].nb
        value.animate(animationNumbers,timing)
        n++
    })

    rects.forEach(rect => rect.animate(animationPodium,timing))
}

function totalAdoptions(data){
    let total = 0
    data.forEach(function (pays){
        if (!isNaN(parseInt(pays['nb_adoptions_'+slider.value]))) {
            total+= parseInt(pays['nb_adoptions_'+slider.value])
        }
    })
    return total
}

fetch('adoption-1979-2022-origine-par-pays.json').then(response => {
    response.json().then(function (data) {
        dataPodium = data
        displayData(data)
        total.innerHTML=totalAdoptions(data)
    })
})

slider.addEventListener('input',function (e) {
    displayData(dataPodium)
    total.innerHTML=totalAdoptions(dataPodium)
})