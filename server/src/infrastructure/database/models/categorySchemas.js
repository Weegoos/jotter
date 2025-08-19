import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import User from './userSchemas.js';

const Categories = sequelize.define(
  'Categories',
  {
    type: { type: DataTypes.ENUM('income', 'expense'), allowNull: false, unique: true },
    name: { type: DataTypes.STRING },
    icon: { type: DataTypes.STRING(50) },
  },
  {
    timestamps: true,
  }
);

Categories.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Categories, { foreignKey: 'userId' });

export default Categories;
