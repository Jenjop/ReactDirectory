import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Holds Title and the grid
class Directory extends React.Component {

	render() {
		return(
			<div>
				<div className="title">
					Longinus' React Apps Directory
				</div>
				<Grid/>
			</div>
		);
	}
}

// Creates box for each app
class Grid extends React.Component {
	constructor(props){
		super(props);
		this.apps= [
			{name: 'Calculator', img: 'https://media.beam.usnews.com/74/c5/61483296484a8189907973fe97c8/203001-squarelogo-submitted.jpg'},
			{name: 'Weather', img: 'https://bbriverboats.com/img/current-conditions/weather-icons/clear-day.png'}
		]
		this.items = this.apps.map((item) => 
			<AppBox
				name={item.name}
				img={item.img}
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
let img = 'C:/Users/longi/Documents/Jenjo/React/ReactDirectory/Calculator.png'
//Box for each app with name/image
function AppBox(props){
	return(
		<li
			className='appBox'
			style={
				{
					backgroundImage: `url('${props.img}')`
				}
			}
		>
		<div>
		{props.name}
		</div>
		</li>
	);
}

ReactDOM.render(
	<Directory />,
	document.getElementById('root')
	);