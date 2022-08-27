import { StyleSheet } from "react-native";

export default StyleSheet.create({
	button: {
		backgroundColor: "blue",
		height: 32,
		justifyContent: 'center',
		paddingHorizontal:10
	},
	container:{
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 24
	},
	containerFilter: {
		alignItems:'center',
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 8
	},
	flatList:{
		marginTop: 10
	},
	input:{
		flex: 1,
		marginRight: 10
	},
	listComponentContainer:{
		flexDirection:'row',
		marginBottom: 10,
		marginTop: 10,
		paddingHorizontal: 10
	},
	textButton:{
		color: 'white',
		fontWeight: 'bold'
	},
	textListComponent:{
		flex: 1
	},
	title:{
		fontSize: 24
	}
});
