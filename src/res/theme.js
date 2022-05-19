const palette = {
  white: "#FFFFFF",
  black: "#000000",
  blueGreen: "#95E9CE",
  darkBlueGreen: "#95E9DF",
};

const spacing = {
  s: 8,
  m: 16,
  l: 24,
  xl: 48,
};

export const theme = {
  colors: {
    background: palette.blueGreen,
    primary_fontColor: palette.black,
    secondary_fontColor: palette.white,
    topNavBar: palette.darkBlueGreen,
  },

  spacing: {
    ...spacing,
  },

  boxSize: {
    s: {
      width: "30%",
      padding: spacing.l,
    },
    m: {
      width: "91%",
      padding: spacing.m,
    },
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
      backgroundColor: palette.blueGreen,
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
  shadowVariants: {
    shadowList: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4.84,
  
      elevation: 15,
    },
    shadowBtn: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 2.84,
  
      elevation: 3,
    },
    shadowInput: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 2.84,
  
      elevation: 3,
    }
  }

};
