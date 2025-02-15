import { StyleSheet } from "react-native";
import { appColor } from "../constants/appColor";
import { fontFamilies } from "../constants/fontFamilies";

export const globalStyles =  StyleSheet.create({
    container :{
        flex:1,
        backgroundColor:appColor.white
    },
    text: {
        fontFamily: fontFamilies.regular,
        fontSize: 14,
        color: appColor.text,
      },

})