import { NextResponse } from 'next/server';
import { z } from 'zod';

export class ValidationError extends Error {
  constructor(public errors: z.ZodError) {
    super('Validation Error');
    this.name = 'ValidationError';
  }
}

export function validateRequest<T>(schema: z.Schema<T>) {
  return async (request: Request) => {
    try {
      const body = await request.json();
      const validatedData = await schema.parseAsync(body);
      return { data: validatedData };
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError(error);
      }
      throw error;
    }
  };
}

export function handleApiError(error: unknown) {
  if (error instanceof ValidationError) {
    return NextResponse.json(
      {
        error: 'Validation Error',
        details: error.errors.errors.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
        })),
      },
      { status: 400 }
    );
  }

  if (error instanceof Error) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { error: 'Internal Server Error' },
    { status: 500 }
  );
}