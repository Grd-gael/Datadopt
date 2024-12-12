const labels = document.querySelectorAll('.section3 .label')
const values = document.querySelectorAll('.section3 .value')
const rects = document.querySelectorAll('.section3 rect')
const total = document.querySelector('.nb_adoptions')
const podImg1 = document.querySelector('.podium1')
const podImg2 = document.querySelector('.podium2')
const podImg3 = document.querySelector('.podium3')
let dataPodium

function getPodium(data, annee) {
    let traitement = data
        .map(item => ({
            pays: item.élément,
            nb: parseInt(item['nb_adoptions_' + annee], 10)
        }))
        .filter(item => !isNaN(item.nb))
        .sort((a, b) => b.nb - a.nb)
        .slice(0, 3);
    let tmp = traitement.shift()
    traitement.splice(1, 0, tmp)
    // console.log(traitement)
    return traitement
}

function displayData(data) {
    let podium = getPodium(data, slider.value)
    let n = 0
    labels.forEach(function (label) {
        label.innerHTML = podium[n].pays
        n++
    })
    n = 0
    values.forEach(function (value) {
        value.innerHTML = podium[n].nb
        n++
    })
}

function totalAdoptions(data) {
    let total = 0
    data.forEach(function (pays) {
        if (!isNaN(parseInt(pays['nb_adoptions_' + slider.value]))) {
            total += parseInt(pays['nb_adoptions_' + slider.value])
        }
    })
    return total
}

fetch('adoption-1979-2022-origine-par-pays.json').then(response => {
    response.json().then(function (data) {
        dataPodium = data
        displayData(data)
        total.innerHTML = totalAdoptions(data)
        updateDrapeaux();
    })
})

slider.addEventListener('input', function (e) {
    displayData(dataPodium)
    total.innerHTML = totalAdoptions(dataPodium)
    updateDrapeaux();
})


const countries = [
    {
        "name": "Éthiopie",
        "flag": "https://upload.wikimedia.org/wikipedia/commons/7/71/Flag_of_Ethiopia.svg"
    },
    {
        "name": "Russie",
        "flag": "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg"
    },
    {
        "name": "Chine",
        "flag": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg"
    },
    {
        "name": "Vietnam",
        "flag": "https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg"
    },
    {
        "name": "Colombie",
        "flag": "https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg"
    },
    {
        "name": "Cote d'Ivoire",
        "flag": "https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_C%C3%B4te_d%27Ivoire.svg"
    },
    {
        "name": "Haiti",
        "flag": "https://upload.wikimedia.org/wikipedia/commons/5/56/Flag_of_Haiti.svg"
    },
    {
        "name": "Rep. Dem. Congo",
        "flag": "https://upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg"
    },
    {
        "name": "Thailande",
        "flag": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg"
    },
    {
        "name": "Congo",
        "flag": "https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_the_Republic_of_the_Congo.svg"
    },
    {
        "name": "Madagascar",
        "flag": "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Madagascar.svg"
    }
];

function updateDrapeaux() {
    let podium = getPodium(dataPodium, slider.value)
    let n = 0
    let podImgs = [podImg1, podImg2, podImg3]
    podium.forEach((rect, index) => {
        const country = countries.find(c => c.name === rect.pays);
        if (country) {
            podImgs[index].setAttribute('href', country.flag);
        }
    })
}