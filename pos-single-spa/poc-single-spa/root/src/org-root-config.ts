import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout, {
  props: {
    myProp: 'csscsc', authToken: 'scasc'
  }, loaders: { cscs: 'ascs' }
});

const applications = constructApplications({
  routes,
  loadApp({ name }) {
    console.log(name)
    return import(/* webpackIgnore: true */ name);
  },

});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach((props) => {
  registerApplication(props)
});
layoutEngine.activate();
start();
