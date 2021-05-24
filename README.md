# rarbg-firefox

`rarbg-firefox` is an extension to use with the website RARBG. It allows the user to open multiple 
tabs based on the keyword list on the torrent list page, and open the magnet link on the torrent detail 
page using page action button.

The keywords must be setup beforehand on the setting page, which contains only one field that expect 
a list of keyword separated by commas. Spaces are not trimmed.

## Building
`npm run-script build` will build the project and place the output in `/build` directory under the project. 
The manifest inside can be used to temporiry load the extension in Firefox.

`npm run-script makexpi` will create xpi file that can be uploaded to the Firefox Addon website.
