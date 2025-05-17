import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import User from "./userSchemas.js";

const Friend = sequelize.define('Friend', {
    fullname: {type: DataTypes.TEXT, allowNull: false},
    friendId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
})
Friend.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Friend, { foreignKey: 'userId' });

export default Friend;