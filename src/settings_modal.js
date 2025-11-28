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
exports.SnipdSettingModal = void 0;
var obsidian_1 = require("obsidian");
var formatting_modal_1 = require("./formatting_modal");
var types_1 = require("./types");
var utils_1 = require("./utils");
var main_1 = require("./main");
var SnipdSettingModal = /** @class */ (function (_super) {
    __extends(SnipdSettingModal, _super);
    function SnipdSettingModal(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.refreshInterval = null;
        _this.plugin = plugin;
        return _this;
    }
    SnipdSettingModal.prototype.hide = function () {
        if (this.refreshInterval !== null) {
            globalThis.window.clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }
        this.plugin.settingsTab = null;
    };
    SnipdSettingModal.prototype.generateUUIDv4 = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    // Cannot use electron API in Obsidian
    SnipdSettingModal.prototype.openExternal = function (url) {
        globalThis.window.open(url);
    };
    SnipdSettingModal.prototype.connectToSnipd = function (button, container, uuid) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!uuid) {
                            uuid = this.generateUUIDv4();
                        }
                        container.empty();
                        container.addClass('snipd-hidden');
                        this.openExternal("".concat(main_1.AUTH_URL, "?uuid=").concat(uuid));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (0, obsidian_1.requestUrl)({
                                url: "".concat(main_1.API_BASE_URL, "/obsidian/auth?uuid=").concat(uuid),
                                method: 'GET'
                            })];
                    case 2:
                        response = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        (0, utils_1.debugLog)("Snipd plugin: request failed in connectToSnipd: ", e_1);
                        button.textContent = 'Connect';
                        button.removeAttribute('disabled');
                        this.showInfoStatus(container, "Connection failed. Try again", "snipd-error");
                        return [2 /*return*/];
                    case 4:
                        if (response && response.status >= 200 && response.status < 300) {
                            data = response.json;
                        }
                        else {
                            (0, utils_1.debugLog)("Snipd plugin: bad response in connectToSnipd: ", response);
                            button.textContent = 'Connect';
                            button.removeAttribute('disabled');
                            this.showInfoStatus(container, "Connection failed. Try again", "snipd-error");
                            return [2 /*return*/];
                        }
                        if (!data.token) return [3 /*break*/, 6];
                        (0, utils_1.debugLog)("Snipd plugin: successfully authenticated with Snipd");
                        this.plugin.settings.apiKey = data.token;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 5:
                        _a.sent();
                        this.display();
                        new obsidian_1.Notice("Successfully connected to Snipd");
                        return [3 /*break*/, 7];
                    case 6:
                        (0, utils_1.debugLog)("Snipd plugin: didn't get token data");
                        button.textContent = 'Connect';
                        button.removeAttribute('disabled');
                        this.showInfoStatus(container, "Authorization failed. Please try again", "snipd-error");
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SnipdSettingModal.prototype.showInfoStatus = function (container, message, cls) {
        if (!container) {
            return;
        }
        container.empty();
        container.removeClass('snipd-hidden');
        var statusEl = container.createDiv({ cls: cls });
        statusEl.textContent = message;
        statusEl.addClass('snipd-error-text');
    };
    SnipdSettingModal.prototype.display = function () {
        var _this = this;
        this.plugin.settingsTab = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        ;
        containerEl.createEl('p', { text: 'Sync your Snipd content to you Obsidian vault' });
        if (!this.plugin.settings.apiKey) {
            var authSection = containerEl.createDiv({ cls: 'snipd-auth-section' });
            var title = new obsidian_1.Setting(authSection).setName("Connect Obsidian to Snipd").setHeading();
            title.settingEl.addClass('snipd-auth-heading');
            var subtitleRow = authSection.createDiv({ cls: 'snipd-auth-subtitle-row' });
            subtitleRow.createEl('p', { text: 'Sign in to connect the plugin to your Snipd account to sync your snips', cls: 'snipd-auth-subtitle' });
            var connectButton_1 = subtitleRow.createEl('button', {
                text: 'Connect',
                cls: 'mod-cta snipd-auth-button'
            });
            var errorContainer_1 = authSection.createDiv({ cls: 'snipd-error-container snipd-hidden' });
            connectButton_1.addEventListener('click', function () {
                connectButton_1.textContent = 'Connecting...';
                connectButton_1.setAttribute('disabled', 'true');
                void _this.connectToSnipd(connectButton_1, errorContainer_1);
            });
            return;
        }
        var syncStatusContainer = containerEl.createDiv({ cls: 'snipd-sync-status' });
        var syncStatusHeader = syncStatusContainer.createDiv({ cls: 'snipd-sync-status-header' });
        syncStatusHeader.createEl('div', { text: 'Sync status', cls: 'snipd-sync-status-title' });
        if (this.plugin.settings.isSyncing) {
            var stopButton = syncStatusHeader.createEl('button', {
                text: 'Stop syncing'
            });
            stopButton.addEventListener('click', function () {
                void _this.plugin.stopSync();
            });
        }
        else {
            var syncButtonText = this.plugin.settings.hasCompletedFirstSync ? 'Sync now' : 'Start syncing';
            var syncButton = syncStatusHeader.createEl('button', {
                text: syncButtonText,
                cls: 'mod-cta'
            });
            syncButton.addEventListener('click', function () {
                void _this.plugin.syncSnipd();
            });
        }
        var syncStatusBody = syncStatusContainer.createDiv({ cls: 'snipd-sync-status-body' });
        if (this.plugin.settings.isSyncing) {
            if (this.plugin.settings.current_export_total_batches > 0) {
                var currentBatch = this.plugin.settings.current_export_batch_index;
                var totalBatches = this.plugin.settings.current_export_total_batches;
                var displayBatch = Math.min(currentBatch + 1, totalBatches);
                var remainingBatches = Math.max(totalBatches - currentBatch, 0);
                var progressPercent = totalBatches > 0 ? Math.round((currentBatch / totalBatches) * 100) : 0;
                var episodeCount = this.plugin.settings.current_batch_episode_count;
                var snipCount = this.plugin.settings.current_batch_snip_count;
                syncStatusBody.createEl('div', {
                    text: "Syncing: Batch ".concat(displayBatch, " of ").concat(totalBatches, " (").concat(remainingBatches, " remaining)"),
                    cls: 'snipd-sync-status-text'
                });
                if (episodeCount > 0 || snipCount > 0) {
                    syncStatusBody.createEl('div', {
                        text: "Current batch: ".concat(episodeCount, " episode").concat(episodeCount !== 1 ? 's' : '', ", ").concat(snipCount, " snip").concat(snipCount !== 1 ? 's' : ''),
                        cls: 'snipd-sync-status-text'
                    });
                }
                syncStatusBody.createEl('div', {
                    text: "Progress: ".concat(progressPercent, "%"),
                    cls: 'snipd-sync-status-text'
                });
            }
            else {
                syncStatusBody.createEl('div', {
                    text: 'Preparing sync...',
                    cls: 'snipd-sync-status-text'
                });
            }
        }
        else if (this.plugin.settings.lastSyncTimestamp) {
            var lastSyncDate = new Date(this.plugin.settings.lastSyncTimestamp);
            var formattedDate = lastSyncDate.toLocaleString();
            syncStatusBody.createEl('div', {
                text: "Last sync: ".concat(formattedDate),
                cls: 'snipd-sync-status-text'
            });
            if (this.plugin.settings.lastSyncEpisodeCount > 0 || this.plugin.settings.lastSyncSnipCount > 0) {
                syncStatusBody.createEl('div', {
                    text: "Last synced: ".concat(this.plugin.settings.lastSyncEpisodeCount, " episodes, ").concat(this.plugin.settings.lastSyncSnipCount, " snips"),
                    cls: 'snipd-sync-status-text'
                });
            }
        }
        else {
            syncStatusBody.createEl('div', {
                text: 'No sync performed yet',
                cls: 'snipd-sync-status-text'
            });
        }
        ;
        var pageFolderText = null;
        new obsidian_1.Setting(containerEl)
            .setName('Base folder')
            .setDesc('Folder where the Snipd Base file and metadata will be saved')
            .addText(function (text) {
            text
                .setPlaceholder(types_1.DEFAULT_SETTINGS.baseFolder)
                .setValue(_this.plugin.getBaseFolder())
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                var normalized;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            normalized = (0, obsidian_1.normalizePath)(value || types_1.DEFAULT_SETTINGS.baseFolder);
                            this.plugin.settings.baseFolder = normalized;
                            this.plugin.settings.snipdDir = normalized;
                            if (!this.plugin.settings.pageFolder && pageFolderText) {
                                pageFolderText.setPlaceholder(this.plugin.getPageFolder());
                            }
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian_1.Setting(containerEl)
            .setName('Episode pages folder')
            .setDesc('Folder where Snipd episode pages will be saved. Leave empty to use the base folder with /Data.')
            .addText(function (text) {
            pageFolderText = text;
            text
                .setPlaceholder(_this.plugin.getPageFolder())
                .setValue(_this.plugin.settings.pageFolder)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                var trimmed;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            trimmed = value.trim();
                            this.plugin.settings.pageFolder = trimmed ? (0, obsidian_1.normalizePath)(trimmed) : "";
                            if (!trimmed && pageFolderText) {
                                pageFolderText.setPlaceholder(this.plugin.getPageFolder());
                            }
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian_1.Setting(containerEl)
            .setName('Sync frequency')
            .setDesc('Automatically sync at the specified interval')
            .addDropdown(function (dropdown) {
            dropdown.addOption("0", "Manual");
            if ((0, utils_1.isDev)()) {
                dropdown.addOption("1", "Every 1 minute (dev only)");
            }
            dropdown.addOption("60", "Every 1 hour");
            dropdown.addOption((12 * 60).toString(), "Every 12 hours");
            dropdown.addOption((24 * 60).toString(), "Every 24 hours");
            dropdown.addOption((7 * 24 * 60).toString(), "Every week");
            dropdown.setValue(_this.plugin.settings.frequency);
            dropdown.onChange(function (newValue) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.frequency = newValue;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            if (this.plugin.settings.hasCompletedFirstSync) {
                                void this.plugin.configureSchedule();
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian_1.Setting(containerEl)
            .setName("Sync on app launch")
            .setDesc("Automatically sync when Obsidian opens")
            .addToggle(function (toggle) {
            toggle.setValue(_this.plugin.settings.triggerOnLoad);
            toggle.onChange(function (val) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.triggerOnLoad = val;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian_1.Setting(containerEl)
            .setName("Sync only edited snips")
            .setDesc("Only starred, edited or tagged snips will be synced")
            .addToggle(function (toggle) {
            toggle.setValue(_this.plugin.settings.onlyEditedSnips);
            toggle.onChange(function (val) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.onlyEditedSnips = val;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian_1.Setting(containerEl)
            .setName("Custom formatting")
            .setDesc("Configure how episodes and snips are formatted")
            .addButton(function (button) {
            button.setButtonText("Configure");
            button.onClick(function () {
                new formatting_modal_1.FormattingConfigModal(_this.app, _this.plugin, function () {
                    new obsidian_1.Notice("Formatting settings saved");
                }).open();
            });
        });
        var testSyncDesc = this.plugin.settings.isTestSyncing
            ? "Test sync in progress..."
            : "Test the sync with 5 random episodes from your snips to validate your configuration. The result will be saved in your configured folders with a -TEST suffix.";
        new obsidian_1.Setting(containerEl)
            .setName("Test sync 5 random episodes")
            .setDesc(testSyncDesc)
            .addButton(function (button) {
            if (_this.plugin.settings.isTestSyncing) {
                button.setButtonText("Syncing...");
                button.setDisabled(true);
            }
            else {
                button.setButtonText("Test sync");
                button.onClick(function () {
                    void _this.plugin.testSyncRandomEpisodes();
                });
            }
        });
        if (this.refreshInterval !== null) {
            globalThis.window.clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }
        if (this.plugin.settings.isSyncing || this.plugin.settings.isTestSyncing) {
            this.refreshInterval = globalThis.window.setInterval(function () {
                _this.display();
            }, 1000);
        }
        if ((0, utils_1.isDev)()) {
            new obsidian_1.Setting(containerEl).setName("Development").setHeading();
            new obsidian_1.Setting(containerEl)
                .setName('Save debug zips')
                .setDesc('Save all downloaded data (JSON and zip files) from each sync to snipd_plugin_debug/sync_{timestamp} folders for debugging purposes')
                .addToggle(function (toggle) {
                toggle.setValue(_this.plugin.settings.saveDebugZips);
                toggle.onChange(function (val) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.plugin.settings.saveDebugZips = val;
                                return [4 /*yield*/, this.plugin.saveSettings()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            new obsidian_1.Setting(containerEl)
                .setName('Reset settings state')
                .setDesc('Remove all existing settings state (basically revert to the initial state when the plugin is installed)')
                .addButton(function (button) {
                button.setButtonText('Reset');
                button.buttonEl.addClass('snipd-reset-button');
                button.onClick(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.plugin.settings = Object.assign({}, types_1.DEFAULT_SETTINGS);
                                return [4 /*yield*/, this.plugin.saveSettings()];
                            case 1:
                                _a.sent();
                                this.display();
                                new obsidian_1.Notice('Settings have been reset to initial state');
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        }
    };
    return SnipdSettingModal;
}(obsidian_1.PluginSettingTab));
exports.SnipdSettingModal = SnipdSettingModal;
