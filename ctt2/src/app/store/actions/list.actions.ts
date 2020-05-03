import { Action } from '@ngrx/store';


export enum ListActionTypes {
    LOAD_CLINIC_LIST = '[list] load clinicList',
    LOAD_CLINIC_LIST_SUCCESS = '[list] load clinicList success',
    LOAD_CLINIC_LIST_FAIL = '[list] load clinicList fail',
    LOAD_LOCALITY_LIST = '[list] load localityList',
    LOAD_LOCALITY_LIST_SUCCESS = '[list] load localityList success',
    LOAD_LOCALITY_LIST_FAIL = '[list] load localityList fail'
}

export class LoadClinicList implements Action {
    readonly type = ListActionTypes.LOAD_CLINIC_LIST;
}
export class LoadClinicListSuccess implements Action {
    readonly type = ListActionTypes.LOAD_CLINIC_LIST_SUCCESS;
    constructor(public payload: any){}
}
export class LoadClinicListFail implements Action {
    readonly type = ListActionTypes.LOAD_CLINIC_LIST_FAIL;
}

export class LoadLocalityList implements Action {
    readonly type = ListActionTypes.LOAD_LOCALITY_LIST;
}
export class LoadLocalityListSuccess implements Action {
    readonly type = ListActionTypes.LOAD_LOCALITY_LIST_SUCCESS;
    constructor(public payload: any){}
}
export class LoadLocalityListFail implements Action {
    readonly type = ListActionTypes.LOAD_LOCALITY_LIST_FAIL;
}

export type ListAction =
LoadClinicList |
LoadClinicListSuccess |
LoadClinicListFail |
LoadLocalityList |
LoadLocalityListSuccess |
LoadLocalityListFail;
