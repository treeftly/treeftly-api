module.exports = {
  up: async (queryInterface) => {
    queryInterface.bulkInsert('categories', [
      {
        label: '#C05621',
        name: 'Transport',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: '#F56565',
        name: 'Food',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: '#ED8936',
        name: 'Groceries',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: '#3182ce',
        name: 'Shopping',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: '#4A5568',
        name: 'Utility Bills',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: '#38A169',
        name: 'Insurance',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: '#805AD5',
        name: 'Telecommunications',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: '#9DECF9',
        name: 'Medical & Dental',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: '#FEB2B2',
        name: 'Entertainment',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: '#7B341E',
        name: 'Gifts',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: '#44337A',
        name: 'Income Tax',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: '#FBD38D',
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
