import React          from 'react';
import { View, Text } from 'react-native';

import styles         from './styles';

/**
 * Subtitle
 * @constructor
 * @param { string } subtitle - Subtitle to show
 */
export default class Subtitle extends React.Component {
        render() {
                const { subtitle, isCenter } = this.props;
                return(
                        <View style={styles.container}>
                                <Text style={ Object.assign({},styles.title, (isCenter) ? { textAlign: 'center' } : {})  }>{ subtitle }</Text>
                        </View>
                );
        }
}