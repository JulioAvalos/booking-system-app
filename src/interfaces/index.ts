export interface IRoomForm {
    name:     string;
    capacity: number;
    status:   Status;
    level:    Level;
    photoUrl: string;
}

export interface Level {
    id:         number;
    name:       string;
    buildingId: number;
    createdAt:  string;
    createdBy:  string;
    updatedAt:  null;
    updatedBy:  null;
}

export interface Status {
    id:    number;
    name:  string;
    value: string;
}
