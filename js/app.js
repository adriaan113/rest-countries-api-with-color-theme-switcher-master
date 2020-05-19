
//SASS COLORS

const lightModeText = 'rgb(17, 21, 23)';
const lightModeInput = 'rgb(133,133,133)';
const lightModeBg = 'rgb(250, 250, 250)';
const lightModeEl = 'rgb(255, 255, 255)';

const darkModeEl = 'rgb(43, 57, 69)';
const darkModebBg = 'rgb(32, 44, 55)';
const darkModeText = lightModeEl;



//DARK MODE


const darkLightSwitch = document.querySelector('.dark-light');

document.querySelector('.wrapper').style.backgroundColor = lightModeBg;
document.querySelector('header').style.backgroundColor = lightModeEl;

const allText= document.querySelectorAll('p, h2'); //DIT IS NIET ZO GOED

const searchField = document.querySelector('#search');
searchField.style.backgroundColor = lightModeEl;

const filterByContinent = document.querySelector('#filter');
//filterByContinent.style.backgroundColor = lightModeEl;


const card = document.querySelectorAll('.card');



 darkLightSwitch.addEventListener('click',()=>{


  // if(document.querySelector('.wrapper').style.backgroundColor != lightModeBg){
    
  //   document.querySelector('.wrapper').style.backgroundColor = lightModeBg;
  //   document.querySelector('header').style.backgroundColor = lightModeEl;
  //   searchField.style.backgroundColor = lightModeEl;
  //   filterByContinent.style.backgroundColor = lightModeEl;


  //   for(let i= 0; i< allText.length; i++){
  //     allText[i].style.color = lightModeText;

  //   }

  // }else if( document.querySelector('.wrapper').style.backgroundColor = lightModeBg){
    
  //   document.querySelector('.wrapper').style.backgroundColor = darkModebBg;
  //   document.querySelector('header').style.backgroundColor = darkModeEl;
  //   document.querySelector('header').style.boxShadow = 'none';
    
  //   searchField.style.backgroundColor = darkModeEl;
  //   searchField.classList.add('dark-mode-search');
  //   searchField.style.boxShadow = 'none'

  //   filterByContinent.style.backgroundColor = darkModeEl;
  //   filterByContinent.style.boxShadow = 'none';

  //   card.style.boxShadow = 'none';




  //   for(let i= 0; i< allText.length; i++){
  //     allText[i].style.color = darkModeText;

  //   }

  // }
});

function switcheroo(){

  if(document.querySelector('.wrapper').style.backgroundColor != lightModeBg){
    
    document.querySelector('.wrapper').style.backgroundColor = lightModeBg;
    document.querySelector('header').style.backgroundColor = lightModeEl;
    searchField.style.backgroundColor = lightModeEl;
    filterByContinent.style.backgroundColor = lightModeEl;


    for(let i= 0; i< allText.length; i++){
      allText[i].style.color = lightModeText;

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

    card.style.boxShadow = 'none';




    for(let i= 0; i< allText.length; i++){
      allText[i].style.color = darkModeText;

    }
  }

};

//FETCH

const contentSection= document.querySelector('.content');

// fetch('https://restcountries.eu/rest/v2/all')
// .then(response=> {
//   return response.json();
// })
// .then(function(data){

//   for(let i=0;i<data.length;i++){ 

//     const countryName = data[i].name;
//     const population= data[i].population;
//     const region= data[i].region;
//     const capital= data[i].capital;
//     const subRegion= data[i].subRegion;
//     const flag= data[i].flag;


//     contentSection.innerHTML+=
//       `
//       <div class="card">
//                     <img src="${flag}" alt="flag of ${countryName}">
//                       <h4>${countryName}</h4>
//                       <ul>
//                         <li><p>Population: ${population}</p></li>
//                         <li><p>Region: ${region}</p></li>
//                         <li><p>Capital: ${capital}</p></li>
//                     </ul>
//                 </div>
//       `
//   }
// })
// .catch(Error=>{
//   contentSection.innerHTML = `<div>
//                     <h3>Sorry! Something's not right</h3>
//                     <p> The reason is: ${Error}</p>
//                     </div>`;

//     console.log('hahahahaah');
// })


async function getCountries(){
  try{
    const result = await fetch('https://restcountries.eu/rest/v2/all');
    const data = await result.json();
    
    for(let i=0;i<data.length;i++){ 

      const countryName = data[i].name;
      const population= data[i].population;
      const region= data[i].region;
      const capital= data[i].capital;
      const subRegion= data[i].subRegion;
      const flag= data[i].flag;


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
        `
    }

    darkLightSwitch.addEventListener('click',()=>{

      switcheroo();
      
    });

  } catch(error){
    console.log(`sorry, could not load countries because of ${error}`);
  }
}

getCountries();