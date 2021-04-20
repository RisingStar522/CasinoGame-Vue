"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cli_1 = require("./cli");
var cli = new cli_1.Cli();
var yargs = require('yargs')
    .usage("Usage: laravel-echo-server <command> [options]")
    .command("start", "Starts the server.", function (yargs) { return cli.start(yargs); })
    .command("stop", "Stops the server.", function (yargs) { return cli.stop(yargs); })
    .command(["configure", "init"], "Creates a custom config file.", function (yargs) { return cli.configure(yargs); })
    .command("client:add [id]", "Register a client that can make api requests.", function (yargs) { return cli.clientAdd(yargs); })
    .command("client:remove [id]", "Remove a registered client.", function (yargs) { return cli.clientRemove(yargs); })
    .demandCommand(1, "Please provide a valid command.")
    .help("help")
    .alias("help", "h");
yargs.$0 = '';
var argv = yargs.argv;
