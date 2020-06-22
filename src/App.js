import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';

const app = new Clarifai.App({
  apiKey: '0564725d0e3b4c139f61c35a54d57aaa'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL,
      // URL
      this.state.input).then(
    function(response) {
      console.log(response);
    },
    function(err) {
      // there was an error
    }
  );

  }

  render() {

  return (
    <div className="App">
      <Particles className='particles'
              params={particlesOptions}
             
            />
    
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit}
      />
       <FaceRecognition imageUrl={this.state.imageUrl} />
    </div>
  );
}
}
export default App;
