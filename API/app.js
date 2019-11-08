var express = require('express');
var app = express();
var cors = require('cors');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var connection = require('./connection');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(cors());

/*------------------------------------------- Start Class Users ------------------------------*/
var Students = require('./student');
var student = new Students();


app.post("/registerUser", (req, res) => {
    console.log(req.body);
    student.registerUser(req.body)
        .then((data) => {
            res.status(200).json(data);
            console.log(data);
        })
        .catch((err) => {
            res.json({
                error: err
            });
        })
});


app.post("/loginUser", (req, res) => {
    const obj = req.body;

    student.loginUser(obj)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.json({
                error: err
            })
        })
});

app.get('/getStudent/:id', (req, res) => {
    student.getStudent(req.params.id).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.json({ error: err });
    })
})

app.put('/updateStudent/:id', (req, res) => {
        student.updateStudent(req.params.id, req.body).then((data) => {
            res.status(200).json(data);
        }).catch((err) => {
            res.json({ error: err });
        });
    })
    /*------------------------------------------- End Class Users ------------------------------*/


/*------------------------------------------- Start Class Teachers ------------------------------*/
var Teachers = require('./teacher');
var teacher = new Teachers();


app.post("/registerTeacher", (req, res) => {
    console.log(req.body);
    teacher.registerTeacher(req.body)
        .then((data) => {
            res.status(200).json(data);
            console.log(data);
        })
        .catch((err) => {
            res.json({
                error: err
            });
        })
});


app.post("/loginTeacher", (req, res) => {
    const obj = req.body;

    teacher.loginTeacher(obj)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.json({
                error: err
            })
        })
});

app.get('/getTeacher/:id', (req, res) => {
    teacher.getTeacher(req.params.id).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.json({ error: err });
    })
})

app.put('/updateTeacher/:id', (req, res) => {
    teacher.updateTeacher(req.params.id, req.body).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.json({ error: err });
    });
})


/*------------------------------------------- End Class Teachers ------------------------------*/



/*------------------------------------------- Start Class Quiz ------------------------------*/
var Quizes = require('./quiz');
var Quiz = new Quizes();


app.post("/AddNewQuiz", (req, res) => {
    console.log(req.body);
    Quiz.AddNewQuiz(req.body)
        .then((data) => {
            res.status(200).json(data);
            console.log(data);
        })
        .catch((err) => {
            res.json({
                error: err
            });
        })
});

app.get('/getAllQuizess', (req, res) => {
    Quiz.getAllQuizess().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.json({ error: err });
    })
})


app.get('/getAllQuizes/:id', (req, res) => {
    Quiz.getAllQuizes(req.params.id).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.json({ error: err });
    })
})

app.get('/QuizesPublish', (req, res) => {
    Quiz.AllQuizesPublish().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.json({ error: err });
    })
})


app.get('/QuizesPublishAndSpecialist/:subject', (req, res) => {
    Quiz.QuizesPublishAndSpecialist(req.params.subject).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.json({ error: err });
    })
})

app.get('/QuizesPublish/:id', (req, res) => {
    Quiz.QuizesPublish(req.params.id).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.json({ error: err });
    })
})

app.get('/QuizesSaved', (req, res) => {
    Quiz.QuizesSaved().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.json({ error: err });
    })
})

app.get('/QuizesSaved/:id', (req, res) => {
    Quiz.QuizesSaved(req.params.id).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.json({ error: err });
    })
})

app.get('/getOneQuiz/:id', (req, res) => {
    Quiz.getOneQuiz(req.params.id).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.json({ error: err });
    })
})

app.put('/updateQuize/:id', (req, res) => {
    Quiz.updateQuize(req.params.id, req.body).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.json({ error: err });
    })
})

app.delete('/deleteQuiz/:id', (req, res) => {
    Quiz.deleteQuiz(req.params.id).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.json({ error: err });
    });
})

/*------------------------------------------- End Class Quiz ------------------------------*/


/*------------------------------------------- Start Class Result Quiz ------------------------------*/
var ResultQuiz = require('./Result');
var resultquiz = new ResultQuiz();


app.post("/SaveResQuiz", (req, res) => {
    console.log(req.body);
    resultquiz.SaveResQuiz(req.body)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.json({
                error: err
            });
        })
});


app.get('/AllResults/:StID', (req, res) => {
    resultquiz.AllResults(req.params.StID).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.json({ error: err })
    });
})

app.post('/OneQuizRes', (req, res) => {
    resultquiz.OneQuizRes(req.body.StudentId, req.body.QuizID).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.json({ error: err });
    })
})

/*------------------------------------------- End Class Result Quiz ------------------------------*/



var port = process.env.PORT || 8080;
app.listen(port);