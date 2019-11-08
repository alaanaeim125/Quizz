var mongoose = require('mongoose');
var connection = require('./connection');
var jwt = require('jsonwebtoken');

class Teacher {
    constructor() {
        var teacherSchema = mongoose.Schema({
            _id: mongoose.Schema.Types.ObjectId,
            FullName: String,
            Email: String,
            Password: String,
            typeUser: String,
            Specialist: String,
            Date: { type: Date, default: Date.now() }
        })

        this.teacherModel = mongoose.model('teacher', teacherSchema, 'teacher');
    }

    // register New Teacher --> Save In Database quiz in collection teacher
    registerTeacher(teacher) {
        return new Promise((resolve, reject) => {
            var newTeacher = {
                "_id": new mongoose.Types.ObjectId(),
                "FullName": teacher.FullName,
                "Email": teacher.Email,
                "Password": teacher.Password,
                "typeUser": teacher.typeUser,
                "Specialist": teacher.Specialist,
                "Date": Date.now()
            }

            this.teacherModel.findOne({ Email: teacher.Email }, (err, data) => {
                if (data) {
                    const res = {
                        EmailCheck: false
                    }
                    reject(res);
                } else {
                    this.teacherModel.create(newTeacher, (err, data) => {
                        if (err) {
                            reject("Error Occured In Insert Teacher ..... ");
                        } else {
                            resolve('Teacher Added Successfully ..... ');
                        }
                    })
                }
            })
        })
    }

    // Login teacher to Make quiz
    loginTeacher(teacher) {

        return new Promise((resolve, reject) => {
            this.teacherModel.findOne({
                Email: teacher.Email,
            }, (err, data) => {
                if (data) {
                    if (teacher.Password == data.Password) {
                        const userObj = {
                            userId: data._id,
                            FullName: data.FullName,
                            typeUser: data.typeUser
                        }
                        const token = jwt.sign({ user: userObj }, 'secretKey');
                        resolve({ token });
                    } else {
                        const res = {
                            PassExist: false
                        }
                        reject(res);
                    }
                } else {
                    const res = {
                        EmailExist: false
                    }
                    reject(res);
                }
            })
        })
    }

    getTeacher(id) {
        return new Promise((resolve, reject) => {
            this.teacherModel.findOne({ _id: id }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    updateTeacher(id, teacher) {
        return new Promise((resolve, reject) => {
            this.teacherModel.updateOne({ _id: id }, {
                $set: {
                    "FullName": teacher.FullName,
                    "Email": teacher.Email,
                    "Password": teacher.Password,
                    "typeUser": teacher.typeUser,
                    "Specialist": teacher.Specialist
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

module.exports = Teacher;