import { Component } from 'react'

const NoDataRow = () => (
<tr>
    <td colSpan="6" className="text-center">
        Loading data.
    </td>
</tr>
)

class Row extends Component {
    constructor() {
        super()
        this.delete = this.delete.bind(this)
        this.edit = this.edit.bind(this)
    }

    componentWillReceiveProps (props) {

    }

    render () {
        return (
        <tr data-id={this.props.id}>
            <td className="text-center w-1">{this.props.i + 1}</td>
            <td>{this.props.item ? this.props.item.name : ''}</td>
            <td className="text-right">Rp. {this.props.unit_cost.toFixed(2) || 0}</td>
            <td className="text-right">{this.props.quantity || 0}</td>
            <td className="text-right">Rp. {this.props.total_cost || 0}</td>
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
    constructor ({ id = '', item_id = '', quantity = 0, total_cost = 0, items = [] }) {
        super()
        this.save = this.save.bind(this)
        this.clear = this.clear.bind(this)
        let defaultData = {
            id,
            item_id,
            quantity,
            total_cost,
            items,
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
                item_id: props.item_id,
                quantity: props.quantity,
                total_cost: props.total_cost,
                items: props.items,
            }
            this.setState({
                ...this.state,
                ...defaultData,
                defaultData
            })
        }
    }

    render () {
        let { title = '', visible = true, onSave, items = [] } = this.props
        let { id, item_id, quantity, total_cost } = this.state
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
                    <label className="form-label">Inventory In</label>
                    <select onChange={this.listenOnChange('item_id')} value={item_id}>
                        <option value={null}>Select Item</option>
                        {items.length ? items.map((item, i) => <option key={i} value={item.id}>{item.name}</option>) : ''}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Quantity</label>
                    <input type="number" className="form-control" placeholder="Quantity" value={quantity} onChange={this.listenOnChange('quantity')} />
                </div>
                <div className="form-group">
                    <label className="form-label">Total Cost</label>
                    <input type="number" className="form-control" placeholder="Total Cost" value={total_cost} onChange={this.listenOnChange('total_cost')} />
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

export class InventoryInTable extends Component {
    constructor () {
        super()
    }

    render () {
        let { data, itemsRef, onDelete, onEdit, onAdd } = this.props
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
                                <th>Item</th>
                                <th className="text-right">Unit Cost</th>
                                <th className="text-right">Quantity</th>
                                <th className="text-right">Total Cost</th>
                                <th className="w-1"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length ? data.map((d, i) => <Row key={i} i={i} onDelete={onDelete} onEdit={onEdit} {...d} item={itemsRef[d.item_id]} />) : <NoDataRow />}
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