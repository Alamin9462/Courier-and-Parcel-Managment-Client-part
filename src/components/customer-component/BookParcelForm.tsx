import { useState } from "react";
import { Package, MapPin, Truck, DollarSign } from "lucide-react";
import { useCreateParcelMutation } from "../../redux/feature/parcel/Parcel";

const initialForm = {
  pickup: "",
  delivery: "",
  size: "Small",
  payment: "COD",
};

const BookParcelForm = () => {
  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState(false);

  // RTK Query mutation hook
  const [createParcel, { isLoading, error }] = useCreateParcelMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call the createParcel mutation with form data
      await createParcel({
        pickupAddress: form.pickup,
        deliveryAddress: form.delivery,
        type: form.size.toLowerCase(),   
        isCOD: form.payment === 'COD',
        amount: 0, 
      }).unwrap();

      setSuccess(true);
      setForm(initialForm);

      setTimeout(() => setSuccess(false), 2500);
    } catch (err) {
      console.error("Failed to book parcel:", err);
      setSuccess(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-8 bg-white rounded-lg shadow mt-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[#202938]">
        <Package className="w-6 h-6 text-[#007088]" /> Book a Parcel Pickup
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Pickup Address */}
        <div>
          <label className="text-sm font-medium mb-1 flex items-center gap-1">
            <MapPin className="w-4 h-4 text-[#007088]" /> Pickup Address
          </label>
          <input
            type="text"
            name="pickup"
            value={form.pickup}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
            placeholder="Enter pickup address"
          />
        </div>

        {/* Delivery Address */}
        <div>
          <label className="text-sm font-medium mb-1 flex items-center gap-1">
            <MapPin className="w-4 h-4 text-[#007088]" /> Delivery Address
          </label>
          <input
            type="text"
            name="delivery"
            value={form.delivery}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
            placeholder="Enter delivery address"
          />
        </div>

        {/* Parcel Size & Payment */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 flex items-center gap-1">
              <Truck className="w-4 h-4 text-[#007088]" /> Parcel Size/Type
            </label>
            <select
              name="size"
              value={form.size}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium mb-1 flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-[#007088]" /> Payment Type
            </label>
            <select
              name="payment"
              value={form.payment}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="COD">Cash on Delivery (COD)</option>
              <option value="Prepaid">Prepaid</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-full bg-[#007088] border-[#007088] hover:bg-[#005e6e] text-white font-semibold"
        >
          {isLoading ? "Booking..." : "Book Parcel"}
        </button>

        {success && (
          <div className="mt-2 text-green-600 font-semibold text-center">
            Parcel booking successful!
          </div>
        )}

        {error && (
          <div className="mt-2 text-red-600 font-semibold text-center">
            Failed to book parcel. Please try again.
          </div>
        )}
      </form>
    </div>
  );
};

export default BookParcelForm;

