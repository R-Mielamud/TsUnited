import App from "./app";
import "~/styles/index.scss";

const app = new App();

window.addEventListener("load", () => {
	app.run();
});
