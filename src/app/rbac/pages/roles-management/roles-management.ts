import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RBACService } from '../../../core/services/rbac.service';
import { Role } from '../../../core/models/auth.models';

@Component({
  selector: 'app-roles-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roles-management.html',
  styleUrl: './roles-management.scss'
})
export class RolesManagementComponent implements OnInit {
  private rbacService = inject(RBACService);
  roles = this.rbacService.roles;

  ngOnInit() {
    this.rbacService.getRoles().subscribe();
  }

  openCreateModal() {
    // Implement modal logic
  }

  editRole(role: Role) {
    // Implement edit logic
  }

  deleteRole(id: string) {
    if (confirm('Are you sure you want to delete this role?')) {
      this.rbacService.deleteRole(id).subscribe();
    }
  }

  managePermissions(role: Role) {
    // Redirect to permission matrix or open modal
  }
}
