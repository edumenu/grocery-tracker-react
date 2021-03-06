import React, { Component } from 'react'
import { GlobalContext } from '../context/GlobalContext';
import { withRouter } from 'react-router-dom';

import Income from '../Components/Income'
import Expense from '../Components/Expense'
import Balance from '../Components/Balance'
import Weather from '../Components/Weather'
import Calendar from '../Components/Calendar'
import GroceryList from '../Components/GroceryList'
import AddGrocery from '../Components/AddGrocery'
import CurrentDate from '../Components/CurrentDate'
import Modal from '../Components/Modal'

export class Dashboard extends Component {
    static contextType = GlobalContext

    state = {
        historyButton: true,
        addGroceryButton: false, 
        modalOpen: false,
        groceryCount: 0,
        selectedDate: this.context.selectedDate || "",
        deleteItem: {}
    }

    componentDidMount() {
        if (localStorage.getItem("auth-token") === 'undefined' || localStorage.getItem("auth-token") === "") {
            this.props.history.push("/login");
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // passing in both prevProps and prevState to check previous states
        // Adding a condition to check for previous state in order to prevent an infinite loop
        if (this.context.groceryCount !== prevState.groceryCount || this.context.selectedDate !== prevState.selectedDate) {
            this.setState({
                groceryCount: this.context.groceryCount,
                selectedDate: this.context.selectedDate,
            });
        }
    }

    changeHistoryListStatus = () => {
        if (!this.state.historyButton) {
            this.setState({
                addGroceryButton: !this.state.addGroceryButton,
                historyButton: !this.state.historyButton
            })
        }
    }

    changeGroceryAddStatus = () => {
        if (!this.state.addGroceryButton) {
            this.setState({
                addGroceryButton: !this.state.addGroceryButton,
                historyButton: !this.state.historyButton
            })
        }
    }

    toggleModalOpen = (item) => {
        this.setState({
            modalOpen: !this.state.modalOpen,
            deleteItem: item
        })
    }


    render() {
        const { historyButton, addGroceryButton, modalOpen, deleteItem, groceryCount, selectedDate } = this.state

        return (
            <div>
                {/* Modal */}
                <Modal modalOpen={modalOpen} toggleModalOpen={this.toggleModalOpen} deleteItem={deleteItem} />
                <section className="text-gray-700s mt-8">
                    <h1 className="container text-gray-300 text-center text-3xl lg:text-5xl md:text-5xl sm:text-3xl font-extrabold card_element4 mx-auto">Weekly Grocery Tracker</h1>
                    <div className="container card_element background_custom px-2 h-full sm:mb-0 md:mb-2 py-8 mx-auto bg-gray-100 flex overflow-hidden">
                        <div className="w-full mx-auto flex flex-wrap">
                            {/* Calendar */}
                            <Calendar />

                            {/* Weather, Current Date, Income, Expense, Balance  */}
                            <div className="lg:w-1/2 w-full lg:pr-10 md:pr-4 p-4 lg:mb-0">
                                <Weather />
                                <CurrentDate selectedDate={selectedDate} />
                                <div className="container">
                                    <div className="flex flex-wrap mt-12 text-center">
                                        <Income />
                                        <Expense />
                                        <Balance />
                                    </div>
                                </div>
                            </div>

                            {/* Grocery list, Add Grocery */}
                            <div className="lg:w-1/2 w-full pr-8 px-4 py-6 mb-16">
                                <div className="flex mb-4">
                                    <button onClick={this.changeHistoryListStatus} className={`flex-grow text-gray-300 focus:outline-none p-4 text-xl ${this.state.historyButton ? "card_element2" : "card_element hover:card_element2 hover:text-gray-500"}`}><i className="text-xl fa fa-list mr-2" aria-hidden="true"></i>Grocery List  <span className="text-2xl">({groceryCount})</span></button>
                                    <button onClick={this.changeGroceryAddStatus} className={`flex-grow text-gray-300 focus:outline-none text-xl p-4 ${this.state.addGroceryButton ? "card_element2" : "card_element hover:card_element2 hover:text-gray-500"}`} ><i className="text-xl fa fa-cart-plus mr-2" aria-hidden="true"></i>Add Grocery</button>
                                </div>
                                <GroceryList historyButton={historyButton} toggleModalOpen={this.toggleModalOpen} />
                                <AddGrocery selectedDate={selectedDate} addGroceryButton={addGroceryButton} changeHistoryListStatus={this.changeHistoryListStatus} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        )
    }
}

export default withRouter(Dashboard)
