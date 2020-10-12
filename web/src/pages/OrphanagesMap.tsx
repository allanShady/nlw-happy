import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Map } from 'react-leaflet'
import { TileLayer } from 'react-leaflet'

import '../styles/global.css'
import '../styles/pages/orphanages-map.css'
import 'leaflet/dist/leaflet.css'

import mapMarkerImg from '../images/map-marker.svg';
 
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
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
            </Map>

            <Link to="" className="create-orphanage">
                <FiPlus size="32" color="#FFF" /> 
            </Link>
        </div>
    );
}

export default OrphanageMap;