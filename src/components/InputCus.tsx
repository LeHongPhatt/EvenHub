import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  TextInputProps,
  KeyboardType,
} from 'react-native';
import React, {ReactNode, useState} from 'react';
import {Touchable} from 'react-native';
import {EyeSlash} from 'iconsax-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {appColor} from '../constants/appColor';
import {globalStyles} from '../styles/globalStyle';
interface Props {
  onChange: (val: string) => void;
  value: string;
  affix?: ReactNode;
  placeholder?: string;
  suffix?: ReactNode;
  isPassword?: boolean;
  alowClear?: boolean;
  type?: KeyboardType;
  onEnd?: () => void;
}

const InputCus = (props: Props) => {
  const {
    onChange,
    value,
    affix,
    placeholder,
    suffix,
    isPassword,
    alowClear,
    type,
    onEnd,
  } = props;
  const [isShowPass, setIsShowPass] = useState(isPassword ?? false);

  return (
    <View style={[styles.inputContainer]}>
      {affix ?? affix}
      <TextInput
        value={value}
        placeholder={placeholder ?? ''}
        onChangeText={val => onChange(val)}
        secureTextEntry={isShowPass}
        placeholderTextColor={'#747688'}
        keyboardType={type ?? 'default'}
        autoCapitalize="none"
        onEndEditing={onEnd}
        style={[styles.input, globalStyles.text]}
      />
      {suffix ?? suffix}
      <TouchableOpacity
        onPress={
          isPassword ? () => setIsShowPass(!isShowPass) : () => onChange('')
        }>
        {isPassword ? (
          <FontAwesome
            name={isShowPass ? 'eye-slash' : 'eye'}
            size={22}
            color={appColor.gray}
          />
        ) : (
          value.length > 0 &&
          alowClear && (
            <AntDesign name="close" size={22} color={appColor.text} />
          )
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InputCus;
// const styles = StyleSheet.create({
//   inputContainer: {
//     flexDirection: 'row',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: appColor.gray3,
//     width: '100%',
//     minHeight: 56,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//     backgroundColor: appColor.white,
//     marginBottom: 19,
//   },

//   input: {
//     padding: 0,
//     margin: 0,
//     flex: 1,
//     paddingHorizontal: 14,
//     color: appColor.text,
//   },
// });

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColor.gray3,
    width: '100%',
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: appColor.white,
    marginBottom: 19,
  },

  input: {
    padding: 0,
    margin: 0,
    flex: 1,
    paddingHorizontal: 14,
    color: appColor.text,
  },
});
