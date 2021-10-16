let APIKEY = "&api_key=F8sprrqRba2l3XbjhG2J0XK66ZIEyxB1CwUj9GqD";
let APIURL = "https://developer.nps.gov/api/v1/";

let parks;

function getParks() {
  const url = APIURL + "parks?limit=1000" + APIKEY;
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      parks = json.data;
    });
    return;
}

function getParkById(id) {
  const url = APIURL + "parks?parkCode=" + id + APIKEY;
  return fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      return json.data;
    });
}

async function parkSelect(id) {
  let park = await getParkById(id);
  image_url = "url('" + park[0].images[Math.floor(Math.random()*park[0].images.length)].url + "')";
  $(".home").css("background-image", "none");
  $(".navbar").css("background-color", "#02517d");
  
}

// salmon #fa8872

function search() {
  let query = $("#search").val();
  if (query != "") {
    let results = filterItems(parks, query);
    populateResults(results);
  } else {
    results = [];
    populateResults(results)
  }
}

function populateResults(results) {
  $("#search-results").empty();
  for (let i = 0; i < results.length && i < 10; i++) {
    let resElem = "<h2 class='park-result' onclick='parkSelect(&quot;" + results[i].parkCode + "&quot;);'>" + results[i].name + "</h2>";

    $("#search-results").append(resElem);
  }
}

function filterItems(arr, query) {
  return arr.filter(function(el) {
    return el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
  })
}
