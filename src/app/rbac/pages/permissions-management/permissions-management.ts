import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RBACService } from '../../../core/services/rbac.service';
import { Permission } from '../../../core/models/auth.models';

@Component({
  selector: 'app-permissions-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './permissions-management.html',
  styleUrl: './permissions-management.scss'
})
export class PermissionsManagementComponent implements OnInit {
  private rbacService = inject(RBACService);
  permissions = this.rbacService.permissions;

  ngOnInit() {
    this.rbacService.getPermissions().subscribe();
  }

  filterByModule(event: any) {
    const module = event.target.value;
    // Implement local filtering or API-based filtering
  }

  openCreateModal() {
    // Implement modal logic
  }

  editPermission(perm: Permission) {
    // Implement edit logic
  }

  deletePermission(id: string) {
    if (confirm('Are you sure you want to delete this permission?')) {
      // Implement delete logic via RBACService
    }
  }
}
