const studentHandlers =  require('../modules/student/handlers/handlers')
const express = require('express').Router;
const app = new express();

app.post("/signin",[] ,studentHandlers.SigninStudent)
app.post("/signup",[] ,studentHandlers.SignupStudent)
app.put("/update",[] ,studentHandlers.UpdateStudent)
app.delete("/:userId",[] ,studentHandlers.DeleteStudent)

module.exports = app;
