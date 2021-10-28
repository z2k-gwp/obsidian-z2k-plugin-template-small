## Obsidian Z2K plugin - Template 

## Overview
This [Obsidian](https//obsidian.md) code template is used to create small plugins. Small is defined as:
- residing in one single file (main.ts)
- needing only a couple of functions to pull it off. 

## Details
- It is assumed you are experienced enough with coding plugins that you've graduated to the next level from the [official Obsidian Sample Plugin](https://github.com/obsidianmd/obsidian-sample-plugin)
- More documentation may be found on the [plugin's wiki pages](https://github.com/z2k-gwp/obsidian-z2k-plugin-template-small/wiki).

## Installation
- Make sure you have the basics preconfigured:
    - You've installed NodeJS/npm.
    - You are using Hot Reload
    - You have run `npm update` recently to ensure your Obsidian API is up to date.
- Make a copy of this repo as a template with the "Use this template" button (login to GitHub if you don't see it).
- Clone your repo to a local development folder. Put the folder in your .obsidian/plugins/your-plugin-name folder.
- run `npm i` or `yarn` to install dependencies
- Run the compile wait loop by running from the command line `npm run dev`

For more information on making releases and adding it the the community plugin list, see [Obisidian's Sample Plugin's Readme](https://github.com/obsidianmd/obsidian-sample-plugin)

---


## Some Helpful Developer's Tools

### Official Docs
- Obsidian Docs: https://github.com/obsidianmd/obsidian-docs/tree/master/en
- Obsidian API: 
	- Formal code: https://github.com/obsidianmd/obsidian-api
- Obisidian's Sample Plugin:  https://github.com/obsidianmd/obsidian-sample-plugin
	- Readme (Plugin Dev guide): https://github.com/obsidianmd/obsidian-sample-plugin/blob/master/README.md


### 3rd Party Guides
- Marcus' Guide: https://marcus.se.net/obsidian-plugin-docs/getting-started/create-your-first-plugin
- Youtube video: https://www.youtube.com/watch?v=9lA-jaMNS0k
- Obsidian Community: https://github.com/obsidian-community/obsidian-community-lib
	- Include the "hub": https://github.com/obsidian-community
	- 

### Coding Plugins
- Hot Reload: https://forum.obsidian.md/t/plugin-release-for-developers-hot-reload-the-plugin-s-youre-developing/12185, https://github.com/pjeby/hot-reload
	- With esBuild:
		- [https://github.com/zaydek/esbuild-hot-reload](https://github.com/zaydek/esbuild-hot-reload)
		- [https://how-to.dev/how-to-add-live-reload-to-esbuild-server](https://how-to.dev/how-to-add-live-reload-to-esbuild-server)

- BRAT: Plugin for installing third party plugins before they become community ones.

- Dev Tools: 
	- https://github.com/KjellConnelly/obsidian-dev-tools
		- Displays a console window (great for mobile)
		- Run arbitrary code inside the text of a document
		- Displays a list of icons available


### Plugin Templates
- Obisidian's Sample Plugin:  https://github.com/obsidianmd/obsidian-sample-plugin
- Template to use with ReactJS: https://github.com/obsidian-community/obsidian-react-starter
- Alternative template (with rollup.js): https://github.com/THeK3nger/obsidian-plugin-template


### Dependencies
- CodeMirror (Obsidian's editor): https://codemirror.net/
- Moment.js: 
- obsidian-daily-notes-interface: 

### Important Conventions
- Commits 
	- Use "Conventional Commits" to formalize commit comments:
		- https://github.com/obsidian-community/obsidian-community-lib

- Code Documentation
	- Use TS Doc to document the code so that is readable by the editor with HoverOn tooltips
		- https://github.com/obsidian-community/obsidian-community-lib


### Code Snippets

#### General 
- Liam Cain - https://liamca.in/hello
- Python script to download ALL plugins for searching and browsing for examples
	-  https://pythonrepo.com/repo/claremacrae-obsidian-repos-downloader-python-downloader

#### React
- https://github.com/esm7/obsidian-map-view/blob/master/src/main.ts




