import React from 'react';
import ReactDOM from 'react-dom';
import './calc.css';

function NumBox(props) {
	return(
		<button
			className = 'numBox'
			onClick={props.onClick}
		>
			{props.value}
		</button>
	);
}

function OpBox(props) {
	return(
		<button
			className = 'opBox'
			onClick={props.onClick}
		>
			{props.value}
		</button>
	);
}

function TextBox(props) {
	return(
		<div
			className = 'textBox'
		>
			{props.value}
		</div>
	);
}

class Screen extends React.Component {

	renderNumBox(i){
		return(
			<NumBox
				value={i}
				onClick={() => this.props.inOnClick(i)}
			/>
		);
	}

	renderOpBox(i){
		return(
			<OpBox
				value={i}
				onClick={() => this.props.opOnClick(i)}
			/>
		);
	}

	renderOp2Box(i){
		return(
			<OpBox
				value={i}
				onClick={() => this.props.fnOnClick(i)}
			/>
		);
	}

	renderTextBox(){
		return(
			<TextBox
				value={this.props.cur}
			/>
		);
	}

	render() {
		return (
			<div>
				<div className="prev">
					{this.props.prev}
				</div>
				<div className="board-row">
					{this.renderTextBox()}
				</div>
				<div className="board-row">
					{this.renderNumBox('7')}{/* 7 */}
					{this.renderNumBox('8')}{/* 8 */}
					{this.renderNumBox('9')}{/* 9 */}
					{this.renderOp2Box('Del')}{/* ( */}
					{this.renderOp2Box('C')}{/* ) */}
				</div>
				<div className="board-row">
					{this.renderNumBox('4')}{/* 4 */}
					{this.renderNumBox('5')}{/* 5 */}
					{this.renderNumBox('6')}{/* 6 */}
					{this.renderOpBox('x')}{/* x */}
					{this.renderOpBox('/')}{/* / */}
				</div> 
				<div className="board-row">
					{this.renderNumBox('1')}{/* 1 */}
					{this.renderNumBox('2')}{/* 2 */}
					{this.renderNumBox('3')}{/* 3 */}
					{this.renderOpBox('+')}{/* + */}
					{this.renderOpBox('-')}{/* - */}
				</div> 
				<div className="board-row">
					{this.renderNumBox('.')}{/* . */}
					{this.renderNumBox('0')}{/* 0 */}
					{this.renderNumBox('Ans')}{/* Ans */}
					{this.renderOpBox('^')}{/* ^ */}
					{this.renderOp2Box('=')}{/* = */}
				</div> 
			</div>
		);
	}
}

