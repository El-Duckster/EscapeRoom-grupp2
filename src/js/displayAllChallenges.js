import { fetchAllChallenges } from './apiService.js';
import { renderChallenges } from './utilities/renderChallenges.js';

const challengesList = document.querySelector('.challenges__list');

// Shared array to store challenges
let challengesArray = [];

export const displayAllChallenges = async () => {
  // Fetch challenges from the API
  const { success, data: challenges, error } = await fetchAllChallenges();

  if (!success) {
    console.error('Failed to fetch challenges:', error);
    challengesList.innerHTML = `<li>Error loading challenges. Please try again later.</li>`;
    return;
  }
  challengesArray = challenges;

  // Clear existing content
  challengesList.innerHTML = '';
  renderChallenges(challenges, challengesList);
};

// const handleBookButtonClick = (challengeId) => {
//     console.log(`display challenge ID: ${challengeId}`);
// };
export const getChallengesArray = () => challengesArray;

displayAllChallenges();
