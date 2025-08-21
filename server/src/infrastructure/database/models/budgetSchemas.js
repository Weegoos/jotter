import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import User from './userSchemas.js';
import Categories from './categorySchemas.js';

const Budget = sequelize.define(
  'Budget',
  {
    limit_amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    month: { type: DataTypes.INTEGER, allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: true,
  }
);

Budget.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Budget, { foreignKey: 'userId' });

Budget.belongsTo(Categories, { foreignKey: 'category_id', onDelete: 'CASCADE' });
Categories.hasMany(Budget, { foreignKey: 'category_id' });
export default Budget;
