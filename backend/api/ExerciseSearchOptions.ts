export interface IFilterOptions {
    focus?: string;
    difficulty?: string;
    name?: string;
}

export class SearchParameters {
    filters: IFilterOptions;
    pageNumber: number;
    exercisesPerPage: number;

    constructor(filters: IFilterOptions, pageNumber: number, exercisesPerPage: number) {
        this.filters = filters;
        this.pageNumber = pageNumber;
        this.exercisesPerPage = exercisesPerPage;        
    }
}