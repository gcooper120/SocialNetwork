//Model for the post table in the database
//Post_ID is the primary key
//User_ID is a foreign key referencing user. Indicates who owns a post
//Content is the body of the post
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