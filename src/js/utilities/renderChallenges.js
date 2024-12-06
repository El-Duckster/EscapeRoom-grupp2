import Challenge from '../challengeClass.js';

export const renderChallenges = (challenges, container, withButtons = true) => {
   
    container.innerHTML = '';
  
  
    challenges.forEach((challengeData) => {
      const challenge = new Challenge(
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
  
      // Create the card element
      const challengeCard = challenge.createChallengeCard(withButtons);
  
      // Append the card to the container
      container.appendChild(challengeCard);
    });
  };