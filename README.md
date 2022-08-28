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
