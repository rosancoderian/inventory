import { Component } from 'react'
import { NoDataRow } from './commons'

class Row extends Component {
    constructor() {
        super()
        this.delete = this.delete.bind(this)
        this.edit = this.edit.bind(this)
    }

    render () {
        return (
        <tr data-id={this.props.id}>
            <td className="text-center w-1">{this.props.i + 1}</td>
            <td>{this.props.name}</td>
            <td className="text-right">{this.props.stock || 0}</td>
            <td className="text-left">{this.props.desc}</td>
            <td className="col-action">
                <a className="icon">
                    <i className="fe fe-edit" onClick={this.edit}></i>
                </a>
                <a className="icon" onClick={this.delete}>
                    <i className="fe fe-trash"></i>
                </a>
            </td>
            <style jsx>{`
            .col-action a {
                margin: 0px 5px;
            }
            `}</style>
        </tr>
        )
    }

    async delete () {
        this.props.onDelete(this.props)
    }

    async edit () {
        this.props.onEdit(this.props)
    }
}

export class Form extends Component {
    constructor ({ id = '', name = '', desc = '' }) {
        super()
        this.save = this.save.bind(this)
        this.clear = this.clear.bind(this)
        let defaultData = {
            id,
            name,
            desc
        }
        this.state = {
            ...defaultData,
            defaultData
        }
    }

    componentWillReceiveProps(props) {
        if (props.id !== this.props.id) {
            let defaultData = {
                id: props.id,
                name: props.name,
                desc: props.desc
            }
            this.setState({
                ...this.state,
                ...defaultData,
                defaultData
            })
        }
    }

    render () {
        let { title = '', visible = true, onSave } = this.props
        let { id, name, desc } = this.state
        let style = !visible ? { display: 'none' } : {}
        return (
        <div className="card" style={style}>
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
            </div>
            <div className="card-body">
                {id ? <div className="form-group">
                    <label className="form-label">id: {id}</label>
                </div>: ''}
                <div className="form-group">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" placeholder="Name" value={name} onChange={this.listenOnChange('name')} />
                </div>
                <div className="form-group">
                    <label className="form-label">Desc</label>
                    <textarea type="text" className="form-control" placeholder="Desc" value={desc} onChange={this.listenOnChange('desc')} ></textarea>
                </div>
            </div>
            <div className="card-footer">
                <a href="#" className="btn btn-default btn-sm" onClick={this.clear}><i className="fe fe-x"></i> Clear</a>
                <a href="#" className="btn btn-info btn-sm float-right" onClick={this.save}><i className="fe fe-save"></i> Save</a>
            </div>
        </div>
        )
    }

    async save () {
        this.props.onSave(this.state)
    }

    clear () {
        this.setState({
            ...this.state,
            ...this.state.defaultData
        })
    }

    listenOnChange (key) {
        return (ev) => {
            this.setState({
                [key]: ev.target.value
            })
        }
    }
}

export class ItemTable extends Component {
    constructor () {
        super()
    }

    render () {
        let { data, stockIn, stockOut, onDelete, onEdit, onAdd } = this.props
        return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Items</h3>
                <div className="card-options">
                    <a href="#" className="btn btn-primary btn-sm" onClick={onAdd}><i className="fe fe-plus"></i></a>
                </div>
            </div>
            <div className="table-responsive">
                <div className="table table-hover table-outline table-vcenter text-nowrap card-table">
                    <table className="table table-hover table-outline table-vcenter text-nowrap card-table">
                        <thead>
                            <tr>
                                <th className="text-center w-1">#</th>
                                <th>Name</th>
                                <th className="text-right">Stock</th>
                                <th className="text-left">Desc</th>
                                <th className="w-1"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length ? data.map((d, i) => <Row key={i} i={i} onDelete={onDelete} onEdit={onEdit} {...d} stock={(stockIn[d.id] - stockOut[d.id])} />) : <NoDataRow span="5" text="Loading." />}
                        </tbody>
                    </table>
                </div>
            </div>
            <style jsx>{`
            table {
                background-color: #fff !important;
            }
            `}</style>
        </div>
        )
    }
}