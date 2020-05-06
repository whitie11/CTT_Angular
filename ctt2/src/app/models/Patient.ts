
export interface Patient {
patientId: number;
firstName: string;
lastName: string;
dob: Date;
nhsNo: string;
cpmsNo: string;
notes: string;
isOpen: boolean;
localityId: number;
}

export interface PtEditDTO {
    patientId: number;
    notes: string;
    isOpen: boolean;
    localityId: number;
    }


