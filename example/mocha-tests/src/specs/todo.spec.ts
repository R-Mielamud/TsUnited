import chai, { expect } from "chai";
import server from "~server";

describe("Todos tests", () => {
	const todoText = "My test todo";
	let todoId: number;
	let serverRequest: ChaiHttp.Agent;

	before("starts server", async () => {
		// In this small example I start the server inside describe, but it'll be better to do this in a global before hook.

		const address = await server.listen({
			port: 0, // Any free port
		});

		serverRequest = chai.request(address);
	});

	after("stops server", async () => {
		await server.close();
	});

	it("adds a todo", async () => {
		const response = await serverRequest.post("/").send({ text: todoText });

		todoId = response.body.id;

		expect(response.status).to.be.equal(201);

		expect(response.body).to.include.deep.keys({
			done: false,
			text: todoText,
		});
	});

	it("gets all todos", async () => {
		const response = await serverRequest.get("/");

		expect(response.status).to.be.equal(200);

		expect(response.body).to.deep.include({
			id: todoId,
			done: false,
			text: todoText,
		});
	});

	it("marks todo as done", async () => {
		const response = await serverRequest
			.patch(`/done/${todoId}`)
			.send({ done: true });

		expect(response.status).to.be.equal(200);

		expect(response.body).to.be.eql({
			id: todoId,
			done: true,
			text: todoText,
		});
	});

	it("gets all todos again", async () => {
		const response = await serverRequest.get("/");

		expect(response.status).to.be.equal(200);

		expect(response.body).to.deep.include({
			id: todoId,
			done: true,
			text: todoText,
		});
	});
});
