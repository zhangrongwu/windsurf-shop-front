import React from 'react';
import { RadioGroup } from '@headlessui/react';
import { ShippingOption } from '../../types/address';
import {
  CheckCircleIcon,
  TruckIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { Card } from '../common/Card';
import { Spinner } from '../common/Spinner';
import { Badge } from '../common/Badge';

interface ShippingOptionsProps {
  options: ShippingOption[];
  selectedOption: ShippingOption | null;
  onSelect: (option: ShippingOption) => void;
  subtotal: number;
  isLoading?: boolean;
  error?: string;
}

const ShippingOptions: React.FC<ShippingOptionsProps> = ({
  options,
  selectedOption,
  onSelect,
  subtotal,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <div className="mt-4">
        <div className="h-8 w-32 animate-pulse rounded-md bg-gray-200" />
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="relative h-[160px] animate-pulse">
              <div className="p-4">
                <div className="space-y-3">
                  <div className="h-6 w-3/4 rounded bg-gray-200" />
                  <div className="h-4 w-1/2 rounded bg-gray-200" />
                  <div className="h-4 w-1/4 rounded bg-gray-200" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="mt-4 border-red-200 bg-red-50 p-4">
        <div className="flex items-center space-x-3 text-red-800">
          <ExclamationTriangleIcon className="h-5 w-5" />
          <p>{error}</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="mt-4">
      <RadioGroup value={selectedOption} onChange={onSelect}>
        <RadioGroup.Label className="text-lg font-medium text-gray-900">
          Shipping Method
        </RadioGroup.Label>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {options.map((option) => {
            const isFree = subtotal >= (option.freeShippingThreshold || Infinity);
            const finalPrice = isFree ? 0 : option.price;

            return (
              <RadioGroup.Option
                key={option.id}
                value={option}
                className={({ active, checked }) =>
                  `cursor-pointer focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <Card
                    hoverable
                    selected={checked}
                    className={`relative h-full transition-all ${
                      active ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                    }`}
                  >
                    <div className="p-4">
                      <div className="flex items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <TruckIcon
                              className={`h-6 w-6 ${
                                checked ? 'text-blue-600' : 'text-gray-400'
                              }`}
                            />
                            <div>
                              <RadioGroup.Label
                                as="span"
                                className="block text-sm font-medium text-gray-900"
                              >
                                {option.name}
                                {option.estimatedDays === 1 && (
                                  <Badge
                                    variant="success"
                                    className="ml-2 whitespace-nowrap"
                                  >
                                    Next Day
                                  </Badge>
                                )}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className="mt-1 flex items-center text-sm text-gray-500"
                              >
                                {option.description}
                              </RadioGroup.Description>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <RadioGroup.Description
                              as="span"
                              className="flex items-center text-sm"
                            >
                              <span
                                className={`font-medium ${
                                  isFree ? 'text-green-600' : 'text-gray-900'
                                }`}
                              >
                                {isFree ? (
                                  <Badge variant="success">Free</Badge>
                                ) : (
                                  `$${finalPrice.toFixed(2)}`
                                )}
                              </span>
                              {option.freeShippingThreshold && !isFree && (
                                <span className="ml-2 text-gray-500">
                                  (Free over $
                                  {option.freeShippingThreshold.toFixed(2)})
                                </span>
                              )}
                            </RadioGroup.Description>
                            <span className="text-sm text-gray-500">
                              {option.estimatedDays === 1
                                ? 'Tomorrow'
                                : `${option.estimatedDays} days`}
                            </span>
                          </div>
                        </div>

                        {checked && (
                          <div className="ml-4 shrink-0">
                            <CheckCircleIcon className="h-6 w-6 text-blue-600" />
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                )}
              </RadioGroup.Option>
            );
          })}
        </div>
      </RadioGroup>
    </div>
  );
};

export default ShippingOptions;
