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
exports.SecureStorage = void 0;
var SecureStorage = /** @class */ (function () {
    function SecureStorage() {
    }
    SecureStorage.deriveKey = function (vaultPath) {
        return __awaiter(this, void 0, void 0, function () {
            var encoder, keyMaterial, salt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        encoder = new TextEncoder();
                        return [4 /*yield*/, globalThis.crypto.subtle.importKey('raw', encoder.encode(vaultPath + this.SERVICE_NAME), 'PBKDF2', false, ['deriveKey'])];
                    case 1:
                        keyMaterial = _a.sent();
                        salt = encoder.encode('snipd-secure-storage-salt-v1');
                        return [2 /*return*/, globalThis.crypto.subtle.deriveKey({
                                name: 'PBKDF2',
                                salt: salt,
                                iterations: 100000,
                                hash: 'SHA-256'
                            }, keyMaterial, { name: this.ALGORITHM, length: this.KEY_LENGTH }, false, ['encrypt', 'decrypt'])];
                }
            });
        });
    };
    SecureStorage.encryptApiKey = function (apiKey, vaultPath) {
        return __awaiter(this, void 0, void 0, function () {
            var key, encoder, data, iv, encryptedData, encryptedArray, combined, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!apiKey) {
                            return [2 /*return*/, ''];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.deriveKey(vaultPath)];
                    case 2:
                        key = _b.sent();
                        encoder = new TextEncoder();
                        data = encoder.encode(apiKey);
                        iv = globalThis.crypto.getRandomValues(new Uint8Array(12));
                        return [4 /*yield*/, globalThis.crypto.subtle.encrypt({
                                name: this.ALGORITHM,
                                iv: iv
                            }, key, data)];
                    case 3:
                        encryptedData = _b.sent();
                        encryptedArray = new Uint8Array(encryptedData);
                        combined = new Uint8Array(iv.length + encryptedArray.length);
                        combined.set(iv);
                        combined.set(encryptedArray, iv.length);
                        return [2 /*return*/, globalThis.btoa(String.fromCharCode.apply(String, combined))];
                    case 4:
                        _a = _b.sent();
                        throw new Error('Failed to encrypt API key');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SecureStorage.decryptApiKey = function (encryptedApiKey, vaultPath) {
        return __awaiter(this, void 0, void 0, function () {
            var key, combined, iv, encryptedData, decryptedData, decoder, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!encryptedApiKey) {
                            return [2 /*return*/, ''];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.deriveKey(vaultPath)];
                    case 2:
                        key = _b.sent();
                        combined = Uint8Array.from(globalThis.atob(encryptedApiKey), function (c) { return c.charCodeAt(0); });
                        iv = combined.slice(0, 12);
                        encryptedData = combined.slice(12);
                        return [4 /*yield*/, globalThis.crypto.subtle.decrypt({
                                name: this.ALGORITHM,
                                iv: iv
                            }, key, encryptedData)];
                    case 3:
                        decryptedData = _b.sent();
                        decoder = new TextDecoder();
                        return [2 /*return*/, decoder.decode(decryptedData)];
                    case 4:
                        _a = _b.sent();
                        return [2 /*return*/, ''];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SecureStorage.ALGORITHM = 'AES-GCM';
    SecureStorage.KEY_LENGTH = 256;
    SecureStorage.SERVICE_NAME = 'snipd-obsidian-plugin';
    return SecureStorage;
}());
exports.SecureStorage = SecureStorage;
