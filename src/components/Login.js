import React, {Component} from 'react';
import {Panel, FormControl, Button} from 'react-bootstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: ''
        }
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    render() {
        return (
            <div>
                <Panel>
                    <FormControl 
                        type="password" 
                        placeholder="패스워드를 입력하세요." 
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        style={{width:"200px", display:"inline", marginRight:"4px"}}
                    />
                    <Button 
                        type="button"
                        onClick={() => this.props.onSignIn(this.state.password)}
                    >
                        Sign in
                    </Button>
                </Panel>
            </div>
        );
    }
}

export default Login;