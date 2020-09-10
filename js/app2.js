'use strict'

$().ready(() => {
  const animalsArray = [];

  $.ajax('data/page-2.json', {method: 'GET', dataType: 'JSON'})
    .then((hornedAnimals) => {
      hornedAnimals.forEach((horned) => {
        new Animal(horned);
      });
      populateDropdown();
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

  // Animal.prototype.render = function(){
  //   const myTemplate = $('#photo-template').html();
  //   const $newSection = $(`<section class="${this.keyword}">${myTemplate}</section>`);

  //   $newSection.find('h2').text(this.title);
  //   $newSection.find('p').text(this.description);
  //   $newSection.find('img').attr('src', this.image_url);

  //   $('main').append($newSection);

  // }

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
  Animal.prototype.createHTML = function () {
    let myTemplate = $('#mustacheHelp').html();
    let html = Mustache.render(myTemplate, this);
    return html;
  };
});
