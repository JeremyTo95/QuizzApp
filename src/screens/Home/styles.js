import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: 'center',
		// alignContent: 'center'
	},
	title: {
		fontSize: 30.0,
		fontFamily: 'sans-serif',
		color: '#000',
		textAlign: 'center',
		marginVertical: 20.0,
		letterSpacing: 10.0
	},
	select_container: {
		width: '100%'
	},
	select_row: {
		display: 'flex',
		flexDirection: 'row',
		marginVertical: 10.0
	},
	center: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
});

export default styles;