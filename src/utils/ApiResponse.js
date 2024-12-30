//Basic apiresponse handling ki config. no need to understand this code.

class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;  
    }
}