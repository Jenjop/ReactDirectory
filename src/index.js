import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calculator from './Calculator/calc.js'
import './Calculator/calc.css'


class Page extends React.Component {

	constructor(props){
		super(props);
		this.state = {name: 'Directory', obj: <Directory
													onClick={(app) => this.appClick(app)}
												/>}
	}

	appClick(app){
		this.setState({
			name: app.name,
			obj: app.obj
		})
	}	

	render(){
		return (
			<AppWrapper app={this.state.obj} />
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
				<ul>
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
			{props.app}
		</div>
	);
}

ReactDOM.render(
	<Page />,
	document.getElementById('root')
	);