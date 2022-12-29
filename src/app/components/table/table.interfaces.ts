export interface ITableData {
  limit: number,
  offset: number,
  total: number,
  result: Record<string, string>[],
}

export interface IColumn {
  id: string,
  name: string,
  editable: boolean,
}

export interface IRow {
  id: string,
  cells: ICell[],
  selected: boolean,
}

export interface ICell {
  columnId: string,
  value: string,
  editable: boolean,
}