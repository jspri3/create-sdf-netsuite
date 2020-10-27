"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultStringValidate = void 0;
//may only include letters, numbers, and underscores
exports.defaultStringValidate = function (input) { return /^([A-Za-z\-\_\d])+$/.test(input); };
//# sourceMappingURL=validation.js.map