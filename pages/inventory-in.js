import { db } from '../lib/db'
import { Component } from 'react' 
import { Page } from '../components/page'
import { InventoryInTable } from '../components/inventory-in-table'

export default class InventoryInPage extends Component {
    static async getInitialProps (ctx) {
        let invIn = await db.collection('inventory_in').get()
        return { 
            invIn: invIn.docs.map((doc) => ({...doc.data(), id: doc.id})),
        }
    }

    constructor (props) {
        super()
        this.initDbListener()
        this.state = {
            invIn: props.invIn,
        }
    }

    render () {
        let { invIn } = this.state
        return (
        <Page>
            <div className="row row-cards row-deck">
                <div className="col-12">
                    <InventoryInTable data={invIn} />
                </div>
            </div>
        </Page>
        )
    }

    initDbListener () {
        db.collection('inventory_in').onSnapshot((snapshot) => {
            let invIn = snapshot.docs.map(doc => doc.data())
            this.setState({
                ...this.state,
                invIn
            })
        })
    }
}