import { db } from '../lib/db'
import { Component } from 'react' 
import { Page } from '../components/Page'
import { ItemTable, Form } from '../components/ItemTable'
import { Info } from '../components/Info'
import InventoryContext from '../components/InventoryContext'

export default class IndexPage extends Component {
    state = {
        formData: {
            id: '',
            name: '',
            desc: ''
        },
        addFormVisible: true
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
        let { addFormVisible, formData } = this.state
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
                            <InventoryContext.Consumer>
                                {({ state }) => (
                                    <ItemTable data={state.items} stockIn={state.stockRefs} stockOut={state.stockOutRefs} onAdd={this.showAddForm} onEdit={this.showEditForm} onDelete={this.delete} />
                                )}
                            </InventoryContext.Consumer>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="row">
                        <div className="col-12">
                            <Form title="Add Item" visible={addFormVisible} onSave={this.add} />
                            <Form title="Update Item" visible={!addFormVisible} {...formData} onSave={this.update} />
                        </div>
                    </div>
                </div>
            </div>
        </Page>
        )
    }

    async add (data) {
        return db().collection('items').add({
            name: data.name,
            desc: data.desc
        })
    }

    async update (data) {
        if (!data.id) return
        return db().collection('items').doc(data.id).set({
            name: data.name,
            desc: data.desc
        })
    }

    async delete (data) {
        return db().collection('items').doc(data.id).delete()
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