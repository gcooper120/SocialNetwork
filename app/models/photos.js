module.exports = function(sequelize, Sequelize) {
 
    var Photo = sequelize.define('photo', {
 
        photo_id: {
            type: Sequelize.INTEGER,
            notEmpty: true,
            primaryKey: true
        },
 
        user_id: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },

        address: {
            type: Sequelize.STRING,
            notEmpty: true
        },

    }, {
    	classMethods: {
    		associate: function(models) {
    			Photo.belongsTo(models.User, {
    				foreignKey: 'user_id',
    				onDelete: 'CASCADE'
    			});
    		}
    	}
    });
 
    return Photo;
 
}