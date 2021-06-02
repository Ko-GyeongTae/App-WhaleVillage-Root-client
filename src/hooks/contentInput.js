import React, {useState} from "react";

const contentInput = (intialValue) => {
    const [value, setValue] = useState(intialValue);
    const onChangeText = text => {
        if(text.length <= 2000){
            console.log(text);
            setValue(text);
        }
    };
    return { value, onChangeText };
};

export default contentInput;