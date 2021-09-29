//script to get API using city(districts)

var kecamatan = [ 
	"Bantarkalong",
    "Bojongasih",
    "Bojonggambir",
    "Ciawi",
    "Cibalong",
    "Cigalontang",
    "Cikalong",
    "Cikatomas",
    "Cineam",
    "Cipatujah",
    "Cisayong",
    "Gunungtanjung",
    "Jamanis",
    "Jatiwaras",
    "Kadipaten",
    "Karangjaya",
    "Karangnunggal",
    "Mangunreja",
    "Manonjaya",
    "Padakembang",
    "Pagerageung",
    "Parungponteng",
    "Puspahiang",
    "Rajapolah",
    "Salawu",
    "Salopa",
    "Sariwangi",
    "Singaparna",
    "Sodonghilir",
    "Sukahening",
    "Sukaraja",
    "Sukarame",
    "Sukaratu",
    "Sukaresik",
    "Tanjungjaya",
    "Taraju",
];

(function($) {

	"use strict";

	$('[data-toggle="tooltip"]').tooltip()

})(jQuery);

let kec = "";
let namaKec = "";

for (let i = 0; i < kecamatan.length; i++){

  kec = kecamatan[i];

  let locationKec = document.querySelector('.weather-kec'+i);
//   let locationDesc = document.querySelector('.weather-desc'+i);
  let locationIcon1 = document.querySelector('.weather-icon1'+i);
  let locationIcon2 = document.querySelector('.weather-icon2'+i);
  let locationIcon3 = document.querySelector('.weather-icon3'+i);
  let locationIcon4 = document.querySelector('.weather-icon4'+i);
  let locationtemp = document.querySelector('.weather-temp'+i);
  let locationhumidity = document.querySelector('.weather-humidity'+i);
 


    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+kec+'&lang=id&cnt=8&appid=62476395c9453d27b9ebe9ed92722ee0')
    .then(response => response.json())
    .then(data => {
      
      var nameValue = data['city']['name'];
    //   var descValue = data['list'][0]['weather'][0]['description'];
	  var iconValue1 = data['list'][2]['weather'][0]['icon'] ;
	  var iconValue2 = data['list'][3]['weather'][0]['icon'] ; 
	  var iconValue3 = data['list'][5]['weather'][0]['icon'] ; 
	  var iconValue4 = data['list'][6]['weather'][0]['icon'] ;
	  var icontempmin = data['list'][0]['main']['temp_min'] ;
	  var icontempmax= data['list'][7]['main']['temp_max'] ;
	  var iconhumidity = data['list'][3]['main']['humidity'] ;

	   
  
    
	const namaKec = nameValue ;
	// const desc = descValue ;
	const icon1 = iconValue1 ;
	const icon2 = iconValue2 ;
	const icon3 = iconValue3 ;
	const icon4 = iconValue4 ;
	const tempmin = Math.round(icontempmin-273.15) ;
	const tempmax = Math.round(icontempmax-273.15) ;
	const humidity = iconhumidity ;
	
    
	// const ico1 = icon1.substring(0,7);


   
	locationKec.innerHTML = `<p> ${namaKec}</p>`
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

getPagination('#table-id');

function getPagination(table) {
	var lastPage = 1;
  
	$('#maxRows')
	  .on('change', function(evt) {
		//$('.paginationprev').html('');						// reset pagination
  
	   lastPage = 1;
		$('.pagination')
		  .find('li')
		  .slice(1, -1)
		  .remove();
		var trnum = 0; // reset tr counter
		var maxRows = parseInt($(this).val()); // get Max Rows from select option
  
		if (maxRows == 5000) {
		  $('.pagination').hide();
		} else {
		  $('.pagination').show();
		}
  
		var totalRows = $(table + ' tbody tr').length; // numbers of rows
		$(table + ' tr:gt(0)').each(function() {
		  // each TR in  table and not the header
		  trnum++; // Start Counter
		  if (trnum > maxRows) {
			// if tr number gt maxRows
  
			$(this).hide(); // fade it out
		  }
		  if (trnum <= maxRows) {
			$(this).show();
		  } // else fade in Important in case if it ..
		}); //  was fade out to fade it in
		if (totalRows > maxRows) {
		  // if tr total rows gt max rows option
		  var pagenum = Math.ceil(totalRows / maxRows); // ceil total(rows/maxrows) to get ..
		  //	numbers of pages
		  for (var i = 1; i <= pagenum; ) {
			// for each page append pagination li
			$('.pagination #prev')
			  .before(
				'<li data-page="' +
				  i +
				  '">\
									<span>' +
				  i++ +
				  '<span class="sr-only">(current)</span></span>\
								  </li>'
			  )
			  .show();
		  } // end for i
		} // end if row count > max rows
		$('.pagination [data-page="1"]').addClass('active'); // add active class to the first li
		$('.pagination li').on('click', function(evt) {
		  // on click each page
		  evt.stopImmediatePropagation();
		  evt.preventDefault();
		  var pageNum = $(this).attr('data-page'); // get it's number
  
		  var maxRows = parseInt($('#maxRows').val()); // get Max Rows from select option
  
		  if (pageNum == 'prev') {
			if (lastPage == 1) {
			  return;
			}
			pageNum = --lastPage;
		  }
		  if (pageNum == 'next') {
			if (lastPage == $('.pagination li').length - 2) {
			  return;
			}
			pageNum = ++lastPage;
		  }
  
		  lastPage = pageNum;
		  var trIndex = 0; // reset tr counter
		  $('.pagination li').removeClass('active'); // remove active class from all li
		  $('.pagination [data-page="' + lastPage + '"]').addClass('active'); // add active class to the clicked
		  // $(this).addClass('active');					// add active class to the clicked
			limitPagging();
		  $(table + ' tr:gt(0)').each(function() {
			// each tr in table not the header
			trIndex++; // tr index counter
			// if tr index gt maxRows*pageNum or lt maxRows*pageNum-maxRows fade if out
			if (
			  trIndex > maxRows * pageNum ||
			  trIndex <= maxRows * pageNum - maxRows
			) {
			  $(this).hide();
			} else {
			  $(this).show();
			} //else fade in
		  }); // end of for each tr in table
		}); // end of on click pagination list
		limitPagging();
	  })
	  .val(5)
	  .change();
  
	// end of on select change
  
	// END OF PAGINATION
  }
  
  function limitPagging(){
	  // alert($('.pagination li').length)
  
	  if($('.pagination li').length > 7 ){
			  if( $('.pagination li.active').attr('data-page') <= 3 ){
			  $('.pagination li:gt(5)').hide();
			  $('.pagination li:lt(5)').show();
			  $('.pagination [data-page="next"]').show();
		  }if ($('.pagination li.active').attr('data-page') > 3){
			  $('.pagination li:gt(0)').hide();
			  $('.pagination [data-page="next"]').show();
			  for( let i = ( parseInt($('.pagination li.active').attr('data-page'))  -2 )  ; i <= ( parseInt($('.pagination li.active').attr('data-page'))  + 2 ) ; i++ ){
				  $('.pagination [data-page="'+i+'"]').show();
  
			  }
  
		  }
	  }
  }
  
  $(function() {
	// Just to append id number for each row
	$('table tr:eq(0)').prepend('<th> ID </th>');
  
	var id = 0;
  
	$('table tr:gt(0)').each(function() {
	  id++;
	  $(this).prepend('<td>' + id + '</td>');
	});
  });

	