import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function LogoImage  ({navigation}) {
  return (
    <View style={{ flexDirection: "row", paddingLeft: 10 }}>
      <TouchableOpacity onPress={navigation.openDrawer()}>
        <FontAwesomeIcon icon={faBars} size={20} />
      </TouchableOpacity>
      {/* <Image
        source={require("../assets/images/Fs_blue.png")}
        style={{
          width: 34,
          height: 20,
        }}
      /> */}
    </View>
  );
};
