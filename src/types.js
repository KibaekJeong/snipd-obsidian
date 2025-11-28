"use strict";
exports.__esModule = true;
exports.DEFAULT_SETTINGS = exports.DEFAULT_BASE_FILE_PATH = exports.DEFAULT_EPISODE_FILE_NAME_TEMPLATE = exports.DEFAULT_SNIP_TEMPLATE = exports.DEFAULT_EPISODE_TEMPLATE = void 0;
exports.DEFAULT_EPISODE_TEMPLATE = "# {{episode_title}}\n\n{{episode_image}}\n\n## Episode metadata\n- Episode title: {{episode_title}}\n- Show: {{show_title}}\n- Owner / Host: {{show_author}}\n- Guests: {{guests}}\n- Episode publish date: {{episode_publish_date}}\n- Episode AI description: {{episode_ai_description}}\n- Mentioned books: {{mentioned_books}}\n- Duration: {{episode_duration}}\n- Episode URL: [Open in Snipd]({{episode_url}})\n- Show URL: [Open in Snipd]({{show_url}})\n- Export date: {{episode_export_date}}\n\n{{snips_section}}[[## Snips]]\n\nCreated with [Snipd](https://www.snipd.com) | Highlight & Take Notes from Podcasts";
exports.DEFAULT_SNIP_TEMPLATE = "### {{snip_favorite_star}} [{{snip_title}}]({{snip_url}}) {{snip_tags}}\n\n\uD83C\uDFA7 {{snip_start_time}} - {{snip_end_time}} ({{snip_duration}})\n\n{{snip_note}}\n\n{{snip_quote}}[[#### \uD83D\uDCAC Quote]]\n\n<details>\n<summary>\uD83D\uDCDA Transcript</summary>\n\n{{snip_transcript}}\n</details>\n\n---\n\n";
exports.DEFAULT_EPISODE_FILE_NAME_TEMPLATE = "{{episode_title}}";
exports.DEFAULT_BASE_FILE_PATH = 'Base/Snipd.base';
exports.DEFAULT_SETTINGS = {
    apiKey: "",
    encryptedApiKey: "",
    snipdDir: "Snipd",
    baseFolder: "Snipd",
    baseFilePath: exports.DEFAULT_BASE_FILE_PATH,
    pageFolder: "",
    frequency: "0",
    triggerOnLoad: true,
    isSyncing: false,
    isTestSyncing: false,
    hasCompletedFirstSync: false,
    latestSyncedSnipUpdateTs: null,
    fileHashMap: {},
    appendOnlyFiles: {},
    baseFileHashes: {},
    baseFileManualOverrides: {},
    lastBaseFileSyncToken: null,
    baseFileDefaultOpenPath: null,
    last_updated_after: null,
    current_export_updated_after: null,
    current_export_batch_index: 0,
    current_export_total_batches: 0,
    current_batch_episode_count: 0,
    current_batch_snip_count: 0,
    lastSyncTimestamp: null,
    lastSyncEpisodeCount: 0,
    lastSyncSnipCount: 0,
    saveDebugZips: false,
    onlyEditedSnips: false,
    episodeTemplate: null,
    snipTemplate: null,
    episodeFileNameTemplate: null
};
