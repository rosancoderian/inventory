import { Component, Fragment } from 'react'
import { db } from '../lib/db'

export class Info extends Component {
    constructor () {
        super()
        this.state = {
            invIn: [],
            invOut: [],
            totalItems: 0,
            totalCost: 0,
            totalIncome: 0,
            totalProfit: 0
        }
    }

    componentDidMount () {
        this.listenDb()
    }

    render () {
        return (
        <div className="row">
            <div className="col-3">
                <div class="card">
                    <div class="card-body p-3 text-center">
                        <div class="h1 m-0">{this.state.totalItems}</div>
                        <div class="text-muted mb-4">Total Items</div>
                    </div>
                </div>
            </div>
            <div className="col-3">
                <div class="card">
                    <div class="card-body p-3 text-center">
                        <div class="h1 m-0">{this.state.totalCost}</div>
                        <div class="text-muted mb-4">Total Cost</div>
                    </div>
                </div>
            </div>
            <div className="col-3">
                <div class="card">
                    <div class="card-body p-3 text-center">
                        <div class="h1 m-0">{this.state.totalIncome}</div>
                        <div class="text-muted mb-4">Total Income</div>
                    </div>
                </div>
            </div>
            <div className="col-3">
                <div class="card">
                    <div class="card-body p-3 text-center">
                        <div class="h1 m-0">{this.state.totalProfit}</div>
                        <div class="text-muted mb-4">Total Profit</div>
                    </div>
                </div>
            </div>
        </div>
        )
    }

    listenDb () {
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
                }, {
                    totalIncome: 0,
                    totalProfit: 0
                })
            })
        })
    }
}