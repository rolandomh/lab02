'use strict'

var keywords = [];

$.ajax('../data/page-1.json', {method: 'get', dataType: 'JSON'})
  .then(hornedAnimals => {
    hornedAnimals.forEach(horned =>{
      keywords.push(horned.keyword);
      new animal(horned).render();
    })
    console.log(keywords);
    populateDropdown();
    $('select').on('change', filterHorns);
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
var populateDropdown = function(){
  const $dropDown = $('select');
  keywords.forEach( keyword => {
    const $option = $('<option></option>');
    $option.text(keyword);
    $dropDown.append($option);
    $option.attr('value', keyword);
  })
var filterHorns = function(){
  //grab nEvent.hide -grab.each ...match keyword
}

}
