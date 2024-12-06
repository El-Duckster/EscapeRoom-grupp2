import { getChallengesArray } from "./displayAllChallenges.js";
import { renderChallenges } from './utilities/renderChallenges';
import '../styles/layouts/filter.scss';

const filterBtn = document.querySelector(".filter__button");
filterBtn.addEventListener("click", openFilterModal);

// Debounce delay for smoother operation
let searchDebounceTimer;
const searchDebounceDelay = 400;
let searchField;

// Variable for toggletracing
let activeTags = [];
// Array for the dynamic tags
let dynamicTagButtons = [];
let activeButtons = [];

// Array for rating stars
let ratingStars = {
    lowestStars: [],
    lowestRating: 0,

    highestStars: [],
    highestRating: 5,
}

function openFilterModal() {
    const filterSection = document.querySelector(".filter");
    filterBtn.classList.add("filter__hidden");

    // filterBox
    const filterBox = document.createElement("box");
    filterSection.appendChild(filterBox);
    filterBox.classList.add("filter__box");

    // topDiv
    const topDiv = document.createElement("div");
    filterBox.appendChild(topDiv);
    topDiv.classList.add("filter__box__topDiv");
    
    // topDiv title
    const title = document.createElement("h2");
    title.innerHTML = "Filter challenges";
    topDiv.appendChild(title);
    title.classList.add("filter__box__topDiv__title");

    // Close button
    const closeFilterButton = document.createElement("button");
    topDiv.appendChild(closeFilterButton);
    closeFilterButton.classList.add("filter__box__topDiv__closeFilterBtn");
    closeFilterButton.innerHTML = "X";
    closeFilterButton.addEventListener("click", closeFilterModal);

    // Center div
    const centerDiv = document.createElement("div");
    filterBox.appendChild(centerDiv);
    centerDiv.classList.add("filter__box__centerDiv");

    // Checkbox main div
    const checkDiv = document.createElement("div");
    centerDiv.appendChild(checkDiv);
    checkDiv.classList.add("filter__box__centerDiv__checkDiv");

    // Title checkboxes
    const checkBoxTitle = document.createElement("h4");
    checkBoxTitle.textContent = "By type";
    checkDiv.appendChild(checkBoxTitle);
    checkBoxTitle.classList.add("filter__box__centerDiv__checkDiv__title");

    // Checkboxes side divs
    const checkDivTop = document.createElement("div");
    checkDiv.appendChild(checkDivTop);
    checkDivTop.classList.add("filter__box__centerDiv__checkDiv__divTop");

    const checkDivBottom = document.createElement("div");
    checkDiv.appendChild(checkDivBottom);
    checkDivBottom.classList.add("filter__box__centerDiv__checkDiv__divBottom");

    // Checkboxes
    const checkBox1 = document.createElement("input");
    checkBox1.type = ("checkbox");
    checkBox1.id = "DOM__checkBox1";
    checkBox1.checked = true;
    checkDivTop.appendChild(checkBox1);
    checkBox1.classList.add("filter__box__centerDiv__checkDiv__checkBox");
    checkBox1.addEventListener("change", () => executeSearch(searchField.value));

    const checkBoxLabel1 = document.createElement("label");
    checkBoxLabel1.htmlFor = "DOM__checkBox1";
    checkBoxLabel1.appendChild(document.createTextNode("Include online challenges"));
    checkDivTop.appendChild(checkBoxLabel1);
     
    const checkBox2 = document.createElement("input");
    checkBox2.type = ("checkbox");
    checkBox2.id = ("DOM__checkBox2")
    checkBox2.checked = true;
    checkDivBottom.appendChild(checkBox2);
    checkBox2.classList.add("filter__box__centerDiv__checkDiv__checkBox");
    checkBox2.addEventListener("change", () => executeSearch(searchField.value));

    const checkBoxLabel2 = document.createElement("label");
    checkBoxLabel2.htmlFor = "DOM__checkBox2";
    checkBoxLabel2.appendChild(document.createTextNode("Include on-site challenges"));
    checkDivBottom.appendChild(checkBoxLabel2);

    // Star rating
    createStarRating();

    // Div-structure for dynamic tags
    const dynamicDivMain = document.createElement("div");
    centerDiv.appendChild(dynamicDivMain);
    dynamicDivMain.classList.add("filter__box__centerDiv__dynamicDivMain")

    const dynamicDivTitle = document.createElement("div");
    dynamicDivMain.appendChild(dynamicDivTitle);
    dynamicDivTitle.classList.add("filter__box__centerDiv__dynamicDivMain__dynamicDivTitle")

    const dynamicDivTagContainer = document.createElement("div");
    dynamicDivMain.appendChild(dynamicDivTagContainer);
    dynamicDivTagContainer.classList.add("filter__box__centerDiv__dynamicDivMain__dynamicDivTagContainer");

    // Dynamic tags title
    const dynamicTagTitle = document.createElement("h4");
    dynamicTagTitle.textContent = "By tags";
    dynamicDivTitle.appendChild(dynamicTagTitle);
    dynamicTagTitle.classList.add("filter__box__centerDiv__dynamicDivMain__title");

    // Populate dynamic tags
    const challengesArray = getChallengesArray();
    updateDynamicTags(challengesArray);

    // Search field divs
    const searchDivMain = document.createElement("div");
    filterBox.appendChild(searchDivMain);
    searchDivMain.classList.add("filter__box__searchDivMain");

    // Search field
    const searchFieldTitle = document.createElement("h4");
    searchFieldTitle.textContent = "Or type to search for keywords";
    searchDivMain.appendChild(searchFieldTitle);
    searchFieldTitle.classList.add("filter__box__searchDivMain__title");

    const searchField = document.createElement("input");
    searchField.type = "search";
    searchField.id = "searchField-input";
    searchField.placeholder = "Start typing to filter";
    searchDivMain.appendChild(searchField);
    searchField.classList.add("filter__box__searchDivMain__searchfield");
    searchField.addEventListener("input", debounceSearch);

}

