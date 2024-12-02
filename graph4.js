let donneesAdoptionAccueil = []
let donneesAdoptionOrigine = []
let dataSet
let currentData
var slider = document.getElementById("range");
var output = document.getElementById("txt-annee");
var texte = document.getElementById("texte");

function getDataSet10(data, annee) {
  let pays = []
  let nb = []
  data.forEach(function (element) {
    if (data.indexOf(element) < 10) {
      pays.push(element['pays'])
      nb.push(element[annee])
    }
  })
  console.log(nb)
  return [pays, nb]
}

fetch('pays_daccueil.json').then(response => {
  response.json().then(function (data) {

    donneesAdoptionAccueil = data
    dataSet = donneesAdoptionAccueil
    currentData = getDataSet10(dataSet, slider.value);
    texte.innerHTML = currentData[0][0] + ' ' + currentData[1][0]

    fetch('pays_dorigine.json').then(response => {
      response.json().then(function (data) {
        donneesAdoptionOrigine = data
      })
    })

  })
})



document.getElementById("acc").addEventListener("click", function (e) {
  dataSet = donneesAdoptionAccueil
  currentData = getDataSet10(dataSet, slider.value);
  texte.innerHTML = currentData[0][0] + ' ' + currentData[1][0]
})

document.getElementById("ori").addEventListener("click", function (e) {
  dataSet = donneesAdoptionOrigine
  currentData = getDataSet10(dataSet, slider.value);
  texte.innerHTML = currentData[0][0] + ' ' + currentData[1][0]
})

output.innerHTML = slider.value;

slider.addEventListener('input', function (e) {
  output.innerHTML = slider.value;
  currentData = getDataSet10(dataSet, slider.value);
  texte.innerHTML = currentData[0][0] + ' ' + currentData[1][0]
})