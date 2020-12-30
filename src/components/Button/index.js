import React                      from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles                     from './styles';

/**
 * CustomButtom which could be :
 * 	- Flat button   : Button without background
 * 	- Raised button : Button with background
 * @constructor
 * @param { string   } text   - Text set on the button
 * @param { Function } action - Action do on press
 */
export default class Button extends React.Component {
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