//SASS COLORS

const lightModeText = "rgb(17, 21, 23)";
const lightModeInput = "rgb(133,133,133)";
const lightModeBg = "rgb(250, 250, 250)";
const lightModeEl = "rgb(255, 255, 255)";

const darkModeEl = "rgb(43, 57, 69)";
const darkModebBg = "rgb(32, 44, 55)";
const darkModeText = lightModeEl;

//TO DO LIST: ADD MQ, change borders to their full name, make header logo a link,
// save state so that api doesn't reload every time

// Global variable for countries data
let countriesData;

//DARK MODE

const darkLightSwitch = document.querySelector(".dark-light");

document.querySelector(".wrapper").style.backgroundColor = lightModeBg;
document.querySelector("header").style.backgroundColor = lightModeEl;

const searchField = document.querySelector("#search");
searchField.style.backgroundColor = lightModeEl;

const filterByContinent = document.querySelector("#filter");

const card = document.querySelectorAll(".card");

const extraSection = document.querySelector(".extra");
const details = document.querySelector(".details");
const moreDetails = document.querySelector(".more-details");
const border = document.querySelector(".border");
const userInput = document.querySelector(".user-input");

function switcheroo() {
  const card = document.querySelectorAll(".card");

  const allP = document.querySelectorAll("p");
  const allH2 = document.querySelector("h2");
  const allH4 = document.querySelectorAll("h4");

  if (document.querySelector(".wrapper").style.backgroundColor != lightModeBg) {
    document.querySelector(".wrapper").style.backgroundColor = lightModeBg;
    document.querySelector("header").style.backgroundColor = lightModeEl;
    searchField.style.backgroundColor = lightModeEl;
    filterByContinent.style.backgroundColor = lightModeEl;

    allH2.style.color = lightModeText;

    darkLightSwitch.children[1].textContent = "Dark mode";
    darkLightSwitch.children[0].style.color = lightModeText;

    for (let i = 0; i < allP.length; i++) {
      allP[i].style.color = lightModeText;
    }

    for (let i = 0; i < allH4.length; i++) {
      allH4[i].style.color = lightModeText;
    }

    for (let i = 0; i < card.length; i++) {
      card[i].style.backgroundColor = lightModeEl;
      card[i].style.boxShadow = "0px 0px 20px #d9d9d9";
    }
  } else if ((document.querySelector(".wrapper").style.backgroundColor = lightModeBg)) {
    document.querySelector(".wrapper").style.backgroundColor = darkModebBg;
    document.querySelector("header").style.backgroundColor = darkModeEl;
    document.querySelector("header").style.boxShadow = "none";

    searchField.style.backgroundColor = darkModeEl;
    searchField.classList.add("dark-mode-search");
    searchField.style.boxShadow = "none";

    filterByContinent.style.backgroundColor = darkModeEl;
    filterByContinent.style.boxShadow = "none";

    allH2.style.color = darkModeText;

    darkLightSwitch.children[1].textContent = "Light mode";
    darkLightSwitch.children[0].style.color = darkModeText;

    for (let i = 0; i < allP.length; i++) {
      allP[i].style.color = darkModeText;
    }

    for (let i = 0; i < allH4.length; i++) {
      allH4[i].style.color = darkModeText;
    }

    for (let i = 0; i < card.length; i++) {
      card[i].style.backgroundColor = darkModeEl;
      card[i].style.boxShadow = "none";
    }
  }
}

//FETCH

const contentSection = document.querySelector(".content");
//let borderCode = [];

