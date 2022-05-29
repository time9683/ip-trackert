import { useEffect, useRef, useState } from 'react'
import useSWR from "swr"
import { MapContainer, TileLayer, useMap,Marker } from 'react-leaflet'
import l from 'leaflet'
import  Arrow from './components/arrow'

import './App.css'
const fetcher = (...args) => fetch(...args).then(res => res.json())

const useTracker= (ip) =>{

// let data = {}
  const { data, error } = useSWR(`https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_key}&ipAddress=${ip}&domain=${ip}`, fetcher)

  return {
     data,
   error
  }
}












function App() {
const [ip, setIp] = useState('')
const { data, error } = useTracker(ip)
const inputText = useRef()

console.log(error)


useEffect(()=>{





},[])

// if(!data){
// return <div>Loading...</div>

// }




return (<>

<div className='body'>

<header>

<h1 className='title'>IP Address Tracker</h1>


<form className='form_input' onSubmit={(e)=>{e.preventDefault(); setIp(inputText.current.value)  }}>


<input placeholder='Search for any IP or domain'  ref={inputText} type="text" name="" id="" />

<label>


<button className='btn_arrow'><Arrow></Arrow></button>
</label>

</form>





<div className='container_info'>

<ul>
 <li><span>IP ADDRESS</span>{data?.ip}</li>
 <li><span>LOCATION</span>{data?.location?.city}, {data?.location?.country}</li>
 <li><span>TIMEZONE</span>UTC {data?.location?.timezone}</li>
 <li><span>ISP</span>{data?.isp}</li>




</ul>








</div>
</header>






<main>


{data &&  error === undefined && data?.location?.lat !== undefined &&  data?.location?.lng !== undefined ?  



<MapContainer className='map'  center={[data?.location?.lat, data?.location?.lng]} zoom={13} scrollWheelZoom={false}>
<TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
<Marker icon={l.icon({iconUrl:'/src/icon-location.svg',iconSize:[25,41],	popupAnchor: [1, -34],
	shadowSize: [41, 41],})}  position={[data?.location?.lat,data?.location?.lng]}>

</Marker>


</MapContainer>





:   ''  }










</main>

















</div>


















</>)





}

export default App
