import React from 'react';
import { Form} from 'react-bootstrap';

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
            <Form.Group controlId="priceRange" style={{ width: '100%', margin: '20px 0' }}>
  <Form.Label style={{ fontWeight: 'bold', fontSize: '1.1em' }}>Диапазон цены:</Form.Label>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <span style={{ fontSize: '0.9em', color: 'gray', marginRight: '10px' }}>100 ₽</span>
    <Form.Control
      type="range"
      min={100}
      max={100000}
      value={maxPrice}
      onChange={handleChange}
      style={{
        flex: 1,
        paddingLeft:0,
        paddingRight:0,
        accentColor: '#007bff', // Основной цвет ползунка
        height: '5px', // Толщина полосы слайдера
        backgroundColor: '#e9ecef', // Цвет полосы
        borderRadius: '5px', // Скругленные углы
      }}
    />
    <span style={{ fontSize: '0.9em', color: 'gray', marginLeft: '10px' }}>100 000 ₽</span>
  </div>
  <div style={{ textAlign: 'center', fontSize: '1em', marginTop: '10px', fontWeight: '500' }}>
    Выбранная цена: <span style={{ color: '#007bff' }}>{maxPrice} ₽</span>
  </div>
</Form.Group>

        </Form>
    );
};

export default PriceFilter;