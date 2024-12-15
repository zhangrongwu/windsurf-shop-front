import React, { useState } from 'react';
import { Address } from '../../types/address';
import {
  PencilIcon,
  TrashIcon,
  StarIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { EmptyState } from '../common/EmptyState';
import { Spinner } from '../common/Spinner';
import { Badge } from '../common/Badge';
import { ConfirmDialog } from '../common/ConfirmDialog';

interface AddressListProps {
  addresses: Address[];
  onEdit: (address: Address) => void;
  onDelete: (addressId: string) => void;
  onSetDefault: (addressId: string) => void;
  selectedAddressId?: string;
  onSelect?: (address: Address) => void;
  onAdd?: () => void;
  isLoading?: boolean;
  isDeletingAddress?: boolean;
}

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  onEdit,
  onDelete,
  onSetDefault,
  selectedAddressId,
  onSelect,
  onAdd,
  isLoading,
  isDeletingAddress,
}) => {
  const [addressToDelete, setAddressToDelete] = useState<Address | null>(null);

  const handleDeleteClick = (address: Address) => {
    setAddressToDelete(address);
  };

  const handleConfirmDelete = () => {
    if (addressToDelete) {
      onDelete(addressToDelete.id);
      setAddressToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setAddressToDelete(null);
  };

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Spinner size="lg" className="text-blue-600" />
      </div>
    );
  }

  if (addresses.length === 0) {
    return (
      <EmptyState
        icon={<PlusIcon />}
        title="No addresses found"
        description="Add your first address to get started"
        action={
          onAdd
            ? {
                label: 'Add Address',
                onClick: onAdd,
              }
            : undefined
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      {onAdd && (
        <div className="flex justify-end">
          <Button onClick={onAdd}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add New Address
          </Button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {addresses.map((address) => (
          <Card
            key={address.id}
            hoverable
            selected={selectedAddressId === address.id}
            onClick={() => onSelect?.(address)}
            className={`relative transition-all ${
              onSelect ? 'cursor-pointer' : ''
            }`}
          >
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      {address.firstName} {address.lastName}
                    </h3>
                    {address.isDefault ? (
                      <Badge variant="success">Default</Badge>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{address.phone}</p>
                  <div className="mt-2 space-y-1 text-sm text-gray-500">
                    <p>{address.addressLine1}</p>
                    {address.addressLine2 && <p>{address.addressLine2}</p>}
                    <p>
                      {address.city}, {address.state} {address.postalCode}
                    </p>
                    <p>{address.country}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                {!address.isDefault && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSetDefault(address.id);
                    }}
                    title="Set as default"
                  >
                    <StarIcon className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(address);
                  }}
                  title="Edit address"
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(address);
                  }}
                  title="Delete address"
                >
                  <TrashIcon className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <ConfirmDialog
        isOpen={!!addressToDelete}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Address"
        description={`Are you sure you want to delete the address for ${
          addressToDelete?.firstName
        } ${addressToDelete?.lastName}? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
        isLoading={isDeletingAddress}
      />
    </div>
  );
};

export default AddressList;
