let APIKEY = "&api_key=F8sprrqRba2l3XbjhG2J0XK66ZIEyxB1CwUj9GqD";
let APIURL = "http://developer.nps.gov/api/v1/";

console.log("here");

function translate() {

  const url = APIURL + "parks?" + APIKEY;
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";
      results += "<h2>" + json.data[1].name + "</h2>";
      document.getElementById("results").innerHTML = results;
    });
    return;
}

translate();
