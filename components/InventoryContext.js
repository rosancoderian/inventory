import { Component, createContext } from 'react'
import { db } from '../lib/db'

const Context = createContext()

export class Provider extends Component {
    state = {
        items: [],
        invIn: [],
        invOut: [],
        itemRefs: {},
        stockRefs: {},
    }

    constructor () {
        super()
    }

    componentDidMount () {
        this.listenDb()
    }

    render () {
        return (
        <Context.Provider value={{ state: this.state }}>
            {this.props.children}
        </Context.Provider>
        )
    }

    listenDb () {
        db().collection('items').onSnapshot((snapshot) => {
            let items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            let itemRefs = items.reduce((itemRefs, item) => {
                itemRefs[item.id] = item
                return itemRefs
            }, {})
            this.setState({
                ...this.state,
                items,
                itemRefs
            })
        })
        db().collection('inventory_in').onSnapshot((snapshot) => {
            let invIn = snapshot.docs.map(doc => {
                let data = doc.data()
                return {
                    id: doc.id,
                    ...data,
                    unit_cost: data.total_cost / data.quantity
                }
            })
            this.setState({
                ...this.state,
                invIn,
                ...invIn.reduce((result, data) => {
                    result.totalItems += data.quantity
                    result.totalCost += data.total_cost
                    result.totalProfit = this.state.totalIncome - result.totalCost
                    return result
                }, {
                    totalItems: 0,
                    totalCost: 0,
                    totalProfit: 0
                }),
                stockRefs: invIn.reduce((stocks, inv) => {
                    if (typeof stocks[inv.item_id] == 'undefined') {
                        stocks[inv.item_id] = 0
                    }
                    stocks[inv.item_id] += inv.quantity
                    return stocks
                }, {})
            })
        })
        db().collection('inventory_out').onSnapshot((snapshot) => {
            let invOut = snapshot.docs.map(doc => {
                let data = doc.data()
                return {
                    id: doc.id,
                    ...data,
                    unit_income: data.total_income / data.quantity
                }
            })
            this.setState({
                ...this.state,
                invOut,
                ...invOut.reduce((result, data) => {
                    result.totalIncome += data.total_income
                    result.totalProfit = result.totalIncome - this.state.totalCost
                    return result
                }, {totalIncome: 0, totalProfit: 0 })
            })
        })
    }
}

export default {
    Provider,
    Consumer: Context.Consumer
}