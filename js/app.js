
//SASS COLORS

const lightModeText = 'rgb(17, 21, 23)';
const lightModeInput = 'rgb(133,133,133)';
const lightModeBg = 'rgb(250, 250, 250)';
const lightModeEl = 'rgb(255, 255, 255)';

const darkModeEl = 'rgb(43, 57, 69)';
const darkModebBg = 'rgb(32, 44, 55)';
const darkModeText = lightModeEl;


//TO DO LIST: ADD MQ, change borders to their full name, make header logo a link,
// save state so that api doesn't reload every time


//DARK MODE


const darkLightSwitch = document.querySelector('.dark-light');

document.querySelector('.wrapper').style.backgroundColor = lightModeBg;
document.querySelector('header').style.backgroundColor = lightModeEl;


const searchField = document.querySelector('#search');
searchField.style.backgroundColor = lightModeEl;

const filterByContinent = document.querySelector('#filter');



const card = document.querySelectorAll('.card');



const extraSection = document.querySelector('.extra');
const details = document.querySelector('.details');
const moreDetails = document.querySelector('.more-details');
const border = document.querySelector('.border');
const userInput = document.querySelector('.user-input');


function switcheroo(){

  const card = document.querySelectorAll('.card');

  const allP= document.querySelectorAll('p');
  const allH2= document.querySelector('h2');
  const allH4= document.querySelectorAll('h4');


  if(document.querySelector('.wrapper').style.backgroundColor != lightModeBg){
    
    document.querySelector('.wrapper').style.backgroundColor = lightModeBg;
    document.querySelector('header').style.backgroundColor = lightModeEl;
    searchField.style.backgroundColor = lightModeEl;
    filterByContinent.style.backgroundColor = lightModeEl;

    allH2.style.color = lightModeText;

    darkLightSwitch.children[1].textContent = 'Dark mode';
    darkLightSwitch.children[0].style.color = lightModeText;

    for(let i= 0; i<allP.length; i++){
      allP[i].style.color = lightModeText;
    }


    for(let i= 0; i<allH4.length; i++){
      allH4[i].style.color = lightModeText;
    }


    for(let i= 0; i<card.length; i++){
      card[i].style.backgroundColor = lightModeEl;
      card[i].style.boxShadow = '0px 0px 20px #d9d9d9';
    }

  }else if( document.querySelector('.wrapper').style.backgroundColor = lightModeBg){
    
    document.querySelector('.wrapper').style.backgroundColor = darkModebBg;
    document.querySelector('header').style.backgroundColor = darkModeEl;
    document.querySelector('header').style.boxShadow = 'none';
    
    searchField.style.backgroundColor = darkModeEl;
    searchField.classList.add('dark-mode-search');
    searchField.style.boxShadow = 'none'

    filterByContinent.style.backgroundColor = darkModeEl;
    filterByContinent.style.boxShadow = 'none';

    allH2.style.color = darkModeText;

    darkLightSwitch.children[1].textContent = 'Light mode';
    darkLightSwitch.children[0].style.color = darkModeText;

    for(let i= 0; i<allP.length; i++){
      allP[i].style.color = darkModeText;
    }


    for(let i= 0; i<allH4.length; i++){
      allH4[i].style.color = darkModeText;
    }

    for(let i= 0; i< card.length; i++){
      card[i].style.backgroundColor = darkModeEl;
      card[i].style.boxShadow = 'none';
    }

  }
};


//FETCH

const contentSection= document.querySelector('.content');
//let borderCode = [];


async function getCountries(){
  try{
    const result = await fetch('https://restcountries.eu/rest/v2/all');
    const data = await result.json();
    
    for(let i=0;i<data.length;i++){ 

      const countryName = data[i].name;
      const population= data[i].population;
      const region= data[i].region;
      const capital= data[i].capital;
      const flag= data[i].flag;


      // borderCode.push(data[i].alpha3Code);
      // console.log(borderCode);

     

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

    return data;

  } catch(error){
    console.log(`sorry, could not load countries because of ${error}`);
  }
}

function searchFilter(data){

  for(let i=0; i<data.length; i++){

    if(contentSection.children[i].children[1].textContent.toUpperCase().indexOf(searchField.value.toUpperCase()) > -1){
      contentSection.children[i].style.display = "";

    }else{
      contentSection.children[i].style.display = "none";

    }
  }
}

function regionFilter(data, r){

  for(let i=0;i<data.length;i++){
    if(data[i].region === r){
      contentSection.children[i].style.display = "";
    }else{
      contentSection.children[i].style.display = "none";
    }
  }
  }

  function resetList(data){
    for(let i=0;i<data.length;i++){

      contentSection.children[i].style.display = "";
   
  }
}


function switchToDetails(data){

  for(let i=0;i<data.length;i++){
    contentSection.children[i].addEventListener('click',(e)=>{

      if(e.target.textContent === data[i].name || e.target.src === data[i].flag || e.target.tagName === 'P' || e.target.tagName === 'UL' || e.target.tagName === 'LI'){
        console.log(true);

        extraSection.style.display = 'flex';
        contentSection.style.display = 'none';
        userInput.style.display = 'none';

        details.innerHTML +=
        `
        <img src="${data[i].flag}" alt="">
        <div>
            <h1>${data[i].name}</h1>
            <ul>
                <li><b>Native name:</b> ${data[i].nativeName}</li>
                <li><b>Population:</b> ${data[i].population}</li>
                <li><b>Region:</b> ${data[i].region}</li>
                <li><b>Sub Region:</b> ${data[i].subregion}</li>
                <li><b>Capital:</b> ${data[i].capital}</li>
            </ul>
        `;

        moreDetails.innerHTML +=
        `
          <ul>
              <li><b>Top level domain:</b> ${data[i].topLevelDomain[0]}</li>
              <li><b>Currencies:</b> ${data[i].currencies[0].name}</li>
              <li><b>Languages:</b> ${data[i].languages[0].name}</li>
          </ul>
        `;



        border.innerHTML +=
        `
          <h3>Border countries:</h3>
          <ul>
            
          </ul>
        `;

        for(let j=0;j<data[i].borders.length;j++){

          let arr = [];

          arr.push(data[i].borders[j]);

          let liBorderLand = document.createElement('LI');
          liBorderLand.innerHTML += arr;
          border.children[1].appendChild(liBorderLand);
        }
      }else{
        console.log(false);
      } 
    });
  }
}

function fromAbbrToFullName(data){ 
  for(let i=0;i<data.length;i++){
    const dataName = {
      abbr : data[i].alpha3Code,
      full : data[i].name
    }
    console.log(dataName.full);
  }  
}

function backToMainContent(data){
  const btn = document.querySelector('.extra div button');

  btn.addEventListener('click', ()=>{
    extraSection.style.display = 'none';
    contentSection.style.display = 'block';
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

getCountries().then(data =>{

searchField.addEventListener('keyup',()=>{
  searchFilter(data);
});



filterByContinent.addEventListener('change', function() {


  switch(this.value){
    case 'ALL':
      resetList(data);
      break;
    case 'AF':
      regionFilter(data,'Africa');
      break;
    case 'AM':
      regionFilter(data,'Americas');
      break;
    case 'AS':
      regionFilter(data,'Asia');
      break;
    case 'EU':
      regionFilter(data,'Europe');
      break;
    case 'OC':
      regionFilter(data,'Oceania');
      break;
  }
}, false);
  

  darkLightSwitch.addEventListener('click',()=>{
    switcheroo();
  });

  switchToDetails(data);

  backToMainContent(data);

})




