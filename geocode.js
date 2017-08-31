var request = require("request");

var getLatitudeAndLongitude = (address, callback)=>{
//  https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}

  var encodedAddress = encodeURIComponent(address);
  request({
    url : `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json : true
  },(error,response,body) => {
    if(error){
      callback("something went wrong");
    }else if(response.statusCode === 404){
      callback("bad url !");
    }else{
      callback(null,{
        formattedAddress : body.results[0].formatted_address,
        lat : body.results[0].geometry.bounds.northeast.lat,
        lng : body.results[0].geometry.bounds.northeast.lng
      });
    }
    return;
  })
};


module.exports = {
  getLatitudeAndLongitude
};
