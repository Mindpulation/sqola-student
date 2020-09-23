const express = require('express');
const Sentry = require('@sentry/node');
const Tracing = require("@sentry/tracing");

const app = express();

Sentry.init({
    dsn: "https://e14320c83d984a759db44045927feb8c@o341522.ingest.sentry.io/5437793",
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// All controllers should live here
app.get("/", function rootHandler(req, res) {
    res.end("Hello world!");
    throw new Error("My first Sentry error!");
});

app.use(Sentry.Handlers.errorHandler());

app.use(function onError(err, req, res, next) {
    res.statusCode = 500;
    res.end(res.sentry + "\n");
});

app.listen(3000);
