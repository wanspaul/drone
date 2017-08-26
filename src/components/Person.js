import React, {Component} from 'react';
import RegisterPerson from './RegisterPerson';
import PersonList from './PersonList';
import {Panel, Button, FormControl} from 'react-bootstrap';

class Person extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
        this.onSearchPerson = this.onSearchPerson.bind(this);
    }

    onSearchPerson(e) {
        this.setState({
            keyword: e.target.value
        });
    }

    render() {
        return (
            <div>
                <RegisterPerson 
                    input_person={this.props.input_person}
                    onChangeInputPerson={this.props.onChangeInputPerson}
                    onChangePersonGroup={this.props.onChangePersonGroup}
                    onClickSave={this.props.onClickSave}
                />
                <p style={{display:"block", overflow:"hidden"}}>
                    <div className="pull-left">
                        <FormControl 
                            type="text" 
                            placeholder="이름을 검색하세요." 
                            value={this.state.keyword}
                            onChange={this.onSearchPerson}
                        />
                    </div>
                    <Button
                        onClick={this.props.onPersonInitCount}
                        className="pull-right"
                    >
                        당첨/참여횟수 초기화
                    </Button>
                </p>
                <PersonList 
                    person_list={
                        this.props.person_list.filter(
                            p => p.name.indexOf(this.state.keyword) !== -1
                        ).map((person, i) => {return person})
                    }
                    onDeletePerson={this.props.onDeletePerson}
                    onPersonClick={this.props.onPersonClick}
                />
            </div>
        );
    }
}

export default Person;
