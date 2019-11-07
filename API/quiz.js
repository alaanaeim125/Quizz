var mongoose = require('mongoose');
var connection = require('./connection');

class Quiz {
    constructor() {
        var quizSchema = mongoose.Schema({
            _id: mongoose.Schema.Types.ObjectId,
            Question: Array,
            Answers: Array,
            CorrectAnswer: Array,
            TeacherName: String,
            TeacherId: String,
            Specialist: String,
            Publish: String,
            AboutQuiz: String,
            Date: { type: Date, default: Date.now() }
        })

        this.quizModel = mongoose.model('quiz', quizSchema, 'quiz');
    }

    // Add New Quiz --> Save In Database quiz in collection quiz
    AddNewQuiz(quiz) {
        return new Promise((resolve, reject) => {
            var newQuiz = {
                "_id": new mongoose.Types.ObjectId(),
                "Question": quiz.Question,
                "Answers": quiz.Answers,
                "CorrectAnswer": quiz.CorrectAnswer,
                "TeacherName": quiz.TeacherName,
                "TeacherId": quiz.TeacherId,
                "Specialist": quiz.Specialist,
                "Publish": quiz.Publish,
                "AboutQuiz": quiz.AboutQuiz,
                "Date": Date.now()
            }
            this.quizModel.create(newQuiz, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('newQuiz Added Successfully ..... ');
                }
            })
        })
    }

    // Get All Quizes
    getAllQuizess() {
        return new Promise((resolve, reject) => {
            this.quizModel.find({}, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    // Get All Quizes by teacherID
    getAllQuizes(teacherID) {
        return new Promise((resolve, reject) => {
            this.quizModel.find({ TeacherId: teacherID }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    // Get All Quizes Published
    AllQuizesPublish() {
        return new Promise((resolve, reject) => {
            this.quizModel.find({ Publish: "Publish" }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    // Get All Quizes Published by teacherID
    QuizesPublish(teacherID) {
        return new Promise((resolve, reject) => {
            this.quizModel.find({ TeacherId: teacherID, Publish: "Publish" }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }


    // Get All Quizes Published by subject or specialist as category
    QuizesPublishAndSpecialist(subject) {
        return new Promise((resolve, reject) => {
            this.quizModel.find({ Publish: "Publish", Specialist: subject }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    // Get All Quizes Published
    QuizesSaved() {
        return new Promise((resolve, reject) => {
            this.quizModel.find({ Publish: "Save" }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    // Get All Quizes Published by teacherID
    QuizesSaved(teacherID) {
        return new Promise((resolve, reject) => {
            this.quizModel.find({ TeacherId: teacherID, Publish: "Save" }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    // Get Quiz By IId 
    getOneQuiz(id) {
        return new Promise((resolve, reject) => {
            this.quizModel.findById(id, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    // Update Quiz
    updateQuize(iid, quiz) {
        return new Promise((resolve, reject) => {
            this.quizModel.updateOne({ _id: iid }, {
                $set: {
                    "Question": quiz.Question,
                    "Answers": quiz.Answers,
                    "CorrectAnswer": quiz.CorrectAnswer,
                    "TeacherName": quiz.TeacherName,
                    "TeacherId": quiz.TeacherId,
                    "Specialist": quiz.Specialist,
                    "Publish": quiz.Publish,
                    "AboutQuiz": quiz.AboutQuiz,
                    "Date": Date.now()
                }
            }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    // Delete Quiiiz By IIIID
    deleteQuiz(iid) {
        return new Promise((resolve, reject) => {
            this.quizModel.deleteOne({ _id: iid }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

}

module.exports = Quiz;