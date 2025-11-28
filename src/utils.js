"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.createDirForFile = exports.generateEpisodeFileName = exports.debugLog = exports.isDev = void 0;
var types_1 = require("./types");
var sanitize_file_name_1 = require("./sanitize_file_name");
var isDev = function () {
    return false;
};
exports.isDev = isDev;
var debugLog = function () {
    var _a;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if ((0, exports.isDev)()) {
        (_a = globalThis.console).debug.apply(_a, args);
    }
};
exports.debugLog = debugLog;
function generateEpisodeFileName(episodeData, episodeId, settings) {
    var _a;
    if (!episodeData) {
        (0, exports.debugLog)("Snipd plugin: No episode data found for ".concat(episodeId, ", using ID as fallback"));
        return (0, sanitize_file_name_1.sanitizeFileName)(episodeId);
    }
    var template = (_a = settings.episodeFileNameTemplate) !== null && _a !== void 0 ? _a : types_1.DEFAULT_EPISODE_FILE_NAME_TEMPLATE;
    var variables = {
        'episode_title': episodeData.episode_name || '',
        'episode_duration': episodeData.episode_duration || '',
        'episode_publish_date': episodeData.episode_publish_date || '',
        'episode_url': episodeData.episode_url || ''
    };
    var result = template.replace(/\{\{([a-zA-Z0-9_]+)\}\}\[\[.*?\]\]/g, function (_, varName) {
        return variables[varName] || '';
    });
    result = result.replace(/\{\{([a-zA-Z0-9_]+)\}\}/g, function (_, varName) {
        var value = variables[varName] || '';
        if (!variables[varName]) {
            (0, exports.debugLog)("Snipd plugin: Unknown variable {{".concat(varName, "}} in episode filename template"));
        }
        return value;
    });
    if (!result.trim()) {
        result = episodeData.episode_name || episodeId;
    }
    return (0, sanitize_file_name_1.sanitizeFileName)(result);
}
exports.generateEpisodeFileName = generateEpisodeFileName;
function createDirForFile(filePath, fs) {
    return __awaiter(this, void 0, void 0, function () {
        var dirPath, exists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dirPath = filePath.replace(/\/+$/, '').replace(/^(.+)\/[^/]*?$/, '$1');
                    return [4 /*yield*/, fs.exists(dirPath)];
                case 1:
                    exists = _a.sent();
                    if (!!exists) return [3 /*break*/, 3];
                    return [4 /*yield*/, fs.mkdir(dirPath)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createDirForFile = createDirForFile;
