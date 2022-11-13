export interface CustomerDto {
    id: number;
    fullName: string;
    patronymic: string;
    firstName:string;
    surName: string;
    phone: string;
}

export interface MasterDto {
    id: number;
    fullName: string; 
    patronymic: string;
    surName: string; 
    position: string; 
    startWorkDate: string;
    photo: string;
}

export interface ServiceDto {
    id: number;
    name: string;
}

export interface OrderDto {
    id: number;
    createDate:string;
    visitDate: string;
    customer: CustomerDto;
    master: MasterDto;
    service: ServiceDto;
    finishStatus:string;
}
