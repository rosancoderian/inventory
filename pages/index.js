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
        this.state = {
            items: [],
            addItemFormVisible: true
        }
    }

    componentDidMount () {
        this.initDbListener()
    }

    render () {
        let { items, addItemFormVisible } = this.state
        return (
        <Page>
            <div className="row">
                <div className="col-8">
                    <div className="row">
                        <div className="col-12">
                            <ItemTable data={items} onEdit={''} onDelete={this.deleteItem.bind(this)} />
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="row">
                        <div className="col-12">
                            <ItemForm title="Add Item" visible={addItemFormVisible} onSave={this.addItem.bind(this)} />
                            <ItemForm title="Update Item" visible={!addItemFormVisible} />
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

    async deleteItem (id) {
        return db.collection('items').doc(id).delete()
    }

    initDbListener () {
        db.collection('items').onSnapshot((snapshot) => {
            let items = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            this.setState({
                ...this.state,
                items
            })
        })
    }
}