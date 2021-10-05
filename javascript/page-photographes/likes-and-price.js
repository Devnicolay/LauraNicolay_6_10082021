import Photographer from "../photographers";
const likesAndPrice = document.querySelector(".likes-and-price");

async function likeAndPrice() {
  const photographer = await photographerById();
  const photographerConstructor = new Photographer(photographer);
  likesAndPrice.innerHTML = photographerConstructor.createTemplateLikes();
  totalLikes();
}

function likeMedia() {
  this.dataset.clicked = this.dataset.clicked == "true" ? "false" : "true";
}

function calculationLikeClicked() {
  const mediasClicked = document.querySelectorAll(
    ".heart[data-clicked='true']"
  ).length;
  console.log(mediasClicked);
  return mediasClicked;
}

// calculation likes
function totalLikes() {
  const counterLike = document.querySelector(
    ".likes-and-price .counter-like span"
  );
  const totalLikes = document.querySelectorAll(".like");
  let likeSum = 0;
  totalLikes.forEach(function (like) {
    const likeUnit = Number(like.textContent);
    likeSum += likeUnit;
  });
  const likeClicked = calculationLikeClicked();
  counterLike.innerHTML = likeSum + likeClicked;
  return likeSum;
}

// increment like at totalLikes
function increment(event) {
  const mediasClicked = document.querySelectorAll(
    ".heart[data-clicked='true']"
  );
  const mediasNotClicked = document.querySelectorAll(
    ".heart[data-clicked='false']"
  );
  const iconHeart = document.querySelector(".heart");
  const total = totalLikes();
  if (mediasClicked) {
    iconHeart.innerHTML = "<i class='fas fa-heart' aria-label='likes'>";
    return total + 1;
  } else if (mediasNotClicked) {
    iconHeart.innerHTML = "<i class='far fa-heart' aria-label='likes'>";
    return total - 1;
  }
}

function incrementTotalLikes() {
  const counterLike = document.querySelector(
    ".likes-and-price .counter-like span"
  );
  const resultIncrement = increment();
  counterLike.innerHTML = resultIncrement;
}
