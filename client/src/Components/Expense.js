import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext';

function Expense() {
    const { groceryLists } = useContext(GlobalContext);
    const amount = groceryLists.map(groceryList => groceryList.amount)
    const expense = amount.filter(item => item < 0).reduce((previousScore, currentScore) => (previousScore += currentScore), 0).toFixed(2)

    return (
        <div className="p-4 lg:w-1/3 md:w-1/3 sm:w-full w-full">
            <div className="card_element4 px-2 py-6 rounded-lg">
                <p className="font-medium text-3xl lg:text-2xl text-red-600">${ expense }</p>
                <p className="leading-relaxed text-gray-300">Expense</p>
            </div>
        </div>
    )
}

export default Expense
