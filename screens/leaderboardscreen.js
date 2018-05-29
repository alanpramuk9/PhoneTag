import React, { Component } from "react";
import { createStackNavigator } from 'react-navigation';
import { StyleSheet, View, Image, Text  } from 'react-native'
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Thumbnail,
  Segment,
  Left,
  Right,
  Body
} from "native-base";


let userimage = require('../images/bird.jpg');

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          seg: 1
        };
        
      }
  render() {
    if (this.state.seg ===1) {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Leaderboard</Title>
          </Body>
          <Right />
        </Header>
        <Segment>
          <Button
            first
            active={this.state.seg === 1 ? true : false}
            onPress={() => this.setState({ seg: 1 })}
          >
            <Text>Daily</Text>
          </Button>
          <Button
            active={this.state.seg === 2 ? true : false}
            onPress={() => this.setState({ seg: 2 })}
          >
            <Text>Weekly</Text>
          </Button>
          <Button
            last
            active={this.state.seg === 3 ? true : false}
            onPress={() => this.setState({ seg: 3 })}
          >
            <Text>Monthly</Text>
          </Button>
        </Segment>
        
        <Content>
          <List>
            {datas.map((data, i) => (
                
              <ListItem style={styles.leaderlist}>
                <Left>
                    <Text style={styles.number} >{i +1} </Text>
                  <Thumbnail small source={data.img} />
                </Left>
                <Body>
                  <Text>{data.text}</Text>
                </Body>
                <Right>
                  <Text note>{data.score}</Text>
                </Right>
              </ListItem>
            ))}
          </List>
        </Content>
      </Container>
    )    
    }
    
        else {
        return(
            <Container>
            <Segment>
          <Button
            
            active={this.state.seg === 1 ? true : false}
            onPress={() => this.setState({ seg: 1 })}
          >
            <Text>Daily</Text>
          </Button>
          <Button
          first
            active={this.state.seg === 2 ? true : false}
            onPress={() => this.setState({ seg: 2 })}
          >
            <Text>Weekly</Text>
          </Button>
          <Button
            last
            active={this.state.seg === 3 ? true : false}
            onPress={() => this.setState({ seg: 3 })}
          >
            <Text>Monthly</Text>
          </Button>
        </Segment>
             
            <View>
                <Text>Hey </Text>
            </View>
            </Container>
        )
        }
        
    
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  number: {
      marginRight: 10,
      alignSelf: "center"
  },
  leaderlist: {
      justifyContent: "space-evenly"
  }
});

export default Leaderboard;


//static data that we will for now 
const datas = [
    {
        img: userimage,
        text: "yaBoiJio",
        //note: "Its score to build a difference . .",
        score: "250"
      },
    {
    img: userimage,
    text: "alanp003",
    //note: "Its score to build a difference . .",
    score: "189"
  },
  {
    img: userimage,
    text: "JHead",
    //note: "One needs courage to be happy and smiling all score . . ",
    score: "189"
  },
  {
    img: userimage,
    text: "RobbyBobby",
   // note: "Live a life style that matchs your vision",
    score: "165"
  },
  {
    img: userimage,
    text: "JaneDoe",
    //note: "Failure is temporary, giving up makes it permanent",
    score: "85"
  },
  {
    img: userimage,
    text: "Python",
    //note: "The biggest risk is a missed opportunity !!",
    score: "84"
  },
  {
    img: userimage,
    text: "Java",
    //note: "Wish I had a score machine . .",
    score: "80"
  },
  {
    img: userimage,
    text: "MySQl",
    //note: "Wish I had a score machine . .",
    score: "78"
  },
  {
    img: userimage,
    text: "PHP",
    //note: "Wish I had a score machine . .",
    score: "80"
  },
  {
    img: userimage,
    text: "Node.js",
    //note: "Wish I had a score machine . .",
    score: "23"
  },
  {
    img: userimage,
    text: "Express",
    //note: "Wish I had a score machine . .",
    score: "34"
  },
  {
    img: userimage,
    text: "MongoDB",
    //note: "Wish I had a score machine . .",
    score: "45"
  },
  {
    img: userimage,
    text: "NotJavascript",
    //note: "Wish I had a score machine . .",
    score: "0"
  },
  {
    img: userimage,
    text: "NotJavascript",
    //note: "Wish I had a score machine . .",
    score: "0"
  },
  {
    img: userimage,
    text: "NotJavascript",
    //note: "Wish I had a score machine . .",
    score: "0"
  },
  {
    img: userimage,
    text: "NotJavascript",
    //note: "Wish I had a score machine . .",
    score: "0"
  },
  {
    img: userimage,
    text: "NotJavascript",
    //note: "Wish I had a score machine . .",
    score: "0"
  },
  {
    img: userimage,
    text: "NotJavascript",
    //note: "Wish I had a score machine . .",
    score: "0"
  },
  {
    img: userimage,
    text: "NotJavascript",
    //note: "Wish I had a score machine . .",
    score: "0"
  },
  {
    img: userimage,
    text: "NotJavascript",
    //note: "Wish I had a score machine . .",
    score: "0"
  },
  {
    img: userimage,
    text: "NotJavascript",
    //note: "Wish I had a score machine . .",
    score: "0"
  },
  {
    img: userimage,
    text: "NotJavascript",
    //note: "Wish I had a score machine . .",
    score: "0"
  },
  {
    img: userimage,
    text: "NotJavascript",
    //note: "Wish I had a score machine . .",
    score: "0"
  },
  {
    img: userimage,
    text: "NotJavascript",
    //note: "Wish I had a score machine . .",
    score: "0"
  },
  {
    img: userimage,
    text: "NotJavascript",
    //note: "Wish I had a score machine . .",
    score: "0"
  },
  {
    img: userimage,
    text: "NotJavascript",
    //note: "Wish I had a score machine . .",
    score: "0"
  },
  {
    img: userimage,
    text: "NotJavascript",
    //note: "Wish I had a score machine . .",
    score: "0"
  },
  {
    img: userimage,
    text: "NotJavascript",
    //note: "Wish I had a score machine . .",
    score: "0"
  },
  {
    img: userimage,
    text: "NotJavascript",
    //note: "Wish I had a score machine . .",
    score: "0"
  },
  {
    img: userimage,
    text: "NotJavascript",
    //note: "Wish I had a score machine . .",
    score: "0"
  },
  {
    img: userimage,
    text: "NotJavascript",
    //note: "Wish I had a score machine . .",
    score: "0"
  },
  {
    img: userimage,
    text: "NotJavascript",
    //note: "Wish I had a score machine . .",
    score: "0"
  },
  {
    img: userimage,
    text: "NotJavascript",
    //note: "Wish I had a score machine . .",
    score: "0"
  },
  {
    img: userimage,
    text: "NotJavascript",
    //note: "Wish I had a score machine . .",
    score: "0"
  },
  {
    img: userimage,
    text: "NotJavascript",
    //note: "Wish I had a score machine . .",
    score: "0"
  },
  {
    img: userimage,
    text: "NotJavascript",
    //note: "Wish I had a score machine . .",
    score: "0"
  },
  {
    img: userimage,
    text: "NotJavascript",
    //note: "Wish I had a score machine . .",
    score: "0"
  },
  {
    img: userimage,
    text: "NotJavascript",
    //note: "Wish I had a score machine . .",
    score: "0"
  }






];