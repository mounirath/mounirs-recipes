import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { chargilyWebhook } from "./webhook";

const http = httpRouter();

auth.addHttpRoutes(http);

// Chargily Pay webhook — activates paid subscriptions automatically.
// Configure this exact URL in the Chargily dashboard:
//   https://jovial-kookabura-236.convex.site/webhooks/chargily
http.route({
  path: "/webhooks/chargily",
  method: "POST",
  handler: chargilyWebhook,
});

export default http;
