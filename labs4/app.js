const express = require("express");
const mongoose = require("mongoose");

const app = express();
const jsonParser = express.json();

const studentSchema = new mongoose.Schema({
    group: String,
    age: Number,
    name: String,
    funding: String
}, { versionKey: false });

const Student = mongoose.model("Student", studentSchema);

async function startServer() {
    try {
        await mongoose.connect("mongodb://localhost:27017/student_db");

        app.listen(3000, () => {
            console.log("Сервер очікує підключення...");
        });
    } catch (err) {
        console.error(err);
    }
}


startServer();

app.use(express.static(__dirname + "/public"));

app.get("/api/student", async (req, res) => {
    try {
        const students = await Student.find();
        res.send(students);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.get("/api/student/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        res.send(student);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.post("/api/student", jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    try {
        const student = new Student({
            group: req.body.group,
            age: req.body.age,
            name: req.body.name,
            funding: req.body.funding
        });
        await student.save();
        res.send(student);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.delete("/api/student/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        res.send(student);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.put("/api/student", jsonParser, async (req, res) => {
    if (!req.body || !req.body.id) return res.sendStatus(400);

    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.body.id,
            {
                group: req.body.group,
                age: req.body.age,
                name: req.body.name,
                funding: req.body.funding
            },
            { new: true }
        );
        res.send(updatedStudent);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});
