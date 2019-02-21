import React, { Component } from 'react';
import bird from './images/bird.png';
import post from './images/Untitled.png';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
      this.state = {
        topPos: 335,
        postPosLeft: 1000
      }
    this.handleJump = this.handleJump.bind(this);
  }

  handleJump() {
    var a = document.getElementById("flappyBird");
    var aa = a.getBoundingClientRect();
    console.log(aa);
    this.setState({
      topPos: this.state.topPos-50,
    })    
  }

  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick(),
      10
    );
  }

  tick(){
    this.setState({
      topPos: this.state.topPos+1,
      postPosLeft: this.state.postPosLeft-1,
    })
    if(this.state.topPos === 520){
      this.setState({
        topPos: 335,
        postPosLeft: 1000
      })
    }
  }


  render() {
    var styles = {
      birdStyle: {
        width: 50,
        height: 50,
      },
      birdPos:{
        position: 'absolute',
        top: this.state.topPos,
      },
      btnJump:{
        position: 'relative',
        top: 200,
      },
      postStyle:{
        position: 'absolute',
        left: this.state.postPosLeft,
      }
    }
    

    return (
      <div className="App" onClick={this.handleJump}>
        <div className="App-header" >
        <div style={styles.postStyle}>
          <img src={post} alt=""/>
        </div>
          <div style={styles.birdPos}>
            <img alt="" id="flappyBird" ref="fbird" src={bird} style = {styles.birdStyle} />
          </div>
          <button onClick={this.handleJump} style={styles.btnJump}>JUMP</button>
        </div>
      </div>
    );
  }
}

export default App;

