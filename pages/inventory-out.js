import { db } from '../lib/db'
import { Component } from 'react' 
import { Page } from '../components/page'
import { InventoryOutTable } from '../components/inventory-out-table'

export default class InventoryOutPage extends Component {
    static async getInitialProps (ctx) {
        return {}
    }

    constructor (props) {
        super()
        this.state = {
            invOut: []
        }
    }

    componentDidMount () {
        this.initDbListener()
    }

    render () {
        let { invOut } = this.state
        return (
        <Page>
            <div className="row row-cards row-deck">
                <div className="col-12">
                    <InventoryOutTable data={invOut} />
                </div>
            </div>
        </Page>
        )
    }

    initDbListener () {
        db().collection('inventory_out').onSnapshot((snapshot) => {
            let invOut = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            this.setState({
                ...this.state,
                invOut
            })
        })
    }
}