import { useState, useEffect } from "react";
import { Customer } from "@/types/admin/customer-management-page-types";
import { CustomerEditFormValues } from "@/types/admin/customer-edit-page-types";

interface CustomerEditFormProps {
  customer: Customer | null;
  onSubmit: (data: CustomerEditFormValues) => void;
  isSubmitting: boolean;
}

export const CustomerEditForm = ({ customer, onSubmit, isSubmitting }: CustomerEditFormProps) => {
  const [formData, setFormData] = useState<CustomerEditFormValues>({
    customerName: "",
    address: "",
    phoneNumber: "",
    price1: 0,
    price2: 0,
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        customerName: customer.customerName,
        address: customer.address,
        phoneNumber: customer.phoneNumber,
        price1: customer.price1,
        price2: customer.price2,
      });
    }
  }, [customer]);

  const handleChange = (field: keyof CustomerEditFormValues, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          avatar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePriceChange = (field: keyof CustomerEditFormValues, value: string) => {
    const numValue = value.replace(/[^0-9]/g, '');
    setFormData((prev) => ({
      ...prev,
      [field]: numValue ? parseInt(numValue) : 0,
    }));
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!customer) {
    return (
      <div className="text-center py-16 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl">
        <p className="text-gray-600 dark:text-gray-300">
          Không tìm thấy khách hàng.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50">
        <div className="flex justify-center mb-6">
          <img
            src={customer.avatar || `https://i.pravatar.cc/150?u=${customer.customerId}`}
            alt={customer.customerName}
            className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-600 shadow-md"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Avatar
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="w-full px-4 py-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm"
            />
            {formData.avatar && (
              <img 
                src={formData.avatar} 
                alt="Preview" 
                className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-gray-600 shadow-md"
              />
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tên khách hàng
            </label>
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => handleChange("customerName", e.target.value)}
              className="w-full px-4 py-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Địa chỉ
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full px-4 py-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Số điện thoại
            </label>
            <input
              type="text"
              value={formData.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              className="w-full px-4 py-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Giá đá bi (đ/kg)
              </label>
              <input
                type="text"
                value={formatPrice(formData.price1)}
                onChange={(e) => handlePriceChange("price1", e.target.value)}
                className="w-full px-4 py-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Giá đá cây (đ/kg)
              </label>
              <input
                type="text"
                value={formatPrice(formData.price2)}
                onChange={(e) => handlePriceChange("price2", e.target.value)}
                className="w-full px-4 py-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm"
                required
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 rounded-full font-semibold shadow-lg transition-all ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 hover:shadow-xl transform hover:-translate-y-0.5"
          }`}
        >
          {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </div>
    </form>
  );
};
