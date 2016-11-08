

function getWeather(latti,longi) {
    var mainurl = "https://api.darksky.net/forecast/";
    var code = '0fe876b2f29e459c7d7b163d9be370e1';

    $.ajax({
        url: mainurl + code + "/" + latti + ',' + longi + '?' + 'units=si' + '&' + 'lang=is',
        type: "GET",
        dataType: 'jsonp',
        cache: true,
        success: function(data, status, error) {
            console.log('success', data);
            createTime(data);
        },
        error: function(data, status, error) {
            console.log('error', data, status, error);
        }
    });
}


function createTime(data){
  var daily = data.daily;
  var timedays = [];
  console.log(data);

  var months = ['Januar','Februar','Mars','April','May','Juni','July','August','September','October','November','December'];
  var days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday' ];

  var wholeListContainer = document.getElementById('whole-list')

  for (var i = 0; i < 8; i++) {
    var container = document.createElement('ul');
    if(i%2 === 0){
      container.setAttribute('class','list-container mod2-color');
    }
    else {
      container.setAttribute('class','list-container');
    }

    var date =  new Date(daily.data[i].time*1000);
    timedays[i] = days[date.getDay()] + ' ' + date.getDate() +'.'+ months[date.getMonth()];

    var day = document.createElement('li');
    day.innerHTML = timedays[i];
    day.setAttribute('class','day list-item');

    var tempMax = document.createElement('li');
    tempMax.innerHTML = 'maxtemp = ' + daily.data[i].temperatureMax + '°C'
    tempMax.setAttribute('class','degrees list-item');

    var tempMin = document.createElement('li');
    tempMin.innerHTML = 'mintemp = ' + daily.data[i].temperatureMin + '°C';
    tempMin.setAttribute('class','degrees list-item');

    var windspeed = document.createElement('li');
    windspeed.innerHTML = 'windspeed = ' + daily.data[i].windSpeed + 'm/s';
    windspeed.setAttribute('class','degrees list-item');

    var windbearing = document.createElement('li');
    windbear =  daily.data[i].windBearing ;
    winddir = checkWindDirection(windbear);
    windbearing.innerHTML = 'winddirection = ' + winddir;
    windbearing.setAttribute('class','degrees list-item');

    var summary = document.createElement('li');
    summary.innerHTML = daily.data[i].summary;
    summary.setAttribute('class','degrees list-item summary');


    var windAmountIcon = document.createElement('li');
    windAmountIcon.setAttribute('class','windmill');
    var windContainer = document.createElement('div');
    var stick = document.createElement('div');
    var wind = document.createElement('div');
    var wind1 = document.createElement('div');
    var wind2 = document.createElement('div');
    var wind3 = document.createElement('div');
    var wind4 = document.createElement('div');
    windContainer.setAttribute('class', 'list-item degrees wind-container');
    stick.setAttribute('class','stick');
    wind.setAttribute('class','wind');
    wind1.setAttribute('class','wind1');
    wind2.setAttribute('class','wind2');
    wind3.setAttribute('class','wind3');
    wind4.setAttribute('class','wind4');
    windAmountIcon.appendChild(stick);
    wind.appendChild(wind1);
    wind.appendChild(wind2);
    wind.appendChild(wind3);
    wind.appendChild(wind4);
    windAmountIcon.appendChild(wind);
    windContainer.appendChild(windAmountIcon);
    $('wind').removeAttr('style');
    console.log(daily.data[i].windSpeed)
    if(daily.data[i].windSpeed < 2.0  ){
      wind.setAttribute('class','sec2');
    }
    else if(daily.data[i].windSpeed < 3.0){
      wind.setAttribute('class','sec3');
    }
    else if(daily.data[i].windSpeed < 4.0 ){
      wind.setAttribute('class','sec4');
    }
    else if(daily.data[i].windSpeed < 5.0 ){
      wind.setAttribute('class','sec5');
    }
    else if(daily.data[i].windSpeed < 6.0 ){
      wind.setAttribute('class','sec6');
    }
    else if(daily.data[i].windSpeed < 8.0 ){
      wind.setAttribute('class','sec8');
    }
    else if(daily.data[i].windSpeed < 10.0 ){
      wind.setAttribute('class','sec10');
    }
    else if(daily.data[i].windSpeed < 12.0 ){
      wind.setAttribute('class','sec12');
    }
    else if(daily.data[i].windSpeed < 14.0 ){
      wind.setAttribute('class','sec14');
    }
    else if(daily.data[i].windSpeed < 16.0 ){
      wind.setAttribute('class','sec16');
    }
    else if(daily.data[i].windSpeed < 20.0 ){
      wind.setAttribute('class','sec20');
    }
    else if(daily.data[i].windSpeed < 25.0 ){
      wind.setAttribute('class','sec25');
    }
    else if(daily.data[i].windSpeed < 30.0 ){
      wind.setAttribute('class','sec30');
    }

    var iconListElement = document.createElement('li');
    iconListElement.setAttribute('class','list-item icon degrees');

    if (daily.data[i].icon === 'clear-day') {
      var firstDiv = document.createElement('div');
      var secondDiv = document.createElement('div');
      firstDiv.setAttribute('class', 'sun');
      secondDiv.setAttribute('class', 'rays');
      iconListElement.appendChild(firstDiv);
      iconListElement.appendChild(secondDiv);
    }
    if (daily.data[i].icon === 'clear-night') {
      var firstDiv = document.createElement('div');
      var secondDiv = document.createElement('div');
      firstDiv.setAttribute('class', 'moon');
      secondDiv.setAttribute('class', 'rays');
      iconListElement.appendChild(firstDiv);
      iconListElement.appendChild(secondDiv);
    }
    if (daily.data[i].icon === 'cloudy') {
      var firstDiv = document.createElement('div');
      var secondDiv = document.createElement('div');
      firstDiv.setAttribute('class', 'cloud');
      secondDiv.setAttribute('class', 'cloud');
      iconListElement.appendChild(firstDiv);
      iconListElement.appendChild(secondDiv);
    }

    if (daily.data[i].icon === 'fog') {
      var firstDiv = document.createElement('div');
      var secondDiv = document.createElement('div');
      firstDiv.setAttribute('class', 'fog');
      secondDiv.setAttribute('class', 'fog');
      iconListElement.appendChild(firstDiv);
      iconListElement.appendChild(secondDiv);
    }
    if (daily.data[i].icon === 'partly-cloudy-day') {
      var firstDiv = document.createElement('div');
      var secondDiv = document.createElement('div');
      var thirdDiv = document.createElement('div')
      firstDiv.setAttribute('class', 'partly-cloud');
      secondDiv.setAttribute('class', 'sun');
      thirdDiv.setAttribute('class', 'rays');
      secondDiv.appendChild(thirdDiv);
      iconListElement.appendChild(firstDiv);
      iconListElement.appendChild(secondDiv);
    }
    if (daily.data[i].icon === 'partly-cloudy-night') {
      var firstDiv = document.createElement('div');
      var secondDiv = document.createElement('div');
      var thirdDiv = document.createElement('div')
      firstDiv.setAttribute('class', 'cloud');
      secondDiv.setAttribute('class', 'cloud');
      thirdDiv.setAttribute('class', 'moon');
      iconListElement.appendChild(firstDiv);
      iconListElement.appendChild(secondDiv);
      iconListElement.appendChild(thirdDiv);
    }
    if (daily.data[i].icon === 'rain') {
      var firstDiv = document.createElement('div');
      var secondDiv = document.createElement('div');
      var thirdDiv = document.createElement('div')
      firstDiv.setAttribute('class', 'cloud');
      secondDiv.setAttribute('class', 'rain');
      iconListElement.appendChild(firstDiv);
      iconListElement.appendChild(secondDiv);
    }
    if (daily.data[i].icon === 'sleet') {
      var firstDiv = document.createElement('div');
      var secondDiv = document.createElement('div');
      var thirdDiv = document.createElement('div')
      firstDiv.setAttribute('class', 'cloud');
      secondDiv.setAttribute('class', 'snow');
      thirdDiv.setAttribute('class', 'sleet-rain');
      fourthDiv.setAttribute('class', 'flake');
      fifthDiv.setAttribute('class', 'flake');
      iconListElement.appendChild(firstDiv);
      iconListElement.appendChild(secondDiv);
      iconListElement.appendChild(thirdDiv);
      iconListElement.appendChild(fourthDiv);
      iconListElement.appendChild(fifthDiv);
    }
    if (daily.data[i].icon === 'wind') {
      var firstDiv = document.createElement('div');
      var secondDiv = document.createElement('div');
      var thirdDiv = document.createElement('div')
      firstDiv.setAttribute('class', 'sky-wind');
      secondDiv.setAttribute('class', 'sky-wind');
      iconListElement.appendChild(firstDiv);
      iconListElement.appendChild(secondDiv);
    }

    container.appendChild(day);
    container.appendChild(tempMax);
    container.appendChild(tempMin);
    container.appendChild(windspeed);
    container.appendChild(windbearing);
    container.appendChild(summary);
    container.appendChild(iconListElement);
    container.appendChild(windContainer);

    wholeListContainer.appendChild(container);

  }


}


function checkWindDirection(degrees){
  var val = Math.floor((degrees / 22.5) + 0.5);
  var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return arr[(val % 16)];
}