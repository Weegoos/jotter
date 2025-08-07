import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import User from './userSchemas.js';

const Tasks = sequelize.define(
  'Tasks',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'in_progress', 'done'),
      allowNull: false,
      defaultValue: 'pending',
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      allowNull: false,
    },
    target_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time_period: {
      type: DataTypes.ENUM('daily', 'weekly', 'monthly', 'yearly'),
    },
  },
  {
    timestamps: true,
  }
);

Tasks.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Tasks, { foreignKey: 'userId' });

export default Tasks;
