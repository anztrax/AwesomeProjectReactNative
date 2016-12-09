import React, { PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export default class MyScene extends React.Component{
  static get propTypes(){
    return {
      title : PropTypes.string.isRequired,
      onForward : PropTypes.func.isRequired,
      onBack : PropTypes.func.isRequired
    }
  }

  static get defaultProps(){
    return {
      title : 'MyScene'
    }
  }

  render(){
    return (
      <View style={{paddingTop: 22}}>
        <Text>Hi ! My name is {this.props.title}</Text>
        <TouchableHighlight onPress={this.props.onForward}>
          <Text>Tap me to load the next scene</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.props.onBack}>
          <Text>Tap me to go back</Text>
        </TouchableHighlight>
      </View>
    );
  }
}