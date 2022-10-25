'use strict';

const imagesDB = require('../../data/image.json')

const images = imagesDB.map(({image}, index) => {
  return {
    file: image,
    productId: index + 1,
    createdAt: new Date()
  }
})
  
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.bulkInsert('Images', images, {});
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
    
  }
};
