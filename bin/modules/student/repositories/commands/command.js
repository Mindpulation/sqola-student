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
    const result = {
        "err" : true,
        "message" : "Failed to insert student data"
    };
    try{
        const findEmail = await findOne(con, {"email" : payloadData.data.email});
        if(findEmail !== null){
            result.err = true,
            result.message = "Email already exist"
        } else {
            const payloads = {
                ...payloadData.data,
                "insertedAt" : new Date(),
                "updatedAt" : new Date()
            }
            const dbResult = await save(con, payloads)
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
        console.log(`command-insertData [x] Error : ${e}, \nTicketId : ${tickets}`);
    }
    console.log(result)
    return result;
}

const compareData = async (payloadData) => {
    const result = {
        "err" : true,
        "message" : "Failed to signin student data"
    };
    try{
        const dbResult = await findOne(con, payloadData.data)
        if(dbResult == null || dbResult == undefined || dbResult == ""){
            result.err = true,
            result.message = "Username or Password was wrong"
        } else {
            result.err = false,
            result.message = "Success to login"
        }
    }catch (e) {
        const tickets = uuidv4;
        result.err = false,
        result.message = "Something went wrong"
        result.ticketId = tickets
        new Error(`Error : ${e}, ticketId : ${tickets}`);
        console.log(`command-compareData [x] Error : ${e}, \nTicketId : ${tickets}`);
    }
    console.log("Ini result signin : ", result)
    return result;
}

const updateData = async (payloadData) => {
    const result = {
        "err" : true,
        "message" : "Failed to update student data"
    };
    try{
        const payloads = {
            ...payloadData.data,
            "updatedAt" : new Date()
        }
        const dbResult = await set(con, payloadData.data.email, payloads);
        console.log("Ini update : ", dbResult)
        if(!dbResult){
            result.err = true,
            result.message = "Failed to update student data"
        } else {
            result.err = false,
            result.message = "Success to update"
        }
    }catch (e) {
        const tickets = uuidv4;
        result.status = false,
        result.result = "Something went wrong"
        result.ticketId = tickets
        new Error(`Error : ${e}, ticketId : ${tickets}`);
        console.log(`command-updateData [x] Error : ${e}, \nTicketId : ${tickets}`);
    }
    return result;
}

const deleteDataStudent = async (payloadData) => {
    const result = {
        "err" : true,
        "message" : "Failed to delete student data"
    };
    try{
        const dbResult = await del(con, payloadData.data)
        if(dbResult == null || dbResult == undefined || dbResult == ""){
            result.err = true,
            result.message = "Email not found"
        } else {
            result.err = false,
            result.message = "Success to delete user ", payloadData.data;
        }
    }catch (e) {
        const tickets = uuidv4;
        result.err = true,
        result.message = "Something went wrong"
        result.ticketId = tickets
        new Error(`Error : ${e}, ticketId : ${tickets}`);
        console.log(`command-deleteData [x] Error : ${e}, \nTicketId : ${tickets}`);
    }
    return result;
}

const findData = async (payloadData) => {
    const result = {
        "err" : true,
        "message" : "Failed to find student data"
    };
    try{
        const dbResult = await find(con, payloadData.data);
        if(dbResult == null || dbResult == undefined || dbResult == ""){
            result.err = true,
            result.message = "Data not found"
        } else {
            result.err = false,
            result.message = payloadData;
        }
    }catch (e) {
        const tickets = uuidv4;
        result.err = true,
        result.message = "Something went wrong"
        result.ticketId = tickets
        new Error(`Error : ${e}, ticketId : ${tickets}`);
        console.log(`command-findData [x] Error : ${e}, \nTicketId : ${tickets}`);
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
