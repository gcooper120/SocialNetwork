module.exports = function(sequelize, Sequelize) {
 
    var Profile = sequelize.define('profile', {
 
        user_id: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
 
        imgUrl: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
    }, {
    	classMethods: {
    		associate: function(models) {
    			Profile.belongsTo(models.User, {
    				foreignKey: 'user_id',
    				onDelete: 'CASCADE'
    			});
    		}
    	}
    });
 
    return Profile;
 
}