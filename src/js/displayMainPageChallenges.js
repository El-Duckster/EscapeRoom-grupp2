import { fetchAllChallenges } from './apiService.js';
import { renderChallenges } from './utilities/renderChallenges.js';

const challengesListElement = document.querySelector(".challenges__list");

let challengesArray = [];

const displayNumberOfChallenges = async () => {
    const { success, data: challenges, error } = await fetchAllChallenges();

    if (!success) {
        console.error("Failed to fetch challenges:", error);
        challengesListElement.innerHTML = `<li>Error loading challenges. Please try again later.</li>`;
        return;
    }

    challengesArray = challenges;

    const sortedChallenges = [...challengesArray].sort((a, b) => b.rating - a.rating);
    const challengesToDisplay = sortedChallenges.slice(0, 3);


    renderChallenges(challengesToDisplay, challengesListElement);
};

displayNumberOfChallenges();