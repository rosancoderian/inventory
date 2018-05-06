import { Page } from '../components/page'
import { ItemTable } from '../components/item-table'

export default () => (
<Page>
    <ItemTable items={[{name: 'Jeruk', stock: 100, buy_price: 100, sell_price: 150}]} />
</Page>
)