import React from 'react';
import { Link } from 'react-router-dom'

import { FiArrowRight } from 'react-icons/fi'

import '../styles/global.css'
import '../styles/pages/landing-page.css'
import logoImage from '../images/logo.svg'

function Landing() {
    return (
<div id="page-landing">
     <div className="content-wrapper">
      <img src={logoImage} alt="Happy"/>

      <main>
        <h1>Leve  felicidade para o mundo</h1>
        <p>Visite orfanatos e mude o dia de muitas criancas</p>
      </main>

      <div className="location">
        <strong>Angoche</strong>
        <span>Nampula</span>
      </div>
      <Link to="/app" className="enter-app">
        <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)"/>
      </Link>
     </div>
    </div>
    );
}

export default Landing;