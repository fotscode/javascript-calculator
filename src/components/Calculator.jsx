import React, { Component } from 'react';

const numbersIDS=["zero","one","two","three","four","five","six","seven","eight","nine"];
const operatorsSymbols=["+","-","/","*"];
const operatorsIDS=["add","subtract","divide","multiply"];

function checkIfHasTwoOP(str){
   let strSplitted=str.split(" ");
   let removedSpaces=strSplitted.join("");
   return /[*+-/]-$/.test(removedSpaces);
}


function NumberButton(props){
  return(
    <button
      id={numbersIDS[props.value]}
      onClick={props.onClick}
      className="number"
      >{props.value}
    </button>
  );
}

function OperatorButton(props){
  return(
    <button
      id={operatorsIDS[props.value]}
      onClick={props.onClick}
      className="operator"
      >{operatorsSymbols[props.value]}
    </button>
  );
}

class Calculator extends React.Component{
  constructor(props){
    super(props);
    this.state={
      current:'0',
      history:'',
    }
    this.renderNumber=this.renderNumber.bind(this);
    this.handleNumber=this.handleNumber.bind(this);
    this.handleClear=this.handleClear.bind(this);
    this.handleOperator=this.handleOperator.bind(this);
    this.handleDecimal=this.handleDecimal.bind(this);
    this.handleEquals=this.handleEquals.bind(this);
  }


  renderNumber(i){
    return(
      <NumberButton
        onClick={()=>this.handleNumber(i)}
        value={i} />
    );
  }

  renderOperator(i){
    return(
      <OperatorButton
        onClick={()=>this.handleOperator(i)}
        value={i}
        />
    );
  }

  handleNumber(i){
    let newCurrent=this.state.current;
    let newHistory=this.state.history;

    if(i==="." && (this.state.current==="0" || operatorsSymbols.indexOf(this.state.current)!==-1)){
      newCurrent="0";
    } else if (this.state.current === ("0")||operatorsSymbols.indexOf(this.state.current)!==-1){
      newCurrent = "";
    }

    if (this.state.history.includes("=")) {
      newHistory="";
      newCurrent="";
    }

    this.setState({
      current:newCurrent.concat(i.toString()),
      history:newHistory
    });
  }

  handleClear(){
    this.setState({
      current:"0",
      history:"",
    });
  }

  handleOperator(i){
    let newHistory=this.state.history;
    let hasAlreadyTwo = checkIfHasTwoOP(newHistory);

    if (newHistory.includes("=")){
      newHistory=this.state.current+" "+operatorsSymbols[i]+" ";
    } else if (operatorsSymbols.indexOf(this.state.current)===-1){
      newHistory+=this.state.current+" "+operatorsSymbols[i]+" ";
    } else if (operatorsSymbols[i]==="-" && !hasAlreadyTwo){
      newHistory+=" - ";
    } else if (hasAlreadyTwo){
      newHistory=newHistory.substring(0,newHistory.length-5)+operatorsSymbols[i]+" ";
    } else{
      newHistory=newHistory.substring(0,newHistory.length-2)+operatorsSymbols[i]+" ";
    }

    this.setState({
      history:newHistory,
      current:operatorsSymbols[i],
    })
  }

  handleDecimal(){
    if (this.state.current.includes(".")) return; /*avoids repetition of dots*/
    this.handleNumber(".");
  }

  handleEquals(){
		if (this.state.history.includes("=")) return;
    let newHistory=this.state.history;

    if (operatorsSymbols.indexOf(this.state.current)!==-1){
      newHistory+="0"
    }else{
      newHistory+=this.state.current;
    }

    let result = eval(newHistory);

    if (result===Infinity || (!result&&result!=0)){
      result="ILLEGAL EXPRESSION";
    }

    newHistory+=" = "+result;

    this.setState({
      history:newHistory,
      current:result,
    });
  }

  render(){
    return(
      <div id="calculator-container">
        {this.renderOperator(0)}
        {this.renderOperator(1)}
        {this.renderOperator(2)}
        {this.renderOperator(3)}
        {this.renderNumber(0)}
        {this.renderNumber(1)}
        {this.renderNumber(2)}
        {this.renderNumber(3)}
        {this.renderNumber(4)}
        {this.renderNumber(5)}
        {this.renderNumber(6)}
        {this.renderNumber(7)}
        {this.renderNumber(8)}
        {this.renderNumber(9)}
        <button id="equals" onClick={this.handleEquals}>=</button>
        <button id="decimal" onClick={this.handleDecimal}>.</button>
        <button id="clear" onClick={this.handleClear}>AC</button>
        <div id="display-container">
          <p id="history">{this.state.history}</p>
          <p id="display">{this.state.current}</p>
        </div>
      </div>
    );
  }
}

export default Calculator;
