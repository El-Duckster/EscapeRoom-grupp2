import { fetchAllChallenges } from './apiService.js';
import TCard from './temporary.js'; 

const challengesListElement = document.querySelector('.challenges__list');

// Shared array to store challenges
let challengesArray = [];


export const displayAllChallenges = async () => {
    // Fetch challenges from the API
    const { success, data: challenges, error } = await fetchAllChallenges();

    if (!success) {
        console.error("Failed to fetch challenges:", error);
        challengesListElement.innerHTML = `<li>Error loading challenges. Please try again later.</li>`;
        return;
    }
    challengesArray = challenges;
    // Clear existing content
    challengesListElement.innerHTML = '';

    // Loop through challenges and display them in cards
    challenges.forEach((challengeData) => {
        const tCard = new TCard(
            challengeData.id,
            challengeData.title,
            challengeData.description,
            challengeData.type,
            challengeData.minParticipants,
            challengeData.maxParticipants,
            challengeData.rating,
            challengeData.image,
            challengeData.labels
        );

        const challengeElement = tCard.createTCard(tCard);

        // Create "Book This Challenge" button for each button
        const bookButton = document.createElement('button');
        bookButton.textContent = 'Book This Challenge';
        bookButton.classList.add('book-button');
        bookButton.addEventListener('click', () => handleBookButtonClick(challengeData.id));

        challengeElement.appendChild(bookButton);
        challengesListElement.appendChild(challengeElement);
    });
};

const handleBookButtonClick = (challengeId) => {
    console.log(`display challenge ID: ${challengeId}`);
};
export const getChallengesArray = () => challengesArray;

displayAllChallenges();