async function getCountries() {
  try {
    const result = await fetch("https://restcountries.eu/rest/v2/all");
    const data = await result.json();

    for (let i = 0; i < data.length; i++) {
      const countryName = data[i].name;
      const population = data[i].population;
      const region = data[i].region;
      const capital = data[i].capital;
      const flag = data[i].flag;

      // borderCode.push(data[i].alpha3Code);
      // console.log(borderCode);

      contentSection.innerHTML += `
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
  } catch (error) {
    console.log(`sorry, could not load countries because of ${error}`);
  }
}

function searchFilter() {
  for (let i = 0; i < countriesData.length; i++) {
    if (
      contentSection.children[i].children[1].textContent.toUpperCase().indexOf(searchField.value.toUpperCase()) > -1
    ) {
      contentSection.children[i].style.display = "";
    } else {
      contentSection.children[i].style.display = "none";
    }
  }
}

function regionFilter(region) {
  for (let i = 0; i < countriesData.length; i++) {
    if (countriesData[i].region === region) {
      contentSection.children[i].style.display = "";
    } else {
      contentSection.children[i].style.display = "none";
    }
  }
}

function resetList() {
  for (let i = 0; i < countriesData.length; i++) {
    contentSection.children[i].style.display = "";
  }
}

function findCountryName(alpha3Code) {
  // Loop over the countries to find the country that has the same code
  for (let i = 0; i < countriesData.length; i++) {
    const country = countriesData[i];
    if (country.alpha3Code === alpha3Code) {
      return country.name;
    }
  }

  // If we didn't find the name, return the code instead
  return alpha3Code;
}

function switchToDetails() {
  for (let i = 0; i < countriesData.length; i++) {
    // Putting the data[i] in a var makes it more readable down the line
    const country = countriesData[i];

    contentSection.children[i].addEventListener("click", (e) => {
      // You already know which country it is because you use the children[i], this if statement is not neccesary
      extraSection.style.display = "flex";
      contentSection.style.display = "none";
      userInput.style.display = "none";

      details.innerHTML += `
      <img src="${country.flag}" alt="">
      <div>
          <h1>${country.name}</h1>
          <ul>
              <li><b>Native name:</b> ${country.nativeName}</li>
              <li><b>Population:</b> ${country.population}</li>
              <li><b>Region:</b> ${country.region}</li>
              <li><b>Sub Region:</b> ${country.subregion}</li>
              <li><b>Capital:</b> ${country.capital}</li>
          </ul>
      `;

      moreDetails.innerHTML += `
        <ul>
            <li><b>Top level domain:</b> ${country.topLevelDomain[0]}</li>
            <li><b>Currencies:</b> ${country.currencies[0].name}</li>
            <li><b>Languages:</b> ${country.languages[0].name}</li>
        </ul>
      `;

      border.innerHTML += `
        <h3>Border countries:</h3>
        <ul>
          
        </ul>
      `;

      for (let j = 0; j < country.borders.length; j++) {
        let liBorderLand = document.createElement("LI");
        liBorderLand.innerHTML += findCountryName(country.borders[j]);
        border.children[1].appendChild(liBorderLand);
      }
    });
  }
}

function fromAbbrToFullName() {
  for (let i = 0; i < countriesData.length; i++) {
    const dataName = {
      abbr: countriesData[i].alpha3Code,
      full: countriesData[i].name,
    };
    console.log(dataName.full);
  }
}

function backToMainContent() {
  const btn = document.querySelector(".extra div button");

  btn.addEventListener("click", () => {
    extraSection.style.display = "none";
    contentSection.style.display = "block";
    userInput.style.display = "flex";

    while (details.firstChild) {
      details.removeChild(details.firstChild);
    }

    while (moreDetails.firstChild) {
      moreDetails.removeChild(moreDetails.firstChild);
    }

    while (border.firstChild) {
      border.removeChild(border.firstChild);
    }
  });
}

getCountries().then(() => {
  searchField.addEventListener("keyup", () => {
    searchFilter();
  });

  filterByContinent.addEventListener(
    "change",
    function () {
      switch (this.value) {
        case "ALL":
          resetList();
          break;
        case "AF":
          regionFilter("Africa");
          break;
        case "AM":
          regionFilter("Americas");
          break;
        case "AS":
          regionFilter("Asia");
          break;
        case "EU":
          regionFilter("Europe");
          break;
        case "OC":
          regionFilter("Oceania");
          break;
      }
    },
    false
  );

  darkLightSwitch.addEventListener("click", () => {
    switcheroo();
  });

  switchToDetails();
  backToMainContent();
});
