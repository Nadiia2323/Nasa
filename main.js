// // !FUNCTION FOR GALLERRY//
// // function addNewCards(array) {
// //   const cardsHolder = document.getElementsByClassName("cards-container")[0];

// //   for (let index = 0; index < array.length; index++) {
// //     let newCard = document.createElement("div");
// //     newCard.classList = "cards";
// //     let newPhoto = document.createElement("img");
// //     newPhoto.src = array[index].url;
// //     let infoHolder = document.createElement("div");
// //     let newTitle = document.createElement("h5");
// //     newTitle.innerText = array[index].title;
// //     let newInfo = document.createElement("p");
// //     newInfo.innerText = array[index].explanation;

// //     infoHolder.appendChild(newTitle);
// //     // infoHolder.appendChild(newInfo);
// //     newCard.appendChild(newPhoto);
// //     newCard.appendChild(infoHolder);

// //     cardsHolder.appendChild(newCard);
// //   }
// // }

// // addNewCards(dataNASA);

// // !FOR FINDING VIDEOS//

// // function findVideo(dataNASA) {
// //   const cardsHolder = document.querySelector(".cards-container");
// //   for (let index = 0; index < dataNASA.length; index++) {
// //     if (dataNASA[index].media_type === 'video') {
// //       let newCard = document.createElement('div');
// //       let newVideo = document.createElement('iframe');
// //       newVideo.src = dataNASA[index].url;

// //       newCard.appendChild(newVideo);
// //       cardsHolder.appendChild(newCard);
// //     }
// //   }
// // }

// // findVideo(dataNASA);

// // !FOR KEYWORDS//

// function keywordLocator(title, keywordArr) {
//   const formattedTitle = title.toLowerCase();
//   // console.log(formattedTitle);

//   const keywordsInTitle = [];

//   for (word of keywordArr) {
//     if (formattedTitle.includes(word)) {
//       keywordsInTitle.push(word);
//     }
//   }
//   return keywordsInTitle;
// }

// const myKeywords = [
//   "earth",
//   "mars",
//   "venus",
//   "galaxies",
//   "galaxy",
//   "eclipse",
//   "comet",
//   "uranus",
//   "mercury",
//   "neptun",
//   "planet nine",
//   "star",
//   "stars",
//   "saturn",
//   "jupiter",
//   "milky way",
//   "moon",
//   "sun",
//   "supermoon",
//   "meteor shower",
// ];

// const chosenKeyword = "";

// function getKeyWords(dataNASA, myKeywords) {
//   const allKeywords = new Set();
//   for (let index = 0; index < dataNASA.length; index++) {
//     const itemTitle = dataNASA[index].title;
//     const keywordsArray = keywordLocator(itemTitle, myKeywords);

//     for (keyword of keywordsArray) {
//       allKeywords.add(keyword);
//     }
//   }
//   return allKeywords;
// }

// const keyWordsSet = getKeyWords(dataNASA, myKeywords);

// // console.log(keyWordsSet);

// // !DROPLIST//

// const input = document.getElementById("keyWordInput");
// const droplist = document.getElementById("keyWordList");

// input.addEventListener("input", function (e) {
//   // console.log('e :>> ', e);
//   const textHolder = input.value.toLowerCase();
//   // console.log("object :>> ", textHolder);

//   droplist.innerText = "";
//   const filteredKeywords = myKeywords
//     .filter((keyword) => {
//       return keyword.includes(textHolder);
//     })
//     .forEach((filteredKeyword) => {
//       const listItem = document.createElement("li");
//       // console.log('listItem :>> ', listItem);
//       listItem.innerText = filteredKeyword;
//       droplist.appendChild(listItem);
//     });

//   // console.log("filteredKeywords :>> ", filteredKeywords);
// });

// droplist.addEventListener("click", function (event) {
//   if (event.target.tagName === "LI") {
//     const selectedKey = event.target.textContent;
//     // console.log(selectedKey);
//   }
// });

// // !FOR MODALS//

// const modal = document.getElementById("modal");

// function addClickListeners() {
//   const allCards = document.getElementsByClassName("cards");
//   Array.from(allCards).forEach((card) => {
//     card.addEventListener("click", (event) => {
//       const clickedContainer = event.currentTarget;
//       const title = clickedContainer.querySelector("h5").textContent;
//       const picture = clickedContainer.querySelector("img").src;
//       openModal(title, picture);
//     });
//   });
// }

// addClickListeners();

// function openModal(title, picture) {
//   const modal = document.getElementById("modal-active");
//   const modalImage = document.getElementById("modal-image");
//   const modalTitle = document.getElementById("modal-title");

//   modalImage.src = picture;
//   modalTitle.textContent = title;
//   modal.style.display = "block";
// }

// const closeButton = document.getElementsByClassName("close-button")[0];
// const modalActive = document.getElementById("modal-active");

// closeButton.addEventListener("click", function () {
//   modalActive.style.display = "none";
// });

// // !SELECT MONTH AND ADD IT TO HTML(CHECKBOX VIDEOFILTER)//
// // const selector = document.querySelector("#selectMonth");
// // const cardsHolder = document.getElementsByClassName("cards-container")[0];
// // const videoFilterCheckbox = document.querySelector("#videoFilter");

// // selector.addEventListener("change", function () {
// //   const selectedMonth = this.value;
// //   const url = `https://api.nasa.gov/planetary/apod?api_key=A4L5jsAxYUZWrat7IckNidah6B0EmmpU7UvEa8Ab&thumbs&start_date=2023-${selectedMonth}-01&end_date=2023-${selectedMonth}-28`;
// //   console.log("url :>> ", url);

// //   fetch(url)
// //     .then((response) => {
// //       if (!response.ok) {
// //         throw new Error("Network response was not ok");
// //       }
// //       return response.json();
// //     })
// //     .then((data) => {
// //       cardsHolder.innerHTML = "";
// //       const filteredData = videoFilterCheckbox.checked
// //         ? data.filter((item) => item.media_type === "video")
// //         : data;

// //       addNewCards(filteredData);
// //     })
// //     .catch((error) => {
// //       console.error("error", error);
// //     });
// // });
// // !the same code(change the function)//
// function addNewCards(data) {
//   for (let index = 0; index < data.length; index++) {
//     let newCard = document.createElement("div");
//     newCard.classList = "cards";
//     let newPhoto = document.createElement("img");
//     newPhoto.src = data[index].url;
//     let infoHolder = document.createElement("div");
//     let newTitle = document.createElement("h5");
//     newTitle.innerText = data[index].title;
//     let newInfo = document.createElement("p");
//     newInfo.innerText = data[index].explanation;

//     infoHolder.appendChild(newTitle);
//     // infoHolder.appendChild(newInfo);
//     newCard.appendChild(newPhoto);
//     newCard.appendChild(infoHolder);

//     cardsHolder.appendChild(newCard);
//   }
// }
