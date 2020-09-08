'use strict'
$.ajax('../data/page-1.json', {method: 'get', dataType: 'JSON'})
  .then(hornedAnimals => {
    hornedAnimals.forEach(horned =>{
      new animal(horned).render();
    })
  })

function animal(object){
  this.title = object.title;
  this.description = object.description;
  this.keyword = object.keyword;
  this.horns = object.horns;
  this.image_url = object.image_url;
}

animal.prototype.render = function(){
  const myTemplate = $('#photo-template').html();
  const $newSection = $(`<section>${myTemplate}</section>`);

  $newSection.find('h2').text(this.title);
  $newSection.find('p').text(this.horns);
  $newSection.find('img').attr('src',this.image_url);

  $('main').append($newSection);

}