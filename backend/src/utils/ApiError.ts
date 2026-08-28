export class ApiError extends Error{
    statusCode:number;
    code:string;

    constructor(message:string, statusCode=500, code="INTERNAL_SERVER_ERROR"){
        super(message);

        this.name="ApiError";
        this.statusCode=statusCode;
        this.code=code
    }
}