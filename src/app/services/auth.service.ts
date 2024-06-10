import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subject } from 'rxjs';  // to send our data to other components or services.

interface LoginResponse {
  headers: any;
  // token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://ap.greatfuturetechno.com';

  constructor(private http: HttpClient) { }

  getAllParties(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/party/`);
  }

  createParty(party: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/party/`, party);
  }

  deleteParty(partyId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/party/?id=${partyId}`);
  }

  updateParty(partyId: number, partyToEdit: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/party/?id=${partyId}`, partyToEdit);
  }

  getPartyById(partyId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/party/?id=${partyId}`);
  }
  
  patchParty(partyId: number, party: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/party/?id=${partyId}`, party);
  }
  
}

export function formatDate(date: any): string {
  if (!date) return '';
  const d = new Date(date);
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
}




