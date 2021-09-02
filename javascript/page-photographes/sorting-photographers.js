//Test class
class PhotographerFactory {
  static finderIdPhotographer(data) {
    let id;

    if (location.search === "?id=243") {
      id = new Mimi(data);
    } else if (location.search === "?id=930") {
      id = new Ellie(data);
    } else if (location.search === "?id=82") {
      id = new Tracy(data);
    } else if (location.search === "?id=527") {
      id = new Nabeel(data);
    } else if (location.search === "?id=925") {
      id = new Rhode(data);
    } else if (location.search === "?id=195") {
      id = new Marcel(data);
    }
    return id;
  }
}

class Photographer {
  constructor(photographer) {
    this.IdPhotographer = photographer.photographerId;
    this.imagePhotographer = photographer.image;
    this.videoPhotographer = photographer.video;
  }
}

class Mimi extends Photographer {
  say() {
    console.log("I'm Mimi", this);
  }
}

class Ellie extends Photographer {
  say() {
    console.log("I'm Ellie-Rose", this);
  }
}

class Tracy extends Photographer {
  say() {
    console.log("I'm Tracy", this);
  }
}

class Nabeel extends Photographer {
  say() {
    console.log("I'm Nabeel", this);
  }
}

class Rhode extends Photographer {
  say() {
    console.log("I'm Rhode", this);
  }
}

class Marcel extends Photographer {
  say() {
    console.log("I'm Marcel", this);
  }
}

// Display photographer ID
async function loadIdPhotographers() {
  const photographerData = await fetchPhotographers();
  const showAllId = photographerData.media;
  const medias = showAllId.filter(function (media) {
    if (location.search === "?id=243") {
      return media.photographerId == "243";
    } else if (location.search === "?id=930") {
      return media.photographerId == "930";
    } else if (location.search === "?id=82") {
      return media.photographerId == "82";
    } else if (location.search === "?id=527") {
      return media.photographerId == "527";
    } else if (location.search === "?id=925") {
      return media.photographerId == "925";
    } else if (location.search === "?id=195") {
      return media.photographerId == "195";
    }
  });
  showAllId.forEach((data) => {
    const ID = PhotographerFactory.finderIdPhotographer(data);
    ID.say();
    console.log(medias);
  });
}
