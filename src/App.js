import React, { Component } from 'react';
import bird from './images/bird.png';
import post from './images/Untitled.png';
import './App.css';
import { delay } from 'q';



class App extends Component {
  constructor(props){
    super(props);
      this.state = {
        topPos: 335,
        postPosLeft: 1000,
        isAlive: false
      }
    this.handleJump = this.handleJump.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  handleJump() {
    var a = document.getElementById("flappyBird");
    var aa = a.getBoundingClientRect();
    console.log(aa);
    this.setState({
      isAlive: true,
      topPos: this.state.topPos-50,
    })    
  }

  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick(),
      10
    );
    //this.createPost();
  }

  tick(){
    if(this.state.isAlive === true){
    this.setState({
      topPos: this.state.topPos+1,
      postPosLeft: this.state.postPosLeft-1,
    })}
    if(this.state.topPos === 520){
      this.setState({
        topPos: 335,
        postPosLeft: 1000,
        isAlive: false
      })
    }
    
  }



  createPost() {
    var newPost = [];
    for(let i=0; i < 1; i++){
      newPost.push(<div key={i} ><img src={post} alt=""/></div>);   
    }
    return newPost;
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
       // marginLeft: 50
      }
    }
    
    

    return (
      <div className="App" onClick={this.handleJump}>
        <div className="App-header" >
          <div style={styles.postStyle}>
            {this.createPost()}
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

