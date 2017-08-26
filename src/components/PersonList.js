import React from 'react';
import PersonItem from './PersonItem';
import {Table} from 'react-bootstrap';

const PersonList = ({person_list, onDeletePerson, onPersonClick}) => {
    return (
        <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>이름</th>
                    <th>그룹</th>
                    <th>연락처</th>
                    <th>포인트</th>
                    <th>이번달 참여횟수</th>
                    <th>이번달 당첨횟수</th>
                    <th>삭제</th>
                </tr>
            </thead>
            <tbody>
                {person_list.map((person, i) => {
                    return(
                        <PersonItem
                            key={i}
                            idx={person.idx}
                            person={person}
                            onDeletePerson={onDeletePerson}
                            onPersonClick={onPersonClick}
                        />
                    ); 
                })}
            </tbody>
        </Table>
    );
};

export default PersonList;