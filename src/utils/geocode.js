const request = require('request')

const geocode = (address, callback) => {
   const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWZyaWRhYnVhYmR1bGxhaCIsImEiOiJja3F0MGxwc2YxZ2M5MzFxYTNkN2I0cGdqIn0.TAOTl3QJg1Fl_7SvOtHZeQ&limit=1`;
   console.log(geoUrl)
   request({url:geoUrl, json:true}, (error, response)=> {
      if (error){
        callback('Unable to connect to the Internet', undefined)
      }else if (response.body.features.length === 0){
        callback('Cant find the location', undefined)
      }else {
        callback(undefined, {
          latitute: response.body.features[0].center[0],
          longitude: response.body.features[0].center[1],
          placeName: response.body.features[0].place_name
        })
      }
   })
}

const foreCast = (location, callback) => {
    const {latitute, longitude} = location
    const url = `http://api.weatherstack.com/current?access_key=357bb94d77b774308284f5ae9d4176a0&query=${longitude},${latitute}`;
    console.log(url)
    request({url, json:true}, (error, response)=> {
       if (error){
          callback('Unable to Connect to the internet', undefined)
       }else if(response.body.error){
         callback('Unknown Location', undefined)
       }else {
         const data = response.body.current;
         callback(undefined, {
           description: data.weather_descriptions[0],
           temperature: data.temperature,
           feelslike: data.feelslike,
         });
       }
    })
}

module.exports = {
  geocode, 
  foreCast
}