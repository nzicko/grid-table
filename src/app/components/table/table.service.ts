import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ENDPOINTS, HTTP_METHOD } from 'src/app/backend/backend.config';
import { ICell, IColumn, IRow, ITableData } from './table.interfaces';

@Injectable()
export class TableService {
  constructor(private httpClient: HttpClient) {}

  getTableData = () => {
    return this.httpClient
      .get(ENDPOINTS.DATA)
      .pipe(catchError(this.handleError));
  };

  updateTableData = (data: Record<string, string>[]) => {
    return this.httpClient
      .post(ENDPOINTS.DATA, {data})
      .pipe(catchError(this.handleError));
  };

  getColumns = (data: Record<string, string>[]): IColumn[] => {
    const columns: IColumn[] = [];
    const unique: Set<string> = new Set();

    for (const item of data) {
      const keys = Object.keys(item);
      for (const key of keys) {
        unique.add(key.replace(/([^\w]+|\s+)/g, ''));
      }
    }

    const columnValues = Array.from(unique);
    for (const index in columnValues) {
      const name = columnValues[index];
      const editable = !columnValues[index].includes('Id');
      columns.push({
        id: index,
        name,
        editable,
      });
    }
    return columns;
  };

  getRows = (columns: IColumn[], data: Record<string, string>[]): IRow[] => {
    const rows: IRow[] = [];

    for (const index in data) {
      const dataItem = data[index];
      const keys = Object.keys(dataItem);
      const cells: ICell[] = [];

      for (const column of columns) {
        const columnKey = keys.find(
          (key) => key.replace(/([^\w]+|\s+)/g, '') === column.name
        );
        columnKey
          ? cells.push({
              columnId: column.id,
              editable: column.editable,
              value: dataItem[columnKey],
            })
          : cells.push({
              columnId: column.id,
              editable: column.editable,
              value: '',
            });
      }
      rows.push({ id: index, cells, selected: false });
    }
    return rows;
  };

  createRow = (columns: IColumn[], id: string): IRow => {
    const cells: ICell[] = [];

    for (const column of columns) {
      cells.push({ columnId: column.id, editable: column.editable, value: '' });
    }
    return { id, cells, selected: true };
  };

  tableDataToObjects = (
    columns: IColumn[],
    rows: IRow[]
  ): Record<string, string>[] => {
    const data: Record<string, string>[] = [];
    for (const row of rows) {
      let object: any = {};
      for (const cell of row.cells) {
        if (cell.value) {
          const key = columns.find((column) => cell.columnId === column.id);
          if (key) {
            object[key.name] = cell.value;
          }
        }
      }
      data.push(object);
    }
    return data;
  };

  handleError = (error: HttpErrorResponse) => {
    console.log(error);
    return throwError(() => new Error(error.message));
  };
}
