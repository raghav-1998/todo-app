import {z} from "zod";

const todoPrioritySchema=z.enum([
    "LOW",
    "MEDIUM",
    "HIGH"
]);

const dueDateSchema=z.coerce.date({
    error:"Invalid due date"
});

const uuidSchema=z.string().uuid()

const createTodoSchema=z.object({
    body:z.object({
        title:z.string()
                .trim()
                .min(1,"Title is required")
                .max(200,"Title cannot exceed 200 character"),
        
        description:z.string()
                    .trim()
                    .max(2000,"Description cannot exceed 2000 character")
                    .optional(),
        
        priority:todoPrioritySchema.optional(),

        dueDate:dueDateSchema.optional(),

        categoryId:uuidSchema.optional()
    }),

    params:z.object({}),

    query:z.object({})
});

const updateTodoSchema=z.object({
    body:z.object({
        title:z.string()
                .trim()
                .min(1,"Title is required")
                .max(200,"Title cannot exceed 200 character")
                .optional(),
        
        description:z.string()
                      .trim()
                      .max(2000, "Description cannot exceed 2000 characters")
                      .nullable()
                      .optional(),
        
        completed:z.boolean().optional(),

         priority: todoPrioritySchema.optional(),

        dueDate: dueDateSchema.nullable().optional(),

        categoryId: uuidSchema.nullable().optional(),  
    })
    .refine(
        (data)=>Object.keys(data).length>0,{
            message:"At least one field is required to update a todo"
        }
    ),

    params:z.object({
        id:uuidSchema
    }),

    query:z.object({})
});

const todoFiltersSchema=z.object({
    body:z.object({}),

    params:z.object({}),

    quergy:z.object({
        completed:z
                .enum(["true","false"])
                .transform((val)=>val=="true")
                .optional(),
        
        priority:todoPrioritySchema.optional(),

        categoryId:uuidSchema.optional()
    })
})

export{
    createTodoSchema,
    updateTodoSchema,
    todoFiltersSchema
}
