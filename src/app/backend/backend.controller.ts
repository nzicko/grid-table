import { Injectable } from "@angular/core";
import { MOCK_OBJECT } from "./mockedData";

@Injectable({
  providedIn: 'root'
})
export class BackendController {
  static getData = () => {
    const localStorageData = localStorage.getItem('table-data');
    return localStorageData ? JSON.parse(localStorageData) : JSON.parse(MOCK_OBJECT);
  }

  static updateData = (data: Record<string, string>[]) => {
    let mockedData = null
    const localStorageData = localStorage.getItem('table-data');
    if (!localStorageData) {
      mockedData = JSON.parse(MOCK_OBJECT);
    } else {
      mockedData = JSON.parse(localStorageData);
    }
    mockedData.result = data;
    localStorage.setItem('table-data', JSON.stringify(mockedData));
  }
}