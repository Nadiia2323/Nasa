// !RANDOM BUTTON / FETCH / ADD NEW ITEMS/
import { dataNASA } from './data.js';
let globalData;
let availableKeywords;

const randomButton = document.getElementById("random");
const url =
  "https://api.nasa.gov/planetary/apod?api_key=A4L5jsAxYUZWrat7IckNidah6B0EmmpU7UvEa8Ab&count=1";

function addRandomEventListeners() {
  randomButton.addEventListener("click", function () {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const cardsHolder = document.getElementById("random-modal-container");
        const cardsContainer = document.querySelector(".cards-container");
        cardsHolder.style.display = "flex";
        cardsContainer.style.display = "none";
        cardsHolder.innerHTML = "";
        const randomItem = data[0];
        addNewCard(randomItem, cardsHolder);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  });
}

function addNewCard(data, cardsHolder) {
  
  let imgContainer = document.createElement("div");
  imgContainer.classList = "image";
  let newDate = document.createElement("h5");
  newDate.innerText = data.date;
  let newPhoto = document.createElement("img");
  newPhoto.src = data.url;
  let infoHolder = document.createElement("div");
  infoHolder.classList = "info-holder";
  let newTitle = document.createElement("h5");
  newTitle.innerText = data.title;
  let newInfo = document.createElement("p");
  newInfo.innerText = data.explanation;

  infoHolder.appendChild(newTitle);
  infoHolder.appendChild(newInfo);
  imgContainer.appendChild(newDate);
  imgContainer.appendChild(newPhoto);
  

  cardsHolder.appendChild(imgContainer);
  cardsHolder.appendChild(infoHolder);
}

// !Datepicker + FETCH//
function addDatePickerEventListener() {
  const cardsHolder = document.getElementById("random-modal-container");
  const cardsContainer = document.querySelector(".cards-container");
  const dataPicker = document.querySelector("#datepicker");
  dataPicker.addEventListener("change", function () {
    const selectedDate = this.value;
    const dateUrl = `https://api.nasa.gov/planetary/apod?api_key=A4L5jsAxYUZWrat7IckNidah6B0EmmpU7UvEa8Ab&date=${selectedDate}`;
    fetch(dateUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const date = data;
        cardsHolder.style.display = "flex";
        cardsContainer.style.display = "none";
        cardsHolder.innerHTML = "";
        addNewCard(date, cardsHolder);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  });
}

// !SELECT MONTH / FETCH / ADD NEW ITEMS(GRID)

function addMonthPickerEventListener() {
  const selector = document.querySelector("#selectMonth");
  const cardsContainer = document.querySelector(".cards-container");
  const cardsHolder = document.getElementById("random-modal-container");

  selector.addEventListener("change", function () {
    const input = document.getElementById("keyWordInput");
    const selectedMonth = this.value;
    const url = `https://api.nasa.gov/planetary/apod?api_key=A4L5jsAxYUZWrat7IckNidah6B0EmmpU7UvEa8Ab&thumbs&start_date=2023-${selectedMonth}-01&end_date=2023-${selectedMonth}-28`;
    showLoader();
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        input.disabled = false;

        cardsHolder.style.display = "none";
        cardsContainer.style.display = "grid";
        cardsContainer.innerHTML = "";

        
        globalData = data;
        availableKeywords = getKeyWords(data,myKeywords)
        reconfigPage(data);
        hideLoader();
        
      })
      .catch((error) => {
        console.error("error", error);
      });
  });
}


function addNewCards(data) {
  const container = document.querySelector(".cards-container");
  container.innerHTML = "";
  container.style.overflow = "scroll";

  console.log("data in adnewcards:>> ", data);
  for (let index = 0; index < data.length; index++) {
    let newCard = document.createElement("div");
    newCard.classList = "cards";
    let mediaType = data[index].media_type;
    let media = "";

    if (mediaType == "image") {
      media = document.createElement("img");
      media.src = data[index].url;
    } else {
      media = document.createElement("iframe");
      media.src = data[index].url;
    }

    let newDate = document.createElement("h5");
    newDate.innerText = data[index].date;
    let infoHolder = document.createElement("div");
    let newTitle = document.createElement("h5");
    newTitle.innerText = data[index].title;
    let newInfo = document.createElement("p");
    newInfo.innerText = data[index].explanation;

    infoHolder.appendChild(newTitle);
    // infoHolder.appendChild(newInfo);
    newCard.appendChild(media);
    newCard.appendChild(infoHolder);

    container.appendChild(newCard);
    
  }
  
}
// !CHECKBOX (VIDEO)//
function addCheckBoxListener(data) {
  const videoFilterCheckbox = document.querySelector("#videoFilter");
  videoFilterCheckbox.addEventListener('change', function () {
    const isChecked = this.checked;
    const filteredData = isChecked
      ? data.filter((item) => item.media_type === "video")
      : data;
    
    addNewCards(filteredData);
  });
}

// !FOR KEYWORDS AND DROPLIST//

function keywordLocator(title, keywordArr) {
  const formattedTitle = title.toLowerCase();
  const keywordsInTitle = [];

  for (let word of keywordArr) {
    if (formattedTitle.includes(word)) {
      keywordsInTitle.push(word);
    }
  }
  return keywordsInTitle;
}

const myKeywords = [
  "earth",
  "mars",
  "venus",
  "galaxies",
  "galaxy",
  "eclipse",
  "comet",
  "uranus",
  "mercury",
  "neptun",
  "planet nine",
  "star",
  "stars",
  "saturn",
  "jupiter",
  "milky way",
  "moon",
  "sun",
  "supermoon",
  "meteor shower",
];

