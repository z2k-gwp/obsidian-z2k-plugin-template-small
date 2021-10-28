import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, TFile } from 'obsidian';
import { appHasDailyNotesPluginLoaded, createDailyNote, getAllDailyNotes, getDailyNote, getDailyNoteSettings } from "obsidian-daily-notes-interface";
import type { Moment } from "moment";


// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
// obsidian-z2k-template-small Obsidian Plugin
// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
//
// Please see https://github.com/z2k-gwp/obsidian-z2k-template-small for more information
//
//


interface IZ2KTemplateSmallSettings {
	mySetting: string;
	debugLevel: number;
	useRibbonButton: boolean;
	doMyMainJobOnStartup: boolean;
}

const DEFAULT_SETTINGS: IZ2KTemplateSmallSettings = {
	mySetting: 'default',
	debugLevel: 100,
	useRibbonButton: true,
	doMyMainJobOnStartup: false,
}



// ======================================================================================================
// Z2KTemplateSmallPlugin Plugin Class
// ======================================================================================================
// 
export default class Z2KTemplateSmallPlugin extends Plugin {
	settings: IZ2KTemplateSmallSettings;

	private ribbonEl: HTMLElement;

	/* ------------------------------------------------------------------------------------------------------ */
	// onload
	/* ------------------------------------------------------------------------------------------------------ */
	/**
	 * Performed when application first loads the plugin
	 * @remarks
	 * - This is done fairly early and synchronously - so set things up and then get out of the way. 
	 * - Hook the onLayoutReady event to do more complicated and async tasks.
	 */
	async onload() {

		// Initialization
		this.ribbonEl = null;

		// Load our settings first, as this controls what we do here.
		await this.loadSettings();

		// Log debug info
		if (this.settings.debugLevel >= 100) { console.log(this.manifest.name + ": Loading"); }

		// Bind to the onLayoutReady event so we can continue our initialization once the system has settled down.
		this.app.workspace.onLayoutReady(this.onLayoutReady.bind(this));

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		if (this.settings.debugLevel >= 10) {
			var loadMoment = (window as any).moment(Date.now())
			let statusBarItemEl = this.addStatusBarItem();
			// This is of course obnoxious so please don't do this in a real plugin:
			statusBarItemEl.setText('Z2K Small Template Plugin Loaded on ' + loadMoment.format('YYYY-MM-DD hh:mm:ss'));
		}

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new Z2KTemplateSmallSettingTab(this.app, this));

	}

	/* ------------------------------------------------------------------------------------------------------ */
	// onLayoutReady
	/* ------------------------------------------------------------------------------------------------------ */
	/**
	 * Event handler for when the layout is done and the plugin can perform more intense actions
	 */
	 async onLayoutReady():Promise<void> {

		// Todo: I forced this to be a async declaration, but the source shows it as sync
		// Thus, I don't think this will allow be to create a synch call to createZ2KDailyLog()

		// Debug info - output to the console
		if (this.settings.debugLevel >= 100) { console.log(this.manifest.name + ": Layout is ready...."); }

		// Configure our stuff
		this.configureRibbonIcons();
		this.configureCommands();

		// So some action for your plugin
		if (this.settings.doMyMainJobOnStartup) { 
			const moment = (window as any).moment(Date.now());
			var dailyNote = await this.MyMainJob(moment);
		}
	}

	/* ------------------------------------------------------------------------------------------------------ */
	// configureRibbonIcons
	/* ------------------------------------------------------------------------------------------------------ */
	/**
	 * Helper routine for configuring any ribbon icons we have
	 */
	private configureRibbonIcons() {
		this.ribbonEl?.detach();

		// Debug info - output to the console
		if (this.settings.debugLevel >= 100) { console.log(this.manifest.name + ": Configuring Ribbon Icons...."); }

		// Create our Ribbon Button (if configured to do so)
		if (this.settings.useRibbonButton) {

			// Default icons: 'logo-crystal', 'create-new', 'trash', 'search', 'right-triangle', 'document', 'folder', 'pencil', 'left-arrow', 'right-arrow', 'three-horizontal-bars', 'dot-network', 'audio-file', 'image-file', 'pdf-file', 'gear', 'documents', 'blocks', 'go-to-file', 'presentation', 'cross-in-box', 'microphone', 'microphone-filled', 'two-columns', 'link', 'popup-open', 'checkmark', 'hashtag', 'left-arrow-with-tail', 'right-arrow-with-tail', 'lines-of-text', 'vertical-three-dots', 'pin', 'magnifying-glass', 'info', 'horizontal-split', 'vertical-split', 'calendar-with-checkmark', 'sheets-in-box', 'up-and-down-arrows', 'broken-link', 'cross', 'any-key', 'reset', 'star', 'crossed-star', 'dice', 'filled-pin', 'enter', 'help', 'vault', 'open-vault', 'paper-plane', 'bullet-list', 'uppercase-lowercase-a', 'star-list', 'expand-vertically', 'languages', 'switch', 'pane-layout', 'install'
			this.ribbonEl = this.addRibbonIcon(
				'pencil', 
				'Z2K Plugin Template Small', 
				async (evt: MouseEvent) => {
					// Called when the user clicks the icon.
					const moment = (window as any).moment(Date.now());
					var dailyNote = await this.MyMainJob(moment);
				});

			// Provide a class to the ribbon button in case someone wants to modify it with CSS (e.g. to hide)
			this.ribbonEl.addClass('z2k-template-small-ribbon-class');

			// If we want to add a right-click context menu, here is how periodic notes did it:
			// this.ribbonEl.addEventListener("contextmenu", (ev: MouseEvent) => {
			// 	showFileMenu(this.app, this.settings, {
			// 	  x: ev.pageX,
			// 	  y: ev.pageY,
			// 	});

		}		

	}

	/* ------------------------------------------------------------------------------------------------------ */
	// configureCommands
	/* ------------------------------------------------------------------------------------------------------ */
	/**
	 * Helper routine for configuring any commands that we want to expose to the user
	 */
	 private configureCommands() {

		// Debug info - output to the console
		if (this.settings.debugLevel >= 100) { console.log(this.manifest.name + ": Configuring Commands"); }

		// Add a command to trigger creating the daily log
		this.addCommand({
			id: 'create-Z2K-daily-log',
			name: "Create today's daily log",
			callback: async () => {
				const currentMoment = (window as any).moment(Date.now());
				var dailyNote = this.MyMainJob(currentMoment);
			}
		});

		// Add a command to trigger creating the daily log - for a different day based on what text is currently selected
		this.addCommand({
			id: 'create-Z2K-daily-log-for-selection',
			name: "Create a daily log for the date selected in the editor",
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let editorMoment = (window as any).moment(editor.getSelection());
				if (editorMoment.IsValid()) { 
					let result = await this.MyMainJob(editorMoment);
					editor.replaceSelection("[[" + result + "]]");	
				} else {
					new Notice("Could not figure out a date from the selected text.")
				}
			}
		});
	}	

	/* ------------------------------------------------------------------------------------------------------ */
	// onunload
	/* ------------------------------------------------------------------------------------------------------ */
	/**
	 * Event handler for when the plugin is just about to be unloaded
	 */
	onunload() {

		// Debug info - output to the console
		if (this.settings.debugLevel >= 100) { console.log(this.manifest.name + ": Unloading."); }

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	private onSettingsUpdate(): void {
		// this.configureCommands(); - Not really needed, as nothing has changed
		this.configureRibbonIcons();
	}



	// ======================================================================================================
	// Z2K Specific Functions
	// ======================================================================================================
	// Ideally, these function should be moved to one or more Z2K Helper classes so that they can be shared 
	// across Z2K functions


	/* ------------------------------------------------------------------------------------------------------ */
	// createZ2KDailyLog
	/* ------------------------------------------------------------------------------------------------------ */
	/**
	 * This function creates a daily note for the day. It uses the settings from the "Daily Notes" core 
	 * plugin to figure out where to save it. 
	 * 
	 * @remarks
	 * - If the note already exists, it simply returns quietly, passing the file handle to the existing note.
	 * 
	 * @example // Tip: to call on today's note:
	 *      const moment = (window as any).moment(Date.now());
	 *      let dailyNote = createZ2KDailyNote(moment)
	 * 
	 * @param  {Moment} dateToCreate - a Moment variable representing the day to create
	 * @returns Promise - Filehandle to the actual note
	 */
	async MyMainJob(dateToCreate: Moment): Promise<Boolean> { 

		let createdDailyNote = false;

		// Sanity Checks
		if (this.settings.debugLevel >= 100) { console.log(this.manifest.name + ": MyMainJob() - Entered"); }

		// and so on...

		return true;
	}

}


