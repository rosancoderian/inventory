import Link from 'next/link'

export const Nav = () => (
  <div className="header d-lg-flex p-0 collapse" id="headerMenuCollapse">
    <div className="container">
        <div className="row align-items-center">
            <div className="col-lg order-lg-first">
                <ul className="nav nav-tabs border-0 flex-column flex-lg-row">
                    <li className="nav-item">
                        <Link href="/" prefetch>
                            <a className="nav-link">
                                <i className="fe fe-package" /> Items
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/inventory-in" prefetch>
                            <a href="" className="nav-link">
                                <i className="fe fe-download" /> Inventory In
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/inventory-out" prefetch>
                            <a href="" className="nav-link">
                                <i className="fe fe-upload" /> Inventory Out
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  </div>
);
