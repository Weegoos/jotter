import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';
import User from './userSchemas.js';

const Files = sequelize.define(
  'Files',
  {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    pinned: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  {
    timestamps: true,
  }
);

Files.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
export default Files;