// ======================================================================================================
// Z2KTemplateSmallSettingTab Settings Tab Class
// ======================================================================================================
// 
class Z2KTemplateSmallSettingTab extends PluginSettingTab {
	plugin: Z2KTemplateSmallPlugin;

	constructor(app: App, plugin: Z2KTemplateSmallPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let {containerEl} = this;

		containerEl.empty();

		// Main Settings
		// ----------------------------------------------------------------------------------------------
		containerEl.createEl('h2', {text: 'Main Settings'});
		new Setting(containerEl)
			.setName('Install Ribbon Button')
			.setDesc('Installs a ribbon button')
			.setDisabled(this.plugin.settings.useRibbonButton)
			.addToggle(cb => cb.onChange(value => {
                this.plugin.settings.useRibbonButton = value;
                this.plugin.saveSettings();				
			}).setValue(this.plugin.settings.useRibbonButton))

		new Setting(containerEl)
			.setName('Do My Main Job on startup')
			.setDesc('Performs My Main Job upon application startup')
			.setDisabled(this.plugin.settings.doMyMainJobOnStartup)
			.addToggle(cb => cb.onChange(value => {
                this.plugin.settings.doMyMainJobOnStartup = value;
                this.plugin.saveSettings();				
			}).setValue(this.plugin.settings.doMyMainJobOnStartup))


		// Advanced Settings
		// ----------------------------------------------------------------------------------------------
		containerEl.createEl('h2', {text: 'Advanced Settings'});

		new Setting(containerEl)
			.setName("Debug Level (integer)")
			.addText(cb => cb.onChange(value => {
				this.plugin.settings.debugLevel = +value;
				this.plugin.saveSettings();
			}).setValue(this.plugin.settings.debugLevel.toString()));

	}
}
