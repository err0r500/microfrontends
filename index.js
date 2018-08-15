'use strict';

// Require index.html so it gets copied to dist (for local dev only)
require('./index.html');
let Elm = require('./elm-src/Main.elm');

let mountNode = document.createElement("DIV");
mountNode.id = "app";
document.body.appendChild(mountNode);

let app = Elm.Main.embed(mountNode, {env: process.env.NODE_ENV});

// getSrc is a helper function used to load the corresponding webcomponent
function getSrc(componentToLoad) {
    switch (componentToLoad) {
        case "mwc-button":
            return "https://unpkg.com/@material/mwc-button@^0.1.0/mwc-button.js?module"
    }
}

// subscription to the load out port from elm
app.ports.load.subscribe(function(componentToLoad) {
    let link = document.createElement('script');
    link.setAttribute('type', 'module');
    link.setAttribute('src', getSrc(componentToLoad));

    document.head.appendChild(link);
});

