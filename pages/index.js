import { db } from '../lib/db'
import { Component } from 'react' 
import { Page } from '../components/page'
import { ItemTable } from '../components/item-table'
import { InventoryInTable } from '../components/inventory-in-table'

export default class IndexPage extends Component {
    static async getInitialProps (ctx) {
        let items = await db.collection('items').get()
        return { 
            items: items.docs.map((doc) => doc.data()) 
        }
    }

    constructor (props) {
        super()
        this.state = {
            items: props.items
        }
    }
    
    async componentDidMount () {
        this.initDbListener()
    }

    render () {
        let { items } = this.state
        return (
            <Page>
                <div className="row row-cards row-deck">
                    <div className="col-6">
                        <InventoryInTable data={items} />
                    </div>
                    <div className="col-6">
                        <ItemTable data={items} />
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
    }
}