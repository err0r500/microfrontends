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

// subscription to the load out port from elm
app.ports.loadWebComponent.subscribe(function (componentToLoad) {
    switch (componentToLoad) {
        case "vanilla-hello-world":
            appendScript("components/vanilla/dist/hello-world.js");
            break;
        case "react-hello-world":
            appendScript("components/react/dist/hello-world.js");
            break;
        case "vue-hello-world":
            appendScript("components/vue/dist/vue-hello-world.js");
            break;
    }
});