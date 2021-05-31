import React, {useState} from "react";

export default (intialValue) => {
    const [value, setValue] = useState(intialValue);
    const onChangeText = text => {
        if(text.length <= 2000){
            setValue(text);
        }
    };
    return { value, onChangeText };
};
