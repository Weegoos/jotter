import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const Hashtags = sequelize.define('Hashtag', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
});

export default Hashtags;
