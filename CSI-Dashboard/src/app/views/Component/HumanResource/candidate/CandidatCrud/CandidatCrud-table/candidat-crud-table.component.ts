import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppConfirmService } from 'app/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { NgxTablePopupComponent } from 'app/views/cruds/crud-ngx-table/ngx-table-popup/ngx-table-popup.component';
import { Subscription } from 'rxjs';
import { CrudService } from '../candidat-crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidat-crud',
  templateUrl: './candidat-crud-table.component.html'
})


export class CandidatCrudTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  public dataSource: any;
  public displayedColumns: any;
  public getItemSub: Subscription;
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: CrudService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private router: Router
  ) { }
   

  goToCV() {
    this.router.navigate(['cvCandidat/cvCandidat-crud']);
  }

  ngOnInit() {
    this.displayedColumns = this.getDisplayedColumns();
    this.getItems()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe()
    }
  }

  getDisplayedColumns() {
    return ['name', 'age', 'balance', 'company', 'status', 'actions'];
  }

  getItems() {    
    this.getItemSub = this.crudService.getItems()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      })
  }

  applyFilter(event :Event){
    const FilterValue = (event.target as HTMLInputElement).value ;
     this.dataSource.filter = FilterValue.trim().toLowerCase();
 
 }

  openPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Add new Candidat' : 'Update Candidat';
    let dialogRef: MatDialogRef<any> = this.dialog.open(NgxTablePopupComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if(!res) {
          // If user press cancel
          return;
        }
        if (isNew) {
          this.loader.open('Adding new Candidat');
          this.crudService.addItem(res)
            .subscribe(data => {
              this.dataSource = data;
              this.loader.close();
              this.snack.open('Candidat Added!', 'OK', { duration: 4000 })
            })
        } else {
          this.loader.open('Updating Candidat');
          this.crudService.updateItem(data._id, res)
            .subscribe(data => {
              this.dataSource = data;
              this.loader.close();
              this.snack.open('Candidat Updated!', 'OK', { duration: 4000 })
            })
        }
      })
  }
  deleteItem(row) {
    this.confirmService.confirm({message: `Delete ${row.name}?`})
      .subscribe(res => {
        if (res) {
          this.loader.open('Deleting Candidat');
          this.crudService.removeItem(row)
            .subscribe(data => {
              this.dataSource = data;
              this.loader.close();
              this.snack.open('Candidat deleted!', 'OK', { duration: 4000 })
            })
        }
      })
  }

}
