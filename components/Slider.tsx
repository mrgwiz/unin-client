import {
    Slider as ChakraSlider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb
} from '@chakra-ui/react';

type Props = {
    color: string;
    onChange: (value: number) => void;
    value: number;
}

const Slider = ({ color, onChange, value }:Props) => {
    return (
        <ChakraSlider
            colorScheme={color}
            defaultValue={20}
            max={100}
            value={value}
            onChange={(value: number) => onChange(value)}>
            <SliderTrack>
                <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
        </ChakraSlider>
    );
}

export default Slider;
