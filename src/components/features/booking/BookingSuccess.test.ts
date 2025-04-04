import { expect, test, describe } from 'bun:test';
import fs from 'fs';
import path from 'path';

describe('BookingSuccess Component', () => {
  test('BookingSuccess component exists', () => {
    const componentPath = path.join(process.cwd(), 'src/components/BookingSuccess.tsx');
    const exists = fs.existsSync(componentPath);
    expect(exists).toBe(true);
  });

  test('BookingSuccess contains confirmation message and animations', () => {
    const componentPath = path.join(process.cwd(), 'src/components/BookingSuccess.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');

    // Check for success elements
    expect(content).toContain('Booking Confirmed');
    expect(content).toContain('Your ride is booked');

    // Check for animations or confetti
    expect(content).toContain('ReactConfetti');
    expect(content).toContain('motion');
    expect(content).toContain('framer-motion');
  });

  test('BookingSuccess shows booking details', () => {
    const componentPath = path.join(process.cwd(), 'src/components/BookingSuccess.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');

    // Check for booking details display
    expect(content).toContain('Trip Details');
    expect(content).toContain('origin');
    expect(content).toContain('destination');
    expect(content).toContain('date');
  });

  test('BookingSuccess has call-to-action buttons', () => {
    const componentPath = path.join(process.cwd(), 'src/components/BookingSuccess.tsx');
    const content = fs.readFileSync(componentPath, 'utf8');

    // Check for CTA buttons
    expect(content).toContain('onTrackRide');
    expect(content).toContain('Track Ride');
    expect(content).toContain('Close');
  });
});
