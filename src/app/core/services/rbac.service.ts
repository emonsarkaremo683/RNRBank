import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { Role, Permission, RolePermission } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class RBACService {
  private apiUrl = 'http://localhost:3000';
  
  roles = signal<Role[]>([]);
  permissions = signal<Permission[]>([]);

  constructor(private http: HttpClient) {}

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}/roles`).pipe(
      tap(data => this.roles.set(data))
    );
  }

  getPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.apiUrl}/permissions`).pipe(
      tap(data => this.permissions.set(data))
    );
  }

  createRole(role: Partial<Role>): Observable<Role> {
    return this.http.post<Role>(`${this.apiUrl}/roles`, role).pipe(
      tap(() => this.getRoles().subscribe())
    );
  }

  updateRole(id: string, role: Partial<Role>): Observable<Role> {
    return this.http.patch<Role>(`${this.apiUrl}/roles/${id}`, role).pipe(
      tap(() => this.getRoles().subscribe())
    );
  }

  deleteRole(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/roles/${id}`).pipe(
      tap(() => this.getRoles().subscribe())
    );
  }

  getRolePermissions(roleId: string): Observable<string[]> {
    return this.http.get<RolePermission[]>(`${this.apiUrl}/rolePermissions?roleId=${roleId}`).pipe(
      map(rp => rp.map(item => item.permissionId))
    );
  }

  assignPermissions(roleId: string, permissionIds: string[]): Observable<any> {
    // In JSON Server, we'd have to delete old ones and add new ones
    // This is simplified for demo
    return of(null);
  }
}

import { of } from 'rxjs';
