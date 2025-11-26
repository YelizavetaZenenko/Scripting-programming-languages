const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();

const {
    MONGO_DB_HOSTNAME,
    MONGO_DB_PORT,
    MONGO_DB
} = process.env;

const url = `mongodb://${MONGO_DB_HOSTNAME}:${MONGO_DB_PORT}/${MONGO_DB}`;

const studentSchema = new Schema({
    group: String,
    age: Number,
    name: String,
    funding: String
}, { versionKey: false });

const Student = mongoose.model("Student", studentSchema);

app.use(express.static(__dirname + "/public"));

async function startServer() {
    try {
        await mongoose.connect(url);  // БЕЗ ОПЦИЙ — это важно!
        console.log("MongoDB connected");

        app.listen(3000, "0.0.0.0", () => {
            console.log("Сервер ожидает подключения...");
        });
    } catch (err) {
        console.error("Ошибка подключения к MongoDB:", err);
        process.exit(1);
    }
}

startServer();

app.get("/api/student", async (req, res) => {
    try {
        const students = await Student.find({});
        res.send(students);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.get("/api/student/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        res.send(student);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.post("/api/student", jsonParser, async (req, res) => {
    try {
        const student = new Student({
            group: req.body.group,
            age: req.body.age,
            name: req.body.name,
            funding: req.body.funding
        });

        const result = await student.save();
        res.send(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.delete("/api/student/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        res.send(student);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.put("/api/student", jsonParser, async (req, res) => {
    try {
        const id = req.body.id;
        const newData = {
            group: req.body.group,
            age: req.body.age,
            name: req.body.name,
            funding: req.body.funding
        };

        const student = await Student.findByIdAndUpdate(id, newData, { new: true });
        res.send(student);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});
