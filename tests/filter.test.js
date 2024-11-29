import { executeSearch, displaySearchResults } from '@/js/filteringBox.js';
import { getChallengesArray } from '@/js/displayAllChallenges.js';
import { renderChallenges } from '@/js/utilities/renderChallenges.js';

jest.mock('@/js/displayAllChallenges.js');
jest.mock('@/js/utilities/renderChallenges.js');

describe("filteringBox search tests", () => {
  beforeEach(() => {
    document.body.innerHTML = 
      `<input id="DOM__checkBox1" type="checkbox" checked>
      <input id="DOM__checkBox2" type="checkbox" checked>
      <div class="challenges__list"></div>`;
    global.activeTags = [];

  });

  test("executeSearch finds challenges", () => {
    const placeholderChallenges = [
      { title: 'JS challenge', type: 'online', labels: ['javascript'] },
      { title: 'Python challenge', type: 'onsite', labels: ['python'] },
    ];
    getChallengesArray.mockReturnValue(placeholderChallenges);

    const result = executeSearch('JS');

    expect(result).toEqual([{ title: 'JS challenge', type: 'online', labels: ['javascript'] }]);

  });
/*
  test("displaySearchResults shows challenges or nothing", () => {
    const challengesList = document.querySelector('.challenges__list');
    const someResults = [{ title: 'Test challenge' }];

    displaySearchResults(someResults);
    expect(renderChallenges).toHaveBeenCalledWith(someResults, challengesList);

    displaySearchResults([]);
    expect(challengesList.textContent).toBe('No matching challenges');

  });
*/
});
