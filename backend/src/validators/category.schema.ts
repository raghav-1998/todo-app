import {z} from "zod";

const uuidSchema=z.string().uuid()
const categoryNameSchema = z
  .string()
  .trim()
  .min(1, "Category name is required")
  .max(50, "Category name cannot exceed 50 characters");

const colorSchema = z
  .string()
  .trim()
  .regex(
    /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    "Color must be a valid hex color"
  );


const createCategorySchema=z.object({
    body:z.object({
        name:categoryNameSchema,

        color:colorSchema.optional()
    }),

    params:z.object({}),

    query:z.object({})
});


const updateCategorySchema=z.object({
    body:z.object({
        name:categoryNameSchema.optional(),
        color:colorSchema.nullable().optional()
    })
    .refine(
        (data)=>Object.keys(data).length>0,
        {
            message:"At least one field is required to update a category"
        }
    ),

    params:z.object({
        id:uuidSchema
    }),

    query:z.object({})
});


const categoryIdSchema = z.object({
  body: z.object({}),

  params: z.object({
    id: uuidSchema,
  }),

  query: z.object({}),
});


export{
    createCategorySchema,
    updateCategorySchema,
    categoryIdSchema
}