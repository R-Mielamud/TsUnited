import low from "lowdb";
import { AdapterSync } from "lowdb";
import Settings from "./settings";
import { DBData } from "./types";

const db = low<AdapterSync<DBData>>(Settings.DB_FILE);

const getDB = () => {
	db.defaults({ todoId: 1, todos: [] }).write();

	return db;
};

export default getDB;
