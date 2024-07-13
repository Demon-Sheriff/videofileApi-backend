const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

// video model
const Video = sequelize.define('Video', {

    title:{
        type: DataTypes.STRING,
        allowNull: false // equivalent to required : true in mongoose
    },

    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    filePath: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    duration: {
        type: DataTypes.INTEGER,
        allowNull: false, // duration of the video file in seconds
    },

    uploadTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    expiresAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

// export the video model
module.exports = Video;