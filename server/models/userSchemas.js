import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js"; // Подключаем базу

const User = sequelize.define("User", {
    fullname: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.TEXT, allowNull: false }
}, {
    timestamps: true
});


export default User;
