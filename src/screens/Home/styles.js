import { StyleSheet } from 'react-native';
import * as Colors from '../../assets/Colors';

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flex: 1,
		flexDirection: 'column',
		backgroundColor: Colors.BACKGROUND_COLOR
	},
	select_container: {
		flex: 1,
		width: '100%',
		height: 600.0,
		flexDirection: 'column',
		justifyContent: 'space-evenly'
	},
	btn_container: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 20.0
	},
	select_row: {
		display: 'flex',
		flexDirection: 'row',
		marginVertical: 10.0,
		height: 50.0,
		marginHorizontal: 20.0,
		paddingHorizontal: 20.0,
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'space-between',
	},
	select_option: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	center: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text_cat: {
		color: Colors.TEXT_COLOR,
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 18.0
	},
	text: {
		color: Colors.TEXT_COLOR,
		fontFamily: 'Montserrat-Regular',
		fontSize: 18.0
	},
	history_container: {
		flex: 1,
		backgroundColor: Colors.ACCENT_COLOR,
		borderRadius: 65.0,
		paddingTop: 20.0
	}
});

export default styles;