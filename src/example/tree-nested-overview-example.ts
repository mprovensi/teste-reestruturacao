import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {FloatLabelType, MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

export interface DialogData {
  nome: string;
  servidores: string;
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'SECRETARIA DE TECNOLOGIA DA INFORMAÇÃO E COMUNICAÇÃO',
    children: [
      {
        name: 'COORDENADORIA DE INFRAESTRUTURA DE TIC',
        children: [
          {
            name: 'SEÇÃO DE BANCO DE DADOS',
          },
          {
            name: 'DIVISÃO DE DATA CENTER E REDES',
            children: [
              {name: 'SEÇÃO DE REDES DE COMUNICAÇÃO '}
            ]
          },
          {
            name: 'DIVISÃO DE ADMINISTRAÇÃO DE SERVIDORES DE APLICAÇÃO',
          },
        ],
      },
      {
        name: 'COORDENADORIA DE SISTEMAS DE INFORMAÇÃO',
        children: [
          {name: 'SEÇÃO DE ATENDIMENTO AO PJE'},
          {name: 'DIVISÃO DE MANUTENÇÃO DE SISTEMAS'},
          {name: 'SEÇÃO DE ADMINISTRAÇÃO DO E-GESTÃO'}
        ],
      },
      {
        name: 'DIVISÃO DE ATENDIMENTO DE TIC',
        children: [
          {name: 'SEÇÃO DE MANUTENÇÃO DE MICROINFORMÁTICA '},
        ],
      },
      {
        name: 'COORDENADORIA DE RELACIONAMENTO DE TIC',
        children: [
          {name: 'SEÇÃO DE OTIMIZAÇÃO DO ATENDIMENTO DE TIC'},
        ],
      },
      {
        name: 'COORDENADORIA DE PLANEJAMENTO E GESTÃO DE TIC',
        children: [
          {name: 'SEÇÃO DE APOIO ÀS CONTRATAÇÕES DE TIC'},
        ],
      },
    ],
  },
];

const mudancas: {
  nome: string;
  cor: string;
  detalhes: string;
}[] = [
];

/**
 * @title Tree with nested nodes
 */
@Component({
  selector: 'tree-nested-overview-example',
  templateUrl: 'tree-nested-overview-example.html',
  styleUrl: 'tree-nested-overview-example.css',
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule,    
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatIconModule,
    MatTreeModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule,
    CommonModule 
    ],
})
export class TreeNestedOverviewExample {
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();
  showDiv?: string;
  mudancas2 = mudancas;
  constructor(public dialog: MatDialog) {
    this.dataSource.data = TREE_DATA;
    this.treeControl.expand(this.dataSource.data[0]);
    this.showDiv = undefined;
  }

 
  
  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  openDialog(nome: string): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {nome},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialog2(nome: string): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog2, {
      data: {nome},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialog3(nome: string): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog3, {
      data: {nome},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  onCancelar(nome: string): void {
    const index = mudancas.findIndex(obj => obj.nome === nome);

    // Se o objeto for encontrado no array, remova-o
    if (index !== -1) {
      mudancas.splice(index, 1);
    }
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onPersist(nome: string): void {
    mudancas.push({
      nome,
      cor: '#0090ff1a',
      detalhes: 'Alteração dos atributos:'
      
    });
    this.onNoClick();
  }
}

@Component({
  selector: 'dialog-overview-example-dialog2',
  templateUrl: 'dialog-overview-example-dialog2.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class DialogOverviewExampleDialog2 {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog2>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onPersist(nome: string): void {
    mudancas.push({
      nome,
      cor: '#00ff5017',
      detalhes: 'Criação de nova lotação'
      
    });
    this.onNoClick();
  }
}

@Component({
  selector: 'dialog-overview-example-dialog3',
  templateUrl: 'dialog-overview-example-dialog3.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class DialogOverviewExampleDialog3 {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog2>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onPersist(nome: string): void {
    mudancas.push({
      nome,
      cor: '#ff000012',
      detalhes: 'Extinguir lotação'
      
    });
    this.onNoClick();
  }
}
/**  Copyright 2024 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */