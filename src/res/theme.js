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
    s: {
      width: "30%",
      padding: spacing.l,
    },
    m: {},
    l: {
      width: "80%",
      padding: spacing.l,
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
      fontSize: 20,
      fontWeight: "bold",
    },
    body: {
      fontSize: 16,
    },
    bigHeader: {
      fontSize: 40,
      fontWeight: "bold",
    },
  },
};
