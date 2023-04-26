
const { ApiServiceMessage } = require("../constant/message");
const logger = require("../utils/error-handler")
const { APIError, STATUS_CODES } = require("../utils/app-errors");

const {  } = require("../database/repository/index"); // {UserResponsetory : require}  ===> Userespo1.userresponse(reuire) => new

module.exports = class ProjectService{
    constructor(){
        this.projectService = "PROJECT SERVICE";
    }
    async createProject({projectName, description}){
        logger.debug(ApiServiceMessage(this.userService, "createUser"))
        try {
            
        } catch (error) {
            
        }
    }
}
