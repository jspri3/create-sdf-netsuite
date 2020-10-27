"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDirectoryContents = exports.createProject = exports.getTemplateConfig = exports.render = void 0;
var ejs = require("ejs");
var fs = require("fs");
var path = require("path");
var chalk_1 = require("chalk");
exports.render = function (content, data) { return ejs.render(content, data); };
function getTemplateConfig(templatePath) {
    var configPath = path.join(templatePath, ".template.json");
    if (!fs.existsSync(configPath))
        return {};
    var templateConfigContent = fs.readFileSync(configPath);
    if (templateConfigContent) {
        return JSON.parse(templateConfigContent.toString());
    }
    return {};
}
exports.getTemplateConfig = getTemplateConfig;
function createProject(projectPath) {
    if (fs.existsSync(projectPath)) {
        console.log(chalk_1.default.red("Folder " + projectPath + " exists. Delete or use another name."));
        return false;
    }
    fs.mkdirSync(projectPath);
    return true;
}
exports.createProject = createProject;
function createDirectoryContents(o, a) {
    var filesToCreate = fs.readdirSync(o.templatePath);
    filesToCreate.forEach(function (file) {
        var origFilePath = path.join(o.templatePath, file);
        // get stats about the current file
        var stats = fs.statSync(origFilePath);
        var SKIP_FILES = ["node_modules", ".template.json"];
        if (SKIP_FILES.indexOf(file) > -1)
            return;
        var fileName = renderFileName(file, a);
        if (stats.isFile()) {
            var writePath = path.join(o.targetCreateDir, o.projectName, fileName);
            if (excludeFromRender(file))
                return fs.copyFileSync(origFilePath, writePath);
            var contents = exports.render(fs.readFileSync(origFilePath, "utf8"), a);
            fs.writeFileSync(writePath, contents, "utf8");
        }
        else if (stats.isDirectory()) {
            fs.mkdirSync(path.join(o.targetCreateDir, o.projectName, fileName));
            if (fileName === "ello")
                console.log("YOO", path.join(o.projectName, fileName));
            // recursive call
            createDirectoryContents(__assign(__assign({}, o), { templatePath: path.join(o.templatePath, file), projectName: path.join(o.projectName, fileName) }), a);
        }
    });
}
exports.createDirectoryContents = createDirectoryContents;
var renderFileName = function (fileName, a) {
    var name = fileName.replace(/%-/g, "<%=").replace(/-%/g, "%>");
    return ejs.render(name, a);
};
var excludeFromRender = function (fileName) {
    return [".png", ".jpg", ".tiff", '.html'].find(function (f) { return fileName.includes(f); });
};
//# sourceMappingURL=template.js.map