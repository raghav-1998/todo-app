import bcrypt from "bcryptjs";

const SALT_ROUNDS=12;

async function hashPassword(password:string){
    return bcrypt.hash(password, SALT_ROUNDS)
}

async function comparePassword(
    password:string,
    passwordHash:string
){
    return bcrypt.compare(password,passwordHash)
}

export{
    hashPassword,
    comparePassword
}