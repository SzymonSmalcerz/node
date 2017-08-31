var express   =   require ("express"),
    request   =   require ("request"),
    geocode   =   require ("./geocode"),
    yargs     =   require ("yargs"),
    weather   =   require ("./weather");


var app = express();

var argv = yargs.option("address",{
  string: true,
  demand : true,
  alias: "a"
}).help().argv;



geocode.getLatitudeAndLongitude(argv.address, function(error, returnedAddress){
  if(error){
    console.log(error);
    return;
  }else{
    weather.getWeather(returnedAddress, (error, returnedWeather)=>{
      if(error){
        console.log(error);
        return;
      }else{
        console.log(returnedAddress.formattedAddress + " : " + JSON.stringify(returnedWeather));
      }
    })
  }
});
//console.log(argv.address);
//https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d/${lat},${lng}
//https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}
app.listen(5000,() => console.log("server is listening on port 5000"));
