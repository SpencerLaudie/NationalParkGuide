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

async function loadParkData() {
  parkCode = parseURLParams(window.location.href).parkCode[0];
  let park = await getParkById(parkCode);
  image_url = "url('" + park[0].images[Math.floor(Math.random()*park[0].images.length)].url + "')";

  let page_content = ""
  page_content += "";
  page_content += "<div class='park_content_container'>";
  page_content += "<h6>" + park[0].designation + "</h6>";
  page_content += "<div class='display-4 park-name'>" + park[0].name + "</div>";
  page_content += "<br><p>" + park[0].description + "</p>";
  page_content += "</div>";
  page_content += ""
  console.log(page_content);
  $(".park-data").append(page_content);
  $(".park-img").css("background-image", image_url)
}

function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
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
    let resElem = "<a href='/pages/park.html?parkCode=" + results[i].parkCode + "'><h2 class='park-result'>" + results[i].name + "</h2></a>";
//    let resElem = "<a href='pages/park.html?" + results[i].parkCode + "' class='park-result' onclick='parkSelect(&quot;" + results[i].parkCode + "&quot;);'>" + results[i].name + "</a>";

    $("#search-results").append(resElem);
  }
}

function filterItems(arr, query) {
  return arr.filter(function(el) {
    return el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
  })
}
