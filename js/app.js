'use strict'

$().ready(() => {
  const animalsArray = [];

  $.ajax('../data/page-1.json', {method: 'get', dataType: 'JSON'})
    .then(hornedAnimals => {
      console.log(hornedAnimals);
      hornedAnimals.forEach((horned) => {
        new Animal(horned).render();
      })
      populateDropdown();
    // $('select').on('change', filterHorns);
    })
  function Animal(object) {
    this.title = object.title;
    this.description = object.description;
    this.keyword = object.keyword;
    this.horns = object.horns;
    this.image_url = object.image_url;
    animalsArray.push(this);
  }

  Animal.prototype.render = function(){
    const myTemplate = $('#photo-template').html();
    const $newSection = $(`<section class="${this.keyword}">${myTemplate}</section>`);

    $newSection.find('h2').text(this.title);
    $newSection.find('p').text(this.description);
    $newSection.find('img').attr('src',this.image_url);

    $('main').append($newSection);

  }
  const populateDropdown = () => {
    const keywordArray = [];
    // const $dropDown = $('select');
    animalsArray.forEach((animal) => {
      if (keywordArray.includes(animal.keyword) === false) {
        keywordArray.push(animal.keyword);
      }

      keywordArray.forEach((keyword) => {
        const $option = $(`<option></option>`);
        $option.text(keyword);
        $option.attr('value', keyword);
        $('select').append($option);
      });
      console.log(keywordArray)
    })

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
  }
})
