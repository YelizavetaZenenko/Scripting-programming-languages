const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const jsonParser = express.json();

const mongoClient = new MongoClient("mongodb://localhost:27017/");
let dbClient;

app.use(express.static(__dirname + "/public"));

async function startServer() {
    try {
        dbClient = await mongoClient.connect();
        app.locals.collection = dbClient.db("student_db").collection("student");

        app.listen(3000, () => {
            console.log("The server is waiting for a connection...");
        });
    } catch (err) {
        console.error(err);
    }
}

startServer();

app.get("/api/student", async (req, res) => {
    try {
        const collection = req.app.locals.collection;
        const student = await collection.find({}).toArray();
        res.send(student);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.get("/api/student/:id", async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const collection = req.app.locals.collection;
        const user = await collection.findOne({ _id: id });
        res.send(user);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.post("/api/student", jsonParser, async ( req, res) => {
    if (!req.body) return res.sendStatus(400);

    try {
        const user = {
            group: req.body.group,
            age: req.body.age,
            name: req.body.name,
            funding: req.body.funding
        };
        const collection = req.app.locals.collection;
        const result = await collection.insertOne(user);
        console.log("Insert result:", result);
        res.send(user);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.delete("/api/student/:id", async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const collection = req.app.locals.collection;
        const result = await collection.findOneAndDelete({ _id: id });
        console.log("Delete result:", result);
        res.send(result.value);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.put("/api/student", jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const id = req.body.id;

    if (!ObjectId.isValid(id)) {
        return res.status(400).send("Invalid ID");
    }

    try {
        const objectId = new ObjectId(id);
        const updatedData = {
            group: req.body.group,
            age: req.body.age,
            name: req.body.name,
            funding: req.body.funding
        };

        const collection = req.app.locals.collection;
        const result = await collection.findOneAndUpdate(
            { _id: objectId },
            { $set: updatedData },
            { returnDocument: "after" }
        );

        res.send(result.value);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});


process.on("SIGINT", async () => {
    await dbClient.close();
    process.exit();
});
