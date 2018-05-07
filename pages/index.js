import { db } from '../lib/db'
import { Component } from 'react' 
import { Page } from '../components/page'
import { ItemTable } from '../components/item-table'
import { InventoryInTable } from '../components/inventory-in-table'
import { InventoryOutTable } from '../components/inventory-out-table'

export default class IndexPage extends Component {
    static async getInitialProps (ctx) {
        let items = await db.collection('items').get()
        let invIn = await db.collection('inventory_in').get()
        let invOut = await db.collection('inventory_out').get()
        return { 
            items: items.docs.map((doc) => doc.data()),
            invIn: invIn.docs.map((doc) => doc.data()),
            invOut: invOut.docs.map((doc) => doc.data())
        }
    }

    constructor (props) {
        super()
        this.initDbListener()
        this.state = {
            items: props.items,
            invIn: props.invIn,
            invOut: props.invOut
        }
    }

    render () {
        let { items, invIn, invOut } = this.state
        return (
        <Page>
            <div className="row row-cards row-deck">
                <div className="col-12">
                    <InventoryOutTable data={invOut} />
                </div>
            </div>
            <div className="row row-cards row-deck">
                <div className="col-12">
                    <InventoryInTable data={invIn} />
                </div>
            </div>
            <div className="row row-cards row-deck">
                <div className="col-12">
                    <ItemTable data={items} />
                </div>
            </div>
        </Page>
        )
    }

    initDbListener () {
        db.collection('items').onSnapshot((snapshot) => {
            let items = snapshot.docs.map(doc => doc.data())
            this.setState({
                ...this.state,
                items
            })
        })
        db.collection('inventory_in').onSnapshot((snapshot) => {
            let invIn = snapshot.docs.map(doc => doc.data())
            this.setState({
                ...this.state,
                invIn
            })
        })
        db.collection('inventory_out').onSnapshot((snapshot) => {
            let invOut = snapshot.docs.map(doc => doc.data())
            this.setState({
                ...this.state,
                invOut
            })
        })
    }
}