const config = require('config')
const Mongo = require('mongooo').Mongooo;
const { save } = require('mongooo').Save;
const {uuid : uuidv4} =  require('uuid');

const mongo = new Mongo();
let con;
(async () => {
    con = await mongo.setup(config.get('mongoDbStudentUrl'), config.get('mongoDbStudent'), config.get('mongoDbStudentCol'));
})()

const insertData = async (payloadData) => {
    const result = {
        "status" : false,
        "result" : "Failed to insert student data"
    };
    try{
        const dbResult = await save(con, payloadData)
        if(dbResult == false){
            result.status = false,
            result.result = "Failed to insert student data"
        }
        result.status = true,
        result.result = "Success to insert student data"
    }catch (e) {
        const tickets = uuidv4;
        result.status = false,
        result.result = "Something went wrong"
        result.ticketId = tickets
        new Error(`Error : ${e}, ticketId : ${tickets}`);
    }
    return result;
}

const compareData = async (payloadData) => {
    const result = {
        "status" : false,
        "result" : "Failed to insert student data"
    };
    try{
        const dbResult = await find(con, payloadData)
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


module.exports = {
    insertData,
    compareData
}
