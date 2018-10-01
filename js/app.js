var lati, longi, urlString, tempCelsius, tempFahrenheit, tempUnit = 'C', weatherBox;
var api = "https://fcc-weather-api.glitch.me/api/current?";

$(document).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      lati = "lat=" + position.coords.latitude;
      longi = "lon=" + position.coords.longitude;
      urlString = api+lati+"&"+longi;

      $.get(urlString, function(value){
        $('#loc').text(value.name+", ");
        $('#country').text(value.sys.country);
        $('#weather').text(value.weather[0].description);
        weatherBox = value.weather[0].description;
        tempCelsius = JSON.parse(value.main.temp);
        tempFahrenheit = (tempCelsius * 1.8) + 32;
        $('#temp').text(parseInt(tempCelsius)+" "+String.fromCharCode(176));
        $('#tempUnit').text(tempUnit);

        $('#tempUnit').click(function(){
          if(tempUnit == 'C'){
            tempUnit = 'F';
            $('#temp').text(parseInt(tempFahrenheit)+" "+String.fromCharCode(176));
            $('#tempUnit').text(tempUnit);
          }
          else{
            tempUnit = 'C';
            $('#temp').text(parseInt(tempCelsius)+" "+String.fromCharCode(176));
            $('#tempUnit').text(tempUnit);
          }
        });


        imgBackground(weatherBox);
      });
    });
  }
  else {
    console.log("Geolocation is not supported by this browser.");
  }
});

function imgBackground(weather) {
  switch(weather){
    case 'haze':
      $('.imgBox').css("background-image", "url('http://footage.framepool.com/shotimg/qf/911258364-mumbai-sunrise-skyline-city-silhouette-haze.jpg')");
      break;
    case 'broken clouds':
      $('.imgBox').css("background-url", "url('https://img00.deviantart.net/6364/i/2017/030/4/1/broken_clouds_by_kevintheman-dax9bd4.jpg')");
      break;
    case 'sunny':
      $('.imgBox').css("background-url", "url('http://www.misucell.com/data/out/12/IMG_541954.jpg')");
      break;
    case 'rainy':
      $('.imgBox').css("background-url", "url('https://boonstoon.files.wordpress.com/2013/08/rain-8-3-2013-2-59-05-pm.jpg')");
      break;
    case 'snowy':
      $('.imgBox').css("background-url", "url('https://inhabitat.com/wp-content/blogs.dir/1/files/2014/01/Bizzard.jpg')");
      break;
    default:
      console.log("No weather");
  }
}
