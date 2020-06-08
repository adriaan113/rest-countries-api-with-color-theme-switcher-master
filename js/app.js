
//SASS COLORS

const lightModeText = 'rgb(17, 21, 23)';
const lightModeInput = 'rgb(133,133,133)';
const lightModeBg = 'rgb(250, 250, 250)';
const lightModeEl = 'rgb(255, 255, 255)';

const darkModeEl = 'rgb(43, 57, 69)';
const darkModeBg = 'rgb(32, 44, 55)';
const darkModeText = lightModeEl;


//TO DO LIST: , change borders to their full name, ,
// save state so that api doesn't reload every time


// Save data in a global variable so you can use it everywhere
let countriesData;

//DARK MODE


const darkLightSwitch = document.querySelector('.dark-light');

document.querySelector('.wrapper').style.backgroundColor = lightModeBg;
// document.querySelector('header').style.backgroundColor = lightModeEl;


const searchField = document.querySelector('#search');
//searchField.style.backgroundColor = lightModeEl;

const filterByContinent = document.querySelector('#filter');



const card = document.querySelectorAll('.card');



const extraSection = document.querySelector('.extra');
const details = document.querySelector('.details');
const moreDetails = document.querySelector('.more-details');
const border = document.querySelector('.border');
const userInput = document.querySelector('.user-input');




function changeBtnText(){
  if(darkLightSwitch.children[1].innerHTML === 'Dark mode'){
    darkLightSwitch.children[1].innerHTML = 'Light mode';
  }else if(darkLightSwitch.children[1].innerHTML === 'Light mode'){
    darkLightSwitch.children[1].innerHTML = 'Dark mode';
  }
}


function switcheroo(){

  changeBtnText();

  const card = document.querySelectorAll('.card');
  const allP= document.querySelectorAll('p');
  const allH2= document.querySelector('h2');
  const allH4= document.querySelectorAll('h4');


    document.querySelector('body').classList.toggle('dark-bg');
    document.querySelector('.wrapper').classList.toggle('dark-bg');
    document.querySelector('header').classList.toggle('dark-el');
    document.querySelector('header').classList.toggle('dark-shadow');
    document.querySelector('.extra div button').classList.toggle('dark-text');

    searchField.classList.toggle('dark-el');
    searchField.classList.add('dark-mode-search');
    searchField.classList.toggle('dark-shadow');

    filterByContinent.classList.toggle('dark-el');
    filterByContinent.classList.toggle('dark-shadow');
    allH2.children[0].classList.toggle('dark-text');
    darkLightSwitch.children[0].classList.toggle('dark-text');

    document.querySelector('.extra div button').classList.toggle('dark-btn');
    document.querySelector('.fa-arrow-left').classList.toggle('dark-text');
    
    for(let i= 0; i<allP.length; i++){
      allP[i].classList.toggle('dark-text');
    }

    for(let i= 0; i<allH4.length; i++){
      allH4[i].classList.toggle('dark-text');
    }

    for(let i= 0; i<card.length; i++){
      card[i].classList.toggle('dark-el');
      card[i].classList.toggle('dark-shadow');
    }

   const darkDetails = document.querySelectorAll('.dark-details');
   for(let i= 0; i<darkDetails.length; i++){
    darkDetails[i].classList.toggle('dark-text');
   }

   border.children[0].classList.toggle('dark-text');

  if(border.children){
    for(let i=0; i<border.children[1].children.length;i++){
      border.children[1].children[i].classList.toggle('dark-text');
    }  
  }else{
    console.log(false);
  } 
};


//FETCH

const contentSection= document.querySelector('.content');

async function getCountries(){
  try{
    const result = await fetch('https://restcountries.eu/rest/v2/all');

    // Put the data in the global variable
    countriesData = await result.json();
    
    for(let i=0;i<countriesData.length;i++){ 
      // Put the data in a variable for easier access
      const country = countriesData[i];
      const countryName = country.name;
      const population= country.population;
      const region= country.region;
      const capital= country.capital;
      const flag= country.flag;

      contentSection.innerHTML+=
        `
        <div class="card">
                      <img src="${flag}" alt="flag of ${countryName}">
                        <h4>${countryName}</h4>
                        <ul>
                          <li><p>Population: ${population}</p></li>
                          <li><p>Region: ${region}</p></li>
                          <li><p>Capital: ${capital}</p></li>
                      </ul>
                  </div>
        `;
    }
  } catch(error){
    console.log(`sorry, could not load countries because of ${error}`);
  }
}

