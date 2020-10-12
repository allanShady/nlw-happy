import React from 'react';
import Routes from './routes'


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
    <Routes />
    );
}

export default App;
