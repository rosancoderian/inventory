import { db } from '../lib/db'
import { Component } from 'react' 
import { Page } from '../components/page'
import { InventoryInTable, Form } from '../components/inventory-in-table'
import { Info } from '../components/info'

export default class InventoryInPage extends Component {
    static async getInitialProps (ctx) {
        return {}
    }

    constructor (props) {
        super()
        this.showAddForm = this.showAddForm.bind(this)
        this.showEditForm = this.showEditForm.bind(this)
        this.add = this.add.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
        this.state = {
            formData: {
                id: '',
                item_id: '',
                name: '',
                desc: ''
            },
            invIn: [],
            items: [],
            itemsRef: {},
            addFormVisible: true
        }
    }

    componentDidMount () {
        this.listenDb()
    }

    render () {
        let { invIn, items, itemsRef, formData, addFormVisible } = this.state
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
                            <InventoryInTable data={invIn} itemsRef={itemsRef} onAdd={this.showAddForm} onEdit={this.showEditForm} onDelete={this.delete} />
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="row">
                        <div className="col-12">
                            <Form title="Add Item" visible={addFormVisible} onSave={this.add} items={items} />
                            <Form title="Update Item" visible={!addFormVisible} {...formData} onSave={this.update} items={items} />
                        </div>
                    </div>
                </div>
            </div>
        </Page>
        )
    }

    async add (data) {
        if (!data.item_id) return
        return db().collection('inventory_in').add({
            item_id: data.item_id,
            quantity: data.quantity * 1,
            total_cost: data.total_cost * 1
        })
    }

    async update (data) {
        if (!data.id) return
        return db().collection('inventory_in').doc(data.id).set({
            item_id: data.item_id,
            quantity: data.quantity * 1,
            total_cost: data.total_cost * 1
        })
    }

    async delete (data) {
        if (!data.id) return
        return db().collection('inventory_in').doc(data.id).delete()
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

    listenDb () {
        db().collection('inventory_in').onSnapshot((snapshot) => {
            let invIn = snapshot.docs.map(doc => {
                let data = doc.data()
                return {
                    id: doc.id,
                    ...data,
                    unit_cost: data.total_cost / data.quantity
                }
            })
            this.setState({
                ...this.state,
                invIn
            })
        })
        db().collection('items').onSnapshot((snapshot) => {
            let items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            let itemsRef = items.reduce((itemsRef, item) => {
                itemsRef[item.id] = item
                return itemsRef
            }, {})
            this.setState({
                ...this.state,
                items,
                itemsRef
            })
        })
    }
}