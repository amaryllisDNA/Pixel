import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class Pixel extends Component{
  constructor(props){
    super(props);
    }

    selectPixel = () => {
      console.log('you selected pixel ' + this.props.col + ', ' + this.props.lin, this.props.clr);
      this.setState({ border: '2.5px solid black' });
      this.props.onSelectPixel(this.props.col, this.props.lin);
    };
  

    
  render() {
    const { clr, isSelected } = this.props;
    const borderStyle = isSelected ? '2px solid black' : '1px solid rgb(237, 231, 231)';

    return (
      <div
        className="pixel"
        onClick={this.selectPixel}
        style={{ backgroundColor: this.props.clr, border: borderStyle }}
      ></div>
    );
  }
}


class Canva extends Component {
  constructor(props){
    super(props); 
    this.state = {
      table : Array.from({ length: 100  }, (_, rowIndex) => Array.from({ length: 100 }, (_, subArrayIndex) => [rowIndex, subArrayIndex])),
      edited : this.props.edited,
      selecting : false, 
      
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.submitted !== prevProps.submitted) {
      const table = [...this.state.table];
      if (this.props.submitted) {
        const [col, lin, color] = this.props.submitted;
        table[col][lin] = [col, lin, color];
      }
      this.setState({ table });
    }
  }


  render(){
 
    const { onSelectPixel } = this.props;

    
    return (
      <div className = "canva"> {this.state.table.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map(([col, lin, clr], subArrayIndex) => (
            <Pixel key={`${rowIndex}-${subArrayIndex}`} 
                  col={col} lin={lin} clr= {clr}
                  onSelectPixel={onSelectPixel} 
                  isSelected ={this.props.selectedPixel && this.props.selectedPixel[0]===col && this.props.selectedPixel[1]===lin}  />
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
      colorchosen : undefined, 
      submitted : undefined,

    }
  }

  handleSubmit = () => {
    const { pixelchosen, colorchosen } = this.state;
    if (pixelchosen && colorchosen) {
      this.setState({ 
        submitted: pixelchosen.concat(colorchosen),
        pixelchosen: undefined,
        colorchosen: undefined,
        previousSelect: null
   }, () => {
      console.log(this.state.submitted);
        console.log("You changed the color of the pixel ", this.state.submitted[0], ",", this.state.submitted[1], "!");
      });
    }
    else{
      console.log("You need to select a color and a pixel ! ")
    }
  };

  handleSelectPixel = (col, line) => {
    if(this.state.pixelchosen != undefined){
      this.setState({previousSelect : this.state.pixelchosen, pixelchosen: [col, line]}, ()=>{
        console.log("you already selected a pixel ! ", this.state.previousSelect, this.state.pixelchosen)});
      this.setState({  });
      
    } else {
      this.setState({ pixelchosen: [col, line] });
    }
    
  };

  handleSelectColor = (color) => {
    this.setState({ colorchosen: color });
  };


  render(){
    return(
      <div className='game'>
      
        <Canva onSelectPixel={this.handleSelectPixel} selectedPixel = {this.state.pixelchosen} submitted = {this.state.submitted} />
        <div id="colorpalette">
          <div className="coloring" onClick={() => this.handleSelectColor("#FFFFFF")} style={{ backgroundColor: '#FFFFFF' }}></div>
          <div className="coloring" onClick={() => this.handleSelectColor("#000000")} style={{ backgroundColor: '#000000' }}></div>
          <div className="coloring" onClick={() => this.handleSelectColor("#FF0000")} style={{ backgroundColor: '#FF0000' }}></div>
          <div className="coloring" onClick={() => this.handleSelectColor("#00FF00")} style={{ backgroundColor: '#00FF00' }}></div>
          <div className="coloring" onClick={() => this.handleSelectColor("#0000FF")} style={{ backgroundColor: '#0000FF' }}></div>
          <div className="coloring" onClick={() => this.handleSelectColor("#FFFF00")} style={{ backgroundColor: '#FFFF00' }}></div>
          <div className="coloring" onClick={() => this.handleSelectColor("#00FFFF")} style={{ backgroundColor: '#00FFFF' }}></div>
          <div className="coloring" onClick={() => this.handleSelectColor("#FF00FF")} style={{ backgroundColor: '#FF00FF' }}></div>
          <div className="coloring" onClick={() => this.handleSelectColor("#808080")} style={{ backgroundColor: '#808080' }}></div>
          <div className="coloring" onClick={() => this.handleSelectColor("#A52A2A")} style={{ backgroundColor: '#A52A2A' }}></div>
        </div>
        <button type='submit' id="submit" onClick={this.handleSubmit}>Submit</button>
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
