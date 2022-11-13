import React, { useEffect, useState } from 'react';
import { EmployeesApi } from '../../api';
import { EmployeesCard} from './components/EmployeeCard';
import { StaffDto } from '../../api/EmployeesApi';


export function EmployeesPage () {
    const [employees, setEmployees] = useState<StaffDto[]>([]);
    // объявим и проинициализируем пустым массивом

    useEffect(() => {
        EmployeesApi.getAll().then(setEmployees);
    }, []);
    //это промим с then, в коллбэк передаем setEmployees

    return (

       <div style={{ display: 'flex', flexWrap: 'wrap', background: '#ececec', gap:'20px' }}>
      
        {employees.map(employee => 
            <EmployeesCard 
                key={employee.id} 
                employee={employee}/>)}
       </div>
    )
}

// отослать API, получить данные и их отобразить
