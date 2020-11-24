import React from 'react';
import { counter } from '../../actions/index'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    onClick(num) {
        this.props.dispatch(num > 0 ? counter.INCREMENT : counter.DECREMENT);
    }
    onAsyncClick(num) {
        this.props.dispatch(num > 0 ? counter.INCREMENT_ASYNC : counter.DECREMENT_ASYNC);
    }
    render() {
        return (<div>
            <div>
                <ul>
                    <li><Link to="/">首页</Link></li>
                    <li><Link to="/about">关于</Link></li>
                    <li><Link to="/users">用户列表</Link></li>
                </ul>
            </div>
            current numer:{this.props.number}
            <br />
            <button onClick={() => { this.onClick(1) }}>点击+1</button>
            <button onClick={() => { this.onClick(-1) }}>点击-1</button>
            <br />
            <button onClick={() => { this.onAsyncClick(1) }}>异步+1</button>
            <button onClick={() => { this.onAsyncClick(-1) }}>异步-1</button>
        </div>);
    }
}
export default connect(state => ({
    number: state.number
}))(App);