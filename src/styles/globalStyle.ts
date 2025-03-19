import { StyleSheet } from "react-native";
import { appColor } from "../constants/appColor";
import { fontFamilies } from "../constants/fontFamilies";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.white
  },
  text: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: appColor.text,
  },

  button: {
    borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: appColor.white,
    paddingHorizontal: 16,
    paddingVertical: 16, minHeight: 16,
    flexDirection: "row"
  },
  section: {
    paddingHorizontal: 16,
    paddingBottom: 20
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  shadow: {
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3D56F0',
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  tag: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 100
  }
})