import Joi from "joi";

export const createTodoSchema = Joi.object({
	text: Joi.string().min(1).required(),
});

export const markTodoAsDoneSchema = Joi.object({
	done: Joi.boolean().required(),
});

export const todoIdSchema = Joi.object({
	id: Joi.number().min(1).required(),
});

export const todoFilterSchema = Joi.object({
	onlyUndone: Joi.string().valid("true", "false"),
});
