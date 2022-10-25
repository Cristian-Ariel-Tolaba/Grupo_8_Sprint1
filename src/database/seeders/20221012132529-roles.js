'use strict';

const rols = [
  {
    name : 'admin',
    createdAt: new Date()
  },
  {
    name : 'user',
    createdAt: new Date()
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.bulkInsert('Rols', rols, {});
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Rols', null, {});
    
  }
};