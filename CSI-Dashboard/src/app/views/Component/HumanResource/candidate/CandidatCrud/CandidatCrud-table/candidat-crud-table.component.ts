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
  getDisplayedColumns() {
    return ['firstName', 'lastName', 'title',  'status', 'actions'];
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

  getItems() {    
    this.getItemSub = this.crudService.getItems()
      .subscribe((data:any)  => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

  }

  openPopUp(data:  any , isNew?) {
    let title = isNew ? 'Nouveau candidat' : 'Modifier candidat';
    let dialogRef: MatDialogRef<any> = this.dialog.open(NgxTablePopupComponent, {
      width: '1000px',
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
          this.loader.open('Ajout en cours');
          this.crudService.addItem(res)
            .subscribe((data :any)=> {
              this.dataSource = data;
              this.loader.close();
              this.snack.open('Candidat ajouté avec succès!', 'OK', { duration: 2000 });
              this.getItems();
            })
        } else {
          this.loader.open('modification en cours');
          this.crudService.updateItem(data.id,res)
            .subscribe((data:any) => {
              this.dataSource = data ;
              this.loader.close();
              this.snack.open('candidat modifié avec succées !', 'OK', { duration: 2000 });
              this.getItems();
            })
        }
      })
  }
  deleteItem(row) {
    this.confirmService.confirm({message: `Delete ${row.firstName}?`})
      .subscribe(res => {
        if (res) {
          this.loader.open('Supprission du candidat');
          this.crudService.deleteItem(row)
            .subscribe((data:any)=> {
              this.dataSource = data;
              this.loader.close();
              this.snack.open('candidat supprimé!', 'OK', { duration: 20});
              this.getItems();
            })
        }
      })
  }
add(){
  this.router.navigateByUrl('cvCandidat/cvCandidat-crud');
}
  applyFilter(event :Event){
    const FilterValue = (event.target as HTMLInputElement).value ;
     this.dataSource.filter = FilterValue.trim().toLowerCase();
 
 }

 
/*moreAboutItem(itemId: number) {
    // Open menu and listen for menu item selection
  }

  handleMenuItemSelection(menuItem: string, itemId: number) {
    // Redirect to appropriate interface based on menu item selection
    if (menuItem === 'requirement') {
      this.router.navigate(['/requirements', itemId]);
    } else if (menuItem === 'contacts') {
      this.router.navigate(['/contacts', itemId]);
    }
  }*/

}
