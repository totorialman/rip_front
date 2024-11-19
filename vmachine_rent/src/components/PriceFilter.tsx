import React from 'react';
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setMaxPrice } from '../slices/filterSlice';

const PriceFilter: React.FC = () => {
  const maxPrice = useSelector((state: RootState) => state.filter.maxPrice);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setMaxPrice(Number(e.target.value)));
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
              paddingLeft: 0,
              paddingRight: 0,
              accentColor: '#007bff',
              height: '5px',
              backgroundColor: '#e9ecef',
              borderRadius: '5px',
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
