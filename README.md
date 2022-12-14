# YouTube Playlist Duration

![](.github/img/preview.png)

This userscript shows the total duration of YouTube playlists.

## Installation Guide

1. Install a Userscript manager for your web browser
    * [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) (Firefox)
    * [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Firefox, Safari, Edge)

2. [Download the latest build](https://github.com/Trinovantes/userscript-youtube-playlist-duration/releases/download/latest/userscript-youtube-playlist-duration.user.js). If you have Greasemonkey or Tampermonkey installed, then you should immediately be prompted with a confirmation window asking you if you wish to install this Userscript.

## Dev Guide

1. Install prereqs

    * `node`
    * `yarn`
    * Tampermonkey on Chrome

2. In Chrome:

    * Go to `chrome://extensions/`
    * Go into Tampermonkey's details
    * Enable `Allow access to file URLs`

3. Run dev server

    ```
    yarn install
    yarn dev
    ```

4. In Chrome:

    * Go to `http://localhost:8080/userscript-youtube-playlist-duration.proxy.user.js` and install the script
