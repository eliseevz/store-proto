import React, {useState} from "react"
import DropDown from "../DropDown/dropDown";

const FilterBar = (props) => {

    const initialState = {
        all: {
            name: "Все",
            isSelect: true,
        },
        shoes: {
            name: "Обувь",
            isSelect: false,
        },
        accses: {
            name: "Аксессуары",
            isSelect: false,
        },
        selectedKey: "all"
    }

    const [categories, setCategories] = useState(initialState)

    const onChangeHandler = (key) => {
        let newState = {}
        Object.keys(categories).map( categoryName => {
            let newStateOfItem = {...categories[categoryName], isSelect: false}
            if (categoryName === key) {
                newStateOfItem = {...categories[categoryName], isSelect: true }
                // newState = {...newState, selectedKey: categories[categoryName].name}
                props.selectCategoryHandler(categories[categoryName].name)
            }
            newState = {...newState, [categoryName]: newStateOfItem}
        })
        setCategories(newState)
        console.log(categories)
    }

    return (
        <>
            <div className="row d-flex justify-content-center mb-4">
                <div className="card col-sm-12">
                    <div className="card-body d-flex align-items-center">
                        <div className="categories-button" style={{fontSize: 18 }}>
                            { Object.keys(categories).map( (item, index) => {
                                return <span
                                        className={categories[item].isSelect
                                            ? "badge p-2 me-3 bg-dark text-light"
                                            : "badge p-2 me-3 bg-light text-dark"}
                                        onClick={() => onChangeHandler(item)}
                                        role="button"
                                        >
                                            {categories[item].name}
                                        </span>
                            })}
                        </div>
                        <DropDown
                            options={{
                                default: {label: "Дефолт", name: "none", order: null},
                                up: {label: "Цена по воз-ию", name: "price", order: "asc"},
                                down: {label: "Цена по уб-ию", name: "price", order: "desc"}
                            }}
                            action={props.selectFilterHandler}

                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default FilterBar