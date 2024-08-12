import { FC, ReactNode, TableHTMLAttributes } from 'react';

interface ITableHead {
  align: TableHTMLAttributes<HTMLTableElement>['align'];
  key: string;
  label: string | ReactNode;
}

interface ITableRow {
  id: number | string;
  [key: string]: string | number | ReactNode;
}

interface TableProps {
  headers: ITableHead[];
  rows: ITableRow[];
  actions?: (itemId: string, item: { [key: string]: string | number | ReactNode }) => ReactNode;
  onClick?: (id: number) => void;
}

const Table: FC<TableProps> = ({ headers, rows, actions: Actions, onClick }) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          {headers.map((header) => (
            <th
              className="border-b border-b-[#F6F4F3] px-5 py-2.5 text-sm font-normal text-gray-500"
              scope="col"
              key={header.key}
              align={header.align}
            >
              {header.label}
            </th>
          ))}
          {Actions && (
            <th className="border-b border-b-[#F6F4F3] px-5 py-2.5 text-sm font-normal text-gray-500" scope="col" align={'right'}></th>
          )}
        </tr>
      </thead>
      <tbody className="[&>tr:not(:last-child)>th]:border-b [&>tr>th]:border-b-[#F6F4F3]">
        {rows.map((item) => (
          <tr key={item.id.toString()} className="cursor-pointer hover:bg-[#F5F8FF]" onClick={() => onClick && onClick(Number(item.id))}>
            {headers.map((header) => (
              <th className="p-5 text-sm font-normal" key={header.key + item.id} align={header.align}>
                {item[header.key as any]}
              </th>
            ))}
            {Actions && (
              <th onClick={(e) => e.stopPropagation()} className="px-5 text-sm font-normal" align="right">
                {Actions(item.id.toString(), item)}
              </th>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
