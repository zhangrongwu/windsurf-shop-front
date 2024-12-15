import { z } from 'zod';

export const addressSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name is too long'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name is too long'),
  addressLine1: z
    .string()
    .min(1, 'Address is required')
    .max(100, 'Address is too long'),
  addressLine2: z.string().max(100, 'Address is too long').optional(),
  city: z.string().min(1, 'City is required').max(50, 'City is too long'),
  state: z.string().min(1, 'State is required').max(50, 'State is too long'),
  postalCode: z
    .string()
    .min(1, 'Postal code is required')
    .max(20, 'Postal code is too long')
    .regex(/^[0-9a-zA-Z-\s]+$/, 'Invalid postal code format'),
  country: z.string().min(1, 'Country is required').max(50, 'Country is too long'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .max(20, 'Phone number is too long')
    .regex(/^[0-9+\-\s()]+$/, 'Invalid phone number format'),
  isDefault: z.boolean().optional(),
});

export type AddressFormData = z.infer<typeof addressSchema>;

export const returnRequestSchema = z.object({
  reason: z.string().min(1, 'Please select a reason'),
  description: z
    .string()
    .min(10, 'Please provide more details about the return')
    .max(1000, 'Description is too long'),
  images: z.array(z.string()).optional(),
});

export type ReturnRequestFormData = z.infer<typeof returnRequestSchema>;
