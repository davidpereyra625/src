// Configuración de la animación de fondo
particlesJS("particles-js", {
  particles: {
    number: {
      value: 80, // Cantidad de partículas (neuronas)
      density: {
        enable: true,
        value_area: 800, // Ajusta esto según tus preferencias
      },
    },
    color: {
      value: "#000", // Color de las partículas (neuronas)
    },
    shape: {
      type: "circle", // Puedes personalizar la forma
      stroke: {
        width: 0,
        color: "#000",
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5, // Opacidad de las partículas
      random: true,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 10, // Tamaño de las partículas (neuronas)
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true, // Habilita las conexiones entre partículas
      distance: 150, // Ajusta la distancia máxima para las conexiones
      color: "#000", // Color de las conexiones
      opacity: 0.4,
      width: 2,
    },
    move: {
      enable: true, // Permite que las partículas se muevan
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true, // Detecta eventos al pasar el ratón
        mode: "grab",
      },
      onclick: {
        enable: true, // Detecta eventos al hacer clic
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
});
