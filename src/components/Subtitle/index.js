import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

/**
 * Subtitle
 * { Subtitle to show } subtitle
 */
export default class Subtitle extends React.Component {
        render() {
                return(
                        <View style={styles.container}>
                                <Text style={ styles.title }>{ this.props.subtitle }</Text>
                        </View>
                );
        }
}