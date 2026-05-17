"use client";

import { useState } from "react";
import { supabase } from "../../../../utils/supabase/client";
import { Plus, X, Settings2 } from "lucide-react";

// Interfaces
interface ServiceStatus {
  id: string;
  name: string;
  color: string;
}

export interface ServiceOrder {
  id: string;
  queue_number: string;
  receipt_number: string;
  customer_name: string;
  customer_phone: string;
  device_name: string;
  problem: string;
  technician_name: string;
  estimated_finished_at: string;
  status_id: string;
  created_at: string;
  service_statuses?: ServiceStatus;
}

export const ServiceOrderSection = ({
  initialOrders,
  statuses,
}: {
  initialOrders: ServiceOrder[];
  statuses: ServiceStatus[];
}) => {
  const [orders, setOrders] = useState<ServiceOrder[]>(initialOrders || []);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form States
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [problem, setProblem] = useState("");
  const [technicianName, setTechnicianName] = useState("");
  const [statusId, setStatusId] = useState("");

  const resetForm = () => {
    setCustomerName("");
    setCustomerPhone("");
    setDeviceName("");
    setProblem("");
    setTechnicianName("");
    setStatusId("");
  };

  const handleCreateOrder = async () => {
    // VALIDASI INPUT DASAR
    if (!customerName || !deviceName || !problem || !statusId) {
      alert("Nama Pelanggan, Perangkat, Keluhan, dan Status wajib diisi!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Auto-generate Queue & Receipt Number sederhana
      const queueNumber = `Q-${Math.floor(1000 + Math.random() * 9000)}`;
      const receiptNumber = `INV-${Date.now()}`;

      // INSERT DATABASE & JOIN STATUS (Agar UI langsung update dengan warna/nama status)
      const { data: newOrder, error: insertError } = await supabase
        .from("service_orders")
        .insert({
          queue_number: queueNumber,
          receipt_number: receiptNumber,
          customer_name: customerName,
          customer_phone: customerPhone,
          device_name: deviceName,
          problem: problem,
          technician_name: technicianName,
          status_id: statusId,
        })
        .select(`
          *,
          service_statuses (
            id,
            name,
            color
          )
        `)
        .single();

      if (insertError) {
        throw insertError;
      }

      // UPDATE UI (Tambahkan order baru ke urutan paling atas)
      if (newOrder) {
        setOrders((prev) => [newOrder as ServiceOrder, ...prev]);
      }

      // RESET
      resetForm();
      setShowForm(false);
    } catch (error: any) {
      alert(`Gagal menyimpan order: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-10">
      {/* HEADER & ACTION BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-5 h-10 bg-[#DB4444] rounded-sm"></div>
          <h1 className="text-2xl font-bold">Service Orders</h1>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="group flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-6 py-3.5 rounded-2xl font-bold shadow-lg shadow-slate-900/10 hover:shadow-indigo-500/20 transition-all duration-300 active:scale-95 text-sm"
        >
          <Plus size={18} className="transition-transform group-hover:rotate-90" />
          Order Baru
        </button>
      </div>

      {/* STATUS LIST */}
      <div className="bg-[#F5F5F5] border border-gray-100 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Settings2 className="w-5 h-5 text-[#DB4444]" />
          <h2 className="font-semibold">Status List</h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {statuses?.map((status) => (
            <div
              key={status.id}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border text-sm"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: status.color }}
              />
              {status.name}
            </div>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F5F5F5] text-left">
              <tr>
                <th className="p-4">Queue</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Device</th>
                <th className="p-4">Problem</th>
                <th className="p-4">Technician</th>
                <th className="p-4">Status</th>
                <th className="p-4">Created</th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    Belum ada service order.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-semibold text-[#DB4444]">
                      {order.queue_number}
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{order.customer_name}</div>
                      <div className="text-xs text-gray-500">
                        {order.customer_phone || "-"}
                      </div>
                    </td>
                    <td className="p-4">{order.device_name}</td>
                    <td className="p-4 max-w-xs truncate">{order.problem}</td>
                    <td className="p-4">{order.technician_name || "-"}</td>
                    <td className="p-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium text-white whitespace-nowrap"
                        style={{
                          backgroundColor:
                            order.service_statuses?.color || "#DB4444",
                        }}
                      >
                        {order.service_statuses?.name || "Unknown"}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 text-xs">
                      {new Date(order.created_at).toLocaleDateString("id-ID")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL FORM */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-[2.5rem] p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200 my-8">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => {
                resetForm();
                setShowForm(false);
              }}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Informasi Service Order
            </h2>

            <div className="space-y-5">
              {/* CUSTOMER INFO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-slate-700 mb-1.5 block">
                    Nama Pelanggan *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Misal: Budi Santoso"
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-700 mb-1.5 block">
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Misal: 08123456789"
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                  />
                </div>
              </div>

              {/* DEVICE INFO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-slate-700 mb-1.5 block">
                    Nama Perangkat *
                  </label>
                  <input
                    type="text"
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                    placeholder="Misal: iPhone 13 Pro"
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-700 mb-1.5 block">
                    Nama Teknisi
                  </label>
                  <input
                    type="text"
                    value={technicianName}
                    onChange={(e) => setTechnicianName(e.target.value)}
                    placeholder="Misal: Andi"
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                  />
                </div>
              </div>

              {/* PROBLEM & STATUS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-sm font-bold text-slate-700 mb-1.5 block">
                    Keluhan / Kerusakan *
                  </label>
                  <textarea
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    placeholder="Deskripsikan kerusakan perangkat..."
                    rows={3}
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium resize-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-bold text-slate-700 mb-1.5 block">
                    Status Order *
                  </label>
                  <select
                    value={statusId}
                    onChange={(e) => setStatusId(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium appearance-none"
                  >
                    <option value="" disabled>Pilih Status Awal</option>
                    {statuses.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCreateOrder}
                  disabled={isSubmitting}
                  className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-70 flex justify-center items-center"
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan Order"}
                </button>

                <button
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                  disabled={isSubmitting}
                  className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all active:scale-95"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};