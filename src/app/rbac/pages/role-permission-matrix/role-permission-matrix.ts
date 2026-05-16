import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RBACService } from '../../../core/services/rbac.service';

@Component({
  selector: 'app-role-permission-matrix',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-permission-matrix.html',
  styleUrl: './role-permission-matrix.scss'
})
export class RolePermissionMatrixComponent implements OnInit {
  private rbacService = inject(RBACService);
  roles = this.rbacService.roles;
  permissions = this.rbacService.permissions;
  
  // Local state for assignments: roleId -> permissionId[]
  rolePermissionMap: Map<string, string[]> = new Map();

  ngOnInit() {
    this.rbacService.getRoles().subscribe();
    this.rbacService.getPermissions().subscribe();
    // In a real app, you'd fetch the initial mapping from the API
  }

  isPermissionAssigned(roleId: string, permissionId: string): boolean {
    const perms = this.rolePermissionMap.get(roleId);
    return perms ? perms.includes(permissionId) : false;
  }

  togglePermission(roleId: string, permissionId: string, event: any) {
    const isChecked = event.target.checked;
    let perms = this.rolePermissionMap.get(roleId) || [];
    
    if (isChecked) {
      perms = [...perms, permissionId];
    } else {
      perms = perms.filter(id => id !== permissionId);
    }
    
    this.rolePermissionMap.set(roleId, perms);
  }

  saveChanges() {
    // Implement batch update via RBACService
    console.log('Saving changes...', this.rolePermissionMap);
  }
}
