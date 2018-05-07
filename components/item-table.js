import { Component } from 'react'
import Rodal from 'rodal'
import 'rodal/lib/rodal.css'

const NoDataRow = () => (
<tr>
    <td colSpan="5" className="text-center">
        Loading data.
    </td>
</tr>
)

class ItemRow extends Component {
    constructor() {
        super()
    }

    render () {
        let props = this.props
        return (
        <tr data-id={props.id}>
            <td className="text-center w-1">{props.i + 1}</td>
            <td>{props.name}</td>
            <td className="text-right">{props.stock}</td>
            <td className="text-left">{props.desc}</td>
            <td className="col-action">
                <a className="icon">
                    <i className="fe fe-edit"></i>
                </a>
                <a className="icon" onClick={this.delete.bind(this)}>
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
        await this.props.onDelete(this.props.id)
        return true
    }
}

export class ItemForm extends Component {
    constructor () {
        super()
        this.state = {
            name: '',
            desc: ''
        }
    }

    render () {
        let { title = '', visible = true, onSave = () => {} } = this.props
        let { name, desc } = this.state
        let style = !visible ? { display: 'none' } : {}
        return (
        <div className="card" style={style}>
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
            </div>
            <div className="card-body">
                <div className="form-group">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" placeholder="Name" value={name} onChange={this.createOnChangeListener('name')} />
                </div>
                <div className="form-group">
                    <label className="form-label">Desc</label>
                    <textarea type="text" className="form-control" placeholder="Desc" value={desc} onChange={this.createOnChangeListener('desc')} ></textarea>
                </div>
            </div>
            <div className="card-footer">
                <a href="#" className="btn btn-primary btn-sm float-right" onClick={this.save.bind(this)}><i className="fe fe-save"></i> Save</a>
            </div>
        </div>
        )
    }

    async save () {
        await this.props.onSave(this.state)
        this.setState({
            ...this.state,
            name: '',
            desc: ''
        })
        return true
    }

    createOnChangeListener (key) {
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
        this.state = {
            createModalVisible: false
        }
    }

    render () {
        let { data, onDelete = () => {} } = this.props
        let { createModalVisible } = this.state
        return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Items</h3>
                <div className="card-options">
                    <a href="#" className="btn btn-primary btn-sm" onClick={this.showCreateModal.bind(this)}><i className="fe fe-plus"></i></a>
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
                            {data.length ? data.map((d, i) => <ItemRow key={i} i={i} onDelete={onDelete} {...d} />) : <NoDataRow />}
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

    showCreateModal () {
        this.setState({
            ...this.state,
            createModalVisible: true
        })
    }

    hideCreateModal () {
        this.setState({
            ...this.state,
            createModalVisible: false
        })
    }
}