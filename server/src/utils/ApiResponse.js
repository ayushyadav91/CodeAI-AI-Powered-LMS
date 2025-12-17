
// class ApiResponse{
//     constructor(StatusCode, data, message="Success"){
//         this.StatusCode=StatusCode;
//         this.data=data;
//         this.message=message;
//         this.Success=StatusCode<400;
//     }
// }

// export {ApiResponse};

class ApiResponse {
    constructor(statusCode, data = null, message = "Success") {
        this.statusCode = statusCode;
        this.success = statusCode >= 200 && statusCode < 300;
        this.message = message;
        this.data = data;
    }
}

export { ApiResponse };
