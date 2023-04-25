'use strict';

const {format, createLogger, transports} = require('winston');

const {combine, timestamp, label, prettyPrint} = format;
const runBrowserTests = process.env.run_ui_tests === 'true';
const headless = process.env.headless_chrome === 'true';
const uiHeading = headless ? 'UI-TEST-headless' : 'UI-TEST';
const CATEGORY = runBrowserTests ? uiHeading : 'ROUTING-TEST';
const logLevel = process.env.log_level;
const template = process.env.template_under_test;

const logger = createLogger({
    level: logLevel,
    format: combine(
        label({label: CATEGORY}),
        timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        prettyPrint()
    ),
    defaultMeta: {template: template},
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new transports.File({filename: './logs/error.log', level: 'error'}),
        new transports.File({filename: './logs/combined.log'})
    ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console());
}

module.exports = logger;
