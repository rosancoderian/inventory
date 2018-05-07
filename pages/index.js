import { db } from '../lib/db'
import { Component } from 'react' 
import { Page } from '../components/page'
import { ItemTable, ItemForm } from '../components/item-table'

export default class IndexPage extends Component {
    static async getInitialProps (ctx) {
        return {}
    }

    constructor (props) {
        super()
        this.showAddItemForm = this.showAddItemForm.bind(this)
        this.showEditItemForm = this.showEditItemForm.bind(this)
        this.addItem = this.addItem.bind(this)
        this.updateItem = this.updateItem.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.state = {
            item: {
                id: '',
                name: '',
                desc: ''
            },
            items: [],
            addItemFormVisible: true
        }
    }

    componentDidMount () {
        this.listenDb()
    }

    render () {
        let { items, addItemFormVisible, item } = this.state
        return (
        <Page>
            <div className="row">
                <div className="col-8">
                    <div className="row">
                        <div className="col-12">
                            <ItemTable data={items} onAdd={this.showAddItemForm} onEdit={this.showEditItemForm} onDelete={this.deleteItem} />
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="row">
                        <div className="col-12">
                            <ItemForm title="Add Item" visible={addItemFormVisible} onSave={this.addItem} />
                            <ItemForm title="Update Item" visible={!addItemFormVisible} id={item.id} name={item.name} desc={item.desc} onSave={this.updateItem} />
                        </div>
                    </div>
                </div>
            </div>
        </Page>
        )
    }

    async addItem ({ name, desc }) {
        return db.collection('items').add({
            name,
            desc
        })
    }

    async updateItem (item) {
        if (!item.id) return
        return db.collection('items').doc(item.id).set({
            name: item.name,
            desc: item.desc
        })
    }

    async deleteItem (id) {
        return db.collection('items').doc(id).delete()
    }

    showAddItemForm () {
        this.setState({
            ...this.state,
            addItemFormVisible: true
        })
    }

    showEditItemForm (item) {
        this.setState({
            ...this.state,
            addItemFormVisible: false,
            item: {
                ...item
            }
        })
    }

    listenDb () {
        db.collection('items').onSnapshot((snapshot) => {
            let items = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            this.setState({
                ...this.state,
                items
            })
        })
    }
}