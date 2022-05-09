const palette = {
  blue_green: "#95E9CE",
  white: "#FFFFFF",
  black: "#000000",
};

const spacing = {
  s: 8,
  m: 16,
  l: 24,
  xl: 48,
};

export const theme = {
  colors: {
    background: palette.blue_green,
    primary_fontColor: palette.black,
    secondary_fontColor: palette.white,
  },

  spacing: {
    ...spacing,
  },

  boxSize: {
    s: {},
    m: {},
    l: {
      width: "80%",
      padding: spacing.m,
    },
  },

  boxType: {
    filled: {
      backgroundColor: palette.white,
    },
    unfilled: {
      backgroundColor: palette.blue_green,
      borderWidth: 3,
      borderColor: palette.white,
    },
  },

  textVariants: {
    header: {
      fontFamily: "Arial Black",
      fontSize: 20,
      fontWeight: "bold",
    },

    body: {
      fontFamily: "Arial Black",
      fontSize: 16,
    },
  },
};
