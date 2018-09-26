# Microfrontends with Elm and webcomponents

## Demo
![Interactions](https://raw.githubusercontent.com/err0r500/microfrontends/master/demo.gif)

3 webcomponents (vanilla, React & Vue) are managed by a main Elm logic (providing data and event Handlers)

## Test the app
```bash
git clone git@github.com:err0r500/microfrontends.git
cd microfrontends
npm install
npm run start
```

## Motivation
Build dumb components in whatever framework you're comfortable with and let Elm shine with the app's logic

## Notes
- the detail field in the dispatchEvent methods is an array for every component because it's enforced with the Vue wrapper 
so we don't have to provide different event decoders in Elm.
- injects dynamically scripts in head (html imports are deprecated)