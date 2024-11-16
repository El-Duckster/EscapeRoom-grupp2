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
    challengeRating.className = "room__ratings"

    for (let i = 1; i <= 5; i++) {
      const star = new Image();

      if (i <= Math.floor(rate)) {
        star.src = "assets/svg/star-filled.svg";
        star.className = "star filled";
      } else if (i === Math.ceil(rate) && rate % 1 !== 0) {
        star.src = "assets/svg/star-half.svg";
        star.className = "star half";
      } else {
        star.src = "assets/svg/star.svg";
        star.className = "star unfilled";
      }

      challengeRating.appendChild(star);
    }
    return challengeRating;
  }

  createChallengeCard() {
    const liItem = document.createElement("li");
    liItem.id = "room__carousel__slide" + this.id;
    liItem.setAttribute('tabindex', 0);
    liItem.className = "challenge__slide challengey challenges" + this.id;

    const imageContainer = document.createElement("div");
    imageContainer.className = "challenge__image-container"

    const img = document.createElement("img");
    img.className = "challenge__img";
    img.src = this.image;
    img.alt = this.description;
    img.loading = "lazy";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    imageContainer.appendChild(img);

    const detailsContainer = document.createElement("div");
    detailsContainer.className = "challenge__details";


    const title = document.createElement("h2");
    title.className = "challenge__details__title";
    title.textContent = this.title;

    const detailsInfo = document.createElement("div");
    detailsInfo.className = "challenge__details-info";

    const rating = this.createChallengeStars();

    const challengeParticipants = document.createElement("div");
    challengeParticipants.className = "challenge__participants";
    challengeParticipants.textContent = `${this.minParticipants} - ${this.maxParticipants} participants`;

    detailsInfo.appendChild(rating);
    detailsInfo.appendChild(challengeParticipants);

    const challengeDescription = document.createElement("p");
    challengeDescription.className = "challenge__description"
    challengeDescription.textContent = this.description;

    const link = document.createElement("a");
    link.className = "challenge__btn";
    link.textContent = "Book this challenge";

    detailsContainer.appendChild(title);
    detailsContainer.appendChild(detailsInfo);
    detailsContainer.appendChild(challengeDescription);
    detailsContainer.appendChild(link);

    liItem.appendChild(imageContainer);
    liItem.appendChild(detailsContainer);

    return liItem;
  }
}

export default Challenge;