import { fetchAvailableTimes, fetchChallengeDetails } from "./apiService.js";
import "../styles/layouts/modal.scss";
import { initializeStep2 } from './modal-step-2.js';

// DOM Selectors
const modal = document.querySelector(".booking-modal");
const steps = document.querySelectorAll(".booking-modal__step");
const dateInput = document.querySelector(".custom__date");
const roomTitle = document.querySelector(".modal__content-loading");
const searchAvailableTimesBTN = document.querySelector(".booking__search-btn");
const closeBTN = document.querySelectorAll('.close');

let challengeId; 

// to set the minimum selectable date to tomorrow
const setMinimumSelectableDate = () => {
  const today = new Date();
  today.setDate(today.getDate() + 1); // Tomorrow
  const minDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  dateInput.setAttribute('min', minDate); // Set as the minimum date
};


export const showSteps = (stepNumber) => {
  const steps = document.querySelectorAll(".booking-modal__step");
  steps.forEach((step, index) => {
    if (index + 1 === stepNumber) {
      step.style.display = "block"; // Show the active step
      step.classList.add("booking-modal__step--active");
    } else {
      step.style.display = "none"; 
      step.classList.remove("booking-modal__step--active");
    }
  });
};

// Fetch and display the room title
export const loadRoomTitle = async (challengeId) => {
  try {
    const { success, data } = await fetchChallengeDetails(challengeId);
    if (success && data.title) {
      roomTitle.textContent = data.title;
    } else {
      roomTitle.textContent = "Room Title Not Found";
    }
  } catch (err) {
    roomTitle.textContent = "Error Loading Room Title";
    console.error("Error loading room title:", err);
  }
};

// Event listener for the "Search Available Times" button in Step 1
searchAvailableTimesBTN.addEventListener("click", async (event) => {
  event.preventDefault();

  const selectedDate = dateInput.value; 
  if (!selectedDate) {
    alert("Please select a valid date.");
    dateInput.focus();
    return;
  }

  if (!challengeId) {
    console.error("Error: challengeId is undefined.");
    return;
  }

  // Pass `challengeId and selectedDate directly to initialize Step 2
  await initializeStep2(challengeId, selectedDate);
});

// Function to open the booking modal (Step 1 initialization)
export const openBookingModal = (id) => {
  challengeId = id;
  if (!challengeId) {
    console.error("No challengeId provided to openBookingModal");
    return;
  }

  modal.style.display = "block";
  console.log(`Modal is displayed for challengeId: ${challengeId}`);
  loadRoomTitle(challengeId);
  showSteps(1); 
};

// Hide the modal on page load
document.addEventListener("DOMContentLoaded", () => {
  modal.style.display = "none";
  console.log("Modal is hidden when the page is loaded");

  setMinimumSelectableDate();
});

closeBTN.forEach(button =>{
    button.addEventListener('click', () => {
        const modal = button.closest('.booking-modal');
        modal.style.display = 'none';
    });
});