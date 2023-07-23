import React, {useState} from 'react';
import {TextInput} from "react-native-paper";

const TextField = () => {

    const [text, setText] = useState('');

    return (
        <>
            <TextInput
                label="Type something..."
                value={text}
                onChangeText={handleInputChange}
            />
        </>
    );
}

export default TextField;
