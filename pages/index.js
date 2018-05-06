import { db } from '../lib/db'
import { Component } from 'react' 
import { Page } from '../components/page'
import { ItemTable } from '../components/item-table'

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
                <ItemTable items={items} />
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