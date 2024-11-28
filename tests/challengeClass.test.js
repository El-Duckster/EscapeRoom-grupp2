import Challenge from '../js/challengeClass';

const challenge = new Challenge(
  1,
  'Shell 3000',
  'Hackers of the world, unite',
  'onsite',
  1,
  4,
  2,
  'https://placecats.com/640/480',
  ['bash', 'coding']
);

const starsElement = challenge.createChallengeStars();
const card = challenge.createChallengeCard();
const btn = challenge.mainPageBtn();

test('Checks if challenge constructor is working', () => {
  expect(challenge.id).toBe(1);
  expect(challenge.title).toBe('Shell 3000');
  expect(challenge.description).toBe('Hackers of the world, unite');
  expect(challenge.type).toBe('onsite');
  expect(challenge.minParticipants).toBe(1);
  expect(challenge.maxParticipants).toBe(4);
  expect(challenge.rating).toBe(2);
  expect(challenge.image).toBe('https://placecats.com/640/480');
  expect(challenge.labels).toEqual(['bash', 'coding']);
});


test('Checks if DOM elements for stars is created', () => {
  expect(starsElement).toBeInstanceOf(HTMLElement);
  expect(starsElement.className).toBe('challenge__ratings');
  expect(starsElement.children.length).toBeGreaterThan(0);
});

test('Checks if DOM elements for button is created', () => {
  expect(btn).toBeInstanceOf(HTMLElement);
  expect(btn.className).toBe('challenge__btn');
});

test('Checks if challenge card childrens have a right class names', () => {
  expect(card.className).toBe('challenge__slide challengey challenges');
  expect(card.firstChild.className).toBe('challenge__image-container');
  expect(card.firstChild.nextSibling.className).toBe('challenge__details');
  expect(card.firstChild.firstChild.className).toBe('challenge__img');
  expect(card.firstChild.nextSibling.firstChild.className).toBe('challenge__details__title_temporary');
  expect(card.firstChild.nextSibling.firstChild.nextSibling.className).toBe('challenge__details-info');
  expect(card.firstChild.nextSibling.firstChild.nextSibling.nextSibling.className).toBe('challenge__description');
});

console.log(`
    Challenge title is ${challenge.title}\n
    Star element class is ${starsElement.className}\n
    Button class is ${btn.className}\n
    Challenge DOM has a right image container ${card.firstChild.className}`)