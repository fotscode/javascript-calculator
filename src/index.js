import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './components/Calculator';

class MyApp extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div id="myApp">
				<Calculator />
			</div>
		);
	}
}

ReactDOM.render(<MyApp />,document.getElementById("root"));
