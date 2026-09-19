export interface CreateCategoryInput{
    name:string,
    color?:string,
    userId:string
}

export interface UpdateCategoryInput{
    name?:string,
    color?:string|null
}