var request = require("request");


var getWeather = function(address,callback){
  request({
    url : `https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d/${address.lat},${address.lng}`,
    json : true
  }, (error,response,body)=>{
      if(error){
        callback("could connect to the server forecast.io");
      }else if(response.statusCode === 404){
        callback("bad url address");
      }else if(response.statusCode === 200){

        callback(null,{
          apparentTemperature : body.currently.apparentTemperature,
          temperature : body.currently.temperature
        });
      }
    });
};


module.exports = {
  getWeather
};
