let donneesAdoptionAccueil
let donneesAdoptionOrigine
let dataSet
let currentData
var slider = document.getElementById("range");
var output = document.querySelector(".current-year");
var texte = document.getElementById("texte");
const buttonAcc = document.getElementById("acc")
const buttonOri = document.getElementById("ori")
const buttons = document.querySelector('.buttons')

const animationBarres = [
  { transform: "translateX(100px)scale(0,1)" },
  { transform: "translateX(0%)scale(1,1)" },
];

const animationValeurs = [
  { opacity: 0 },
  { opacity: 0 },
  { opacity: 1 },
];

const timing = {
  duration: 1000,
  iterations: 1,
};

function compareNombres(a, b) {
  return a - b;
}

function animation() {
  document.querySelectorAll('.barre').forEach(function (barre) {
    barre.animate(animationBarres, timing)
  })

  document.querySelectorAll('.value').forEach(function (value) {
    value.animate(animationValeurs, timing)
  })
}

function changeColor(color) {
  let n = 0
  const barres = document.querySelectorAll('.barre')
  if (color == "purple") {
    barres.forEach(function (barre) {
      if (n % 2 == 0) {
        barre.style.fill = "var(--lightpurple)"
      } else {
        barre.style.fill = "var(--purple)"
      }
      n++
    })
  } else {
    barres.forEach(function (barre) {
      if (n % 2 == 0) {
        barre.style.fill = "var(--lightblue)"
      } else {
        barre.style.fill = "#1e8888"
      }
      n++
    })
  }
}

function dessineBarre(svg, n, height, width, margin) {
  var barre = `<path class="barre" data-value="${height}" d="M 100 ${margin * n} L ${height / 5 + 100} ${margin * n} L ${height / 5 + 100} ${width + margin * n} L 100 ${width + margin * n} L 100 ${margin * n}"/>`

  svg.innerHTML += barre;
}

function dessineHistogramme(id, barres, b_width, margin, labels) {
  const svg = document.getElementById(id);
  const svgWidth = svg.getAttribute("width");
  svg.innerHTML = ''
  n = 0
  barres.forEach(function (barre) {
    svg.innerHTML += `<text class="label" x=0 y=${n * 32 + 20}>${labels[n]}</text>`;
    dessineBarre(svg, n, barre, b_width, margin);

    let valueXposition = barre / 5 + 115 > svgWidth - 50 ? svgWidth - 50 : barre / 5 + 115

    svg.innerHTML += `<text x="${valueXposition}" y="${n * 32 + 20}" class="value">${barre}</text>`;
    n++;
  })
}


function getDataSet10(data, annee) {
  let traitement = data
    .map(item => ({
      pays: item.pays,
      nb: parseInt(item[annee], 10)
    }))
    .sort((a, b) => b.nb - a.nb)
    .slice(0, 10);

  const pays = traitement.map(item => item.pays);
  const nb = traitement.map(item => item.nb);

  return [pays, nb]
}

fetch('pays_daccueil.json').then(response => {
  response.json().then(function (data) {
    output.innerHTML = slider.value;

    donneesAdoptionAccueil = data
    dataSet = donneesAdoptionAccueil
    currentData = getDataSet10(dataSet, slider.value);

    buttonOri.style.backgroundColor = "transparent"

    dessineHistogramme('chart', currentData[1], 32, 32, currentData[0])

    animation()
  })
})

fetch('pays_dorigine.json').then(response => {
  response.json().then(function (data) {
    donneesAdoptionOrigine = data
  })
})

buttonAcc.addEventListener("click", function (e) {
  buttonAcc.style.backgroundColor = "#1e8888"
  buttonOri.style.backgroundColor = "transparent"
  buttons.style.backgroundColor = "var(--lightblue)"

  dataSet = donneesAdoptionAccueil
  currentData = getDataSet10(dataSet, slider.value);
  texte.innerHTML = "Top 10 des pays ayant effectué des adoptions dans le monde en "

  output = document.querySelector(".current-year");
  output.innerHTML = slider.value;

  dessineHistogramme('chart', currentData[1], 32, 32, currentData[0])

  animation()

  changeColor('blue')
})

document.getElementById("ori").addEventListener("click", function (e) {
  buttonAcc.style.backgroundColor = 'transparent'
  buttonOri.style.backgroundColor = "var(--purple)"
  buttons.style.backgroundColor = "var(--lightpurple)"


  dataSet = donneesAdoptionOrigine
  currentData = getDataSet10(dataSet, slider.value);
  texte.innerHTML = "Top 10 des pays d'origine des enfants adoptés dans le monde en "

  output = document.querySelector(".current-year");
  output.innerHTML = slider.value;

  dessineHistogramme('chart', currentData[1], 32, 32, currentData[0])

  animation()
  changeColor('purple')
})

slider.addEventListener('input', function (e) {
  output.innerHTML = slider.value;
  currentData = getDataSet10(dataSet, slider.value);

  dessineHistogramme('chart', currentData[1], 32, 32, currentData[0])

  animation()
})