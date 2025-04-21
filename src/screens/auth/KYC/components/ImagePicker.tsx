import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonCus,
  InputCus,
  SectionComponent,
  TextCus,
} from '../../../../components';
import {Camera} from 'iconsax-react-native';
import {appColor} from '../../../../constants/appColor';
import DropDownPicker from 'react-native-dropdown-picker';
const ImagePicker = () => {
  const [useName, setUseName] = React.useState('');
  const [displayName, setDisplayName] = React.useState('');
  const [isBio, setBio] = React.useState('');
  const [interest, setInterest] = React.useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);
  return (
    <>
      <SectionComponent center flex={1}>
        <TouchableOpacity
          style={{
            paddingHorizontal: 60,
            paddingVertical: 60,
            borderRadius: 100,
            backgroundColor: appColor.gray3,
          }}>
          <Camera size={50} color={appColor.gray} />
        </TouchableOpacity>
        <SectionComponent ph={20} mt={20}>
          <TextCus styles={{marginBottom: 10}} text="Name" />
          <InputCus value={useName} />
          <TextCus styles={{marginBottom: 10}} text="DisplayName" />
          <InputCus value={displayName} />
          <TextCus styles={{marginBottom: 10}} text="Bio" />
          <InputCus value={isBio} />
          <TextCus styles={{marginBottom: 10}} text="Interest" />
          <InputCus value={interest} />
         
          <DropDownPicker
            style={{zIndex: 1000}}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </SectionComponent>
      </SectionComponent>
      <ButtonCus
        iconFlex="right"
        textColor={appColor.white}
        text="Login"
        type="primary"
      />
    </>
  );
};

export default ImagePicker;
