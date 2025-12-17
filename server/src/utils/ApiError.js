
// class ApiError extends Error{
//     constructor(StatusCode, error=[], stack="",message="Something went Wrong"){
//         super(message)
//         this.StatusCode=StatusCode
//         this.message=message
//         this.data=null
//         this.success=false
//         this.error=error
//         if(stack){
//             this.stack=stack
//         }else{
//             Error.captureStackTrace(this, this.constructor);
//         }
//     }

    
// }
class ApiError extends Error {
    constructor(
        statusCode,
        error = [],
        message = "Something went wrong"
    ) {
        super(message);

        this.name = "ApiError";
        this.statusCode = statusCode;
        this.success = false;
        this.error = error;
        this.data = null;

        Error.captureStackTrace(this, this.constructor);

    }
}

export default ApiError;
