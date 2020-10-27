"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAppName = exports.doneMessage = void 0;
var chalk_1 = require("chalk");
function doneMessage(o, a) {
    console.log('');
    console.log(chalk_1.default.magenta('Share your feedback with the author mlench@finitydevelopment.com (Mayer Lench)'));
    console.log(chalk_1.default.magenta("This project is backed by " + chalk_1.default.green('Finity Development') + ", https://finitydevelopment.com"));
    console.log('');
    console.log(chalk_1.default.blue("cd " + a.PROJECT_NAME + "/sdf npm i"));
    console.log('');
    console.log(chalk_1.default.green('Done!'));
    console.log(chalk_1.default.green("Happy Hacking :)"));
    var message = o.config.postMessage;
    if (message) {
        console.log('');
        console.log(chalk_1.default.yellow(message));
        console.log('');
    }
}
exports.doneMessage = doneMessage;
function checkAppName(appName) {
    if (!appName) {
        console.error(chalk_1.default.red('\nPlease choose a valid project name.'));
        process.exit(1);
    }
}
exports.checkAppName = checkAppName;
//# sourceMappingURL=log.js.map