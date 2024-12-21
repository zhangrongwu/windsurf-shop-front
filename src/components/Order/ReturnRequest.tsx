import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { OrderItem, CreateReturnRequestInput } from '../../types/order';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

const returnSchema = z.object({
  reason: z.string().min(1, 'Please select a reason'),
  description: z.string().min(10, 'Please provide more details about the return'),
});

interface ReturnRequestProps {
  orderItem: OrderItem;
  onSubmit: (data: CreateReturnRequestInput) => Promise<void>;
  onCancel: () => void;
}

const returnReasons = [
  'Wrong size or fit',
  'Defective or damaged item',
  'Not as described',
  'Changed mind',
  'Received wrong item',
  'Other',
];

const ReturnRequest: React.FC<ReturnRequestProps> = ({
  orderItem,
  onSubmit,
  onCancel,
}) => {
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateReturnRequestInput>({
    resolver: zodResolver(returnSchema),
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    try {
      // 这里应该实现实际的图片上传逻辑
      const uploadedUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prev) => [...prev, ...uploadedUrls]);
    } catch (error) {
      console.error('Image upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const onSubmitForm = async (data: CreateReturnRequestInput) => {
    try {
      await onSubmit({
        ...data,
        orderItemId: orderItem.id.toString(),
        images,
      });
    } catch (error) {
      console.error('Error submitting return request:', error);
    }
  };

  return (
    <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Return Request
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Please provide details about your return request.
          </p>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-gray-700"
                >
                  Reason for Return
                </label>
                <select
                  {...register('reason')}
                  id="reason"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">Select a reason</option>
                  {returnReasons.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
                {errors.reason && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.reason.message}
                  </p>
                )}
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  {...register('description')}
                  id="description"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Please provide more details about the return"
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Images (Optional)
                </label>
                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploading}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
                {uploading && (
                  <div className="mt-2 text-sm text-gray-500">
                    Uploading images...
                  </div>
                )}
                {images.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="relative rounded-md overflow-hidden"
                      >
                        <img
                          src={image}
                          alt={`Uploaded ${index + 1}`}
                          className="w-full h-32 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isSubmitting
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Return Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReturnRequest;
