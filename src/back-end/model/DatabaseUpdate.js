var mongoConnect = require('../../mongoConnect');
const Comment = require('./Comment.js')
const ObjectId = require('mongodb').ObjectID; // used to search by Id

class DatabaseUpdate {

    async addMatchToHistory(req, match) {
        let username = { 'username': req.user }
        let result = await mongoConnect.getDBCollection("Users").updateOne(username, {
            $addToSet: {
                "profile.picks": match
            }
        });
        return result;
    }

    async addUserToTracker(req, addUsername) {
        let username = { 'username': req.user }
        let addUsernameResult = await mongoConnect.getDBCollection("Users").findOne({ 'username': addUsername });
        let result = await mongoConnect.getDBCollection("Users").updateOne(username, {
            $addToSet: {
                "profile.tracker": [addUsername, addUsernameResult.profile.ACS]
            }
        });
        return result;
    }

    async addSocialMediaLink(req, type, link) {
        let linkType = 'profile.links.' + type;
        let username = { 'username': req.user };
        let result = await mongoConnect.getDBCollection("Users").updateOne(username, {
            $set: {
                [linkType]: link
            }
        });
        return result;
    }

    async updateMessage(req, type, message) {
        let messageType = 'profile.' + type;
        let username = { 'username': req.user };
        let result = await mongoConnect.getDBCollection("Users").updateOne(username, {
            $set: {
                [messageType]: message
            }
        });
        return result;
    }

    async updateUser(req, type, message) {
        let username = { 'username': req.user };
        let result = await mongoConnect.getDBCollection("Users").updateOne(username, {
            $set: {
                [type]: message
            }
        });
        return result;
    }

    async createComment(post, user, date, text, agrees, disagrees) {
        let comment = new Comment(user, date, text, agrees, disagrees); // should be in JSON format
        // post should be a unique ID
        let newPost = { "_id": ObjectId(post) };
        let result = await mongoConnect.getDBCollection("Posts").updateOne(
            newPost, {
                $push: {
                    comments: comment
                }
            }
        );
        return result;
    }
}
module.exports = DatabaseUpdate;