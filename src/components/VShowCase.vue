<script>
import { withDirectives, vShow, resolveDirective } from "vue";

function getVShowValue(vnode, { vShowWhen, vShowElse }) {
    const vShowWhenDir = vnode.dirs?.find((d) => d.dir === vShowWhen);

    if (vShowWhenDir) {
        return vShowWhenDir.value;
    }
    return Boolean(vnode.dirs?.find((d) => d.dir === vShowElse));
}

export default {
    name: "VShowCase",
    render() {
        const vShowWhen = resolveDirective("showWhen");
        const vShowElse = resolveDirective("showElse");

        let alreadyShown = false;
        let vShowValue;
        return this.$slots.default().map((vnode) => {
            if (!alreadyShown) {
                vShowValue = getVShowValue(vnode, {
                    vShowWhen,
                    vShowElse,
                });

                if (vShowValue) {
                    alreadyShown = true;
                }
            } else {
                vShowValue = false;
            }

            return withDirectives(vnode, [[vShow, vShowValue]]);
        });
    },
};
</script>
