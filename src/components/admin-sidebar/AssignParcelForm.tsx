/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { PackagePlus, Trash2 } from "lucide-react";
import { useAssignParcelsToAgentMutation } from "../../redux/feature/user/userApi";


const AssignParcelForm = () => {
  const [agentId, setAgentId] = useState("");
  const [parcelIds, setParcelIds] = useState<string[]>([]);
  const [parcelIdInput, setParcelIdInput] = useState("");

  // RTK Query mutation hook
  const [assignParcelsToAgent, { isLoading }] = useAssignParcelsToAgentMutation();

  const handleAddParcelId = () => {
    const trimmed = parcelIdInput.trim();
    if (trimmed !== "" && !parcelIds.includes(trimmed)) {
      setParcelIds((prev) => [...prev, trimmed]);
      setParcelIdInput("");
    }
  };

  const handleRemoveParcelId = (id: string) => {
    setParcelIds((prev) => prev.filter((pid) => pid !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentId || parcelIds.length === 0) {
      alert("Agent ID and at least one Parcel ID are required.");
      return;
    }
    try {
      const data = { agentId, parcelIds };
      await assignParcelsToAgent(data).unwrap();
      alert("Parcels assigned successfully!");
      // Clear form
      setAgentId("");
      setParcelIds([]);
      setParcelIdInput("");
    } catch (error: any) {
      alert(
        error?.data?.message || "Failed to assign parcels. Please try again."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 sm:p-8 bg-white rounded-xl shadow-xl border border-[#027089] transition-all"
    >
      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <PackagePlus className="w-7 h-7 text-[#027089]" />
        <h2 className="text-xl sm:text-2xl font-bold text-[#027089] tracking-wide text-center">
          Assign Parcel to Agent
        </h2>
      </div>

      {/* Agent ID Input */}
      <div className="relative mb-6">
        <input
          type="text"
          value={agentId}
          onChange={(e) => setAgentId(e.target.value)}
          required
          className="peer w-full px-4 pt-6 pb-2 rounded-md border border-[#027089] focus:outline-none focus:ring-2 focus:ring-[#027089] placeholder-transparent"
          placeholder="Agent ID"
          disabled={isLoading}
        />
        <label className="absolute left-4 top-2 text-[#027089] text-sm font-medium peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
          Agent ID
        </label>
      </div>

      {/* Parcel ID Input + Add Button */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 mb-6">
        <div className="relative">
          <input
            type="text"
            value={parcelIdInput}
            onChange={(e) => setParcelIdInput(e.target.value)}
            placeholder="Parcel ID"
            className="peer w-full px-4 pt-6 pb-2 rounded-md border border-[#027089] focus:outline-none focus:ring-2 focus:ring-[#027089] placeholder-transparent"
            disabled={isLoading}
          />
          <label className="absolute left-4 top-2 text-[#027089] text-sm font-medium peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
            Parcel ID
          </label>
        </div>
        <button
          type="button"
          onClick={handleAddParcelId}
          className="px-6 py-3 bg-gradient-to-r from-[#027089] to-[#0399a3] text-white rounded-md font-medium hover:from-[#015f67] hover:to-[#027089] transition-shadow shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={isLoading || parcelIdInput.trim() === ""}
        >
          Add
        </button>
      </div>

      {/* Parcel List */}
      <div className="mb-6 max-h-48 overflow-y-auto border border-[#027089] rounded-md p-3 bg-[#e0f7fa]">
        {parcelIds.length === 0 ? (
          <p className="text-[#555] italic text-center">No parcels added yet.</p>
        ) : (
          <ul className="space-y-2">
            {parcelIds.map((id) => (
              <li
                key={id}
                className="flex justify-between items-center bg-white px-4 py-2 rounded shadow-sm hover:shadow-md transition-all"
              >
                <span className="truncate max-w-xs font-medium text-[#027089]">
                  {id}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveParcelId(id)}
                  className="text-[#cc4444] hover:text-[#a33131] font-medium transition"
                  aria-label={`Remove parcel ID ${id}`}
                  disabled={isLoading}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-gradient-to-r from-[#027089] to-[#0399a3] text-white rounded-lg font-medium text-base hover:from-[#015f67] hover:to-[#027089] shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? "Assigning..." : "Assign Parcel"}
      </button>
    </form>
  );
};

export default AssignParcelForm;
