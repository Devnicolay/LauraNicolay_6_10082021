import { Photographer } from "../photographers.js";
import { ApiFisheye } from "../api-fisheye.js";

const likesAndPrice = document.querySelector(".likes-and-price");

export class Like {
  static async likeAndPrice() {
    const photographer = await ApiFisheye.getPhotographerId();
    const photographerConstructor = new Photographer(photographer);
    likesAndPrice.innerHTML = photographerConstructor.createTemplateLikes();
    Like.totalLikes();
  }

  static likeMedia() {
    this.dataset.clicked = this.dataset.clicked == "true" ? "false" : "true";
  }

  static calculationLikeClicked() {
    const mediasClicked = document.querySelectorAll(
      ".heart[data-clicked='true']"
    ).length;
    console.log(mediasClicked);
    return mediasClicked;
  }

  // calculation total likes
  static totalLikes() {
    const counterLike = document.querySelector(
      ".likes-and-price .counter-like span"
    );
    const totalLikes = document.querySelectorAll(".like");
    let likeSum = 0;
    totalLikes.forEach(function (like) {
      const likeUnit = Number(like.textContent);
      likeSum += likeUnit;
    });
    const likeClicked = Like.calculationLikeClicked();
    counterLike.innerHTML = likeSum + likeClicked;
    return likeSum;
  }

  // Colored heart, increment like to medias likes and to total like count
  static increment() {
    const mediasClicked = document.querySelectorAll(
      ".heart[data-clicked='true']"
    );
    const mediasNotClicked = document.querySelectorAll(
      ".heart[data-clicked='false']"
    );
    const iconHeart = document.querySelector(".heart");
    const total = Like.totalLikes();
    if (mediasClicked) {
      iconHeart.innerHTML = "<i class='fas fa-heart' aria-label='likes'>"; // colored heart icon
      return total + 1;
    } else if (mediasNotClicked) {
      iconHeart.innerHTML = "<i class='far fa-heart' aria-label='likes'>"; // discolored heart icon
      return total - 1;
    }
  }
}
