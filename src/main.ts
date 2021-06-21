import { makeHealthRouter } from "./routers/health.router";
import { makeServer } from "./server";

const healthRouter = makeHealthRouter();
const server = makeServer({ healthRouter });

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Listening on ${port}`);
});
