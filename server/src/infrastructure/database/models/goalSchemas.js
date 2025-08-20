import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import User from './userSchemas.js';

const Goals = sequelize.define(
  'Goals',
  {
    name: { type: DataTypes.STRING(255), allowNull: false },
    target_amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    current_amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    deadline: { type: DataTypes.DATE, allowNull: false },
  },
  {
    timestamps: true,
  }
);

Goals.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Goals, { foreignKey: 'userId' });
export default Goals;
