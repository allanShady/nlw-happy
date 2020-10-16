import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus } from "react-icons/fi";

import '../styles/pages/create-orphanage.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import { LeafletMouseEvent } from "leaflet";
import api from "../services/api";
import { useHistory } from "react-router-dom";

export default function CreateOrphanage() {
  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 }); 
  
  //form data
  const [name, setName] =  useState('');
  const [about, setAbout] =  useState('');
  const [instructions, setInstructions] =  useState('');
  const [opening_hours, setOpeningHours] =  useState('');
  const [open_on_weekends, setOpenOnWeekends] =  useState(true);
  const [images, setImages] = useState<File[]>([]); 
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  
  function handleSelectedImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);
  
    const selectedImagesPreview = selectedImages.map(image => { return URL.createObjectURL(image) })
    setPreviewImages(selectedImagesPreview);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } =  event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(position.latitude));
    data.append('longitude', String(position.longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    
    images.map( image => { return data.append('images', image) })

    await api.post('orphanages', data);

    alert('Orphanage created successfully');
    history.push('/app');
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-25.7372283,32.5938274]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              { position.latitude !== 0 && <Marker interactive={false} icon={mapIcon} 
              position={[position.latitude,position.longitude]} /> 

              }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" 
                value={name} 
                onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} 
              value={about} 
              onChange={event => setAbout(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="image-container">
                {
                  previewImages.map( image => {
                    return (
                      <img key={image} src={image} alt={image}/>
                    )
                  })
                }
                
              <label htmlFor="image[]" className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </label> 
              </div>
              <input multiple onChange={handleSelectedImages} type="file" id="image[]" />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" 
                value={instructions} 
                onChange={event => setInstructions(event.target.value)}
                />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horarios de abertura</label>
              <input id="opening_hours"
                value={opening_hours} 
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className={open_on_weekends ? "active" : ""}
                onClick={() => setOpenOnWeekends(true)}
                >Sim</button>
                <button type="button"
                  className={open_on_weekends ? "" : "active"}
                  onClick={() => setOpenOnWeekends(false)}>Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
