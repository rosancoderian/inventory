const NoDataRow = () => (
<tr>
    <td colSpan="5" className="text-center">
        Data not found.
    </td>
</tr>
)

const ItemRow = (props) => (
<tr>
    <td className="text-center w-1">{props.index + 1}</td>
    <td>{props.name}</td>
    <td className="text-right">{props.stock}</td>
    <td className="text-right">Rp. {props.buy_price} ,-</td>
    <td className="text-right">Rp. {props.sell_price} ,-</td>
    <td className="col-action">
        <a href="#" className="icon">
            <i className="fe fe-edit"></i>
        </a>
        <a href="#" className="icon">
            <i className="fe fe-trash"></i>
        </a>
    </td>
    <style jsx>{`
    .col-action a {
        margin: 0px 5px;
    }
    `}</style>
</tr>
)

export const ItemTable = ({ items = [] }) => (
<div className="row row-cards row-deck">
    <div className="col-12">
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Items</h3>
                <div className="card-options">
                    <a href="#" className="btn btn-primary btn-sm"><i className="fe fe-plus"></i></a>
                </div>
            </div>
            <div className="table-responsive">
                <div className="table table-hover table-outline table-vcenter text-nowrap card-table">
                    <table className="table table-hover table-outline table-vcenter text-nowrap card-table">
                        <thead>
                            <tr>
                                <th className="text-center w-1">#</th>
                                <th>Name</th>
                                <th className="text-right">Stock</th>
                                <th className="text-right">Buy Price</th>
                                <th className="text-right">Sell Price</th>
                                <th className="w-1"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length ? items.map((item, index) => <ItemRow {...{index, ...item}} />) : <NoDataRow />}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <style jsx>{`
    table {
        background-color: #fff !important;
    }
    `}</style>
</div>
)