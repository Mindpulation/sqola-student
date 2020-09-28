const config = require('config')
const mongo = require('mongooo/lib/mongo/index');
const {save} = require('mongooo/lib/mongo/insert');
const {uuid : uuidv4} =  require('uuid');

const Mongo = new mongo();
const colStudent = Mongo.setup(config.get('mongoDbStudentUrl'), config.get('mongoDbStudent'), config.get('mongoDbStudentCol'));

const insertData = async (payloadData) => {
    const result = {
        "status" : false,
        "result" : "Failed to insert student data"
    };
    try{
        const dbResult = await save(colStudent, payloadData)
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


module.exports = {
    insertData
}
