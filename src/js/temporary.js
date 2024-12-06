export default class TCard {
    constructor(
      id,
      title,
      description,
      type,
      minParticipants,
      maxParticipants,
      rating,
      image,
      labels,
    ) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.type = type;
      this.minParticipants = minParticipants;
      this.maxParticipants = maxParticipants;
      this.rating = rating;
      this.image = image;
      this.labels = labels;
    }
    createTCard(challenge) {
        const challengeElement = document.createElement('div');
        challengeElement.classList.add('challenge-card');

        challengeElement.innerHTML = `
            <h3>${challenge.title}</h3>
            <img src="${challenge.image}" alt="${challenge.title}" width="100%">
            <p><strong>Type:</strong> ${challenge.type}</p>
            <p><strong>Description:</strong> ${challenge.description}</p>
            <p><strong>Participants:</strong> ${challenge.minParticipants} - ${challenge.maxParticipants}</p>
            <p><strong>Rating:</strong> ${challenge.rating}</p>
            <p><strong>Labels:</strong> ${challenge.labels.join(', ')}</p>
        `;

        return challengeElement;
    }

    }