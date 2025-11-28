"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.FormattingConfigModal = void 0;
var obsidian_1 = require("obsidian");
var types_1 = require("./types");
var FormattingConfigModal = /** @class */ (function (_super) {
    __extends(FormattingConfigModal, _super);
    function FormattingConfigModal(app, plugin, onSave) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this, app) || this;
        _this.plugin = plugin;
        _this.onSave = onSave;
        _this.tempEpisodeTemplate = (_a = plugin.settings.episodeTemplate) !== null && _a !== void 0 ? _a : types_1.DEFAULT_EPISODE_TEMPLATE;
        _this.tempSnipTemplate = (_b = plugin.settings.snipTemplate) !== null && _b !== void 0 ? _b : types_1.DEFAULT_SNIP_TEMPLATE;
        _this.tempEpisodeFileNameTemplate = (_c = plugin.settings.episodeFileNameTemplate) !== null && _c !== void 0 ? _c : types_1.DEFAULT_EPISODE_FILE_NAME_TEMPLATE;
        return _this;
    }
    FormattingConfigModal.prototype.onOpen = function () {
        var _this = this;
        var contentEl = this.contentEl;
        contentEl.empty();
        var scrollableContent = contentEl.createDiv({ cls: 'snipd-modal-scrollable' });
        scrollableContent.createEl('h2', { text: 'Custom formatting' });
        scrollableContent.createEl('p', {
            text: 'Configure how your episodes and snips are formatted.',
            cls: 'setting-item-description'
        });
        var syntaxDesc = scrollableContent.createDiv({ cls: 'setting-item-description snipd-syntax-description' });
        syntaxDesc.createEl('strong', { text: 'Guide: ' });
        syntaxDesc.appendText('Use ');
        syntaxDesc.createEl('code', { text: '{{variable}}' });
        syntaxDesc.appendText(' to insert content. Add ');
        syntaxDesc.createEl('code', { text: '[[title]]' });
        syntaxDesc.appendText(' after a variable to show a section header when content is available (e.g. ');
        syntaxDesc.createEl('code', { text: '{{snip_note}}[[#### Note]]' });
        syntaxDesc.appendText(' will show "#### Note" followed by the note content if a note exists).');
        var fileNameSection = scrollableContent.createDiv({ cls: 'snipd-formatting-section' });
        fileNameSection.createEl('h3', { text: 'Episode page name' });
        var fileNameVarsDesc = fileNameSection.createDiv({ cls: 'snipd-template-variables' });
        fileNameVarsDesc.setText('Variables (click to copy): ');
        var fileNameVars = [
            '{{episode_title}}',
            '{{episode_duration}}',
            '{{episode_publish_date}}',
            '{{episode_url}}'
        ];
        fileNameVars.forEach(function (varName, index) {
            var varSpan = fileNameVarsDesc.createSpan({ cls: 'snipd-template-variable', text: varName });
            varSpan.addEventListener('click', function () {
                void (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, globalThis.navigator.clipboard.writeText(varName)];
                            case 1:
                                _b.sent();
                                new obsidian_1.Notice("Copied ".concat(varName, " to clipboard"));
                                return [3 /*break*/, 3];
                            case 2:
                                _a = _b.sent();
                                new obsidian_1.Notice("Failed to copy ".concat(varName, " to clipboard"));
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })();
            });
            if (index < fileNameVars.length - 1) {
                fileNameVarsDesc.appendText(', ');
            }
        });
        var fileNameInput = fileNameSection.createEl('input', {
            cls: 'snipd-template-input',
            type: 'text'
        });
        fileNameInput.value = this.tempEpisodeFileNameTemplate;
        fileNameInput.addEventListener('input', function () {
            _this.tempEpisodeFileNameTemplate = fileNameInput.value;
        });
        var episodeSection = scrollableContent.createDiv({ cls: 'snipd-formatting-section' });
        episodeSection.createEl('h3', { text: 'Episode template' });
        var episodeVarsDesc = episodeSection.createDiv({ cls: 'snipd-template-variables' });
        episodeVarsDesc.setText('Variables (click to copy): ');
        var episodeVars = [
            '{{episode_title}}',
            '{{episode_image}}',
            '{{show_title}}',
            '{{show_author}}',
            '{{guests}}',
            '{{episode_publish_date}}',
            '{{episode_ai_description}}',
            '{{mentioned_books}}',
            '{{episode_duration}}',
            '{{episode_url}}',
            '{{show_url}}',
            '{{episode_export_date}}',
            '{{snips_section}}'
        ];
        episodeVars.forEach(function (varName, index) {
            var varSpan = episodeVarsDesc.createSpan({ cls: 'snipd-template-variable', text: varName });
            varSpan.addEventListener('click', function () {
                void (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, globalThis.navigator.clipboard.writeText(varName)];
                            case 1:
                                _b.sent();
                                new obsidian_1.Notice("Copied ".concat(varName, " to clipboard"));
                                return [3 /*break*/, 3];
                            case 2:
                                _a = _b.sent();
                                new obsidian_1.Notice("Failed to copy ".concat(varName, " to clipboard"));
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })();
            });
            if (index < episodeVars.length - 1) {
                episodeVarsDesc.appendText(', ');
            }
        });
        var episodeTextarea = episodeSection.createEl('textarea', {
            cls: 'snipd-template-textarea'
        });
        episodeTextarea.value = this.tempEpisodeTemplate;
        episodeTextarea.rows = 10;
        episodeTextarea.addEventListener('input', function () {
            _this.tempEpisodeTemplate = episodeTextarea.value;
        });
        var snipSection = scrollableContent.createDiv({ cls: 'snipd-formatting-section' });
        snipSection.createEl('h3', { text: 'Snip template' });
        var snipVarsDesc = snipSection.createDiv({ cls: 'snipd-template-variables' });
        snipVarsDesc.setText('Variables (click to copy): ');
        var snipVars = [
            '{{snip_title}}',
            '{{snip_url}}',
            '{{snip_tags}}',
            '{{snip_favorite_star}}',
            '{{snip_start_time}}',
            '{{snip_end_time}}',
            '{{snip_duration}}',
            '{{snip_note}}',
            '{{snip_quote}}',
            '{{snip_transcript}}'
        ];
        snipVars.forEach(function (varName, index) {
            var varSpan = snipVarsDesc.createSpan({ cls: 'snipd-template-variable', text: varName });
            varSpan.addEventListener('click', function () {
                void (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, globalThis.navigator.clipboard.writeText(varName)];
                            case 1:
                                _b.sent();
                                new obsidian_1.Notice("Copied ".concat(varName, " to clipboard"));
                                return [3 /*break*/, 3];
                            case 2:
                                _a = _b.sent();
                                new obsidian_1.Notice("Failed to copy ".concat(varName, " to clipboard"));
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })();
            });
            if (index < snipVars.length - 1) {
                snipVarsDesc.appendText(', ');
            }
        });
        var snipTextarea = snipSection.createEl('textarea', {
            cls: 'snipd-template-textarea'
        });
        snipTextarea.value = this.tempSnipTemplate;
        snipTextarea.rows = 10;
        snipTextarea.addEventListener('input', function () {
            _this.tempSnipTemplate = snipTextarea.value;
        });
        var buttonContainer = contentEl.createDiv({ cls: 'modal-button-container' });
        var resetButton = buttonContainer.createEl('button', { text: 'Reset to default' });
        resetButton.addEventListener('click', function () {
            _this.tempEpisodeFileNameTemplate = types_1.DEFAULT_EPISODE_FILE_NAME_TEMPLATE;
            _this.tempEpisodeTemplate = types_1.DEFAULT_EPISODE_TEMPLATE;
            _this.tempSnipTemplate = types_1.DEFAULT_SNIP_TEMPLATE;
            fileNameInput.value = _this.tempEpisodeFileNameTemplate;
            episodeTextarea.value = _this.tempEpisodeTemplate;
            snipTextarea.value = _this.tempSnipTemplate;
        });
        var cancelButton = buttonContainer.createEl('button', { text: 'Cancel' });
        cancelButton.addEventListener('click', function () {
            _this.close();
        });
        var saveButton = buttonContainer.createEl('button', {
            text: 'Save',
            cls: 'mod-cta'
        });
        saveButton.addEventListener('click', function () {
            void (function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.episodeFileNameTemplate =
                                this.tempEpisodeFileNameTemplate === types_1.DEFAULT_EPISODE_FILE_NAME_TEMPLATE
                                    ? null
                                    : this.tempEpisodeFileNameTemplate;
                            this.plugin.settings.episodeTemplate =
                                this.tempEpisodeTemplate === types_1.DEFAULT_EPISODE_TEMPLATE
                                    ? null
                                    : this.tempEpisodeTemplate;
                            this.plugin.settings.snipTemplate =
                                this.tempSnipTemplate === types_1.DEFAULT_SNIP_TEMPLATE
                                    ? null
                                    : this.tempSnipTemplate;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            this.onSave();
                            this.close();
                            return [2 /*return*/];
                    }
                });
            }); })();
        });
    };
    FormattingConfigModal.prototype.onClose = function () {
        var contentEl = this.contentEl;
        contentEl.empty();
    };
    return FormattingConfigModal;
}(obsidian_1.Modal));
exports.FormattingConfigModal = FormattingConfigModal;
