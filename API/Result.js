var mongoose = require('mongoose');
var connection = require('./connection');
var jwt = require('jsonwebtoken');

class Result {
    constructor() {
        var resultSchema = mongoose.Schema({
            _id: mongoose.Schema.Types.ObjectId,
            StudentId: String,
            QuizDegree: String,
            QuizAbout: String,
            QuizID: String,
            StudentAnswers: Array,
            Date: { type: Date, default: Date.now() }
        })

        this.resultModel = mongoose.model('quizResult', resultSchema, 'quizResult');
    }


    SaveResQuiz(resultQuiz) {
        return new Promise((resolve, reject) => {
            var quizresult = {
                "_id": new mongoose.Types.ObjectId(),
                "StudentId": resultQuiz.StudentId,
                "QuizDegree": resultQuiz.QuizDegree,
                "QuizAbout": resultQuiz.QuizAbout,
                "QuizID": resultQuiz.QuizID,
                "StudentAnswers": resultQuiz.StudentAnswers,
                "Date": Date.now()
            }

            this.resultModel.findOne({ StudentId: quizresult.StudentId, QuizID: quizresult.QuizID }, (err, data) => {
                if (data) {
                    this.resultModel.updateOne({ _id: data._id }, {
                        $set: {
                            "StudentId": resultQuiz.StudentId,
                            "QuizDegree": resultQuiz.QuizDegree,
                            "QuizAbout": resultQuiz.QuizAbout,
                            "QuizID": resultQuiz.QuizID,
                            "StudentAnswers": resultQuiz.StudentAnswers,
                            "Date": Date.now()
                        }
                    }, (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    })
                } else {
                    this.resultModel.create(quizresult, (err, data) => {
                        if (err) {
                            reject("Error In Saving Result Quiz .....");
                        } else {
                            resolve('Successfully Saving Result Quiz ..... ');
                        }
                    })
                }
            })
        })
    }

    // return all result quizes to one student
    AllResults(StID) {
        return new Promise((resolve, reject) => {
            this.resultModel.find({ StudentId: StID }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    // return one result quizes for 
    OneQuizRes(StID, QID) {
        return new Promise((resolve, reject) => {
            this.resultModel.findOne({ StudentId: StID, QuizID: QID }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

}

module.exports = Result;