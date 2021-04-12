module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('users', [{
    id: 99,
    firstName: 'John',
    lastName: 'Doe',
    email: 'test@mail.com',
    password: '$2a$10$fYWKiMvwXG.S.erQM4b5Uu2y6C6fuV6U0u6YlQaHYbCgUXHdKwLxe', // testing123
    createdAt: new Date(),
    updatedAt: new Date(),
  }]),
  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
}
