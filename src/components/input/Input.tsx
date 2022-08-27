
import React, { memo } from "react";
import { View, TextInput, Text, KeyboardType } from "react-native";

//Styles
import styles from "./styles";

interface InputProps {
  value: string;
	setValue: (value: string) => void;
	error?: string;
	inputStyle?: any;
	style?:any;
	keyboardType?:KeyboardType
}

const Input = ({ value, setValue, error, inputStyle,keyboardType, style }: InputProps) => {
	return (
		<View style={style}>
			<TextInput keyboardType={keyboardType} value={value} onChangeText={setValue} style={[styles.input, inputStyle]} />
			{!!error && <Text style={styles.textErrorButton}>{error}</Text>}
		</View>
	);
};

export default memo(Input);
