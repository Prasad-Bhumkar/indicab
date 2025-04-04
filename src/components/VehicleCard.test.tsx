import { render, screen } from '@testing-library/react';
import VehicleCard from './VehicleCard';
import { describe, expect, test } from 'vitest';

describe('VehicleCard Component', () => {
  const mockVehicle = {
    _id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    type: 'Sedan',
    dailyRate: 50,
    imageUrl: '/test-image.jpg',
    fuelType: 'Petrol',
    transmission: 'Automatic'
  };

  test('renders vehicle card with correct details', () => {
    render(<VehicleCard vehicle={mockVehicle} />);
    
    expect(screen.getByText('Toyota Camry')).toBeDefined();
    expect(screen.getByText('2022')).toBeDefined();
    expect(screen.getByText('Sedan')).toBeDefined();
    expect(screen.getByText('$50/day')).toBeDefined();
    expect(screen.getByText('Petrol • Automatic')).toBeDefined();
  });

  test('renders default image when imageUrl is not provided', () => {
    const vehicleWithoutImage = {...mockVehicle, imageUrl: ''};
    render(<VehicleCard vehicle={vehicleWithoutImage} />);
    
    const image = screen.getByAltText('2022 Toyota Camry');
    expect(image.getAttribute('src')).toBe('/assets/cars/default-car.jpg');
  });

  test('matches snapshot', () => {
    const { container } = render(<VehicleCard vehicle={mockVehicle} />);
    expect(container).toMatchSnapshot();
  });
});