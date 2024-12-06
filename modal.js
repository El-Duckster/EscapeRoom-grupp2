import { openBookingModal } from '../js/modal1';
import { fetchAvailableTimes } from '../js/apiService';

jest.mock('../js/apiService', () => ({
  fetchAvailableTimes: jest.fn(),
}));

describe('modal functionality', () => {
  let modal, dateInput, searchButton, finishBookingButton, step1, step2, step3;

  beforeEach(() => {
    // Set up mock DOM structure
    document.body.innerHTML = `
      <div class="booking-modal" style="display: none;">
        <div id="step1" class="booking-modal__step"></div>
        <div id="step2" class="booking-modal__step"></div>
        <div id="step3" class="booking-modal__step"></div>
      </div>
      <input class="custom__date" />
      <button class="booking__search-btn"></button>
      <button class="booking__finish-btn"></button>
    `;

    // Get mock elements
    modal = document.querySelector('.booking-modal');
    dateInput = document.querySelector('.custom__date');
    searchButton = document.querySelector('.booking__search-btn');
    finishBookingButton = document.querySelector('.booking__finish-btn');
    step1 = document.querySelector('#step1');
    step2 = document.querySelector('#step2');
    step3 = document.querySelector('#step3');

    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('should attach an event listener to .custom__date element if it exists', () => {
    expect(dateInput).not.toBeNull();
    const eventListenerSpy = jest.spyOn(dateInput, 'addEventListener');
    
    // Simulate DOMContentLoaded event
    document.dispatchEvent(new Event('DOMContentLoaded'));

    expect(eventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  it('should display the modal when openBookingModal is called', () => {
    openBookingModal();
    expect(modal.style.display).toBe('block');
    expect(console.log).toHaveBeenCalledWith('modal is now displayed');
  });
});

// import { openBookingModal } from '../js/modal1';
// import { fetchAvailableTimes } from '../js/apiService';

// jest.mock('../js/apiService', () => ({
//   fetchAvailableTimes: jest.fn(),
// }));

// describe('modal functionality', () => {
//   let modal, dateInput, searchButton, finishBookingButton, step1, step2, step3;

//   beforeEach(() => {
//     // Set up mock DOM structure
//     document.body.innerHTML = `
//       <div class="booking-modal" style="display: none;">
//         <div id="step1" class="booking-modal__step"></div>
//         <div id="step2" class="booking-modal__step"></div>
//         <div id="step3" class="booking-modal__step"></div>
//       </div>
//       <input class="custom__date" />
//       <button class="booking__search-btn"></button>
//       <button class="booking__finish-btn"></button>
//     `;

//     // Get mock elements
//     modal = document.querySelector('.booking-modal');
//     dateInput = document.querySelector('.custom__date');
//     searchButton = document.querySelector('.booking__search-btn');
//     finishBookingButton = document.querySelector('.booking__finish-btn');
//     step1 = document.querySelector('#step1');
//     step2 = document.querySelector('#step2');
//     step3 = document.querySelector('#step3');

//     // Mock functions
//     jest.spyOn(dateInput, 'addEventListener').mockImplementation((event, handler) => {
//       if (event === 'keydown') {
//         handler({ preventDefault: jest.fn() });
//       }
//     });
//     jest.spyOn(searchButton, 'addEventListener');
//     jest.spyOn(finishBookingButton, 'addEventListener');
//     jest.spyOn(console, 'log').mockImplementation(() => {});
//   });

//   afterEach(() => {
//     jest.restoreAllMocks();
//     document.body.innerHTML = '';
//   });

//   it('should display the modal when openBookingModal is called', () => {
//     openBookingModal();
//     expect(modal.style.display).toBe('block');
//     expect(console.log).toHaveBeenCalledWith('modal is now displayed');
//   });

//   it('should attach an event listener to the custom__date element', () => {
//     expect(dateInput.addEventListener).toHaveBeenCalledWith(
//       'keydown',
//       expect.any(Function)
//     );
//   });

//   it('should fetch and display available times on search button click', async () => {
//     const mockAvailableTimes = { success: true, data: ['10:00', '11:00'] };
//     fetchAvailableTimes.mockResolvedValueOnce(mockAvailableTimes);

//     dateInput.value = '2023-12-01';
//     searchButton.click();

//     await new Promise(process.nextTick); // Wait for async actions

//     const timesContainer = document.querySelector('.available-times');
//     expect(fetchAvailableTimes).toHaveBeenCalledWith(3, '2023-12-01');
//     expect(timesContainer).not.toBeNull();
//     expect(timesContainer.querySelectorAll('button.time-slot').length).toBe(2);
//     expect(console.log).toHaveBeenCalledWith('Available times are successfully displayed');
//   });

//   it('should alert if no date is selected when searching', () => {
//     window.alert = jest.fn();
//     searchButton.click();
//     expect(window.alert).toHaveBeenCalledWith('Please, select a valid date!');
//   });

//   it('should hide modal and show step 3 when finish booking is clicked', () => {
//     finishBookingButton.click();
//     expect(modal.style.display).toBe('none');
//     expect(console.log).toHaveBeenCalledWith('Showing step 3');
//   });

//   it('should log an error if fetching available times fails', async () => {
//     fetchAvailableTimes.mockRejectedValueOnce(new Error('Network error'));

//     dateInput.value = '2023-12-01';
//     searchButton.click();

//     await new Promise(process.nextTick); // Wait for async actions

//     expect(fetchAvailableTimes).toHaveBeenCalledWith(3, '2023-12-01');
//     expect(console.log).toHaveBeenCalledWith(
//       'Error fetching data from https://lernia-sjj-assignments.vercel.app/api/booking/available-times: Error: Network error'
//     );
//   });
// });
