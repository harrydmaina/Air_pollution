function getCountryName(){



$.ajax({
            type: "GET",
            url: 'https://api.openaq.org/v1/countries' ,
            success: function(data)
            {
                buildDropdownForCounty(
                    data,
                    $('#countryName'),
                    'Select Country Name'
                );
            }
        });
		

    function buildDropdownForCounty(result, dropdown, emptyMessage)
    {
        // Remove current options
        dropdown.html('');
        // Add the empty option with the empty message
        dropdown.append('<option value="">' + emptyMessage + '</option>');
        // Check result isnt empty
        if(result != '')
        {
            // Loop through each of the results and append the option to the dropdown
            $.each(result.results, function(k, v) {
                dropdown.append('<option value="' + v.code + '">' + v.name + '</option>');
            });
        }
    }
	
		
	
} 

$("#countryName").on('change', function(){


var countryName =$(this).val(); 

$.ajax({
            type: "GET",
            url: 'https://api.openaq.org/v1/cities' ,
			data: {
				country:countryName
				
			},
            success: function(data)
            {
                
                buildDropdownForCity(
                    data,
                    $('#cityName'),
                    'Select City Name'
                ); 
            }
        });
		

   function buildDropdownForCity(result, dropdown, emptyMessage)
    {
        // Remove current options
        dropdown.html('');
        // Add the empty option with the empty message
        dropdown.append('<option value="">' + emptyMessage + '</option>');
        // Check result isnt empty
        if(result != '')
        {
            // Loop through each of the results and append the option to the dropdown
            $.each(result.results, function(k, v) {
				document.getElementById("cityName").style.display ="block";
                dropdown.append('<option value="' + v.city + '">' + v.city + '</option>');
            });
        }
    }
	

	


});

$("#cityName").on('change', function(){


var location =$(this).val(); 

 $.ajax({
            type: "GET",
            url: 'https://maps.googleapis.com/maps/api/geocode/json' ,
			data:{
				address:location,
				key:'AIzaSyDA2EdV-zVFmFEacDrpsgpJn59M9f5JE5U'
				
			},	
			
            success: function(data)
            {
                getPolutionParameter(location,data);
            }
        }); 
		
		
		
/* 		
		    $.ajax({
            type: "GET",
            url: 'https://api.openaq.org/v1/measurements' ,
			limit:1,
			data:{
				city:location,
				
				
			},	
			
            success: function(data)
            { 
			//var currentCordinate = parseFloat(data.results[0].coordinates);
			var locationLat = parseFloat(data.results[0].coordinates.latitude);
			var locationLng = parseFloat(data.results[0].coordinates.longitude);
		     map.setCenter( {lat: locationLat,lng:locationLng });
             addMarker({lat: locationLat,lng:locationLng },50);	  	
             			 
				
            }		
 */
});


	 

function getPolutionParameter(location,data){
	
	if(data!=null){		
	    var currentCordinate = data.results[0].geometry.location;
		var locationLat = data.results[0].geometry.location.lat;
		var locationLng = data.results[0].geometry.location.lng;
		var locationCordinates = "lat "+locationLat+','+"lng "+locationLng ;
		
          $.ajax({
            type: "GET",
            url: 'https://api.openaq.org/v1/measurements' ,
			limit:1,
			data:{	
				city:location,	
				parameter:"so2"				
			
			},	
			
            success: function(data)
            {
				
			if(data.results != undefined && data.results !=""){	
			document.getElementById("pollution_data").innerHTML = "";
			 document.getElementById("city").innerHTML = location;	
			 document.getElementById("cordinates").innerHTML = locationCordinates;
			 document.getElementById("value").innerHTML = data.results[0].value;
		     map.setCenter(currentCordinate);
             addMarker(currentCordinate,data.results[0].value,location,);	
			}
            else{
				document.getElementById("pollution_data").innerHTML = "Oops!! No data Found for :"+location +",Please select another city";
				
			}			
            }
        });
		
	} 
	
	
	
}









