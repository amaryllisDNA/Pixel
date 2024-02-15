import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class Pixel extends Component{
  constructor(props){
    super(props);
    this.state = {
      fill : "white", 
      column : this.props.col,
      line : this.props.lin,
      border : "0.5px solid rgb(237, 231, 231)"
    }}

    selectPixel = (col,lin) => {
      console.log("you selected pixel"+ col +"," +lin);
      this.setState({ border: "2px solid black" })   
}

    render(){
      return(
        <div className="pixel" onClick={()=>this.selectPixel(this.props.col,this.props.lin)} style = {{backgroundColor:this.state.fill, border : this.state.border}}></div>
      )
    }
    
  
}

class Canva extends Component {
  constructor(props){
    super(props); 
    this.state = {
      table : Array.from({ length: 100  }, (_, rowIndex) => Array.from({ length: 100 }, (_, subArrayIndex) => [rowIndex, subArrayIndex])),
    }
  }

  render(){
    let table = this.state.table;

    return (
      <div className = "canva"> {table.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map(([col, lin], subArrayIndex) => (
            <Pixel key={`${rowIndex}-${subArrayIndex}`} col={col} lin={lin} />
          ))}


        </div>))
      }
      </div>
    )
  }
}


class Gameboard extends Component {
  constructor(props){
    super(props); 
    this.state = {
      pixelchosen : undefined,
      colorchosen : undefined
    }
  }


  render(){
    return(
      <div className='game'>
      
        <Canva/>
        <div id="colorpalette">
          <div className="coloring" col="#FFFFFF" style ={{backgroundColor:'#FFFFFF'}}></div>
          <div className="coloring" col="#000000" style ={{backgroundColor:'#000000'}}></div>
          <div className="coloring" col="#FF0000" style ={{backgroundColor:'#FF0000'}}></div>
          <div className="coloring" col="#00FF00" style ={{backgroundColor:'#00FF00'}}></div>
          <div className="coloring" col="#0000FF" style ={{backgroundColor:'#0000FF'}}></div>
          <div className="coloring" col="#FFFF00" style ={{backgroundColor:'#FFFF00'}}></div>
          <div className="coloring" col="#00FFFF" style ={{backgroundColor:'#00FFFF'}}></div>
          <div className="coloring" col="#FF00FF" style ={{backgroundColor:'#FF00FF'}}></div>
          <div className="coloring" col="#808080" style ={{backgroundColor:'#808080'}}></div>
          <div className="coloring" col="#A52A2A" style ={{backgroundColor:'#A52A2A'}}></div>
        </div>
        <button type='submit'>Submit</button>
      </div>
    )
  }

}

function App() {


  return (
    <div>
      <p id='title'>Canva</p>
      <Gameboard/>
    </div>
  );
}




export default App;
