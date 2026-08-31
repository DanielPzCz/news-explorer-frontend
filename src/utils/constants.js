export const SEARCH_ERROR_MESSAGE =
  "Lo sentimos, algo ha salido mal durante la solicitud. Es posible que haya un problema de conexión o que el servidor no funcione. Por favor, inténtalo más tarde.";

export const EMPTY_KEYWORD_MESSAGE = "Por favor, introduce una palabra clave";

export const CARDS_PER_PAGE = 3;

// Datos de muestra para el maquetado. Se sustituirán por los datos
// reales de la API en las siguientes etapas del proyecto.
import cardCorgi from "../images/card-corgi.jpg";
import cardLake from "../images/card-lake.jpg";
import cardMoose from "../images/card-moose.jpg";
import cardNight from "../images/card-night.jpg";
import cardGeyser from "../images/card-geyser.jpg";

export const MOCK_ARTICLES = [
  {
    _id: "mock-1",
    keyword: "Naturaleza",
    title: 'Todo el mundo necesita un "lugar de reflexión" especial en la naturaleza',
    text: 'Desde que leí el influyente libro de Richard Louv, "El último niño en el bosque", la idea de tener un "lugar de reflexión" especial para mí se me ha quedado grabada. Este consejo, que Louv atribuye al educador de la naturaleza Jon Young, es para que tanto los adultos como los niños encuentren...',
    date: "2020-11-04T00:00:00.000Z",
    source: "treehugger",
    link: "https://www.treehugger.com/everyone-needs-a-sit-spot-in-nature-4858112",
    image: cardCorgi,
  },
  {
    _id: "mock-2",
    keyword: "Naturaleza",
    title: "La naturaleza te hace mejor",
    text: "Todos sabemos lo bien que nos puede hacer sentir la naturaleza. Milenios atrás ya nos percatamos de ello: el sonido del océano, los aromas de un bosque, la forma en que la luz del sol moteada baila entre las hojas.",
    date: "2019-02-19T00:00:00.000Z",
    source: "national geographic",
    link: "https://www.nationalgeographic.com/travel/article/nature-makes-you-better",
    image: cardLake,
  },
  {
    _id: "mock-3",
    keyword: "Yellowstone",
    title: "El Grand Teton renueva el histórico Camino de la Cresta",
    text: '"La unión de los senderos de la Cascada y del Cañón de la Muerte en sus picos tuvo lugar el 1 de octubre de 1933, y marcó el primer paso en la realización de un plan por el que el excursionista...',
    date: "2020-10-19T00:00:00.000Z",
    source: "national geographic",
    link: "https://www.nationalgeographic.com/travel/article/grand-teton-crest-trail",
    image: cardMoose,
  },
  {
    _id: "mock-4",
    keyword: "Yellowstone",
    title: "Fotos nostálgicas hechas por turistas en los parques nacionales de Estados Unidos",
    text: "Los parques nacionales de Estados Unidos reciben cada año a millones de visitantes que llegan con la cámara lista para capturar paisajes que parecen de otro planeta.",
    date: "2020-10-19T00:00:00.000Z",
    source: "national geographic",
    link: "https://www.nationalgeographic.com/travel/article/nostalgic-national-park-photos",
    image: cardGeyser,
  },
  {
    _id: "mock-5",
    keyword: "Fotografía",
    title: "Cómo fotografiar el cielo nocturno",
    text: "Las fotografías de larga exposición del cielo nocturno revelan estrellas que giran alrededor del polo celeste, un espectáculo invisible para el ojo humano.",
    date: "2020-08-12T00:00:00.000Z",
    source: "treehugger",
    link: "https://www.treehugger.com/how-to-photograph-the-night-sky-5069155",
    image: cardNight,
  },
];
