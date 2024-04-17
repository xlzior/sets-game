import { fromRollup } from "@web/dev-server-rollup";
import rollupReplace from "@rollup/plugin-replace";

const replace = fromRollup(rollupReplace);

export default {
  open: true,
  watch: true,
  appIndex: "index.html",
  nodeResolve: {
    exportConditions: ["development"],
  },
  plugins: [
    replace({
      // setting "include" is important for performance
      // include: ["immer.mjs"],
      "process.env.NODE_ENV": '"development"',
    }),
  ],
};
