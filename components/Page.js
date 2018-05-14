import { Nav } from './Nav'
import InventoryContext from '../components/InventoryContext'
import NProgress from 'nprogress'
import Router from 'next/router'

Router.onRouteChangeStart = (url) => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

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