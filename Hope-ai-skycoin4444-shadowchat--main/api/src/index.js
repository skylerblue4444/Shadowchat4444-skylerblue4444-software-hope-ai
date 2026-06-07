const Fastify = require("fastify");
const http = require("http");

const AI = require("../../modules/ai");
const Agent = require("../../modules/agent");
const Admin = require("../../modules/admin");
const Analytics = require("../../modules/analytics");
const Billing = require("../../modules/billing");

const app = Fastify();
const server = http.createServer(app.server);

app.get("/health", async () => ({ status: "ok", version: "v1-v23" }));

app.post("/chat", async (req) => {
  Admin.track("request");
  Analytics.log(req.body);

  return Agent.run(req.body.input);
});

app.get("/admin", async () => Admin.get());

app.get("/analytics", async () => Analytics.summary());

app.post("/pay/stripe", async (req) => Billing.stripe(req.body.amount));

app.post("/pay/crypto", async (req) => Billing.crypto(req.body.amount));

server.listen(4000, () => {
  console.log("SAMS FULL SYSTEM RUNNING");
});
