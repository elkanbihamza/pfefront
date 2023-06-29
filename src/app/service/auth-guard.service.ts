import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';


@Injectable()
export class AuthGuardService implements CanActivate {
    canActivate(): boolean { 
        if(localStorage.getItem('session')){
            return true;
        }
        return false;
    }
}