function getKeyWords(data, myKeywords) {
  const allKeywordsSet = new Set();
  for (let index = 0; index < data.length; index++) {
    const itemTitle = data[index].title;
    const keywordsArray = keywordLocator(itemTitle, myKeywords);

    for (let keyword of keywordsArray) {
      allKeywordsSet.add(keyword);
    }
  }
  const kWordsArray = Array.from(allKeywordsSet);
  console.log("kWordsArray :>> ", kWordsArray);

  return kWordsArray;
}

function clearDropDown() {
  const droplist = document.getElementById("keyWordList");
  droplist.innerHTML = '';
  
}
function keyWordsDOM(keywords) {
  console.log('keywords should be filtered :>> ', keywords);
  const droplist = document.getElementById("keyWordList");
  clearDropDown();

  keywords.forEach((keyword) => {
    const listItem = document.createElement("li");
    console.log('listItem :>> ', listItem);
    listItem.innerText = keyword;
    listItem.setAttribute("id", keyword);

    listItem.addEventListener("click", function (e) {
      const input = document.getElementById("keyWordInput");
      const itemId = e.currentTarget.id;
      
      input.value = itemId;
      clearDropDown();

      const filteredItems = globalData.filter((item) => {
        if (item.title.toLowerCase().includes(itemId)) {
          return item;
        }
      });

      reconfigPage(filteredItems);
      console.log("filteredItems on selection:>> ", filteredItems);
    });

    droplist.appendChild(listItem);
  });
}


function addEnterKeydownListener() {
  const input = document.getElementById("keyWordInput");
  const droplist = document.getElementById("keyWordList");


  input.addEventListener("keydown", function (e) {
    console.log(e.key);
    if (e.key == "Enter") {
      console.log("enter clicked");
      const inputValue = input.value.toLowerCase();
      console.log("addEnterKeydownListener inputValue :>> ", inputValue);
      const filteredItems = globalData.filter((item) => {
        if (item.title.toLowerCase().includes(inputValue)) {
          return item;
        }
      });
  clearDropDown();

      reconfigPage(filteredItems)
   
      console.log("filteredItems addEnterKeydownListener:>> ", filteredItems);
    }
  });
}

function addInputListener() {
  const droplist = document.getElementById("keyWordList");

  const input = document.getElementById("keyWordInput");

  input.addEventListener("input", function (e) {
    const kWords = getKeyWords(globalData, availableKeywords);

    console.log("e.target.value :>> ", e.target.value);
    // input.setAttribute("placehlder", "")
    const textHolder = input.value.toLowerCase();
    if (textHolder === "") {
      clearDropDown();  
      return;
    }
    droplist.innerText = "";
    const filteredKwords = kWords
      .filter((keyword) => {
        return keyword.includes(textHolder);
      })
    console.log('filteredKwords :>> ', filteredKwords);
    
    keyWordsDOM(filteredKwords)
      
  });
}

function addDroplistListener() {
  const droplist = document.getElementById("keyWordList");

  droplist.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      const selectedKey = event.target.textContent;
      console.log("in droplistlistener", selectedKey);
      droplist.style.display = "none";
    }
  });
}
 
// !RECONFIGURATION OF THE PAGE//

function reconfigPage(data) {
  // create cards on page
  addNewCards(data);

  // config modal
  addClickListeners(data);
  
  addCheckBoxListener(data);
 

}

function init() {
    // getting value from the input element
  addInputListener();

  // filtering the cards, based on the value in the input element on 'Enter'
  addEnterKeydownListener();
  // resetToHomeView();
  
}
//!LINKS
document.getElementById("home-link").addEventListener("click", function() {
  resetToHomeView();
});
document.getElementById("gallery-link").addEventListener("click", function() {
  displayGallery(dataNASA);
});
function resetToHomeView() {
  const cardsHolder = document.getElementById("random-modal-container");
  const cardsContainer = document.querySelector(".cards-container");
  
  cardsHolder.style.display = "none";
  cardsContainer.style.display = "none";
  
}

function displayGallery(dataNASA) {
  const galleryContainer = document.querySelector('.cards-container');
  
  if (!galleryContainer) {
    console.error('Element .cards-container not found');
    return;
  }

  galleryContainer.style.display = 'grid';  
  addNewCards(dataNASA);  
}

// !LOADER//
function showLoader() {
  const loader = document.getElementById("loader");
  loader.style.display = "block";
}

function hideLoader() {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
}

// !MODAL///

function addClickListeners(data) {
  const modal = document.getElementById("modal-active");
  const allCards = document.getElementsByClassName("cards");
  Array.from(allCards).forEach((card, i) => {
    card.addEventListener("click", (event) => {
      const date = data[i].date;
      const explanation = data[i].explanation;
      const clickedContainer = event.currentTarget;
      const title = clickedContainer.querySelector("h5").textContent;
      const picture = clickedContainer.querySelector("img").src;

      openModal(title, picture, explanation, date);
    });
  });
}

function openModal(title, picture, explanation, date) {
  console.log("date :>> ", date);

  const modal = document.getElementById("modal-active");
  const modalDate = document.getElementById("modal-date");
  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalText = document.getElementById("modal-text");

  modalDate.innerHTML = date;
  modalText.innerText = explanation;
  modalImage.src = picture;
  modalTitle.textContent = title;
  modal.style.display = "block";
}

const closeButton = document.getElementsByClassName("close-button")[0];
const modalActive = document.getElementById("modal-active");

closeButton.addEventListener("click", function () {
  modalActive.style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
  init();
  addRandomEventListeners();
  addDatePickerEventListener();
  addMonthPickerEventListener();
  addClickListeners();
});




