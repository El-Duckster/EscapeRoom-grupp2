const BASE_URL = 'https://lernia-sjj-assignments.vercel.app/api';

// Helper function to validate date format (YYYY-MM-DD)
export const isValidDate= (dateString) => {
  const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  if (!regex.test(dateString)) return false;

  // Further validate logical date correctness
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
}


// Helper function to validate time format (HH:mm)
export const isValidTime = (timeString) => {
  // Regular expression to strictly match valid time formats
  const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
  return regex.test(timeString);
}

export const isDateAtLeastTomorrow = (dateString) => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); 
  const tomorrow = new Date(today);
  tomorrow.setUTCDate(today.getUTCDate() + 1); 
  const inputDate = new Date(dateString);

  return inputDate >= tomorrow; 
};


// Helper function for a simple input validation
export const validateReservationInput = ({
  challengeId,
  name,
  email,
  date,
  time,
  participants,
}) => {
  if (
    typeof challengeId !== 'number' ||
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof date !== 'string' ||
    typeof time !== 'string' ||
    typeof participants !== 'number'
  ) {
    console.log('Invalid parameter/s: ', {
      challengeId,
      name,
      email,
      date,
      time,
      participants,
    });
    return false;
  }
  if (!isValidDate(date)) {
    console.log("Invalid 'date': Must be in YYYY-MM-DD format.");
    return false;
  }
  if (!isDateAtLeastTomorrow(date)) {
    console.log("Invalid 'date': Booking must be at least tomorrow or later.");
    return false;
  }
  if (!isValidTime(time)) {
    console.log("Invalid 'time': Must be in HH:mm format.");
    return false;
  }
  return true;
};

//API Services:

// Generalized fetch function that accepts options and throws errors for critical issues
const fetchApi = async (url, requestOptions = {}) => {
  try {
    const res = await fetch(url, requestOptions);
    if (!res.ok) {
      const errorText = await res.text();
      console.log(`Error response from ${url}:`, errorText);
      throw new Error(
        `HTTP error! status: ${res.status}, message: ${errorText}`,
      );
    }
    return await res.json();
  } catch (error) {
    console.log(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

// Fetch all challenges
export const fetchAllChallenges = async () => {
  try {
    const { challenges } = await fetchApi(`${BASE_URL}/challenges`);
    console.log('Challenges:', challenges);
    return { success: true, data: challenges ?? [] };
  } catch (error) {
    return { success: false, data: [], error: error.message };
  }
};

// Fetch available times per a date
export const fetchAvailableTimes = async (challengeId, date) => {
  if (typeof challengeId !== 'number' || typeof date !== 'string') {
    console.log('Invalid parameters:', { challengeId, date });
    return { success: false, data: [], error: 'Invalid parameters' };
  }

  try {
    const { slots } = await fetchApi(
      `${BASE_URL}/booking/available-times?date=${date}&challenge=${challengeId}`,
    );
    console.log('Available slots:', slots);
    return { success: true, data: slots ?? [] };
  } catch (error) {
    return { success: false, data: [], error: error.message };
  }
};

export const fetchChallengeDetails = async (challengeId) => {
  try {
    // Fetch all challenges
    const { success, data: challenges, error } = await fetchAllChallenges();
    if (!success) {
      console.error('Failed to fetch challenges:', error);
      return { success: false, data: null, error };
    }

    // Find the challenge by ID
    const challengeDetails = challenges.find(
      (challenge) => challenge.id === challengeId,
    );

    if (!challengeDetails) {
      console.error(`Challenge with ID ${challengeId} not found.`);
      return { success: false, data: null, error: 'Challenge not found' };
    }

    console.log('Found challenge details:', challengeDetails);
    return { success: true, data: challengeDetails };
  } catch (err) {
    console.error('Error finding challenge details:', err);
    return { success: false, data: null, error: err.message };
  }
};

// Create reservation with  simple input validation
export const createReservation = async (reservationData) => {
  if (!validateReservationInput(reservationData)) {
    return { success: false, error: 'Invalid input data' };
  }

  try {
    const res = await fetchApi(`${BASE_URL}/booking/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        challenge: reservationData.challengeId,
        name: reservationData.name,
        email: reservationData.email,
        date: reservationData.date,
        time: reservationData.time,
        participants: reservationData.participants,
      }),
    });

    if (res?.status === 'ok') {
      console.log('Booking successful:', res);
      return { success: true, data: res.booking };
    } else {
      return { success: false, error: 'Reservation failed' };
    }
  } catch (error) {
    console.log('Error in creating reservation:', error);
    return { success: false, error: error.message };
  }
};
