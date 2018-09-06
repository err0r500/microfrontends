import Vue from 'vue'
import wrap from '@vue/web-component-wrapper';
import VueWebComponent from './components/HelloWorld';

const helloWorld = wrap(Vue, VueWebComponent);

window.customElements.define('vue-hello-world', helloWorld);