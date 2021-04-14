import React, { Component } from 'react'
import TableDialog from './TableDialog'

export default class Test extends Component {
    constructor(props){
        super(props)
        this.child = React.createRef();
    }

    onClick = () => {
        this.child.current.handleClickOpen();
    }

    render() {
        return (
            <div>
                <TableDialog ref={this.child}/>
                <button onClick={this.onClick}>Click</button>
            </div>
        )
    }
}
