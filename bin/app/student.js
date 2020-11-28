var StatsD = require('hot-shots');
var dogstatsd = new StatsD();
const studentHandlers =  require('../modules/student/handlers/handlers')
const express = require('express');
const app = express.Router();

app.post("/signin",async (req, res) => {
    dogstatsd.increment('page.views')
    await studentHandlers.SigninStudent(req, res)
});
app.post("/signup",async (req, res) => {
    dogstatsd.increment('page.views')
    await studentHandlers.SignupStudent(req, res)
});
app.post("/find",async (req, res) => {
    dogstatsd.increment('page.views')
    await studentHandlers.FindStudent(req, res)
});
app.put("/update",async (req, res) => {
    dogstatsd.increment('page.views')
    await studentHandlers.UpdateStudent(req, res)
});
app.delete("/:userId",async (req, res) => {
    await studentHandlers.DeleteStudent(req, res)
});

module.exports = app;
