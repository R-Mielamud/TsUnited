import server from "./server";

server.listen(
	{ port: process.env.PORT ? Number(process.env.PORT) : 3000 },
	(err, address) => {
		if (err) {
			throw err;
		}

		console.log(`Listening on ${address}`);
	}
);
