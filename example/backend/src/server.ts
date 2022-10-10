import fastify, {
	FastifyRequest,
	FastifySchema,
	FastifySchemaCompiler,
} from "fastify";

import {
	AnySchema,
	createTodoSchema,
	markTodoAsDoneSchema,
	TodoCreateDto,
	TodoFilter,
	todoFilterSchema,
	TodoIdDto,
	todoIdSchema,
	TodoMarkAsDoneDto,
} from "~shared";

import getDB from "./db-adapter";

const db = getDB();
const server = fastify();

const validatorCompiler: FastifySchemaCompiler<FastifySchema> = ({
	schema,
}) => {
	return (data: any) => (schema as AnySchema).validate(data);
};

server.route({
	url: "/",
	method: "POST",
	schema: {
		body: createTodoSchema,
	},
	validatorCompiler,
	async handler(req: FastifyRequest<{ Body: TodoCreateDto }>, res) {
		const todo = {
			id: db.get("todoId").value(),
			done: false,
			text: req.body.text,
		};

		db.update("todoId", (id) => id + 1).write();
		db.get("todos").push(todo).write();

		res.status(201).send(todo);
	},
});

server.route({
	url: "/done/:id",
	method: "PATCH",
	schema: {
		params: todoIdSchema,
		body: markTodoAsDoneSchema,
	},
	validatorCompiler,
	async handler(
		req: FastifyRequest<{ Params: TodoIdDto; Body: TodoMarkAsDoneDto }>,
		res
	) {
		const todo = db.get("todos").find({ id: req.params.id }).value();

		if (!todo) {
			res.status(404).send({ message: "Todo not found" });

			return;
		}

		db.get("todos")
			.find({ id: req.params.id })
			.update("done", () => req.body.done)
			.write();

		res.status(200).send({ ...todo, done: req.body.done });
	},
});

server.route({
	url: "/",
	method: "GET",
	schema: {
		querystring: todoFilterSchema,
	},
	validatorCompiler,
	async handler(req: FastifyRequest<{ Querystring: TodoFilter }>, res) {
		const allTodos = db.get("todos");

		const todos =
			req.query.onlyUndone === "true"
				? allTodos.filter({ done: false }).value()
				: allTodos.value();

		res.send(todos);
	},
});

export default server;
