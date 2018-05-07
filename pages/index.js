import { db } from '../lib/db'
import { Component } from 'react' 
import { Page } from '../components/page'
import { ItemTable } from '../components/item-table'

export default class IndexPage extends Component {
    static async getInitialProps (ctx) {
        return {}
    }

    constructor (props) {
        super()
        this.state = {
            items: [],
        }
    }

    componentDidMount () {
        this.initDbListener()
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