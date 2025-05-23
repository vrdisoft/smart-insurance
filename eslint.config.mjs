// /** @type {import("eslint").Linter.Config} */
// module.exports = {
//   root: true,
//   extends: ['@repo/eslint-config/next.js'],
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     project: true,
//   },
// }

import {nextJsConfig} from "./packages/eslint-config/next.js";

export default [
  ...nextJsConfig,
  // {
  //   root: true,
  //   extends: ['@repo/eslint-config/next.js'],
  //   parser: '@typescript-eslint/parser',
  //   parserOptions: {
  //     project: true,
  //   },
  // },
]
