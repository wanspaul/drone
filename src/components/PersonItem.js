import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';

const getGroupName = (group) => {
    switch(group) {
        case 'g': return '군';
        case 'k': return '기';
        case 'y': return '요';
        case 'b': return '법';
        default: return '-';
    }
}

const PersonItem = ({person, idx, onDeletePerson, onPersonClick}) => {
    return (
        <tr>
            <td>
                <Button 
                    bsStyle="link"
                    bsSize="xsmall"
                    onClick={() => {onPersonClick(person._id)}}
                >
                    {person.name}
                </Button>
            </td>
            <td>{getGroupName(person.group)}</td>
            <td>{person.phone}</td>
            <td>{person.point}</td>
            <td>{person.attendance_count}</td>
            <td>{person.win_prize_count}</td>
            <td>
                <Button 
                    type="button"
                    bsSize="xsmall"
                    bsStyle="danger"
                    onClick={
                        () => {
                            if(!window.confirm("정말 삭제하시겠습니까?")) return false;
                            onDeletePerson(person._id, idx);
                        }
                    }
                >
                    삭제
                </Button>
            </td>
        </tr>
    );
};

PersonItem.propTyoes = {
    onDeletePerson: PropTypes.func
}

PersonItem.defaultProps = {
    onDeletePerson: () => console.log('onDeletePerson not defined.')
}

export default PersonItem;