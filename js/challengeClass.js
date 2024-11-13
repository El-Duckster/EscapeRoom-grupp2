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

  createRatingStars() {
    // Funktion for rating(under construction)
    const challengeRating = document.createElement("div");
    challengeRating.className = "challenge__ratings"

    for (let i = 0; i < 5; i++) {
      const star = new Image();
      star.src = "assets/svg/star-filled.svg"
      //star.src = "assets/svg/star.svg"
      ratingContainer.appendChild(star);
    }

    return challengeRating;
  }

  //methods:
  createChallengeCard() {
    const liItem = document.createElement("li");
    li.id = "challenge__carousel__slide" + this.id;
    li.tagIndex = 0;
    li.className = "carousel__slide roomy room" + this.id;

    const imageContainer = document.createElement("div");
    imageContainer.className = "challenge__image-container"

    const img = document.createElement("img");
    img.className = "challenge_img";
    img.src = this.image;
    img.alt = this.description;
    img.loading = "lazy";
    imageContainer.appendChild(img);

    const detailsContainer = document.createElement("div");
    detailsContainer.className = "challenge_details";

    const title = document.createElement("h2");
    title.className = "challenge__details__title";
    title.textContent = this.title;

    const detailsInfo = document.createElement("div");
    detailsInfo.className = "challenge__details-info";

    const rating = this.createRatingStars();

    const challengeParticipants = document.createElement("div");
    challengeParticipants.className = "challenge__participants";
    challengeParticipants.textContent = `${this.minParticipants} - ${this.maxParticipants}`;

    detailsInfo.appendChild(rating);
    detailsInfo.appendChild(challengeParticipants);

    const challengeDescription = document.createElement("p");
    challengeDescription.className = "challenge__description"
    challengeDescription.textContent = this.description;

    const link = document.createElement("a");
    link.className = "challenge_btn";
    link.textContent = "Book this challenge";
    link.href(""+this.id)

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

/* <li id="room__carousel__slide1" tabindex="0" class="carousel__slide roomy room1">
  <div class="room__image-container">
    <img class="room__img" src="./assets/images/gallery/image1.png" alt="room1 - description of room 1" loading="lazy">
  </div>
  <div class="room__details">
    <h2 class="room__details__title">Title of room</h2>
    <div class="room__details-info">
      <div class="room__ratings">
        // Vi behöver bygga en funktion för rating
      </div>
      <div class="room__participants"></div>
    </div>
    <p class="room__description">
      Praeterea, ex culpa non invenies unum aut non accusatis unum. Et
      nihil inuitam. Nemo nocere tibi erit, et non inimicos, et.
    </p>
    <a href="#booking-section" class="room__btn">Book this room</a>
  </div>
</li> */