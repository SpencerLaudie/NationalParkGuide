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
  $("#park-img").css("background-image", image_url)
  $("#park-designation").html(park[0].designation);
  $("#park-name").html(park[0].name);
  $("#park-description").html(park[0].description);

  for (let i = 0; i < park[0].entranceFees.length; i++) {
    let fees = "<div class='fee-container'><h2 class='font-weight-light'>$" + park[0].entranceFees[i].cost + "</h2>";
    fees += "<div class='fee-description-container'><h6 class='fee-title'>" + park[0].entranceFees[i].title + "</h6>";
    fees += "<p>" + park[0].entranceFees[i].description + "</p></div></div>";
    $("#list-fees").append(fees);
  }

  for (let i = 0; i < park[0].operatingHours.length; i++) {
    let hours = "<div class='hours-container'><h3>" + park[0].operatingHours[i].name + "</h3>";
    hours += "<p>" + park[0].operatingHours[i].description + "</p>";
    hours += "<table>" +
                "<tr>" +
                  "<td class='font-weight-bold'>Sunday</td>" +
                  "<td>" + park[0].operatingHours[i].standardHours.sunday + "</td>" +
                "</tr>" +
                "<tr>" +
                  "<td class='font-weight-bold'>Monday</td>" +
                  "<td>" + park[0].operatingHours[i].standardHours.monday + "</td>" +
                "</tr>" +
                "<tr>" +
                  "<td class='font-weight-bold'>Tuesday</td>" +
                  "<td>" + park[0].operatingHours[i].standardHours.tuesday + "</td>" +
                "</tr>" +
                "<tr>" +
                  "<td class='font-weight-bold'>Wednesday</td>" +
                  "<td>" + park[0].operatingHours[i].standardHours.wednesday + "</td>" +
                "</tr>" +
                "<tr>" +
                  "<td class='font-weight-bold'>Thursday</td>" +
                  "<td>" + park[0].operatingHours[i].standardHours.thursday + "</td>" +
                "</tr>" +
                "<tr>" +
                  "<td class='font-weight-bold'>Friday</td>" +
                  "<td>" + park[0].operatingHours[i].standardHours.friday + "</td>" +
                "</tr>" +
                "<tr>" +
                  "<td class='font-weight-bold'>Saturday</td>" +
                  "<td>" + park[0].operatingHours[i].standardHours.saturday + "</td>" +
                "</tr>" +
              "</table>";
    hours += "</div";
    $("#list-hours").append(hours);
  }

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
