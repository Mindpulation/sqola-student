const config = require('config');
const express = require('express');
const Sentry = require('@sentry/node');
const Tracing = require("@sentry/tracing");

const server = require('./bin/app/server');
const student = require('./bin/app/student');
const app = express();

app.use('/v1/student', student)
app.use('/', server)

Sentry.init({
    dsn: config.get('dnsSentryUrl'),
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());

app.listen(config.get('ports'), (err) => {
    const ctx = "index-listenPort";
    (!err) ? console.log(ctx, `[✔] Server running at http://localhost:${config.get('ports')}`, `running server` )
        :
    console.log(ctx, `[x] Something went wrong, msg:${err}`, `Failed running server` )
    new Error({'ctx' : ctx, 'message' : err})

});
