import { Model, DataTypes } from 'sequelize'
import sequelize from '../utils/db'

class User extends Model {}

User.init({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  consumerId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { sequelize })

export default User
