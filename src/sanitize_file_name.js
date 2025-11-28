"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.sanitizeFileName = exports.DEFAULT_ILLEGAL_SYMBOLS = exports.PLATFORM_ILLEGAL_SYMBOLS = exports.OBSIDIAN_ILLEGAL_SYMBOLS = void 0;
exports.OBSIDIAN_ILLEGAL_SYMBOLS = ['[', ']', '#', '^', '|', ':', '\\', '/'];
var WINDOWS_CONTROL_CHARACTERS = Array.from({ length: 31 }, function (_, i) { return String.fromCharCode(i + 1); });
exports.PLATFORM_ILLEGAL_SYMBOLS = {
    win32: __spreadArray(['<', '>', ':', '"', '/', '\\', '|', '?', '*', '\0'], WINDOWS_CONTROL_CHARACTERS, true),
    darwin: ['/', ':', '\0'],
    linux: ['/', '\0']
};
exports.DEFAULT_ILLEGAL_SYMBOLS = Array.from(new Set(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], exports.OBSIDIAN_ILLEGAL_SYMBOLS, true), exports.PLATFORM_ILLEGAL_SYMBOLS.win32, true), exports.PLATFORM_ILLEGAL_SYMBOLS.darwin, true), exports.PLATFORM_ILLEGAL_SYMBOLS.linux, true)));
function escapeForRegexCharacterClass(char) {
    if (char === ']' || char === '\\' || char === '-' || char === '^') {
        return "\\".concat(char);
    }
    return char;
}
function removeTrailingPeriodsAndSpaces(name) {
    return name.replace(/[.\s]+$/, '');
}
/// Sanitizes file names by replacing illegal characters with underscores and truncating length.
/// Uses a simple, deterministic approach to ensure consistent results across platforms and
/// avoid edge cases that could cause file system errors.
/// Includes Windows-specific fixes for trailing periods/spaces.
function sanitizeFileName(name, illegalSymbols, maxLength) {
    if (illegalSymbols === void 0) { illegalSymbols = exports.DEFAULT_ILLEGAL_SYMBOLS; }
    if (maxLength === void 0) { maxLength = 150; }
    if (!name) {
        return 'untitled';
    }
    var escapedSymbols = illegalSymbols.map(escapeForRegexCharacterClass).join('');
    var sanitized = name.replace(new RegExp("[".concat(escapedSymbols, "]"), 'g'), '_').trim();
    sanitized = removeTrailingPeriodsAndSpaces(sanitized);
    if (sanitized.length > maxLength) {
        sanitized = sanitized.slice(0, maxLength);
        sanitized = removeTrailingPeriodsAndSpaces(sanitized);
    }
    if (!sanitized) {
        return 'untitled';
    }
    return sanitized;
}
exports.sanitizeFileName = sanitizeFileName;
