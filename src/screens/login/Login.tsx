import React, { useState, memo, useCallback , useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

// Component
import Input from '../../components/input';

//Context 
import { AuthenticationContext } from '../../context/authentication'

//Styles
import styles from "./styles";

interface LoginProps {
  navigation: {
		navigate: (url: string) => void;
	}
}

const Login = ({ navigation }: LoginProps) => {
	const { t } = useTranslation();
	const { setAuthenticated } = useContext(AuthenticationContext);

	const [name, setName] = useState<string>("");
	const [error, setError] = useState<string>("");

	const onPressLoggin = useCallback(() => {
		if (!name.trim()) {
			setError(t("login.isRequired"));
		} else {
			setError("");
			setAuthenticated(name);
			navigation.navigate("Crypto");
		}
	}, [name, navigation, setAuthenticated, t]);

	return (
		<View style={styles.container}>
			<Input inputStyle={styles.input} value={name} setValue={setName} error={error}/>
			<TouchableOpacity style={styles.button} onPress={onPressLoggin}>
				<Text style={styles.textButton}>{t("login.submit")}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default memo(Login);
