import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieDto } from '../models/movie';
import { of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MoviesService {
    baseUrl: string = 'https://api.themoviedb.org/3';
    apiKey: string = '4dbb405c7226c24ddaa4df62626c1ac9';
    language: string = 'language=ko';
    constructor(private http: HttpClient) {}

    getMovies(type: string = 'upcoming', count: number = 12) {
        return this.http.get<MovieDto>(`${this.baseUrl}/movie/${type}?api_key=${this.apiKey}`).pipe(
            switchMap((res) => {
                return of(res.results.slice(0, count));
            })
        );
    }
    searchMovies(page: number = 1) {
        return this.http.get<MovieDto>(`${this.baseUrl}/movie/popular?page=${page}&api_key=${this.apiKey}`).pipe(
            switchMap((res) => {
                return of(res.results);
            })
        );
    }
}
