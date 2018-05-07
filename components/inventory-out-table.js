const NoDataRow = () => (
<tr>
    <td colSpan="6" className="text-center">
        Data not found.
    </td>
</tr>
)

const ItemRow = (props) => (
<tr>
    <td className="text-center w-1">{props.i + 1}</td>
    {/* <td>{props.date.toDate().toDateString()}</td> */}
    <td className="text-right">{props.quantity}</td>
    <td className="text-right">Rp. {props.unit_cost || 0} ,-</td>
    <td className="text-right">Rp. {props.total_cost || 0} ,-</td>
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

export const InventoryOutTable = ({ data = [] }) => (
<div className="card">
    <div className="card-header">
        <h3 className="card-title">Inventory Out</h3>
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
                        {/* <th>Date</th> */}
                        <th className="text-right">Quantity</th>
                        <th className="text-right">Unit Cost</th>
                        <th className="text-right">Total Cost</th>
                        <th className="w-1"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.length ? data.map((d, i) => <ItemRow key={i} i={i} {...d} />) : <NoDataRow />}
                </tbody>
            </table>
        </div>
    </div>
    <style jsx>{`
    table {
        background-color: #fff !important;
    }
    `}</style>
</div>
)