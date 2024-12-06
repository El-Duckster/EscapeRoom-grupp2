import '../styles/layouts/modal.scss';
import {
  fetchAvailableTimes,
  fetchChallengeDetails,
  createReservation,
} from './apiService.js';
import { showSteps } from './modal1.js';

// DOM Elements
const emailInput = document.querySelector('#booking-email');
const nameInput = document.querySelector('#booking-name');
const timeDropdown = document.querySelector('#booking-time');
const participantsDropdown = document.querySelector('#booking-participants');
const form = document.querySelector('#user-booking');

// State variables
let challengeId;
let selectedDate;


// Utility Functions
const showAlert = (message) => {
  alert(message);
};

const updateDropdown = (dropdown, options) => {
  // Clear dropdown, keep only the placeholder
  while (dropdown.options.length > 1) {
    dropdown.remove(1);
  }

  // Populate dropdown with new options
  options.forEach(({ value, label }) => {
    const option = document.createElement('option');
    option.value = value; // Use start time (HH:mm) as the value
    option.textContent = label; // Use full range as the display text
    dropdown.appendChild(option);
  });
};


//------------------- Validator Functions----------------------------

// // Helper function to check if an email is valid
const isValidEmail = (email) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);


//------------------- Initialize step 2 Function----------------------------
export const initializeStep2 = async (id, date) => {
  challengeId = id;
  selectedDate = date;
  console.log(
    `Initializing Step 2 with challengeId: ${challengeId}, date: ${selectedDate}`,
  );

  if (!challengeId || !selectedDate) {
    console.error(
      'Missing challengeId or selectedDate in Step 2 initialization',
    );
    return;
  }

  try {
    const step2RoomTitle = document.querySelector(
      '#step2 .modal__content-loading',
    );

    // Fetch and load the room title
    const { success, data } = await fetchChallengeDetails(challengeId);
    if (success && data.title) {
      step2RoomTitle.textContent = data.title;
    } else {
      step2RoomTitle.textContent = 'Room Title Not Found';
    }
    await loadParticipants(challengeId);
    await loadAvailableTimes(challengeId, selectedDate);
    showSteps(2); // Move to Step 2
  } catch (err) {
    console.error('Error initializing Step 2:', err);
  }
};

//--------------------FETCH AND DISPLAY PARTICIPANTS NUMBER-----------------

// Load participants dropdown based on challenge details
const loadParticipants = async (challengeId) => {
  try {
    const { success, data, error } = await fetchChallengeDetails(challengeId);
    if (success) {
      const { minParticipants, maxParticipants } = data;
      console.log(
        'minParticipants:',
        minParticipants,
        'maxParticipants:',
        maxParticipants,
      );
      populateParticipantsDropdown(minParticipants, maxParticipants);
    } else {
      console.error('Failed to load participants:', error);
    }
  } catch (err) {
    console.error('Error loading participants:', err);
  }
};

// Populate participants dropdown
const populateParticipantsDropdown = (minParticipants, maxParticipants) => {
  if (!minParticipants || !maxParticipants) {
    console.error('Invalid participant range');
    return;
  }
  for (let i = minParticipants; i <= maxParticipants; i++) {
    const option = document.createElement('option');
    option.value = i.toString();
    option.textContent = `${i} participant${i > 1 ? 's' : ''}`;
    participantsDropdown.appendChild(option);
  }
  console.log('type of participants:', typeof minParticipants);
};

//-----------------------FETCH AND DISPLAY AVAILABLE SLOTS----------------

const loadAvailableTimes = async (challengeId, selectedDate) => {
  try {
    const {
      success,
      data: slots,
      error,
    } = await fetchAvailableTimes(challengeId, selectedDate);
    if (success) {
      const timeRanges = slots.map((slot) => {
        // Parse start time into hours and minutes
        const [hours, minutes] = slot.split(':').map(Number);

        // Calculate end time (90 minutes later)
        const endTime = new Date();
        endTime.setHours(hours);
        endTime.setMinutes(minutes + 90);

        // Format end time as HH:mm
        const endHours = String(endTime.getHours()).padStart(2, '0');
        const endMinutes = String(endTime.getMinutes()).padStart(2, '0');
        const formattedEndTime = `${endHours}:${endMinutes}`;

        // Return an object with start time and range
        return {
          value: slot, // Start time (HH:mm)
          label: `${slot} - ${formattedEndTime}`, // Full time range
        };
      });

      // Update dropdown with the new time ranges
      updateDropdown(timeDropdown, timeRanges);
    } else {
      console.error('Failed to load available times:', error);
    }
  } catch (err) {
    console.error('Error loading available times:', err);
  }
};

//---------------------VALIDATE EMAIL AND NAME------------------

const validateEmail = (event) => {
  const isValid = isValidEmail(event.target.value);
  event.target.setCustomValidity(
    isValid ? '' : 'Please enter a valid email address.',
  );
};

const validateName = (event) => {
  const trimmedName = event.target.value.trim();
  if (trimmedName.length === 0) {
    event.target.setCustomValidity(
      'Name should not be empty or contain only spaces.',
    );
  } else if (!/^[a-zA-Z\s]{2,}$/.test(trimmedName)) {
    event.target.setCustomValidity(
      'Please enter a valid name (letters only, at least 2 characters).',
    );
  } else {
    event.target.setCustomValidity('');
  }
};

//--------------------- FORM SUBMITION-----------------------------

const handleFormSubmission = async (event) => {
  event.preventDefault();
  // Validate name before submission

  console.log('Selected Date:', selectedDate);
  console.log('Challenge ID:', challengeId);
  const nameValue = nameInput.value.trim();
  if (nameValue.length === 0) {
    nameInput.setCustomValidity('Name should not be empty.');
    nameInput.reportValidity();
    return; // Stop submission
  } else {
    nameInput.setCustomValidity(''); // Clear validation message
  }
  // Validate email before submission
  const emailValue = emailInput.value.trim();
  if (!isValidEmail(emailValue)) {
    emailInput.setCustomValidity('Please enter a valid email address.');
    emailInput.reportValidity();
    return; // Stop submission
  } else {
    emailInput.setCustomValidity(''); // Clear validation message
  }

  if (!selectedDate || !challengeId) {
    showAlert('Missing challenge ID or selected date.');
    return; // Stop submission
  }

  // Extract form data
  const reservationData = {
    challengeId,
    name: nameValue,
    email: emailValue,
    date: selectedDate,
    time: form['selected_time'].value,
    participants: parseInt(form['selected_participants'].value, 10),
  };

  // console.log('Reservation Data:', reservationData);

  try {
    // Send reservation request
    const { success, data, error } = await createReservation(reservationData);

    if (success) {
      console.log('Reservation created successfully:', data);
      nameInput.value = '';
      emailInput.value = '';
      timeDropdown.selectedIndex = 0; // Reset to placeholder
      participantsDropdown.selectedIndex = 0;

      showSteps(3);
      //------------------------------------------------------
      // you need to put logic to go to the thank you part from Ronja
      //-------------------------------------------------------
    } else {
      console.error('Failed to create reservation:', error);
      showAlert('Failed to create reservation. Please try again.');
    }
  } catch (err) {
    console.error('Error creating reservation:', err);
    showAlert('An unexpected error occurred. Please try again.');
  }
};

//------------------ADDEVENTLISTENERS--------------------

// Load participants and available times on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  emailInput.addEventListener('input', validateEmail);
  nameInput.addEventListener('input', validateName);
});

if (!form._hasSubmitListener) {
  form.addEventListener('submit', handleFormSubmission);
  form._hasSubmitListener = true;
}
