import React from 'react';
import './App.css';
import Game from "./components/Game";
import Navbar from "./components/Navbar";
import Particles from 'react-particles-js'; 
import About from "./components/PageSections/About"
import Skills from "./components/PageSections/Skills"
import Projects from "./components/PageSections/Projects"
import Contact from "./components/PageSections/Contact"
import Footer from "./components/Footer"

function App() {

let particleConfig = 
{
  "particles": {
    "number": {
      "value": 10,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#d2d2d2"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": .5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 0,
        "opacity_min": 0,
        "sync": false
      }
    },
    "size": {
      "value": 2,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 500,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 2
    },
    "move": {
      "enable": true,
      "speed": 1.5,
      "direction": "bottom-left",
      "random": false,
      "straight": true,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": false,
        "mode": "repulse"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 0.5
        }
      },
      "bubble": {
        "distance": 120,
        "size": 3,
        "duration": 20,
        "opacity": 1,
        "speed": .1
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}

  return (
    <div className="App">
      <Particles params={particleConfig} className="particles"></Particles>
        <Game/>
        <Navbar/>
        <About/>
        <Projects/>
        <Skills/>
        <Contact/>
        <Footer/>
    </div>
  );
}

export default App;
