import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressSchema, type AddressFormData } from '../../utils/form-schemas';
import { FormField } from '../common/FormField';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import {
  UserIcon,
  PhoneIcon,
  HomeIcon,
  MapPinIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

interface AddressFormProps {
  initialData?: Partial<AddressFormData>;
  onSubmit: (data: AddressFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData,
  });

  const iconClasses = 'h-5 w-5 text-gray-400';

  return (
    <Card className="max-w-2xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-6"
        noValidate
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            name="firstName"
            label="First Name"
            register={register}
            error={errors.firstName}
            icon={<UserIcon className={iconClasses} />}
            placeholder="John"
          />
          <FormField
            name="lastName"
            label="Last Name"
            register={register}
            error={errors.lastName}
            icon={<UserIcon className={iconClasses} />}
            placeholder="Doe"
          />
        </div>

        <FormField
          name="phone"
          label="Phone Number"
          register={register}
          error={errors.phone}
          icon={<PhoneIcon className={iconClasses} />}
          placeholder="+1 (555) 000-0000"
        />

        <FormField
          name="addressLine1"
          label="Address Line 1"
          register={register}
          error={errors.addressLine1}
          icon={<HomeIcon className={iconClasses} />}
          placeholder="123 Main St"
        />

        <FormField
          name="addressLine2"
          label="Address Line 2 (Optional)"
          register={register}
          error={errors.addressLine2}
          icon={<HomeIcon className={iconClasses} />}
          placeholder="Apt 4B"
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            name="city"
            label="City"
            register={register}
            error={errors.city}
            icon={<MapPinIcon className={iconClasses} />}
            placeholder="San Francisco"
          />
          <FormField
            name="state"
            label="State / Province"
            register={register}
            error={errors.state}
            icon={<MapPinIcon className={iconClasses} />}
            placeholder="California"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            name="postalCode"
            label="Postal Code"
            register={register}
            error={errors.postalCode}
            icon={<MapPinIcon className={iconClasses} />}
            placeholder="94105"
          />
          <FormField
            name="country"
            label="Country"
            register={register}
            error={errors.country}
            icon={<GlobeAltIcon className={iconClasses} />}
            placeholder="United States"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isDefault"
            {...register('isDefault')}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="isDefault"
            className="ml-2 block text-sm text-gray-900"
          >
            Set as default address
          </label>
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" loading={isLoading}>
            {initialData ? 'Update' : 'Save'} Address
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AddressForm;
