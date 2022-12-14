'use strict';

const categories = [
  {
    name : 'Tinto',
    createdAt: new Date()
  },
  {
    name : 'Blanco',
    createdAt: new Date()
  },
  {
    name : 'Rosado',
    createdAt: new Date()
  },
  {
    name : 'Espumoso',
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
