import React from 'react';
import { Form, Button } from 'react-bootstrap';

interface PriceFilterProps {
    maxPrice: number;
    onPriceChange: (price: number) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ maxPrice, onPriceChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onPriceChange(Number(e.target.value));
    };

    return (
        <Form>
            <Form.Group controlId="priceRange">
                <Form.Label>Диапазон цены:</Form.Label>
                <Form.Control type="range" min={100} max={100000} value={maxPrice} onChange={handleChange} />
                <div>Цена: {maxPrice} ₽</div>
            </Form.Group>
        </Form>
    );
};

export default PriceFilter;
