//script to get API using latitude longtitude

var kordinat = [
	"lat=-7.589667&lon=108.00652",
	"lat=-7.318762&lon=108.104328",
	"lat=-7.65787&lon=108.350464",
];


(function($) {

	"use strict";

	$('[data-toggle="tooltip"]').tooltip()

})(jQuery);

let kor = "";

for (let i = 0; i < kordinat.length; i++){

  kor = kordinat[i];

//   let locationDesc = document.querySelector('.weather-desc'+i);
  let locationIcon1 = document.querySelector('.wicon1'+i);
  let locationIcon2 = document.querySelector('.wicon2'+i);
  let locationIcon3 = document.querySelector('.wicon3'+i);
  let locationIcon4 = document.querySelector('.wicon4'+i);
  let locationtemp = document.querySelector('.wtemp'+i);
  let locationhumidity = document.querySelector('.whumidity'+i);
 


	fetch('https://api.openweathermap.org/data/2.5/forecast?'+kor+'&lang=id&cnt=8&appid=62476395c9453d27b9ebe9ed92722ee0')
	.then(response => response.json())
	.then(data => {
      
    //   var descValue = data['list'][0]['weather'][0]['description'];
	  var iconValue1 = data['list'][2]['weather'][0]['icon'] ;
	  var iconValue2 = data['list'][3]['weather'][0]['icon'] ; 
	  var iconValue3 = data['list'][5]['weather'][0]['icon'] ; 
	  var iconValue4 = data['list'][6]['weather'][0]['icon'] ;
	  var icontempmin = data['list'][0]['main']['temp_min'] ;
	  var icontempmax= data['list'][7]['main']['temp_max'] ;
	  var iconhumidity = data['list'][3]['main']['humidity'] ;

	   
  
    
	// const desc = descValue ;
	const icon1 = iconValue1 ;
	const icon2 = iconValue2 ;
	const icon3 = iconValue3 ;
	const icon4 = iconValue4 ;
	const tempmin = Math.round(icontempmin-273.15) ;
	const tempmax = Math.round(icontempmax-273.15) ;
	const humidity = iconhumidity ;
	
    
	// const ico1 = icon1.substring(0,7);


	// locationDesc.innerHTML = `<p> ${desc}</p>`
	locationIcon1.innerHTML = `<img src="icons/${icon1.substring(0,2)}d.png">`
	locationIcon2.innerHTML = `<img src="icons/${icon2.substring(0,2)}d.png">`
	locationIcon3.innerHTML = `<img src="icons/${icon3.substring(0,2)}d.png">`
	locationIcon4.innerHTML = `<img src="icons/${icon4.substring(0,2)}n.png">`
	locationtemp.innerHTML = `<p> ${tempmin}°C - ${tempmax}°C </p>`
	locationhumidity.innerHTML = `<p> ${humidity}% </p>`
	

	// console.log(nameValue);
    // console.log(iconValue); 
    
      })    
}

