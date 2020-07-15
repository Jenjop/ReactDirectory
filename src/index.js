import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calculator from './Calculator/calc.js'
// import './Calculator/calc.css'
import Weather from './Weather/weather.js'
// import './Weather/weather.css'

class Page extends React.Component {

	constructor(props){
		super(props);
		this.dirState = {name: 'Directory', obj: <Directory
													onClick={(app) => this.appClick(app)}
												/>}
		this.state = this.dirState
	}

	appClick(app){
		this.setState({
			name: app.name,
			obj: app.obj
		})
	}	

	render(){
		if (this.state.name === 'Directory'){
			return(
				this.state.obj
			)
		}
		return (
			<AppWrapper app={this.state} onClick={() => this.appClick(this.dirState)}/>
		)
	}
}
// Holds Title and the grid
class Directory extends React.Component {

	render() {
		return(
			<div>
				<div className="title">
					React Apps Directory
				</div>
				<Grid
					onClick={(app) => this.props.onClick(app)}
				/>
			</div>
		);
	}
}

// Creates box for each app
class Grid extends React.Component {
	constructor(props){
		super(props);
		this.apps= [
			{name: 'Calculator', img: 'img/Calculator.png', obj: <Calculator />},
			// {name: 'Weather', img: 'https://bbriverboats.com/img/current-conditions/weather-icons/clear-day.png'},
			{name: 'Weather', img: 'img/Weather2.png', obj: <Weather />},
			{name: 'Test', img: 'img/Calculator.png', obj: null},
			{name: 'Another Test', img: 'img/Calculator.png', obj: null},
		]
		this.items = this.apps.map((item) => 
			<AppBox
				name={item.name}
				img={item.img}
				onClick={() => this.props.onClick(item)}
			/>
		)
	}

	render() {
		return(
			<dir className='grid'>
				<ul className='gridUL'>
					{this.items}
				</ul>
			</dir>
		);
	}
}

//Box for each app with name/image
function AppBox(props){
	return(
		<li className='appBox' onClick={() => props.onClick()}>
			{/*<div style={{backgroundImage: `url('${props.img}')`}}>*/}
			<div className='appDiv'>
				<img className='appImg' draggable="false" src={props.img} alt="Missing Asset"/>
				<div className='appColorBox'>
					<div className='appName'>
						{props.name}
					</div>
				</div>
			</div>
		</li>
	);
}

function AppWrapper(props){
	return(
		<div className='appWrapper'>
			<div className='appHeader'>
				<BackButton app={props.app.name} onClick={props.onClick}/>
				<div className='subtitle'>
					{props.app.name}
				</div>
			</div>
			{props.app.obj}
		</div>
	);
}

function BackButton(props){
	// if (props.app !== 'Directory'){
	// 	return(
	// 		<button className='backButton' onClick={props.onClick}>
	// 			Back To Directory
	// 		</button>
	// 	)
	// }
	// else{
	// 	return null
	// }
		return(
			<button className='backButton' onClick={props.onClick}>
				Back To Directory
			</button>
		)
}

ReactDOM.render(
	<Page />,
	document.getElementById('root')
	);