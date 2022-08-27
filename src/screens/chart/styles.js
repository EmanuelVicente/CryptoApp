import { StyleSheet } from "react-native";

export default StyleSheet.create({
	chart: {
		marginTop: 48
	},
	container: {
		flex:1,
		paddingVertical: 16
	},
	countdownBackground:{
		backgroundColor:'white',
		height: 32, 
		width: '100%' 
	},
	countdownContainer:{
		marginHorizontal: 10,
		marginTop: 16
	},
	countdownForeground:{
		backgroundColor:'blue', 
		height: 32,
		position: 'absolute'
	},
	title: {
		fontSize: 24
	},
	titleContainer: {
		alignItems: 'center',
		paddingHorizontal: 10
	}
});
