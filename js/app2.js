'use strict'

$().ready(() => {
  const animalsArray = [];

  $.ajax('data/page-1.json', {method: 'GET', dataType: 'JSON'})
    .then((hornedAnimals) => {
      hornedAnimals.forEach((horned) => {
        new Animal(horned);
      });
      populateDropdown();
      numberSort();
      animalsArray.forEach((mammals) => {
        $('main').append(mammals.createHTML());
      });
    }
    );
  function Animal(object) {
    this.title = object.title;
    this.description = object.description;
    this.keyword = object.keyword;
    this.horns = object.horns;
    this.image_url = object.image_url;
    animalsArray.push(this);
  }

  const populateDropdown = () => {
    const keywordArray = [];
    animalsArray.forEach((animal) => {
      if (keywordArray.includes(animal.keyword) === false) {
        keywordArray.push(animal.keyword);
      }
    });
    keywordArray.forEach((keyword) => {
      const $selector = $(`<option value="${keyword}">${keyword}</option>`);
      $('select').append($selector);
    });
  };

  $('#menu').on('change', eventHandler);
  function eventHandler(event) {
    $('section').hide();
    animalsArray.forEach((object) => {
      if (event.target.value === object.keyword) {
        // console.log(object);
        $(`section[class = ${object.keyword}]`).show();
      }
    });
  }
  // event handler on change to sort images
  $('#sorter').on('change', sortHandler);
  function sortHandler(event) {
    $('main').empty();
    if (event.target.value === 'alphabetical') {
    //call alphabet sort function
      nameSort();
    } else if (event.target.value === 'number-horns') {
    //call number sort function
      numberSort();
    }
    animalsArray.forEach((critter) => {
      $('main').append(critter.createHtml());
    });
  }
  const numberSort = () => {
    animalsArray.sort((a, b) => {
      a = a.horns;
      b = b.horns;
      return a - b;
    });
  };
  const nameSort = () => {
    animalsArray.sort((a, b) => {
      a = a.title.toLowerCase();
      b = b.title.toLowerCase();
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      } else {
        return 0;
      }
    });
  };

  Animal.prototype.createHTML = function () {
    let myTemplate = $('#mustacheHelp').html();
    let html = Mustache.render(myTemplate, this);
    return html;
  };
});
