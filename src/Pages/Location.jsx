 import { useState} from "react";

import { Link } from "react-router";

export function ForLocation() {
  const [mylocation, setMyLocation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
   const [wikipediaresponse, setWikipeDiaResponse] = useState('');
   const [weatherresponse, setWeatherResponse] = useState('');
  


  function mylatlng() {
    setErrorMsg('Locating...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const mylat = position.coords.latitude;
        const mylng = position.coords.longitude;

        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${mylat}&longitude=${mylng}&current_weather=true`)
          .then((response) => response.json())
          .then((weatherData) => {
            const current = weatherData.current_weather;
            if (current) {

              const temp = current.temperature;



            let condition = 'pleasant';
             
              if (temp >= 32) condition = "Very Hot ☀️";
              else if (temp >= 26)  { condition = "Warm & Sunny 🌤️";}
              else if (temp >= 20) { condition = "Cool & Comfortable 🍃";}
              else if (temp >= 15) { condition = "Chilly 🧥";}
              else {condition = "Cold ❄️";}


              setWeatherResponse(`It's currently ${condition} with a wind speed of ${current.windspeed} km/h. and Temperature of ${current.temperature}°C,`);
            } else {
              setWeatherResponse('Weather data unavailable');
            }
          })
          .catch(() => {
            setWeatherResponse('Could not fetch weather.');
          });

     fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${mylat}&lon=${mylng}`)
          .then((response) => response.json())
          .then((data) => {
            setMyLocation(data.display_name);
            setErrorMsg('');  

            const addressParts = data.address || {};
          
            const searchTarget = 
        addressParts.neighbourhood || 
        addressParts.suburb || 
        addressParts.city_district || 
        addressParts.town || 
        addressParts.city || 
        addressParts.state || 
         data.display_name.split(',')[0];

            fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles=${encodeURIComponent(searchTarget)}&format=json&origin=*`)
              .then((response) => {
                response.json().then((wikiData) => {
                  const pages = wikiData.query.pages;
                  const pageId = Object.keys(pages)[0];

                  setWikipeDiaResponse(` From wikipedia - ${pages[pageId]?.extract || 'No wikipedia info'}`);
                });
              });
           


          })
          .catch(() => {
            setErrorMsg('Could not fetch address name.');
          });
      },
      (error) => {
        setErrorMsg(`Error: ${error.message}`);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
      
    
  }


  return (
    <>

    <a href="/" className="mt-[50px] text-[20px] font-['Plus_Jakarta_Sans'] ml-[15px] border-b w-[100px]">Go Back</a> 



      <div className="flex items-center justify-center h-[600px]">
        <div className="bg-white h-[400px] flex flex-col justify-center w-[95%] items-center gap-[20px] rounded-[20px]">
          <p className="w-[300px] text-center text-[18px] font-['poppins'] ">
            Your current location is - {mylocation}
          </p>
          
          <button
            className="h-[70px] w-[80%] bg-black text-white rounded-[20px]"
            onClick={mylatlng}
          >
            CHECK LOCATION
          </button>
        </div>
      </div>
 
     <div className="    flex  items-center justify-center mb-[30px] flex-col">
      {wikipediaresponse &&(<div className="mt-[10px] whitespace-pre-wrap w-[97%] bg-white flex flex-col  items-center justify-center rounded-[10px] font-['Plus_Jakarta_Sans'] ">
       
        <p className="text-[20px] mt-[20px] mb-[20px] w-[80%]">{wikipediaresponse}</p>


         <p className="text-[20px] mt-[20px] mb-[20px] w-[80%]" >{weatherresponse}</p>
        
      </div>)}


       
       
        
       
     
     </div>


      
    </>
  );
}
