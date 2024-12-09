import'../styles/layouts/rooms.scss';
import {openBookingModal} from './modal1.js'

import starFilled from '../../assets/svg/star-filled.svg';
import starHalf from '../../assets/svg/star-half.svg';
import starEmpty from '../../assets/svg/star.svg';

class Challenge {
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

  createChallengeStars() {
    // Drawing a stars
    const rate = this.rating;
    const challengeRating = document.createElement("div");
    challengeRating.className = "challenge__ratings"

    for (let i = 1; i <= 5; i++) {
      const star = new Image();

      if (i <= Math.floor(rate)) {
        star.src = starFilled;
        star.className = "star filled";
      } else if (i === Math.ceil(rate) && rate % 1 !== 0) {
        star.src = starHalf; 
        star.className = "star half";
      } else {
        star.src = starEmpty;
        star.className = "star unfilled";
      }

      challengeRating.appendChild(star);
    }
    return challengeRating;
  }

  createBookChallengeBtn() {
      const bookingBtn = document.createElement("button");
      bookingBtn.className = "challenge__btn";
  
      if (this.type === "onsite") {
          bookingBtn.textContent = "Book this room";
          bookingBtn.addEventListener('click', () => openBookingModal(this.id)); 
      } else if (this.type === "online") {
          bookingBtn.textContent = "Take challenge online";
          bookingBtn.addEventListener('click', () => openBookingModal(this.id)); 
      }
      return bookingBtn;
    }

  createChallengeCard(btn) {
    const liItem = document.createElement("li");
    liItem.id = "challenges__carousel__slide" + this.id;
    liItem.setAttribute('tabindex', 0);
    liItem.className = "challenge__slide challengey challenges";

    const imageContainer = document.createElement("div");
    imageContainer.className = "challenge__image-container"

    const img = document.createElement("img");
    img.className = "challenge__img";
    img.src = this.image;
    img.alt = this.description;
    img.loading = "lazy";
    imageContainer.appendChild(img);

    const detailsContainer = document.createElement("div");
    detailsContainer.className = "challenge__details";


    const title = document.createElement("h2");
    title.className = "challenge__details__title_temporary";
    title.textContent = this.title + (this.type === "onsite" ? " (onsite)" : "");

    const detailsInfo = document.createElement("div");
    detailsInfo.className = "challenge__details-info";

    const rating = this.createChallengeStars();

    const challengeParticipants = document.createElement("div");
    challengeParticipants.className = "challenge__participants";
    challengeParticipants.textContent = `${this.minParticipants} - ${this.maxParticipants} participants`;
    if (this.type === "online") {
      challengeParticipants.textContent += " (networked)";
    }
    imageContainer.appendChild(rating);
    detailsInfo.appendChild(challengeParticipants);
    
    
    const challengeDescription = document.createElement("p");
    challengeDescription.className = "challenge__description"
    challengeDescription.textContent = this.description;
    
    detailsContainer.appendChild(title);

    if (this.labels && this.labels.length > 0) {
      const labels = this.createLabels();
      detailsContainer.appendChild(labels); 
    }
    detailsContainer.appendChild(detailsInfo);
    detailsContainer.appendChild(challengeDescription);
    
    if(btn){
      detailsContainer.appendChild(this.createBookChallengeBtn());
    }
    
    const typeIcon = document.createElement("span");
    typeIcon.className = "challenge__type-icon";
    
    if (this.type === "online") {
      typeIcon.textContent = "💻"; 
    } else if (this.type === "onsite") {
      typeIcon.textContent = "🏠"; 
    }
    imageContainer.appendChild(typeIcon);
    
    
    liItem.appendChild(imageContainer);
    liItem.appendChild(detailsContainer);
    
    return liItem;
  }
  createLabels() {
    const labelsContainer = document.createElement("div");
    labelsContainer.className = "challenge__labels";

    this.labels.forEach(label => {
      const labelItem = document.createElement("span");
      labelItem.className = "challenge__label";
      labelItem.textContent = `*${label} `; 
      labelsContainer.appendChild(labelItem);
    });

    return labelsContainer;
  }

  
}

export default Challenge;