

const Training = require('../model/training');
const TrainingTransformer =  require('../transformer/TrainingTransformer');


let TrainingController = {
    create: (user_id, training, callback) => {
        let newTraining = new Training({
            user: user_id,
			Title: training.Title,
			Description: training.Description,
			ID: training.ID,
			Link: training.Link,
			WelcomeV_ideo_id: training.WelcomeVideoId,
			ShortDescription: training.ShortDescription,
			Thumbnails: [
				{
					"FullURL": training.Thumbnails
				}
			]

        });

        newTraining.save((error, createdEvent) => {
            if (error) {
                callback(error);
                return null;
            }
            callback(null, TrainingTransformer.transform(createdEvent));
            return TrainingTransformer.transform(createdEvent);
        });
    },
    getTrainingByUserId :  (user_id , callback) => {
        console.log(user_id);

        Training.find({user : user_id }).
        populate('user').       
        exec(function (error, createdTraining) {
            if (error) {
                callback(error);
                return null;
            }
            callback(null, TrainingTransformer.transform(createdTraining));
            return TrainingTransformer.transform(createdTraining);
        });
    },
    update: (user_id, training_id, data, callback) => {
        Training.findOne({ _id: training_id, user: user_id }, (error, training) => {
            if (error) { console.log('error', error); }
            if (training) {

				if (data.title) {
					training.title = data.title;
				}

				if (data.ID) {
					training.ID = data.ID;
				}
				if (data.description) {
					training.description = data.description;
				}
				if (data.price) {
					training.WelcomeV_ideo_id = data.WelcomeV_ideo_id;
				}
				if (data.ShortDescription) {
					training.ShortDescription = data.ShortDescription;
				}
				if (data.Thumbnails) {
					training.Thumbnails = data.Thumbnails;
				}
            
                training.save(function(err, training) {
                    if (err) {
                        callback('error occoured while updating training');
                    } else {
                        callback(null, event);
                    }
                });

            } else {
                callback('training not found');
            }
        });
    }
}
module.exports =  TrainingController;
