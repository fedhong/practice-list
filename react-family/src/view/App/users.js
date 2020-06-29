import React from 'react';
import { Link } from 'react-router-dom';

class About extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <div>
                <ul>
                    <li><Link to="/">首页</Link></li>
                    <li><Link to="about">关于</Link></li>
                    <li><Link to="users">用户列表</Link></li>
                </ul>
            </div>
            用户列表
        </div>);
    }
}

export default About;