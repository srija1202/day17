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
      <button type="button" class="btn btn-secondary" onclick="checkWeather('${res1[i].capital}')">Click for weather</button>
      </p>
    </div>
  </div>`;
    row.append(col);
    container.append(row);
    document.body.append(container);
  }
}

function checkWeather(city) {
  const weatherAPIKey = '5502b8573b2b64f89f730c8fddb0b7ff';
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}`)
      .then(response => response.json())
      .then(data => {
          createModal(data, city);
      })
      .catch(error => console.log(error));
}

function createModal(data, city) {
  var modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'weatherModal';

  var modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  modalContent.id = 'weatherContent';

  var closeButton = document.createElement('span');
  closeButton.className = 'close';
  closeButton.innerHTML = '&times;';
  closeButton.onclick = closeModal;

  if (data.weather) {
      modalContent.innerHTML = `<h2>Weather in ${city}</h2>
                                <p>Temperature: ${data.main.temp} °C</p>
                                <p>Weather: ${data.weather[0].description}</p>
                                <p>Wind speed: ${data.wind.speed}`;
  } else {
      modalContent.innerHTML = `<h2>Weather in ${city}</h2>
                                <p>Weather information not available</p>`;
  }
  modalContent.insertBefore(closeButton, modalContent.firstChild);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  modal.style.display = "flex";
}

function closeModal() {
  var modal = document.getElementById('weatherModal');
  if (modal) {
      modal.style.display = "none";
      modal.remove();
  }
}

window.onclick = function(event) {
  var modal = document.getElementById('weatherModal');
  if (event.target == modal) {
      modal.style.display = "none";
      modal.remove();
  }
}

