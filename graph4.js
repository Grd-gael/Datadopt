let donneesAdoptionAccueil
let donneesAdoptionOrigine
let dataSet
let currentData
var slider = document.getElementById("range");
var output = document.getElementById("txt-annee");
var texte = document.getElementById("texte");

function compareNombres(a, b) {
  return a - b;
}

function dessineBarre(svg, n, height, width, margin){
  var barre = `<path class="barre" data-value="${height}" d="M 100 ${margin*n} L ${height/5+100} ${margin*n} L ${height/5+100} ${width+margin*n} L 100 ${width+margin*n} L 100 ${margin*n}"/>`

  svg.innerHTML += barre;
}

function dessineHistogramme(id, barres, b_width, margin, labels){
  const svg = document.getElementById(id);
  const svgWidth = svg.getAttribute("width");
  console.log(svgWidth)
  svg.innerHTML= ''
  n = 0
  barres.forEach(function (barre){
    svg.innerHTML += `<text class="label" x=0 y=${n*32+20}>${labels[n]}</text>`;
    dessineBarre(svg, n, barre, b_width, margin);

    let valueXposition = barre/5+115 > svgWidth-50 ? svgWidth-50 : barre/5+115
    console.log(valueXposition)

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

    return [pays,nb]
}

fetch('pays_daccueil.json').then(response => {
  response.json().then(function (data) {

    donneesAdoptionAccueil = data
    dataSet = donneesAdoptionAccueil
    currentData = getDataSet10(dataSet, slider.value);

    dessineHistogramme('chart',currentData[1],32,32, currentData[0])
  })
})

fetch('pays_dorigine.json').then(response => {
  response.json().then(function (data) {
    donneesAdoptionOrigine = data
  })
})



document.getElementById("acc").addEventListener("click", function (e) {
  dataSet = donneesAdoptionAccueil
  currentData = getDataSet10(dataSet, slider.value);

  dessineHistogramme('chart',currentData[1],32,32, currentData[0])
})

document.getElementById("ori").addEventListener("click", function (e) {
  dataSet = donneesAdoptionOrigine
  currentData = getDataSet10(dataSet, slider.value);

  dessineHistogramme('chart',currentData[1],32,32, currentData[0])
})

output.innerHTML = slider.value;

slider.addEventListener('input', function (e) {
  output.innerHTML = slider.value;
  currentData = getDataSet10(dataSet, slider.value);

  dessineHistogramme('chart',currentData[1],32,32, currentData[0])
})