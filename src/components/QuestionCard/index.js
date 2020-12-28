import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

export default class QuestionCard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { question } = this.props;
		return (
			<View style={ styles.container }>
				<View style={ styles.header_container }>
					<Text style={ styles.text }>{ question['label'] }</Text>
				</View>
			</View>
		);
	}
}