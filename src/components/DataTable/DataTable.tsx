import { useState } from "react";
import { create } from "zustand";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import "./styles.css";

interface Item {
  id: number;
  name: string;
  email: string;
  status: boolean;
}

interface Store {
  data: Item[];
  addItem: (item: Item) => void;
  updateItem: (updatedItem: Item) => void;
  deleteItem: (id: number) => void;
  toggleStatus: (id: number) => void;
}

const useStore = create<Store>((set) => ({
  data: [
    { id: 1, name: "Ejemplo 1", email: "ejemplo1@email.com", status: true },
    { id: 2, name: "Ejemplo 2", email: "ejemplo2@email.com", status: false },
  ],
  addItem: (item) => set((state) => ({ data: [...state.data, item] })),
  updateItem: (updatedItem) =>
    set((state) => ({
      data: state.data.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    })),
  deleteItem: (id) => set((state) => ({ data: state.data.filter((item) => item.id !== id) })),
  toggleStatus: (id) =>
    set((state) => ({
      data: state.data.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      ),
    })),
}));

function ItemForm({ open, onClose, item }: { open: boolean; onClose: () => void; item?: Item }) {
  const { addItem, updateItem } = useStore();
  const [form, setForm] = useState<Item>(item || { id: 0, name: "", email: "", status: true });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (form.id) {
      updateItem(form);
    } else {
      addItem({ ...form, id: Date.now() });
    }
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{form.id ? "Editar Registro" : "Nuevo Registro"}</h2>
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Correo" value={form.email} onChange={handleChange} />
        <button onClick={handleSubmit} className="btn-save">Guardar</button>
        <button onClick={onClose} className="btn-cancel">Cancelar</button>
      </div>
    </div>
  );
}

export default function DataTable() {
  const { data, deleteItem, toggleStatus } = useStore();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const columns: ColumnDef<Item>[] = [
    { accessorKey: "name", header: "Nombre" },
    { accessorKey: "email", header: "Correo" },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => (
        <button onClick={() => toggleStatus(row.original.id)} className={`status ${row.original.status ? "active" : "inactive"}`}>
          {row.original.status ? "Activo" : "Inactivo"}
        </button>
      ),
    },
    {
      accessorKey: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="actions">
          <button onClick={() => setSelectedItem(row.original)} className="btn-edit">Editar</button>
          <button onClick={() => deleteItem(row.original.id)} className="btn-delete">Eliminar</button>
        </div>
      ),
    },
  ];

  const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="container">
      <button onClick={() => setSelectedItem({ id: 0, name: "", email: "", status: true })} className="btn-add">Agregar Nuevo</button>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedItem && <ItemForm open={!!selectedItem} onClose={() => setSelectedItem(null)} item={selectedItem} />}
    </div>
  );
}
