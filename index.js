


function getData(){
  

    let city =document.getElementById("query").value;
    console.log(city)

    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=84dd547f60cd26bcbf981398e1a51841
    `

   //src="https://maps.google.com/maps?q=dhanbad&t=&z=13&ie=UTF8&iwloc=&output=embed"

    fetch(url).then(function(res){

       return res.json();
    })
    .then (function(res){
        console.log(res);
        append(res)

        getWeathernext7days(res.coord.lat, res.coord.lon) 
       
    })   .catch(function (err) {
        console.log(err);
      });
}


function append(data){
    let url =`https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`

    let container=document.getElementById("container");
    container.innerHTML= null;

    let loc=document.createElement('span')
    let h2 = document.createElement('h2');
    h2.innerText=`${data.name}`;
    let Licon=document.createElement('i')
    Licon.setAttribute("class","fa-solid fa-location-pin")
    loc.append(Licon,h2)

    // let tem1=document.createElement('span')
    // let temp = document.createElement('p');
    // temp.innerText=`Temp:- ${data.main.temp} F`;
    // let T1icon=document.createElement('i')
    // T1icon.setAttribute("class","fa-solid fa-temperature-high")
    // tem1.append(T1icon,temp)

    let tem2=document.createElement('span')
    let min_temp = document.createElement('p');
    min_temp.innerText=`Min Temp:- ${data.main.temp_min} F`;
    let T2icon=document.createElement('i')
    T2icon.setAttribute( "class","fa-solid fa-temperature-arrow-down")
    tem2.append(T2icon,min_temp)

    
    let tem3=document.createElement('span')
    let max_temp = document.createElement('p');
    max_temp.innerText=`Max Temp:- ${data.main.temp_max} F`;
    let T3icon=document.createElement('i')
    T3icon.setAttribute( "class","fa-solid fa-temperature-arrow-up")
    tem3.append(T3icon,max_temp)



    let clouds=document.createElement('span')
    let cld = document.createElement('p');
    cld.innerText=`Cloudiness :- ${data.clouds.all}%`;
    let cloudicon=document.createElement('i')
    cloudicon.setAttribute( "class","fa-solid fa-cloud")
    clouds.append(cloudicon,cld)


    let winds=document.createElement('span')
    let wind = document.createElement('p');
    wind.innerText=`Winds:- ${data.wind.speed} M/s`;
    let windicon=document.createElement('i')
    windicon.setAttribute( "class","fa-solid fa-wind")
    winds.append( windicon,wind)
   
   
    let sr=document.createElement('span')
    let sunrise =document.createElement('p')
    rise= new Date(data.sys.sunrise*1000);
    sunrise.innerText= `Sunrise Time :- ${rise}`
    let sr1=document.createElement('i')
    sr1.setAttribute( "class","fa-solid fa-sun")
    sr.append(sr1,sunrise)

    let ss=document.createElement('span')
    let sunset =document.createElement('p')
    set= new Date((data.sys.sunset*1000));
    sunset.innerText=`Sunset Time:- ${set}`
    let ss1=document.createElement('img')
    ss1.setAttribute( "src","https://icons.iconarchive.com/icons/icons-land/weather/32/Sunrise-icon.png")
  
    ss.append(ss1,sunset)  

    container.append(loc,tem2,tem3,clouds,winds,sr,ss)
    let iframe = document.getElementById("gmap_canvas")
    iframe.src=url;
}



function getLocation() {
    navigator.geolocation.getCurrentPosition(success);
  
    function success(pos) {
      const crd = pos.coords;
  
      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      getWeatherOnLocation(crd.latitude, crd.longitude);
      getWeathernext7days(crd.latitude, crd.longitude) 
    }
  }

  window.onload = (event) => {
    getLocation();
   
  };
  
 


  function getWeatherOnLocation(lat, lon) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b19ca70331cf89f873abcc1f4b8dcb5c`;
  
    fetch(url)
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        // console.log(res);
        append(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  }



  




  
  function getWeathernext7days(lat, lon,hourly) {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${hourly}&appid=84dd547f60cd26bcbf981398e1a51841`;
  
    fetch(url)
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        display7days(res.daily);
        // append(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function display7days(data){
    console.log(data)
   

    let container=document.getElementById('sevenDays')
    container.innerHTML=""

   data.forEach(function(ele,i){
    

   
    let card=document.createElement('div')


    let day =document.createElement('h2')
    set = new Date((data[i].dt*1000))
    var dayName = days[set.getDay()]
    day.innerText=`${dayName }`
    card.append(day)

    let icon= document.createElement('img')  
    let icondata=data[i].weather[0].icon
    let iconurl=`http://openweathermap.org/img/wn/${icondata}.png`
    // console.log(iconurl)
    icon.setAttribute("src",`${iconurl}`)
    card.append(icon)
    
    let max_temp= document.createElement('h3')
    max_temp.innerText=`${data[i].temp.max}`
    card.append(max_temp)


    let min_temp= document.createElement('p')
    min_temp.innerText=`${data[i].temp.min}`
    card.append(min_temp)

    document.getElementById('sevenDays').append(card)
   });

  }

