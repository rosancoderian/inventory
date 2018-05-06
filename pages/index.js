import { db } from '../lib/db'
import { Component } from 'react' 
import { Page } from '../components/page'
import { ItemTable } from '../components/item-table'

export default class IndexPage extends Component {
    static async getInitialProps (ctx) {
        let items = await db()
            .firestore()
            .collection('items')
            .get()
        return { 
            items: items.docs.map((doc) => doc.data()) 
        }
    }
    
    async componentDidMount () {
        
    }

    render () {
        let { items } = this.props

        return (
            <Page>
                <ItemTable items={items} />
            </Page>
        )
    }
}