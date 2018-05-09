export const NoDataRow = (props) => (
    <tr>
        <td colSpan={props.span || 1} className="text-center">
            {props.text || ''}
        </td>
    </tr>
)