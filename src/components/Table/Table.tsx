import { Align, CustomData, Primitive, ReportData } from "../../types";
import './Table.scss';

type Props = {
  data: ReportData;
}

const getData = (data: Primitive | CustomData) => {
  // null is 'object'-ish; don't check for array though
  const isObject = typeof data === 'object' && data;

  return String(isObject ? data.d : data);
}

const ALIGNS = {
  'string': Align.LEFT,
  'float': Align.RIGHT,
  'int': Align.RIGHT,
  'boolean': Align.CENTER,
}

const Table = ({ data: { header, data: tableData} }: Props) => {
  const getAlign = (index: number): Align => {
    const { align, type } = header[index];
    return align ?? ALIGNS[type] ?? Align.LEFT;
  }

  return (
    <table>
      <thead>
        <tr>
          {header.map(({caption}, i) => (<td key={i} align="center">{caption}</td>))}
        </tr>
      </thead>
      <tbody>
        {/** wouldn't do this in prod, but for the test-task it's ok, I guess  */}
        {[...tableData, ...tableData].map((row, i) => (
          <tr key={i}>
            {row.map((col, index) => (
              <td key={index} align={getAlign(index)}>
                {getData(col)}
              </td>))
            }
          </tr>))
        }
      </tbody>
    </table>
  )
}

export default Table;