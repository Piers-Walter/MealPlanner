import { type Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: ["./src/**/*.tsx"],
  theme: {},
  plugins: [],
}) satisfies Config;
