import path from "path";
import FileSync from "lowdb/adapters/FileSync";
import { DBData } from "./types";

export default class Settings {
	static DB_FILE = new FileSync<DBData>(path.resolve(__dirname, "db.json"));
}
