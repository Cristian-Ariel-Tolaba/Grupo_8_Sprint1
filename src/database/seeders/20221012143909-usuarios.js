'use strict';

const usersDB = require('../../data/usersDB.json')

const users = usersDB.map(user => {
  return {
    ...user,
    createdAt: new Date()
  }
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.bulkInsert('Users', users, {});
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    
  }
};

