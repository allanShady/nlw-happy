import React from 'react';
import './styles/global.css'
import './styles/pages/landing-page.css'
import logoImage from './images/logo.svg'

interface TitleProps {
  text: string
}

function Title(props: TitleProps) {
  return (
  <h1>{props.text}</h1>
  )
}

function App() {
  return (
    <div id="page-landing">
     <div className="content-wrapper">
      <img src={logoImage} alt="Happy"/>
      <main>
     