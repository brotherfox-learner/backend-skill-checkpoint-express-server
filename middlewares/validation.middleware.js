import { ZodError } from "zod";
import { AppError } from "../utils/AppError.js";

const formatZodIssues = (err) =>
  (err?.issues || []).map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));

// target: "body" | "params" | "query"
export const validate = (schema, target = "body") => (req, res, next) => {
  try {
    const data = schema.parse(req[target]);
    req[target] = data;
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return next(
        new AppError("Invalid request data.", 400, {
          target,
          errors: formatZodIssues(err),
        })
      );
    }
    next(err);
  }
};
