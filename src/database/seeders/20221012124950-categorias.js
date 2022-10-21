'use strict';

const categories = [
  {
    name : 'Destacados',
    createdAt: new Date()
  },
  {
    name : 'Ofertas',
    createdAt: new Date()
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.bulkInsert('Categories', categories, {});
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
    
  }
};
