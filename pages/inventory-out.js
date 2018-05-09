import { db } from '../lib/db'
import { Component } from 'react' 
import { Page } from '../components/Page'
import { InventoryOutTable, Form } from '../components/InventoryOutTable'
import { Info } from '../components/Info'
import InventoryContext from '../components/InventoryContext'

export default class InventoryOutPage extends Component {
    state = {
        addFormVisible: true,
        formData: {
            id: '',
            item_id: '',
            quantity: 0,
            total_income: 0,
        }
    }

    constructor (props) {
        super()
        this.showAddForm = this.showAddForm.bind(this)
        this.showEditForm = this.showEditForm.bind(this)
        this.add = this.add.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
    }

    render () {
        return (
        <Page>
            <div className="row row-cards">
                <div className="col-12">
                    <Info />
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <div className="row">
                        <div className="col-12">
                            <InventoryOutTable onAdd={this.showAddForm} onEdit={this.showEditForm} onDelete={this.delete} />
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="row">
                        <div className="col-12">
                            <Form title="Add Item" visible={this.state.addFormVisible} onSave={this.add} />
                            <Form title="Update Item" visible={!this.state.addFormVisible} {...this.state.formData} onSave={this.update} />
                        </div>
                    </div>
                </div>
            </div>
        </Page>
        )
    }

    async add (data) {
        if (!data.item_id) return
        return db().collection('inventory_out').add({
            item_id: data.item_id,
            quantity: data.quantity * 1,
            total_income: data.total_income * 1
        })
    }

    async update (data) {
        if (!data.id) return
        return db().collection('inventory_out').doc(data.id).set({
            item_id: data.item_id,
            quantity: data.quantity * 1,
            total_income: data.total_income * 1
        })
    }

    async delete (data) {
        if (!data.id) return
        return db().collection('inventory_out').doc(data.id).delete()
    }

    showAddForm () {
        this.setState({
            ...this.state,
            addFormVisible: true
        })
    }

    showEditForm (data) {
        this.setState({
            ...this.state,
            addFormVisible: false,
            formData: data
        })
    }
}