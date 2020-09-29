const config = require('config')
const Mongo = require('mongooo').Mongooo;
const { save } = require('mongooo').Save;
const { del } = require('mongooo').Delete;
const { findOne } = require('mongooo').Find;
const { set } = require('mongooo').Update;
const {uuid : uuidv4} =  require('uuid');

const mongo = new Mongo();

let con;
(async () => {
    con = await mongo.setup(config.get('mongoDbStudentUrl'), config.get('mongoDbStudent'), config.get('mongoDbStudentCol'));
})()

const insertData = async (payloadData) => {
    console.log(payloadData)
    const result = {
        "err" : true,
        "message" : "Failed to insert student data"
    };
    try{
        const findEmail = await findOne(con, {"email" : payloadData.data.email});
        console.log("Ini email : ",findEmail)
        if(findEmail !== null){
            console.log("Must be failed")
            result.err = true,
            result.message = "Email already exist"
        } else {
            const dbResult = await save(con, payloadData.data)
            console.log(dbResult)
            if(dbResult == false){
                result.err = true,
                result.message = "Failed to insert student data"
            }
            result.err = false,
            result.message = "Success to insert student data"
        }
    }catch (e) {
        const tickets = uuidv4;
        result.err = true,
        result.message = "Something went wrong"
        result.ticketId = tickets
        new Error(`Error : ${e}, ticketId : ${tickets}`);
    }
    console.log(result)
    return result;
}

const compareData = async (payloadData) => {
    const result = {
        "status" : false,
        "result" : "Failed to signin student data"
    };
    try{
        const dbResult = await find(con, payloadData.data)
        if(dbResult == null || dbResult == undefined || dbResult == ""){
            result.status = false,
            result.result = "Username or Password was wrong"
        }
        result.status = true,
        result.result = "Success to login"
    }catch (e) {
        const tickets = uuidv4;
        result.status = false,
        result.result = "Something went wrong"
        result.ticketId = tickets
        new Error(`Error : ${e}, ticketId : ${tickets}`);
    }
    return result;
}

const updateData = async (payloadData) => {
    const result = {
        "status" : false,
        "result" : "Failed to update student data"
    };
    try{
        const dbResult = await set(con, payloadData.data.email, payloadData.data)
        if(dbResult == null || dbResult == undefined || dbResult == ""){
            result.status = false,
            result.result = "Failed to update student data"
        }
        result.status = true,
            result.result = "Success to login"
    }catch (e) {
        const tickets = uuidv4;
        result.status = false,
            result.result = "Something went wrong"
        result.ticketId = tickets
        new Error(`Error : ${e}, ticketId : ${tickets}`);
    }
    return result;
}

const deleteDataStudent = async (payloadData) => {
    const result = {
        "status" : false,
        "result" : "Failed to delete student data"
    };
    try{
        const dbResult = await del(con, payloadData.data)
        if(dbResult == null || dbResult == undefined || dbResult == ""){
            result.status = false,
                result.result = "Email not found"
        }
        result.status = true,
            result.result = "Success to delete user ", payloadData;
    }catch (e) {
        const tickets = uuidv4;
        result.status = false,
            result.result = "Something went wrong"
        result.ticketId = tickets
        new Error(`Error : ${e}, ticketId : ${tickets}`);
    }
    return result;
}

const findData = async (payloadData) => {
    const result = {
        "status" : false,
        "result" : "Failed to find student data"
    };
    try{
        const dbResult = await find(con, payloadData.data)
        if(dbResult == null || dbResult == undefined || dbResult == ""){
            result.status = false,
            result.result = "Find not found"
        }
        result.status = true,
        result.result = payloadData;
    }catch (e) {
        const tickets = uuidv4;
        result.status = false,
        result.result = "Something went wrong"
        result.ticketId = tickets
        new Error(`Error : ${e}, ticketId : ${tickets}`);
    }
    return result;
}

module.exports = {
    insertData,
    compareData,
    updateData,
    deleteDataStudent,
    findData
}
