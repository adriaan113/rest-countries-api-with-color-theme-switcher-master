
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


const searchField = document.querySelector('#search');
searchField.style.backgroundColor = lightModeEl;

const filterByContinent = document.querySelector('#filter');
//filterByContinent.style.backgroundColor = lightModeEl;


const card = document.querySelectorAll('.card');



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

    return data;

  } catch(error){
    console.log(`sorry, could not load countries because of ${error}`);
  }
}

function searchFilter(data){

  for(let i=0; i<data.length; i++){
    // console.log(data[i].name);
    // console.log(contentSection.children[i].children[1].textContent);

    const txtValue = contentSection.children[i].children[1].textContent;

    if(contentSection.children[i].children[1].textContent.toUpperCase().indexOf(searchField.value.toUpperCase()) > -1){
      contentSection.children[i].style.display = "";

    }else{
      contentSection.children[i].style.display = "none";

    }
  }
}


getCountries().then(data =>{

searchField.addEventListener('keyup',()=>{
  searchFilter(data);
});
  
 
  darkLightSwitch.addEventListener('click',()=>{
    switcheroo();
  });
})







// searchField



// for (i = 0; i < li.length; i++) {
//   a = li[i].getElementsByTagName("a")[0];
//   txtValue = a.textContent || a.innerText;
//   if (txtValue.toUpperCase().indexOf(filter) > -1) {
//     li[i].style.display = "";
//   } else {
//     li[i].style.display = "none";
//   }
// }