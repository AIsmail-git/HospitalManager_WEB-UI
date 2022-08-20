import { Component, OnInit } from '@angular/core';
import {Employee} from "../models/employee.model";
import {HttpErrorResponse} from "@angular/common/http";
import {Role} from "../models/role.model";
import {RoleService} from "../services/role.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-admin-list-view-roles',
  templateUrl: './admin-list-view-roles.component.html',
  styleUrls: ['./admin-list-view-roles.component.css']
})
export class AdminListViewRolesComponent implements OnInit {

  public roles: Role[];
  public editRole: Role;

  constructor(private roleService: RoleService) { }

  ngOnInit(): void {
    this.getRoles();
  }

  public getRoles(): void {
    this.roleService.getRoles().subscribe(
      (response: Role[]) => {
        this.roles = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public onAddRole(addForm: NgForm): void {
    document.getElementById('role-close-button').click();
    this.roleService.addRole(addForm.value).subscribe(
      (response: Role) => {
        this.getRoles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
  );
    addForm.reset();
  }

  public onOpenModalRoles(role: Role, mode: string): void {
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute("data-bs-toggle", 'modal');
    if (mode === 'add') {
      button.setAttribute("data-bs-target", '#addRoleModal');
    }
    if (mode === 'edit') {
      this.editRole = role;
      button.setAttribute("data-bs-target", '#editRoleModal');
    }
    if (mode === 'delete') {
      button.setAttribute("data-bs-target", '#deleteRoleModal');
    }

    container.appendChild(button);
    button.click();

    console.log(role);
  }

  public onUpdateRole(editForm: NgForm): void {
    document.getElementById('updated-role-close-button').click();
    this.roleService.addRole(editForm.value).subscribe(
      (response: Role) => {
        this.getRoles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }


}
