let donneesAdoptionAccueil
let donneesAdoptionOrigine
let dataSet
let currentData
var slider = document.getElementById("range");
var output = document.getElementById("txt-annee");
var texte = document.getElementById("texte");


function dessineAxes(id,a_length,o_height){
  const svg = document.querySelector(id);
  const abscisse = `<path class="axe-horizontal" style="stroke:black" d="M 0  ${o_height} L ${a_length} ${o_height}"/>`;
  const ordonnee = `<path class="axe-vertical" style="stroke:black" d="M 0 0 L 0 ${o_height}"/>` ;

  svg.innerHTML = `${abscisse} ${ordonnee}`;
}

function dessineBarre(id, n, height, width, margin, color, vbmax){
  const svg = document.getElementById(id);
  var barre = `<path class="barre" style="fill:${color};" d="M ${margin*n} ${vbmax} L ${margin*n} ${vbmax-height} L ${width+margin*n} ${vbmax-height} L ${width+margin*n} ${vbmax} L ${margin*n} ${vbmax}"/>`

  svg.innerHTML += barre;
}

function dessineHistogramme(id, abscisse, ordonnee, barres, b_width, margin, color){
  document.getElementById(id).innerHTML= ''
  n = 0
  barres.forEach(function (barre){
    dessineBarre(id, n, barre, b_width, margin, color, ordonnee);
    n++;
  })
  dessineAxes(id,abscisse,ordonnee);
}


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

    dessineHistogramme('chart',1000,1000,currentData[1],100,200,'blue')
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

  dessineHistogramme('chart',1000,1000,currentData[1],100,200,'blue')
})

document.getElementById("ori").addEventListener("click", function (e) {
  dataSet = donneesAdoptionOrigine
  currentData = getDataSet10(dataSet, slider.value);

  dessineHistogramme('chart',1000,1000,currentData[1],100,200,'blue')
})

output.innerHTML = slider.value;

slider.addEventListener('input', function (e) {
  output.innerHTML = slider.value;
  currentData = getDataSet10(dataSet, slider.value);

  dessineHistogramme('chart',1000,1000,currentData[1],100,200,'blue')
})