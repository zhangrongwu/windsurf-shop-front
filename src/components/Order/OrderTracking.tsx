import React from 'react';
import { OrderTracking } from '../../types/order';
import { CheckCircleIcon, TruckIcon, CubeIcon } from '@heroicons/react/24/outline';

interface OrderTrackingProps {
  tracking: OrderTracking[];
}

const statusIcons = {
  PENDING: CubeIcon,
  CONFIRMED: CheckCircleIcon,
  PROCESSING: CubeIcon,
  SHIPPED: TruckIcon,
  DELIVERED: CheckCircleIcon,
  CANCELLED: CheckCircleIcon,
  RETURNED: TruckIcon,
};

const statusColors = {
  PENDING: 'bg-gray-400',
  CONFIRMED: 'bg-blue-500',
  PROCESSING: 'bg-yellow-500',
  SHIPPED: 'bg-purple-500',
  DELIVERED: 'bg-green-500',
  CANCELLED: 'bg-red-500',
  RETURNED: 'bg-orange-500',
};

const OrderTrackingComponent: React.FC<OrderTrackingProps> = ({ tracking }) => {
  const sortedTracking = [...tracking].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {sortedTracking.map((track, trackIdx) => {
          const Icon = statusIcons[track.status];
          const colorClass = statusColors[track.status];

          return (
            <li key={track.id}>
              <div className="relative pb-8">
                {trackIdx !== sortedTracking.length - 1 ? (
                  <span
                    className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${colorClass}`}
                    >
                      <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm text-gray-500">
                        {track.description}
                        {track.location && (
                          <span className="font-medium text-gray-900">
                            {' '}
                            at {track.location}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                      <time dateTime={track.timestamp.toISOString()}>
                        {new Date(track.timestamp).toLocaleString()}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OrderTrackingComponent;
