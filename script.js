var data = fetch("https://restcountries.com/v3.1/all");
data.then((res) => res.json()).then((res1) => foo(res1));

var container = document.createElement("div");
container.className = "container";

var row = document.createElement("div");
row.className = "row";

function foo(res1) {
  for (var i = 0; i < res1.length; i++) {
    var col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `<div class="card mb-3" style="max-width: 18rem;">
    <div class="card-header">${res1[i].name.common}</div>
    <div class="card-body">
    <img src="${res1[i].flags.png}" class="card-img-top" alt="...">
      <p class="card-text">
      Capital : ${res1[i].capital}<br>
      Region : ${res1[i].region}<br>
      Country Code : ${res1[i].cca3}<br>
      <button type="button" class="btn btn-secondary">Click for weather</button>
      </p>
    </div>
  </div>`;
    row.append(col);
    container.append(row);
    document.body.append(container);
  }
}
