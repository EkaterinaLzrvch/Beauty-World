import React from 'react';
interface EmployeesCardProps {
    employee: any;
}


export const employees = [
    {
        id: 1, 
        photo: 'https://chea.qodeinteractive.com/wp-content/uploads/2021/06/h2-team-img1.jpg',
        firstName: 'Ирина', 
        patronymic: 'Александровна',
        surname: 'Краснова', 
        position: 'Мастер ногтевого сервиса',
    },
    {
        id: 2, 
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&amp;w=1080&amp;fit=max&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb',
        firstName: 'Жанна', 
        patronymic: 'Анатольевна',
        surname: 'Калилова', 
        position: 'Визажист-стилист',
    },
    {
        id: 3, 
        photo: 'https://everythingbackyard.net/wp-content/uploads/2018/11/Jennifer-Sanders-300x300.png',
        firstName: 'Алина', 
        patronymic: 'Викторовна',
        surname: 'Киселева', 
        position: 'Парикмахер',
    },
    {
        id: 4, 
        photo: 'https://maisonautop.fr/wp-content/uploads/2022/09/1662862742_8_8-tendances-cheveux-pour-lautomnehiver-2021.jpg',
        firstName: 'Елена', 
        patronymic: 'Станиславовна',
        surname: 'Иванова', 
        position: 'Мастер ногтевого сервиса',
    },
]



export function EmployeeCard(props:EmployeesCardProps) {
    const {id, photo, firstName, surname, position} = props.employee;

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
                {firstName} {surname}
            </h4>
            <p className="employee-name__position">
                {position}
            </p>
        
        </div>
    )

}



// function employeesCards (props: EmployeesCardsProps) {
//     const { id, photo, firstName, surname, position } = props.employee; 
//     return (
//         <>
//         <p>Имя: {employees.firstName}</p>

        

//         </>
//     )

// }

// return (
//     <div className="employee-card">
//         <div className="employee-card__photo">
//             <img
//                 style={{
//                     height: 200,
//                     width: 'auto'
//                 }}
//             src={photo} alt="" />
//         </div>

//         <div className="employee-card__name">{fullName}</div>
//         <p className="employee-card__position">{position}</p>
//         <button onClick={handleClick}>Подробнее</button>
//     </div>
// );