// Display challenges by type online/onsite present in URL from redirection
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const challengeType = urlParams.get('type');
    
    setTimeout(() => {
        if (challengeType) {
        filterChallengesByType(challengeType);
        }
    }, 400);
});

function filterByTag(tag) {
    const challengesArray = getChallengesArray();
    const filteredResults = challengesArray.filter( challenge =>
        challenge.labels.some(label =>
            label.toLowerCase() === tag.toLowerCase())
        );   
    displaySearchResults(filteredResults);
}

function updateTagButtons(tag) {
    dynamicTagButtons.forEach(button => {
        const isActive = activeTags.includes(button.textContent.toLowerCase());
        button.classList.toggle('active-tag', isActive);
    });
}

function handleActiveButton(button, state) {
    let foundTag = false;

    activeButtons.forEach(btnName => {
        if (btnName.toLowerCase() == button.textContent.toLowerCase()) {
            foundTag = true;
        }
    })

    if (foundTag && state) {
        if (activeButtons.includes(button.textContent)) {
            activeButtons = activeButtons.filter(val => val !== button.textContent)
        }
    } else {
        if (!foundTag) {
            activeButtons.push(button.textContent);
        }
    }
}

function createStarRating() {
    const filterBox = document.querySelector(".filter__box__centerDiv");

    // Rating div
    const ratingDiv = document.createElement("div");
    ratingDiv.classList.add("filter__box__centerDiv__ratingDiv");
    filterBox.appendChild(ratingDiv);

    // Rating title
    const ratingTitle = document.createElement("h4");
    ratingTitle.textContent = "By rating";
    ratingDiv.appendChild(ratingTitle);
    ratingTitle.classList.add("filter__box__centerDiv__ratingDiv__title");
   
    // Star div
    const starDiv = document.createElement("div");
    starDiv.classList.add("filter__box__centerDiv__ratingDiv__starDiv");
    ratingDiv.appendChild(starDiv);

    // Lowest rating stars
    for (let index = 1; index <= 5; index++) {
        const star = new Image()
        star.src = "assets/svg/star.svg";
        star.className = "filter__box__centerDiv__ratingDiv__star";
        starDiv.appendChild(star)
        ratingStars["lowestStars"].push(star);
        star.id = "lowest_" + index

        starEvents(star, "lowestRating", index);
    }

    // Text between stars
    const textBetween = document.createElement("p");
    textBetween.textContent = "to";
    textBetween.classList.add("filter__box__centerDiv__ratingDiv__starDiv__text");
    starDiv.appendChild(textBetween);

    // Highest rating stars
    for (let index = 1; index <= 5; index++) {
        const star = new Image()
        star.src = "assets/svg/star-filled.svg";
        star.className = "filter__box__centerDiv__ratingDiv__star"
        starDiv.appendChild(star)
        ratingStars["highestStars"].push(star);
        star.id = "highest_" + index

        starEvents(star, "highestRating", index);
    }
}

function starEvents(star, state, index) {
    star.addEventListener("click", () => {
        let notValid = false; 
        let currentCorrectStateName = state.includes("lowest") ? "lowestRating" : "highestRating";
        
        if (currentCorrectStateName === "lowestRating") {
            if (index > ratingStars["highestRating"]) {
                notValid = true
            }
        } else {
            if (index < ratingStars["lowestRating"]) {
                notValid = true
            }
        }

        if (!notValid) {
            ratingStars[state] = index;
            refreshStars(star);
            executeSearch(searchField ? searchField.value : "");
        }
    })

    star.addEventListener("mouseover", () => {
        refreshStars(star, index)
    })

    star.addEventListener("mouseout", () => {
        refreshStars(star)
    })
}

