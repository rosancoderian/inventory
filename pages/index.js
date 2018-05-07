import { db } from '../lib/db'
import { Component } from 'react' 
import { Page } from '../components/page'
import { ItemTable } from '../components/item-table'

export default class IndexPage extends Component {
    static async getInitialProps (ctx) {
        let items = await db.collection('items').get()
        return { 
            items: items.docs.map((doc) => ({...doc.data(), id: doc.id}))
        }
    }

    constructor (props) {
        super()
        this.initDbListener()
        this.state = {
            items: props.items,
        }
    }

    render () {
        let { items } = this.state
        return (
        <Page>
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