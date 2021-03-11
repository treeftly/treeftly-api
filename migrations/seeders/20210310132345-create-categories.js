module.exports = {
  up: async (queryInterface) => {
    queryInterface.bulkInsert('categories', [
      {
        label: '#CBD5E0',
        name: 'Transport',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: '#1A202C',
        name: 'Food',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: '#E53E3E',
        name: 'Groceries',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: '#63171B',
        name: 'Shopping',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: '#DD6B20',
        name: 'Utility Bills',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: '#D69E2E',
        name: 'Insurance',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: '#38A169',
        name: 'Telecommunications',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: '#319795',
        name: 'Medical & Dental',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: '#3182ce',
        name: 'Entertainment',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: '#00B5D8',
        name: 'Gifts',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: '#805AD5',
        name: 'Income Tax',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: '#D53F8C',
        name: 'Travel',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface) => {
    queryInterface.bulkDelete('categories', null, {})
  },
}
