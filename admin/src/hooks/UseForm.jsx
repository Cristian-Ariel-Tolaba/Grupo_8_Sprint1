import React, {useState} from 'react'

export const UseForm = (initialState = {}) => {

    const [formValues, setFormValues] = useState(initialState);

    const handlerInputChange = ({target}) => {
        setFormValues(
            {
                ...formValues,
                [target.name] : target.value
            }
        )
    }

    const handlerFileChange = ({target}) => {
        setFormValues(
            {
                ...formValues,
                [target.name] : target.files[0]
            }
        )
    }

    const reset = () => setFormValues(initialState);

    return [formValues, handlerInputChange, handlerFileChange, reset]

}
