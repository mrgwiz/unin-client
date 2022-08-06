import {
    Select as ChakraSelect
} from '@chakra-ui/react';

type Props = {
    onChange: (value: number) => void;
    options: { value: number, label: string }[];
    value: string|number;
}

const Select = ({ onChange, options, value }:Props) => {
    return (
        <ChakraSelect value={value} onChange={(e: any) => onChange(e.target.value)} width="xxs">
            {options.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
            ))}
        </ChakraSelect>
    );
}

export default Select;
