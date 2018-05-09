import { Nav } from './Nav'

export const Page = ({children}) => (
<div className="page">
    <div className="page-main">
		<Nav />
  		<div className="container my-5">
    		{children}
  		</div>
	</div>
</div>
)