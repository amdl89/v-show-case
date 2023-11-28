import VShowCase from "./components/VShowCase.vue";
import validateVShowCase from "./validateVShowCase";

const vShowCase = {
    install(app) {
        app.component("v-show-case", VShowCase);
        app.directive("showWhen", {});
        app.directive("showElse", {});
    },
};

export { vShowCase, validateVShowCase };