class Calculator extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			prev: '-1-1',
			cur: '1+1',
			new: true,
			op_allowed: false,
			open_paren: false
		};
	}

	handleInputClick(i) {
		// Handle prev starting w/ negative
		if (i === 'Ans'){
			let newCur = this.state.new? this.state.prev : this.state.cur + this.state.prev
			this.setState({
				prev: this.state.prev,
				cur: newCur,
				new: false,
				op_allowed: opAllowed(newCur),
				open_paren: this.state.open_paren
			})
		}
		else{
			let newCur = this.state.new? i : this.state.cur + i
			this.setState({
				prev: this.state.prev,
				cur: newCur,
				new: false,
				op_allowed: opAllowed(newCur),
				open_paren: this.state.open_paren
			})
		}

	}

	handleOperationClick(i) {
		if (i === '-'){
			if (this.state.new === true){
				this.setState({
					prev: this.state.prev,
					cur: '-',
					new: false,
					op_allowed: false,
					open_paren: this.state.open_paren
				})
			}
			else if(this.state.op_allowed || !this.state.op_allowed){
				let newCur = this.state.cur + i
				this.setState({
					prev: this.state.prev,
					cur: newCur,
					new: false,
					op_allowed: opAllowed(newCur),
					open_paren: this.state.open_paren
				})
			}
			else{
				let newCur = this.state.cur.replace(/.$/, i)
				this.setState({
					prev: this.state.prev,
					cur: newCur,
					new: false,
					op_allowed: opAllowed(newCur),
					open_paren: this.state.open_paren
				})
			}
		}
		else if (this.state.new){
			let newCur = this.state.prev + i
			this.setState({
				prev: this.state.prev,
				cur: newCur,
				new: false,
				op_allowed: opAllowed(newCur),
				open_paren: this.state.open_paren
			})			
		}
		else if (this.state.op_allowed){
			let newCur = this.state.cur + i
			this.setState({
				prev: this.state.prev,
				cur: newCur,
				new: false,
				op_allowed: opAllowed(newCur),
				open_paren: this.state.open_paren
			})
		}
		else{
			let newCur = this.state.cur.replace(/.$/, i)
			this.setState({
				prev: this.state.prev,
				cur: newCur,
				new: false,
				op_allowed: opAllowed(newCur),
				open_paren: this.state.open_paren
			})
		}
	}

	handleFunctionClick(i) {
		if (i === 'C'){
			this.setState({
				prev: this.state.prev,
				cur: '',
				new: true,
				op_allowed: false,
				open_paren: this.state.open_paren
			})
		}
		else if (i === 'Del'){
			let newCur = this.state.cur.slice(0, -1)
			this.setState({
				prev: this.state.prev,
				cur: newCur,
				new: newCur.length === 0? true : false,
				op_allowed: opAllowed(newCur),
				open_paren: this.state.open_paren
			})
		}
		else if (i === '='){
			let ans = solve(this.state.cur)
			this.setState({
				prev: ans,
				cur: ans,
				new: true,
				op_allowed: false,
				open_paren: this.state.open_paren
			})
		}
	}

	render() {
		return (
			<div className='calculator'>
				<div className='calculator-screen'>
					<Screen
						prev={this.state.prev}
						cur={this.state.cur}
						inOnClick={(i) => this.handleInputClick(i)}
						opOnClick={(i) => this.handleOperationClick(i)}
						fnOnClick={(i) => this.handleFunctionClick(i)}
					/>
				</div>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
	<Calculator />,
	document.getElementById('root')
	);


function solve(eq){
	// \d(.\d+)? matches number w/ decimal
	var expRe = /(?<base>(?:-)?\d(?:\.\d+)?)\^(?<power>(?:-)?\d(?:\.\d+)?)/
	var multRe = /(?<base>(?:-)?\d(?:\.\d+)?)(x|\/)(?<power>(?:-)?\d(?:\.\d+)?)/
	var addRe = /(?<base>(?:-)?\d(?:\.\d+)?)(\+|-)(?<power>(?:-)?\d(?:\.\d+)?)/

	let ret

	ret = expRe.exec(eq)
	while( ret != null){
	  eq = eq.replace(expRe, Math.pow(parseFloat(ret[1]), parseFloat(ret[2])))
	  ret = expRe.exec(eq)
	}

	ret = multRe.exec(eq)
	while(ret != null){
	  eq = eq.replace(multRe, ret[2] === 'x'? parseFloat(ret[1]) * parseFloat(ret[3]) : parseFloat(ret[1]) * parseFloat(ret[3]))
	  ret = multRe.exec(eq)
	}

	ret = addRe.exec(eq)
	while(ret != null){
	  eq = eq.replace(addRe, ret[2] === '+'? parseFloat(ret[1]) + parseFloat(ret[3]) : parseFloat(ret[1]) - parseFloat(ret[3]))
	  ret = addRe.exec(eq)
	}

		return String(eq);
}

function opAllowed(equation){
	var lastChar = equation.charAt(equation.length-1)
	return !(lastChar === '+' || lastChar === '-' || lastChar === 'x' || lastChar === '/' || lastChar === '^')
}

export default Calculator