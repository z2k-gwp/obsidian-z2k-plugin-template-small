## Obsidian Plugin Template for Small Projects

## Overview
This [Obsidian](https//obsidian.md) code template is used to create small plugins. Small is defined as:
- residing in one single file (main.ts)
- needing only a couple of functions to pull it off
- heavily based off of the official sample plugin
- uses esbuild for building and npm for library management
- does NOT use lint 

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

## Tools
- Be sure to head over to the [plugin template's github wiki](https://github.com/z2k-gwp/obsidian-z2k-plugin-template-small/wiki) for tools to make development easier and documentation on this template.

