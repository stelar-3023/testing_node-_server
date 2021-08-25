import database from "./database";
import app from "./app.js";

const app = makeApp(database);

app.listen(8080, () => console.log("Listening on port 8080"));
