import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';

export default class Button extends React.Component {
	componentDidMount() {
		console.log("Button");
		console.log(this.props);
	}

	render() {
		const { 
			action,
			text,
			isFlat,
			isRaised,
		} = this.props;

		return (
			<TouchableOpacity onPress={ action } >
				<Text style={ Object.assign({}, styles.container, (isRaised) ? styles.raised : (isFlat) ? styles.flat : styles.text) }>{ text }</Text>
			</TouchableOpacity>
		);
	}
}