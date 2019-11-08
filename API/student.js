var mongoose = require('mongoose');
var connection = require('./connection');
var jwt = require('jsonwebtoken');

class Student {
    constructor() {
        var studentSchema = mongoose.Schema({
            _id: mongoose.Schema.Types.ObjectId,
            FullName: String,
            Email: String,
            Password: String,
            typeUser: String,
            Date: { type: Date, default: Date.now() }
        })

        this.studentModel = mongoose.model('student', studentSchema, 'student');
    }

    // register New User --> Save In Database quiz in collection user
    registerUser(student) {
        return new Promise((resolve, reject) => {
            var newStudent = {
                "_id": new mongoose.Types.ObjectId(),
                "FullName": student.FullName,
                "Email": student.Email,
                "Password": student.Password,
                "typeUser": student.typeUser,
                "Date": Date.now()
            }
            this.studentModel.findOne({ Email: student.Email }, (err, data) => {
                if (data) {
                    const res = {
                        EmailCheck: false
                    }
                    reject(res);
                } else {
                    this.studentModel.create(newStudent, (err, data) => {
                        if (err) {
                            reject("Error In Insert Student");
                        } else {
                            resolve('Student Added Successfully ..... ');
                        }
                    })
                }
            })

        })
    }

    // Login user to start quiz
    loginUser(student) {
        // console.log(user);
        return new Promise((resolve, reject) => {
            this.studentModel.findOne({
                Email: student.Email,
            }, (err, data) => {
                if (data) {
                    console.log('Email Correct');
                    if (student.Password == data.Password) {
                        console.log('Password Correct');
                        const userObj = {
                            userId: data._id,
                            FullName: data.FullName,
                            typeUser: data.typeUser
                        }
                        const token = jwt.sign({ user: userObj }, 'secretKey');
                        resolve({ token });
                    } else {
                        console.log('Password Incorrect');
                        const res = {
                            PassExist: false
                        }
                        reject(res);
                    }
                } else {
                    console.log('Email Not Correct');
                    const res = {
                        EmailExist: false
                    }
                    reject(res);
                }
            })
        })
    }


    getStudent(id) {
        return new Promise((resolve, reject) => {
            this.studentModel.findOne({ _id: id }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }


    updateStudent(id, student) {
        return new Promise((resolve, reject) => {
            this.studentModel.updateOne({ _id: id }, {
                $set: {
                    "FullName": student.FullName,
                    "Email": student.Email,
                    "Password": student.Password,
                    "typeUser": student.typeUser
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

}

module.exports = Student;