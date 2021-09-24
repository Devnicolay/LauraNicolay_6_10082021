const likesAndPrice = document.querySelector(".likes-and-price");

async function likeAndPrice() {
  const photographer = await photographerById();
  const photographerConstructor = new Photographer(photographer);
  likesAndPrice.innerHTML = photographerConstructor.createTemplateLikes();
  totalLikes();
}

function likeMedia() {
  this.dataset.quantitylikes =
    this.dataset.quantitylikes == "true" ? "false" : "true";
}

function calculationLikeClicked() {
  const mediasClicked = document.querySelectorAll(
    ".like[data-quantitylikes='true']"
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
  counterLike.innerHTML = likeSum;
  return likeSum;
}

async function calcul() {
  const totalLikes = await totalLikes();
  const mediasClicked = calculationLikeClicked();
  const total = totalLikes + mediasClicked;
  console.log(total);
}
