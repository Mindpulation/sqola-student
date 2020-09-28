const studentHandlers =  require('../modules/student/handlers/handlers')
const express = require('express');
const app = express.Router();

app.post("/signin",async (req, res) => {
    await studentHandlers.SigninStudent(req, res)
})
app.post("/signup",async (req, res) => {
    await studentHandlers.SignupStudent(req, res)
})
app.post("/find",async (req, res) => {
    await studentHandlers.FindStudent(req, res)
})
app.put("/update",async (req, res) => {
    await studentHandlers.UpdateStudent(req, res)
})
app.delete("/:userId",async (req, res) => {
    await studentHandlers.DeleteStudent(req, res)
})

module.exports = app;
