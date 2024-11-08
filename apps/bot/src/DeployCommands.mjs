// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Env from "./Env.mjs";
import * as Js_exn from "rescript/lib/es6/js_exn.js";
import * as Commands_Help from "./commands/Commands_Help.mjs";
import * as Core__Promise from "@rescript/core/src/Core__Promise.mjs";
import * as Rest from "@discordjs/rest";
import * as Caml_exceptions from "rescript/lib/es6/caml_exceptions.js";
import * as Commands_Invite from "./commands/Commands_Invite.mjs";
import * as Commands_Verify from "./commands/Commands_Verify.mjs";
import * as V9 from "discord-api-types/v9";

var DeployCommandsError = /* @__PURE__ */Caml_exceptions.create("DeployCommands.DeployCommandsError");

var Rest$1 = {};

var Routes = {};

Env.createEnv();

var envConfig = Env.getConfig();

var envConfig$1;

if (envConfig.TAG === "Ok") {
  envConfig$1 = envConfig._0;
} else {
  throw {
        RE_EXN_ID: Env.EnvError,
        _1: envConfig._0,
        Error: new Error()
      };
}

var token = envConfig$1.discordApiToken;

var clientId = envConfig$1.discordClientId;

var helpCommand = Commands_Help.data.toJSON();

var verifyCommand = Commands_Verify.data.toJSON();

var inviteCommand = Commands_Invite.data.toJSON();

var commands = [
  helpCommand,
  verifyCommand,
  inviteCommand
];

var rest = new Rest.REST({
        version: 9
      }).setToken(token);

Core__Promise.$$catch(rest.put(V9.Routes.applicationCommands(clientId), {
            body: commands
          }).then(function () {
          console.log("Successfully registered application commands.");
        }), (function (e) {
        if (e.RE_EXN_ID === DeployCommandsError) {
          console.error("Deploy Commands Error:" + e._1);
        } else if (e.RE_EXN_ID === Js_exn.$$Error) {
          var msg = e._1.message;
          if (msg !== undefined) {
            console.error("Deploy Commands Error: " + msg);
          } else {
            console.error("Must be some non-error value");
          }
        } else {
          console.error("Some unknown error");
        }
        return Promise.resolve();
      }));

export {
  DeployCommandsError ,
  Rest$1 as Rest,
  Routes ,
  envConfig$1 as envConfig,
  token ,
  clientId ,
  helpCommand ,
  verifyCommand ,
  inviteCommand ,
  commands ,
  rest ,
}
/*  Not a pure module */
