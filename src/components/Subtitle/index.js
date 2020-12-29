import React          from 'react';
import { View, Text } from 'react-native';

import styles         from './styles';

/**
 * Subtitle
 * { Subtitle to show } subtitle
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