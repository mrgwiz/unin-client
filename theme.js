import { extendTheme } from "@chakra-ui/react";

const themes = {
  "colors": {
    white: "#eee",
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  }
}

const theme = extendTheme(themes);
export default theme;
