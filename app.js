var express   =   require ("express"),
    request   =   require ("request"),
    geocode   =   require ("./geocode"),
    yargs     =   require ("yargs"),
    weather   =   require ("./weather");


var app = express();

var port = process.env.PORT || 5000;

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
        console.log(returnedAddress.formattedAddress + " :  " + JSON.stringify(returnedWeather));
      }
    })
  }
});


app.get("*",function(req,res){
  res.send("<h1>Hello world!</h1>");
});
//console.log(argv.address);
//https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d/${lat},${lng}
//https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}
app.listen(port,() => console.log("server is listening on port 5000"));
