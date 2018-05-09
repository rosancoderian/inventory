import { Nav } from './Nav'
import InventoryContext from '../components/InventoryContext'

export const Page = ({children}) => (
	<InventoryContext.Provider>
		<div className="page">
			<div className="page-main">
				<Nav />
				<div className="container my-5">
					{children}
				</div>
			</div>
		</div>
	</InventoryContext.Provider>
)