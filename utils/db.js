import { Sequelize } from 'sequelize'
import { DATABASE } from './configs'

const { USERNAME, PASSWORD, NAME } = DATABASE

const sequelize = new Sequelize(`postgres://${USERNAME}:${PASSWORD}@localhost:5432/${NAME}`)

export default sequelize
