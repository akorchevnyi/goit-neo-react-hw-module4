import * as Yup from "yup";

export const schema = Yup.object().shape(
    {
        query: Yup
            .string()
            .required("Query is required")
            .min(3, "The name must be at least 3 characters long.")
            .max(50, "The name must be no more than 30 characters long.")
    }
);
