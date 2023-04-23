
import './App.css';
import {useState, useEffect} from 'react'
import Bydgoszcz from './Bydgoszcz.js'
import axios from 'axios'





function App() {

  
  function distance(a,b,c,d){
  var szerokoscSat = parseFloat(a);
  var dlugoscSat = parseFloat(b);
  
  
   var szerokoscDiff = szerokoscSat - c;
   var dlugoscDiff = dlugoscSat - d;

   if(szerokoscDiff < -180){
    console.log(szerokoscDiff)
    var diffA = szerokoscDiff + 180
    szerokoscDiff = -180 - diffA
    console.log(szerokoscDiff)
   }
   if(szerokoscDiff > 180){
    console.log(szerokoscDiff)
    var diffA = szerokoscDiff - 180
    szerokoscDiff = 180 - diffA
    console.log(szerokoscDiff)
   } 

   if(dlugoscDiff < -180){
    console.log(dlugoscDiff)
    var diffB = dlugoscDiff + 180
    dlugoscDiff = -180 - diffB
    console.log(dlugoscDiff)
   }
   if(dlugoscDiff > 180){
    console.log(dlugoscDiff)
    var diffB = dlugoscDiff - 180
    dlugoscDiff = 180 - diffB
    console.log(dlugoscDiff)
   }
  
  var szerokoscOdl = szerokoscDiff * 111.139;
  var dlugoscOdl = dlugoscDiff * 111.139;
  var calkowitaOdl = Math.sqrt((szerokoscOdl * szerokoscOdl) + (dlugoscOdl * dlugoscOdl));
  calkowitaOdl = Math.sqrt((calkowitaOdl * calkowitaOdl) + (420 * 420));
  calkowitaOdl = Number(calkowitaOdl).toFixed(3);
  
  return calkowitaOdl;
  }

  
  const [lat, setLongtitude] = useState(0);
  const [lng, setLatitude] = useState(0);

  useEffect(() => {
    getLocation()
  },[])
  
  const getLocation = async () => {
    const res = await axios.get('http://api.open-notify.org/iss-now.json')
    console.log(res)
    const longtitude = res.data.iss_position.longitude
    const latitude = res.data.iss_position.latitude
    console.log(longtitude)
    console.log(latitude)
    setLongtitude(parseFloat(longtitude))
    setLatitude(parseFloat(latitude))
  }
  const BydLat = 53.125160431263495
  const BydLng = 17.987401507265236
  const FalkLng = -51.69120967994898
  const FalkLat = -57.8652025883816
  const NaiLng = -1.3093417067159003
  const NaiLat = 36.81251668828498
  const UlbLng = 47.808058979046336
  const UlbLat = 107.52976160520396
  return (
    <div className="App">
      <Bydgoszcz Odl ={distance(lat,lng,BydLat,BydLng)} name="Bydgoszczy"  />
      <Bydgoszcz Odl ={distance(lat,lng,FalkLat,FalkLng)} name="Falklandów" />
      <Bydgoszcz Odl={distance(lat,lng,NaiLat,NaiLng)} name="Nairobi" />
      <Bydgoszcz Odl={distance(lat,lng,UlbLat,UlbLng)} name="Ułan Bator" />
      
      
      
    </div>
  );
}

export default App;
