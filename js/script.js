'use strict';

const despleCard = document.querySelector('.container__event');
const wrapper = document.querySelector('.wrapper');
const selectBtn = document.querySelector('.select-btn');
const searchInp = document.querySelector('.input');
const options = document.querySelector('.options');
const formSearch = document.querySelector('.form__search');

let countries = [
  'US (Estados Unidos)',
  'BE (Bélgica)',
  'CA (Canadá)',
  'CL (Chile)',
  'CN (China)',
  'CO (Colombia)',
  'CR (Costa Rica)',
  'HR (Croacia)',
  'CY (Chipre)',
  'CZ (República Checa)',
  'DK (Dinamarca)',
  'DO (República Dominicana)',
  'CE (Ecuador)',
  'EE (Estonia)',
  'FO (Islas Feroe)',
  'FI (Finlandia)',
  'FR (Francia)',
  'GE (Georgia)',
  'DE (Alemania)',
  'GH (Ghana)',
  'GI (Gibraltar)',
  'GB (Gran Bretaña)',
  'GR (Grecia)',
  'HK (Hong Kong)',
  'HU (Hungría)',
  'IS (Islandia)',
  'IN (India)',
  'IE (Irlanda)',
  'IL (Israel)',
  'IT (Italia)',
  'JM (Jamaica)',
  'JP (Japón)',
  'KR (Corea)',
  'LV (Letonia)',
  'LB (Líbano)',
  'LT (Lituania)',
  'LU (Luxemburgo)',
  'MY (Malasia)',
  'MT (Malta)',
  'MX (México)',
  'MC (Mónaco)',
  'ME (Montenegro)',
  'MA (Marruecos)',
  'NL (Países Bajos)',
  'AN (Antillas Neerlandesas)',
  'NZ (Nueva Zelanda)',
  'ND (Irlanda del Norte)',
  'NO (Noruega)',
  'PE (Perú)',
  'PL (Polonia)',
  'PT (Portugal)',
  'RO (Rumanía)',
  'RU (Federación de Rusia)',
  'LC (Santa Lucía)',
  'SA (Arabia Saudita)',
  'RS (Serbia)',
  'SG (Singapur)',
  'SK (Eslovaquia)',
  'SI (Eslovenia)',
  'ZA (Sudáfrica)',
  'ES (España)',
  'SE (Suecia)',
  'CH (Suiza)',
  'TW (Taiwán)',
  'TH (Tailandia)',
  'TT (Trinidad y Tobago)',
  'TR (Turquía)',
  'UA (Ucrania)',
  'AE (Emiratos Árabes Unidos)',
  'UY (Uruguay)',
  'VE (Venezuela)',
];

function addStart(startCountry) {
  const sacar = countries.find(element => element === startCountry);
  console.log(sacar);

  if (startCountry === sacar) {
    let countri = sacar.slice(0, 2);
    formSearch.setAttribute('value', `${countri}`);
    formSearch.removeAttribute('disabled');
    readingAPI(`${countri}`);
  }
}

function addCountry(selectedCountry) {
  options.innerHTML = '';
  countries.forEach(country => {
    let isSelected = country == selectedCountry ? 'selected' : '';
    let li = `<li onclick="updateName(this)" class="${isSelected}">${country}</li>`;
    options.insertAdjacentHTML('beforeend', li);
  });
}

addCountry();

function updateName(selectedLi) {
  searchInp.value = '';
  addCountry(selectedLi.innerText);
  addStart(selectedLi.innerText);
  wrapper.classList.remove('active');
  selectBtn.firstElementChild.innerText = selectedLi.innerText;
}

searchInp.addEventListener('keyup', () => {
  let arr = [];
  let searchedVal = searchInp.value.toLowerCase();
  arr = countries
    .filter(data => {
      return data.toLowerCase().startsWith(searchedVal);
    })
    .map(data => `<li onclick="updateName(this)">${data}</onclick=>`)
    .join('');
  options.innerHTML = arr ? arr : `<p>Oops! Country not found</p>`;
});

selectBtn.addEventListener('click', () => {
  wrapper.classList.toggle('active');
});
//	1m5dSIJyqVAllTWWLaZClHNg62SiKuZx

/* const state = {
    recipe: {},
  }; */

const readingAPI = async function (search) {
  try {
    const resipient = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${search}&apikey=1m5dSIJyqVAllTWWLaZClHNg62SiKuZx`
    );
    console.log(resipient);
    if (!resipient.ok) throw new Error('Problem getting location data');
    ////
    const data = await resipient.json();
    console.log(data);

    const recipe = data._embedded.events;
    console.log(recipe);

    recipe.forEach(element => {
      const { images, name, dates, _embedded } = element;
      let image = images[3].url;
      let date = dates.start.localDate;
      let venues = _embedded.venues.at(0).name.slice(0, 23);
      let cortName = name.slice(0, 40);
      //let names = _embedded.attractions.at(0).name;
      //console.log(names);

      const html = `
      <div class="card a1">
            <div class="card__figure">
              <img class="card__picture" src=${image} alt="" />
              <p class="prueba"></p>
            </div>
            <div class="card__text">
              <h2 class="card__title">${cortName}</h2>
              <time class="card__time">${date}</time>
              <div class="card__posicion">
                <svg class="card__icon">
                  <use xlink:href="/img/symbol-defs.svg#icon-PosicionSvg"></use>
                </svg>
                <p class="card__lugar">${venues}</p>
              </div>
            </div>
          </div>
      `;

      despleCard.insertAdjacentHTML('afterbegin', html);
    });
  } catch {
    console.error(`${err} 💥`);
  }
};
