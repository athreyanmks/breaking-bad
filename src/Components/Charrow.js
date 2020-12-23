import React from 'react'

function Charrow(props) {
    return (
        <tr onClick = {() => props.profilerend(props.var.name) }>
            <td>{props.var.name}</td>
            <td className="col-sm-6">{props.var.occupation}</td>
            <td className="col-sm-2">{props.var.birthday}</td>
            <td className="col-sm-2">{props.var.status}</td>
        </tr>
    )
}

export default Charrow;
