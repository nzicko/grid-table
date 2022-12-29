import { Component, OnInit } from '@angular/core';
import { IColumn, IRow, ITableData } from './table.interfaces';
import { TableService } from './table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [TableService],
})
export class TableComponent implements OnInit {
  tableData: ITableData | null = null;
  columns: IColumn[] = [];
  rows: IRow[] = [];
  selectedRow: IRow | null = null;

  constructor(private tableService: TableService) {}

  ngOnInit(): void {
    this.tableService.getTableData().subscribe((data) => {
      this.tableData = data as ITableData;
      this.columns = this.tableService.getColumns(this.tableData.result);
      this.rows = this.tableService.getRows(
        this.columns,
        this.tableData.result
      );
    });
  }

  onRowSelect = (selectedRow: IRow) => {
    this.selectedRow = selectedRow;
    for (const row of this.rows) {
      row.id === selectedRow.id
        ? (row.selected = true)
        : (row.selected = false);
    }
  }

  onAddRow = () => {
    this.rows.unshift(
      this.tableService.createRow(this.columns, this.rows.length.toString())
    );
    this.onUpdateTableData();
  }

  onDeleteRow = () => {
    if (this.selectedRow) {
      const index = this.rows.findIndex((item) => item.id === this.selectedRow?.id);
      this.rows.splice(index, 1);
      this.onUpdateTableData()
    }
  }

  onFocusOut(event: any){
    this.onUpdateTableData()
 }

  onUpdateTableData = () => {
    const dataObjects = this.tableService.tableDataToObjects(this.columns, this.rows);
    this.tableService.updateTableData(dataObjects).subscribe(data => {});
  }
}
