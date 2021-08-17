// import { getCenter } from "geolib";
import React, { useState } from "react";
import ReactMapGL, {Marker , Popup} from "react-map-gl"
import getCenter from 'geolib/es/getCenter';

export default function Map() {

    const [selectedLoc, setSelectedLoc] = useState({})
    
    const result = [{
        long : 75.05,  
        lat : 12.53,
        desc : 'Bantval'
    },{
        long : 75.58, 
        lat : 14.31, 
        desc: 'Davangere'
    },{
        long : 74.55, 
        lat : 14.18, 
        desc: 'Gersoppa (Jog) Falls	'
    },{
        long : 76.42, 
        lat : 12.18, 
        desc: 'Mysuru'
    },{
        long : 77.38, 
        lat : 12.58, 
        desc: 'Bengaluru'
    },{
        long : 75.45, 
        lat : 16.12, 
        desc: 'Belgavi'
    }]

    const res = result.map(val => ({
        longitude: val.long,
        latitude: val.lat
    }))

    const center = getCenter(res)
    console.log(result)

    const [viewport, setViewport] = React.useState({
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 8,
        width: '100%',
        height: '100%'
    });
    
    return (
        <ReactMapGL
            {...viewport}
            mapStyle= 'mapbox://styles/raghunath-r/cksfka9s55k9w17nz8b814z12'
            mapboxApiAccessToken={process.env.mapbox_key}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {result.map((val,ind) => {
            return (
                <div key={ind}>
                    <Marker
                        latitude={val.lat}
                        longitude={val.long}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p aria-label='push-pin' role='img' onClick={() => setSelectedLoc(val)}className='cursor-pointer text-2xl animate-bounce'>📌</p>
                    </Marker>
                    {selectedLoc.long === val.long ? <Popup 
                    closeOnClick={true} 
                    onClose={() => setSelectedLoc({})}
                    latitude = {val.lat}
                    longitude = {val.long}
                    > {val.desc} </Popup> : null}
                </div>
            )})}
        </ReactMapGL>
    )
}
