import { StyleSheet } from "react-native";

export default StyleSheet.create({
	button: {
		alignItems: "center",
		backgroundColor: "blue",
		borderRadius: 16,
		elevation: 5,
		height: 32,
		justifyContent: "center",
		marginTop: 32,
		minWidth: 200,
		paddingHorizontal: 24,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84
	},
	container: {
		alignItems: "center",
		flex: 1,
		paddingVertical: 64
	},
	input: {
		width: 250
	},
	textButton: {
		color: "#ffffff",
		fontSize: 16,
		fontWeight: "bold"
	}
});
