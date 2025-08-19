import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import User from './userSchemas.js';
import Categories from './categorySchemas.js';

const Transaction = sequelize.define(
  'Transaction',
  {
    type: { type: DataTypes.ENUM('income', 'expense'), allowNull: false },
    amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    source: { type: DataTypes.STRING(50) },
  },
  {
    timestamps: true,
  }
);

Transaction.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Transaction, { foreignKey: 'userId' });

Transaction.belongsTo(Categories, { foreignKey: 'category_id', onDelete: 'CASCADE' });
Categories.hasMany(Transaction, { foreignKey: 'category_id' });

export default Transaction;