function searchFilter(){

  for(let i=0; i<countriesData.length; i++){

    if(contentSection.children[i].children[1].textContent.toUpperCase().indexOf(searchField.value.toUpperCase()) > -1){
      contentSection.children[i].style.display = "";

    }else{
      contentSection.children[i].style.display = "none";

    }
  }
}

function regionFilter(r){

  for(let i=0;i<countriesData.length;i++){
    if(countriesData[i].region === r){
      contentSection.children[i].style.display = "";
    }else{
      contentSection.children[i].style.display = "none";
    }
  }
  }

  function resetList(){
    for(let i=0;i<countriesData.length;i++){

      contentSection.children[i].style.display = "";
   
  }
}

function findCountryName(alpha3Code) {
  // Loop over countries to find one that uses the same code
  for(let i = 0; i < countriesData.length; i++){
    const country = countriesData[i];
    if (country.alpha3Code === alpha3Code) {
      return country.name;
    }
  }

  // If no matching country is found, return code instead
  return alpha3Code;
}


function switchToDetails(){

  for(let i=0;i<countriesData.length;i++){
    const country = countriesData[i];
    contentSection.children[i].addEventListener('click',(e)=>{

      if(e.target.textContent === country.name || e.target.src === country.flag || e.target.tagName === 'P' || e.target.tagName === 'UL' || e.target.tagName === 'LI'){
        console.log(true);

        extraSection.style.display = 'flex';
        contentSection.style.display = 'none';
        userInput.style.display = 'none';

        details.innerHTML +=
        `
        <img src="${country.flag}" alt="">
        <div>
            <h1 class="dark-details">${country.name}</h1>
            <ul>
                <li class="dark-details"><b>Native name:</b> ${country.nativeName}</li>
                <li class="dark-details"><b>Population:</b> ${country.population}</li>
                <li class="dark-details"><b>Region:</b> ${country.region}</li>
                <li class="dark-details"><b>Sub Region:</b> ${country.subregion}</li>
                <li class="dark-details"><b>Capital:</b> ${country.capital}</li>
            </ul>
        `;

        moreDetails.innerHTML +=
        `
          <ul>
              <li class="dark-details"><b>Top level domain:</b> ${country.topLevelDomain[0]}</li>
              <li class="dark-details"><b>Currencies:</b> ${country.currencies[0].name}</li>
              <li class="dark-details"><b>Languages:</b> ${country.languages[0].name}</li>
          </ul>
        `;



        border.innerHTML +=
        `
          <h3>Border countries:</h3>
          <ul>
            
          </ul>
        `;

        for(let j=0;j<country.borders.length;j++){
          let liBorderLand = document.createElement('LI');
          //liBorderLand.style.backgroundColor = 'pink';
          liBorderLand.style.color = lightModeText;
          //liBorderLand.classList.toggle('dark-text');
          liBorderLand.innerHTML += findCountryName(country.borders[j]);
          border.children[1].appendChild(liBorderLand);
        }
      }else{
        console.log(false);
      } 
    });
  }
}


function backToMainContent(){
  const btn = document.querySelector('.extra div button');

  btn.addEventListener('click', ()=>{
    extraSection.style.display = 'none';
    contentSection.style.display = 'flex';
    userInput.style.display = 'flex';

   while(details.firstChild){
     details.removeChild(details.firstChild);
   }

   while(moreDetails.firstChild){
     moreDetails.removeChild(moreDetails.firstChild);
   }

   while(border.firstChild){
     border.removeChild(border.firstChild);
   }
  });
   
}

getCountries().then(() => {
  searchField.addEventListener('keyup', () => {
    searchFilter();
  });

  filterByContinent.addEventListener('change', () => {
    switch(this.value){
      case 'ALL':
        resetList();
        break;
      case 'AF':
        regionFilter('Africa');
        break;
      case 'AM':
        regionFilter('Americas');
        break;
      case 'AS':
        regionFilter('Asia');
        break;
      case 'EU':
        regionFilter('Europe');
        break;
      case 'OC':
        regionFilter('Oceania');
        break;
    }
  }, false);
  

  // darkLightSwitch.addEventListener('click', () => {
  //   switcheroo();
  // });

  switchToDetails();
  backToMainContent();
});

darkLightSwitch.addEventListener('click', () => {
  //changeBtnText();
  switcheroo();
});


