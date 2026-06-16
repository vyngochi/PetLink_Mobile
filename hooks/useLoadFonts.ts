import { useFonts } from "expo-font";
export const useLoadFonts = () => {
  const [loaded, error] = useFonts({
    "Montserrat-Regular": require("@/assets/fonts/Montserrat/static/Montserrat-Regular.ttf"),
    "Montserrat-Thin": require("@/assets/fonts/Montserrat/static/Montserrat-Thin.ttf"),
    "Montserrat-Medium": require("@/assets/fonts/Montserrat/static/Montserrat-Medium.ttf"),
    "Montserrat-SemiBold": require("@/assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf"),
    "Montserrat-Bold": require("@/assets/fonts/Montserrat/static/Montserrat-Bold.ttf"),
    "Montserrat-Italic": require("@/assets/fonts/Montserrat/static/Montserrat-Italic.ttf"),
    "Montserrat-Bold-Italic": require("@/assets/fonts/Montserrat/static/Montserrat-BoldItalic.ttf"),
  });

  return { loaded, error };
};