function refreshStars(sendingStar, force) {
    let ratingState = sendingStar.id.includes("lowest") ? "lowestRating" : "highestRating";
    let hoverRating = force ? force : ratingStars[ratingState];

    if (sendingStar.id.includes("lowest")) {
        ratingStars["lowestStars"].forEach((star, currentStarIndex) => {
            if (currentStarIndex + 1 <= hoverRating) { 
                if (star.getAttribute('src') === "assets/svg/star.svg") {
                    star.src = "assets/svg/star-filled.svg";
                } else {
                    if (currentStarIndex + 1 === Number(sendingStar.id[sendingStar.id.length - 1])) {
                        star.src = "assets/svg/star-filled.svg";
                    }
                }
            } else {
                if (star.getAttribute('src') === "assets/svg/star-filled.svg") {
                    star.src = "assets/svg/star.svg";
                }
            }
        });
    } else {
        ratingStars["highestStars"].forEach((star, currentStarIndex) => {
            if (currentStarIndex > hoverRating - 1) {
                star.src = "assets/svg/star.svg";
            } else {
                star.src = "assets/svg/star-filled.svg";
            }
        })
    }
}

function toggleTagFilter(tag) {
    const index = activeTags.indexOf(tag);
    if (index === -1) {
        activeTags.push(tag); 
        }
    else {
        activeTags.splice(index, 1);
    }

    updateTagButtons(tag);
    executeSearch(searchField ? searchField.value : "");
}

// Update the dynamic tags based on tags present in the filteredResults
function updateDynamicTags(filteredResults) {
    const dynamicDivTagContainer = document.querySelector(".filter__box__centerDiv__dynamicDivMain__dynamicDivTagContainer");
    dynamicDivTagContainer.textContent = "";
    const tags = getUniqueTags(filteredResults);
    dynamicTagButtons = [];

    tags.forEach(tag => {
        const capFirstLetterTag = tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
        const tagButton = document.createElement("button");
        tagButton.classList.add("filter__box__centerDiv__dynamicDivMain__dynamicTag");
        tagButton.textContent = capFirstLetterTag;
        tagButton.addEventListener("click", () => toggleTagFilter(tag));

        if (activeTags.includes(tag)) {
            tagButton.classList.add("active-tag");
        }

        dynamicDivTagContainer.appendChild(tagButton);
        dynamicTagButtons.push(tagButton);
        
    });
}

// Get unique tags from filteredResults
function getUniqueTags(filteredResults) {
    const tagSet = new Set();
    filteredResults.forEach(challenge => {
        challenge.labels.forEach(label => {
            tagSet.add(label);
        });
    });

    return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
}

// Delayed search from input event
function debounceSearch(event) {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => 
        executeSearch(event.target.value), searchDebounceDelay);

}

//Perform search on challenges array from case-insensitive userinput 
function executeSearch(query) {
    const challengesArray = getChallengesArray();
    console.log("All challenges:", challengesArray); 
    const onlineChecked = document.getElementById("DOM__checkBox1").checked;
    const onsiteChecked = document.getElementById("DOM__checkBox2").checked;
    const filteredResults = challengesArray.filter(challenge => {
        const matchesRating = challenge.rating >= ratingStars["lowestRating"] && challenge.rating <= ratingStars["highestRating"];
        
        const matchesQuery =
            challenge.title.toLowerCase().includes(query.toLowerCase()) || 
            challenge.description.toLowerCase().includes(query.toLowerCase()) ||
            challenge.labels.some(label =>
                label.toLowerCase().includes(query.toLowerCase()));

        const matchesType = 
            (onlineChecked && challenge.type.toLowerCase() === "online") ||
            (onsiteChecked && challenge.type.toLowerCase() === "onsite");
        const matchesTag =  
            activeTags.every(tag => challenge.labels.some(label => label.toLowerCase() === tag.toLowerCase()));
                return matchesQuery && matchesType && matchesTag && matchesRating;

            });

            // updateDynamicTags(filteredResults);

            displaySearchResults(filteredResults);

}
 
// Prints filteredResults in DOM-element
function displaySearchResults(filteredResults) {
    const challengesListElement = document.querySelector (".challenges__list");
   
    // Clear list
    challengesListElement.textContent = ""; 

    // Errorhandling
    if (filteredResults.length === 0) {
        challengesListElement.textContent = "No matching challenges";
        return;
    }

    // Loop challenges and present in cards
    renderChallenges(filteredResults, challengesListElement);

}

function closeFilterModal() {
    filterBtn.classList.remove("filter__hidden");
    destroyFilterBox();
    
    // Reset filtering to show all challenges when filterbox is closed 
    const challengesArray = getChallengesArray();
    displaySearchResults(challengesArray);

}

function destroyFilterBox() {
    const filterBox = document.querySelector(".filter__box");
    filterBox.remove();

}

// Filter by type, render in DOM
function filterChallengesByType(type) {
    const challengesArray = getChallengesArray();
    const filteredChallenges = challengesArray.filter(challenge => 
      challenge.type.toLowerCase() === type.toLowerCase()
    );
    
    const challengesListElement = document.querySelector(".challenges__list");
    renderChallenges(filteredChallenges, challengesListElement);

  }
  
renderChallenges(filteredResults, challengesListElement);
