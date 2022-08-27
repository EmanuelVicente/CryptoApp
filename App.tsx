import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "./i18n";
import { RootSiblingParent } from 'react-native-root-siblings';

//Provider
import { AuthenticationProvider } from './src/context/authentication';

// Screens
import Login from "./src/screens/login";
import CryptoList from "./src/screens/crypto-list";
import Chart from "./src/screens/chart";

const Stack = createNativeStackNavigator();

function App() {
	return (
		<RootSiblingParent> 
			<AuthenticationProvider>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen name="Login" component={Login} />
						<Stack.Screen name="Crypto" component={CryptoList} />
						<Stack.Screen name="Chart" component={Chart} />
					</Stack.Navigator>
				</NavigationContainer>
			</AuthenticationProvider>
		</RootSiblingParent>
	);
}

export default App;
