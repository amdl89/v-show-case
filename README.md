# v-show-case

Vue 3 components for implementing conditional logic when using the v-show directive.

---

<!-- ## Install

The library is available on [npm](https://www.npmjs.com/) as [`v-show-case`](https://www.npmjs.com/package/v-show-case).

```bash
npm install --save v-show-case
``` -->

## Setup

```js
import { createApp } from "vue";
import App from "./App.vue";

import { vShowCase } from "v-show-case";

const app = createApp(App);
app.use(vShowCase);
app.mount("#app");
```

## Usage

The following template will show the second paragraph as it is the first element with truthy argument for the `v-show-when` directive. The `v-show-else` is optional and is used for fallback content when all other conditions are falsy, similar to `v-else`.

```vue
<template>
    <v-show-case>
        <p v-show-when="x">1</p>

        <!-- displayed -->
        <p v-show-when="true">2</p>

        <p v-show-when="false">3</p>

        <p v-show-else>4</p>
    </v-show-case>
</template>

<script>
export default {
    data() {
        return {
            x: false,
        };
    },
};
</script>
```

## Compile time validation

The `v-show-case` component must have at least one child with the `v-show-when` directive applied, followed by any number of `v-show-when`, and an optional `v-show-else` directive, which mush be present at last if used. This strucure can be checked at compile time by configuring the build tool to apply a transformer function during template compilation.

**Example vite configuration:**

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { validateVShowCase } from "v-show-case";

export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    nodeTransforms: [validateVShowCase],
                },
            },
        }),
    ],
});
```
