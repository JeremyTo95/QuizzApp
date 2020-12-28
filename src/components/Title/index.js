import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

export default class Title extends React.Component {
	render() {
		return(
			<View style={styles.container}>
				<Text style={styles.title}>{ this.props.title }</Text>
			</View>
		);
	}
}