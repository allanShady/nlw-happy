import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import mapMarkerImg from '../images/map-marker.svg';
import '../styles/pages/orphanages-map.css'
import mapIcon from '../utils/mapIcon';


function OrphanageMap() {
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas criancas estao esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Angoche</strong>
                    <span>Nampula</span>
                </footer>
            </aside>

            <Map center={[-25.7406925,32.5766883]}
                zoom={14}
                style={{width: '100%', height: '100%'}}>
                {/*<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>*/}
                <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                <Marker
                    icon={mapIcon} 
                    position={[-25.7406925,32.5766883]} >

                    <Popup closeButton={false}
                        maxWidth={240}
                        minWidth={240}
                        className="map-popup"    
                    >
                        Lar dos deficientes
                        <Link to="/orphanages/1"> 
                            <FiArrowRight  size={20} color="#FFF" /> 
                            </Link>
                        
                    </Popup> 
                </Marker>
                    
            
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size="32" color="#FFF" /> 
            </Link>
        </div>
    );
}

export default OrphanageMap;