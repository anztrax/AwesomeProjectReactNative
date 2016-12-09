/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  TextInput,
  ScrollView,
  ListView,
  Navigator,
  View
} from 'react-native';

import MyScene from './app/page/MyScene';

class Greeting extends React.Component{
  render(){
    return (
      <Text>hello { this.props.name } !</Text>
    )
  }
}

class Blink extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showText : true
    }

    setInterval(()=> {
      this.setState({showText: !this.state.showText});
    },1000);
  }

  render(){
    const {text, style} = this.props;
    let display = this.state.showText ? text : ' ';
    return (
      <Text style={style}>{display}</Text>
    );
  }
}

class AwesomeProject extends Component {
  render() {
    const pic ={
      url : 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };

    /**
     * good note :
     * All dimensions in React Native are unitless, and represent density-independent pixels.
     */
    return (
      <View style={{alignItems: 'center'}}>
        <View style={{width : 50, height : 50, backgroundColor: 'powderblue' }} />
        <View style={{width : 100, height : 100, backgroundColor: 'skyblue' }} />
        <View style={{width : 150, height : 150, backgroundColor: 'steelblue' }} />
        <Text>Hello World !</Text>
        <Greeting name='sora' />
        <Greeting name='goovy' />
        <Blink text='i love to blink text, just wow !' />
        <Blink text='this text will be blink in every 1000mSec yo !' />
        <Blink style={styles.red} text='Red neon light' />
        <Blink style={[ styles.red, styles.bigBlue ]} text='Big Blue neon light' />
        <Greeting name='donald' />
        <Image source={pic} style={{width: 193, height: 110}}/>
      </View>
    );
  }
}

class FlexDimensionsBasics extends React.Component{
  render(){
    // Try removing the `flex: 1` on the parent View.
    // The parent will not have dimensions, so the children can't expand.
    // What if you add `height: 300` instead of `flex: 1`?
    return (
      <View style={{flex : 1}}>
        <View style={{flex : 1}}>
          <View style={{flex : 1, backgroundColor : 'powderblue' }}/>
          <View style={{flex : 2, backgroundColor : 'skyblue' }}/>
          <View style={{flex : 3, backgroundColor : 'steelblue' }}/>
        </View>
        {/* flex direction : row / column (default) */}
        <View style={{flex : 1, flexDirection:'row'}}>
          <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
          <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
          <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
        </View>
        {/* justify content :
              Adding justifyContent to a component's style determines the
              distribution of children along the primary axis

              Should children be distributed at the start, the center, the end, or spaced evenly?
              Available options are :
                - flex-start
                - center
                - flex-end
                - space-around
                - space-between.
          */}
        <View style={{flex : 1, flexDirection:'column', justifyContent:'space-between'}}>
          <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
          <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
          <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
        </View>

        {/* Adding alignItems :
              to a component's style determines the alignment of children
              along the secondary axis (if the primary axis is row, then the secondary is column, and vice versa).

              Should children be aligned at the start, the center, the end, or stretched to fill?
              Available options are :
                - flex-start
                - center
                - flex-end
                - stretch
         */}
        <View style={{flex : 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch'}}>
          {/* this will stretch because work because not have a fixed dimension along the secondary axis. */}
          <View style={{height: 50, backgroundColor: 'powderblue'}} />
          <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
          <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
        </View>
      </View>
    );
  }
}

class PizzaTranslator extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text : ''
    }

    this.onChangeText = this._onChangeText.bind(this);
  }

  _onChangeText(text){
    this.setState({text});
  }

  render(){
    return (
      <View style={{padding:10}}>
        <TextInput
          style={{height : 40}}
          placeholder='Type here to translate !'
          onChangeText={this.onChangeText}
        />
        <Text style={{padding:10, fontSize:42}}>
          {this.state.text.split(' ').map(word => word && '🍕').join(' ')}
        </Text>
      </View>
    );
  }
}

class TryScrollView extends React.Component{

  generateText(){
    const elements = [];
    for(let i =0; i< 100;i++){
      elements.push(
        <Text key={i} style={{fontSize : 20}}>Megazord font {i}</Text>
      );
    }
    return elements;
  }

  render(){
    const generatedText = this.generateText();
    return (
      <ScrollView>
        {generatedText}
      </ScrollView>
    );
  }
}

function getMoviesFromApiSync(){
  return fetch('https://facebook.github.io/react-native/movies.json')
    .then(response => response.json())
    .then(responseJSON => {
      return responseJSON.movies
    })
    .catch(err => {
      console.error(err);
    })
}

/**
 * NOTE : One of the most common uses for a ListView is displaying data that you fetch from a server
 */
class ListViewBasics extends React.Component{
  constructor(props){
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged : (r1,r2) => r1 != r2});
    this.state = {
      dataSource : ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin', 'Andrew','Octocat'
      ])
    }
  }
  render(){
    return (
      <View style={{flex:1, paddingTop:22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
      </View>
    )
  }
}

class YoDawgApp extends React.Component{
  render(){
    return (
      <Navigator
        initialRoute={{title : 'My Initial Scene', index :0}}
        renderScene={(route, navigator)=> (
          <MyScene
            title={route.title}

            // Function to call when a new scene should be displayed
            onForward={()=> {
              const nextIndex = route.index + 1;
              navigator.push({
                title : 'Scene ' + nextIndex,
                index : nextIndex
              })
            }}

            // Function to call to go back to the previous scene
            onBack={()=>{
              if(route.index > 0){
                navigator.pop();
              }
            }}
          />
        )}
      />
    )
  }
}

const styles = StyleSheet.create({
  bigBlue: {
    color : 'blue',
    fontWeight : 'bold',
    fontSize:  30
  },
  red : {
    color : 'red'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => YoDawgApp);
