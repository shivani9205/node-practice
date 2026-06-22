console.log("Server file started");
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory database
let students = [];
let nextId = 1;

//    CREATE STUDENT

app.post("/students", (req, res) => {
    const { name, age, course } = req.body;

    const student = {
        id: nextId++,
        name,
        age,
        course
    };

    students.push(student);

    res.status(201).json(student);
});


//    READ ALL STUDENTS

app.get("/students", (req, res) => {
    res.json(students);
});


//    READ STUDENT BY ID

app.get("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});

//    UPDATE STUDENT

app.put("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, age, course } = req.body;

    student.name = name || student.name;
    student.age = age || student.age;
    student.course = course || student.course;

    res.json(student);
});


//    DELETE STUDENT

app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students.splice(index, 1);

    res.json({
        message: "Student deleted successfully"
    });
});


//    START SERVER

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});