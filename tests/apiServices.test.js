import { jest } from '@jest/globals';
import {
  fetchAllChallenges,
  fetchAvailableTimes,
  fetchChallengeDetails,
  createReservation,
  isValidDate,
  isValidTime,
  isDateAtLeastTomorrow,
  validateReservationInput,
} from '@/js/apiService.js'; 

global.fetch = jest.fn();

describe('API and Helper Functions', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  describe('Helper Functions', () => {

    it('isDateAtLeastTomorrow should validate dates correctly', () => {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
    
      const yesterday = new Date(today);
      yesterday.setUTCDate(today.getUTCDate() - 1);
    
      const tomorrow = new Date(today);
      tomorrow.setUTCDate(today.getUTCDate() + 1);
    
      const dayAfterTomorrow = new Date(today);
      dayAfterTomorrow.setUTCDate(today.getUTCDate() + 2);
    
      // Convert dates to string format (YYYY-MM-DD) for testing
      const formatDate = (date) =>
        date.toISOString().split('T')[0]; 
    
      expect(isDateAtLeastTomorrow(formatDate(today))).toBe(false); 
      expect(isDateAtLeastTomorrow(formatDate(yesterday))).toBe(false); 
      expect(isDateAtLeastTomorrow(formatDate(tomorrow))).toBe(true); 
      expect(isDateAtLeastTomorrow(formatDate(dayAfterTomorrow))).toBe(true); 
    });
    
    it('isValidDate should validate correct date formats', () => {
      expect(isValidDate('2025-12-01')).toBe(true);
      expect(isValidDate('01-12-2025')).toBe(false);
      expect(isValidDate('2025/12/01')).toBe(false);
      expect(isValidDate('2025-13-01')).toBe(false); 
    });

    it('isValidTime should validate correct time formats', () => {
      expect(isValidTime('10:00')).toBe(true);
      expect(isValidTime('25:00')).toBe(false); 
      expect(isValidTime('10:60')).toBe(false); 
      expect(isValidTime('10.00')).toBe(false); 
    });

    it('validateReservationInput should validate reservation data correctly', () => {
      const validData = {
        challengeId: 1,
        name: 'John Doe',
        email: 'john@example.com',
        date: '2025-12-01',
        time: '10:00',
        participants: 5,
      };

      const invalidData = {
        ...validData,
        email: null, 
      };

      expect(validateReservationInput(validData)).toBe(true);
      expect(validateReservationInput(invalidData)).toBe(false);
    });
  
  });

  describe('API Service Functions', () => {
    it('fetchAllChallenges should return challenges on successful response', async () => {
      const mockChallenges = { challenges: [{ id: 1, name: 'Challenge 1' }] };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockChallenges),
      });

      const result = await fetchAllChallenges();
      expect(fetch).toHaveBeenCalledWith(
        'https://lernia-sjj-assignments.vercel.app/api/challenges',
        {},
      );
      expect(result).toEqual({
        success: true,
        data: mockChallenges.challenges,
      });
    });

    it('fetchAvailableTimes should return available times for valid input', async () => {
      const mockSlots = { slots: ['10:00', '11:00'] };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockSlots),
      });

      const result = await fetchAvailableTimes(1, '2025-12-01');
      expect(fetch).toHaveBeenCalledWith(
        'https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=2025-12-01&challenge=1',
        {},
      );
      expect(result).toEqual({ success: true, data: mockSlots.slots });
    });

    it('fetchChallengeDetails should return details for a valid challenge ID', async () => {
      const mockChallenges = { challenges: [{ id: 1, name: 'Challenge 1' }] };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockChallenges),
      });

      const result = await fetchChallengeDetails(1);
      expect(result).toEqual({
        success: true,
        data: { id: 1, name: 'Challenge 1' },
      });
    });

    it('fetchChallengeDetails should handle non-existent challenge ID', async () => {
      const mockChallenges = { challenges: [] };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockChallenges),
      });

      const result = await fetchChallengeDetails(1);
      expect(result).toEqual({
        success: false,
        data: null,
        error: 'Challenge not found',
      });
    });

    it('createReservation should succeed with valid input', async () => {
      const mockResponse = { status: 'ok', booking: { id: 123 } };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const reservationData = {
        challengeId: 1,
        name: 'John Doe',
        email: 'john@example.com',
        date: '2025-12-01',
        time: '10:00',
        participants: 5,
      };

      const result = await createReservation(reservationData);
      expect(fetch).toHaveBeenCalledWith(
        'https://lernia-sjj-assignments.vercel.app/api/booking/reservations',
        expect.objectContaining({
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
        }),
      );
      expect(result).toEqual({ success: true, data: mockResponse.booking });
    });

    it('createReservation should fail with invalid input', async () => {
      const invalidReservationData = {
        challengeId: 1,
        name: 'John Doe',
        email: null, // Invalid email
        date: '2025-12-01',
        time: '10:00',
        participants: 5,
      };

      const result = await createReservation(invalidReservationData);
      expect(result).toEqual({ success: false, error: 'Invalid input data' });
    });

    it('createReservation should handle API errors gracefully', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      const reservationData = {
        challengeId: 1,
        name: 'John Doe',
        email: 'john@example.com',
        date: '2025-12-01',
        time: '10:00',
        participants: 5,
      };

      const result = await createReservation(reservationData);
      expect(result).toEqual({ success: false, error: 'Network error' });
    });
  });
});
