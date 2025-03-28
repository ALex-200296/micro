// @ts-nocheck
import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html?raw";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    console.log(name)
    return import(/* @vite-ignore */name).catch((error) => {
      console.log(error)
    });
  },

});
const layoutEngine = constructLayoutEngine({ routes, applications });
console.log(applications)
applications.forEach(registerApplication);
layoutEngine.activate();
start();
