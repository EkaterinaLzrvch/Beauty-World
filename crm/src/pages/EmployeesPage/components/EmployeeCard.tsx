import React from 'react';
import EmployeesApi, { StaffDto } from '../../../api/EmployeesApi';
import { EmployeesPage } from '../EmployeesPage';

export interface EmployeesCardProps {
    employee: StaffDto;
}

export function EmployeesCard(props:EmployeesCardProps) {
    const {id, photo, fullName, position} = props.employee;

    return (
        < div className = 'employee-card' >
            <div className="employee-card__photo">
                <img 
                style={{
                    height: 300,
                    width: 250
                }}
                src={photo} alt="" />
            </div>

            <h4 className="employee__name">
                {fullName}
            </h4>
            <p className="employee-name__position">
                {position}
            </p>
        </div>
    );


};
