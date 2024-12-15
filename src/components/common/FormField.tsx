import React from 'react';
import {
  FieldValues,
  UseFormRegister,
  Path,
  RegisterOptions,
  FieldError,
} from 'react-hook-form';
import { Input } from './Input';

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  register: UseFormRegister<T>;
  rules?: RegisterOptions;
  error?: FieldError;
  type?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export function FormField<T extends FieldValues>({
  name,
  label,
  register,
  rules,
  error,
  type = 'text',
  placeholder,
  className,
  disabled,
  icon,
}: FormFieldProps<T>) {
  return (
    <div className={className}>
      <Input
        {...register(name, rules)}
        type={type}
        label={label}
        error={error?.message}
        placeholder={placeholder}
        disabled={disabled}
        icon={icon}
      />
    </div>
  );
}
