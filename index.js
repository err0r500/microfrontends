'use strict';


// Require index.html so it gets copied to dist (for local dev only)
require('./index.html');
let Elm = require('./elm-src/Main.elm');

let mountNode = document.createElement("DIV");
mountNode.id = "app";
document.body.appendChild(mountNode);

let app = Elm.Main.embed(mountNode, {env: process.env.NODE_ENV});


function appendScript(src) {
    let link = document.createElement('script');
    link.setAttribute('type', 'module');
    link.setAttribute('src', src);
    document.head.appendChild(link);
}

function appendLink(href) {
    var links = document.getElementsByTagName("link");
    for(var i = 0; i < links.length; i++) {
        if (links[i].href.indexOf(href) !== -1 ) {
            return
        }
    }

    let link = document.createElement('link');
    link.setAttribute('rel', 'import');
    link.setAttribute('href', href);
    document.head.appendChild(link);
}

// subscription to the load out port from elm
app.ports.loadWebComponent.subscribe(function(componentToLoad) {
    switch (componentToLoad) {
        case "mwc-button":
            appendScript("https://unpkg.com/@material/mwc-button@^0.1.0/mwc-button.js?module")
        case "hello-world":
            appendLink("components/react/dist/react-hello-world.html")
    }
});

