import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private baseUrl = 'http://localhost:8080/getchartconfig';
  private userUrl = 'http://localhost:8080/getcharts';
  private jsonUrl = 'http://localhost:8080/query';
  private postDataUrl='http://localhost:8080/chartsconfiguration';
  private chartUrl='http://localhost:8080/chartType';
  private reportUrl='http://localhost:8080/chartQuery';
  constructor(private http: HttpClient) { }

  getConfiguration(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  getGraphConfiguration() {
    return this.http.get(this.userUrl);
  }

  storeDataInDB(data: any)
  {
    return this.http.post(`${this.postDataUrl}`,data);
  }
  getJsonData(id: number, paramValues: any): Observable<any> {
    const form = new FormData;
    form.append('paramList', paramValues);
    return this.http.post(`${this.jsonUrl}/${id}`, form);
  }
  getChartQueryId(reportName: any): Observable<any>
  {
    const form=new FormData;
    form.append('dataType',reportName);
    return this.http.post(`${this.reportUrl}`,form);
  }
  getChartTypeId(chartName: any): Observable<any>
  {
    const form=new FormData;
    form.append('chartName',chartName);
    return this.http.post(`${this.chartUrl}`,form);
  }
}
