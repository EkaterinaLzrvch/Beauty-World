import { API_PATH } from "../constants";
import { HttpService } from "../services/HttpService";

enum Role {
    Admin = 'admin',
    Teacher = 'teacher'
}

interface FullName {
    firstName: string;
    patronymic: string;
    surName: string;
}

export interface StaffDto extends FullName {
    id: number;
    fullName: string;
    position: string;
    startWorkDate: string;
    photo: string;
    role: Role;
}

export interface AnotherStaffDto extends Omit<StaffDto, 'startWorkDate'> {
    date: string;
}

class EmpoyeesApi extends HttpService {
    constructor() {
        super(`${API_PATH}/staff`);
    }

    getAll(): Promise<StaffDto[]> {
        return this.get('');
    }
}

export default new EmpoyeesApi();
