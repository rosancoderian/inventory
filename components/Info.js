import { Component, Fragment } from 'react'
import InventoryContext from '../components/InventoryContext'

export class Info extends Component {
    constructor () {
        super()
    }

    render () {
        return (
        <div className="row">
            <div className="col-3">
                <div className="card">
                    <div className="card-body p-3 text-center">
                        <div className="h1 m-0">
                            <InventoryContext.Consumer>
                                {({ state }) => state.totalItems}
                            </InventoryContext.Consumer>
                        </div>
                        <div className="text-muted mb-4">Total Items</div>
                    </div>
                </div>
            </div>
            <div className="col-3">
                <div className="card">
                    <div className="card-body p-3 text-center">
                        <div className="h1 m-0">
                            <InventoryContext.Consumer>
                                {({ state }) => state.totalCost}
                            </InventoryContext.Consumer>
                        </div>
                        <div className="text-muted mb-4">Total Cost</div>
                    </div>
                </div>
            </div>
            <div className="col-3">
                <div className="card">
                    <div className="card-body p-3 text-center">
                        <div className="h1 m-0">
                            <InventoryContext.Consumer>
                                {({ state }) => state.totalIncome}
                            </InventoryContext.Consumer>
                        </div>
                        <div className="text-muted mb-4">Total Income</div>
                    </div>
                </div>
            </div>
            <div className="col-3">
                <div className="card">
                    <div className="card-body p-3 text-center">
                        <div className="h1 m-0">
                            <InventoryContext.Consumer>
                                {({ state }) => state.totalProfit}
                            </InventoryContext.Consumer>
                        </div>
                        <div className="text-muted mb-4">Total Profit</div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}