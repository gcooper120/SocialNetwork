module.exports = function(sequelize, Sequelize) {
 
    var Post = sequelize.define('post', {
 
        post_id: {
            type: Sequelize.INTEGER,
            notEmpty: true,
            primaryKey: true
        },
 
        user_id: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },

        content: {
            type: Sequelize.TEXT,
            notEmpty: true
        },
 
    }, {
    	classMethods: {
    		associate: function(models) {
    			Post.belongsTo(models.User, {
    				foreignKey: 'user_id',
    				onDelete: 'CASCADE'
    			});
    		}
    	}
    });
 
    return Post;
 
}