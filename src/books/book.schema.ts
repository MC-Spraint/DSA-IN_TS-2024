import { DataTypes } from 'sequelize';
import { sequelize } from '../core/config/databases/postgres.config';

export const User = sequelize.define('User', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
