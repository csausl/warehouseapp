import { useState } from "react";
import { Pencil, Trash2, Save, X } from "lucide-react";

export type Column<T> = {
    key: keyof T;
    label: string;
    editable?: boolean;
    inputType?: "text" | "number" | "select";
    selectOptions?: { value: string; label: string }[];

    render?: (value: T[keyof T], row: T, isEditing: boolean) => React.ReactNode;
};

type Props<T> = {
    columns: Column<T>[];
    data: T[];
    setData: (rows: T[]) => void;
    onSave: (row: T) => Promise<T>;
    onDelete: (id: string) => Promise<void>;
    editingId: string | null;
    setEditingId: (id: string | null) => void;
};

export default function EditableTable<T extends { id: string }>({
                                                                    columns,
                                                                    data,
                                                                    setData,
                                                                    onSave,
                                                                    onDelete,
                                                                    editingId,
                                                                    setEditingId
                                                                }: Props<T>) {

    const [editValues, setEditValues] = useState<Partial<T>>({});

    const startEdit = (row: T) => {
        if (editingId) return; // Keine zweite Zeile gleichzeitig
        setEditingId(row.id);
        setEditValues(row);
    };

    const cancelEdit = () => {
        if (!editingId) return;

        // Neue Zeile löschen
        if (editingId.startsWith("new-")) {
            setData(prev => prev.filter(r => r.id !== editingId));
        }

        setEditingId(null);
        setEditValues({});
    };

    const saveRow = async () => {
        if (!editingId) return;

        const row = data.find(d => d.id === editingId);
        if (!row) return;

        const updated = await onSave({ ...row, ...editValues } as T);

        setData(prev =>
            prev.map(p => (p.id === editingId ? updated : p))
        );

        setEditingId(null);
        setEditValues({});
    };

    const deleteRow = async (id: string) => {
        if (editingId) return; // Wenn editiert wird, keine Löschung

        if (!confirm("Wirklich löschen?")) return;

        await onDelete(id);

        setData(prev => prev.filter(p => p.id !== id));
    };

    return (
        <table className="w-full bg-white shadow rounded-xl overflow-hidden">
            <thead className="bg-gray-100 border-b">
            <tr>
                {columns.map(col => (
                    <th key={String(col.key)} className="p-3 text-left">
                        {col.label}
                    </th>
                ))}
                <th></th>
                <th></th>
            </tr>
            </thead>

            <tbody>
            {data.map(row => {
                const isEditing = editingId === row.id;

                return (
                    <tr key={row.id} className="border-b hover:bg-gray-50">

                        {columns.map(col => {
                            const baseValue = (row as any)[col.key];
                            const value = isEditing
                                ? (editValues as any)[col.key]
                                : baseValue;

                            // 🟡 EDIT MODE
                            if (isEditing && col.editable) {

                                // SELECT
                                if (col.inputType === "select" && col.selectOptions) {
                                    return (
                                        <td key={String(col.key)} className="p-3">
                                            <select
                                                value={value}
                                                className="border rounded p-1 w-full"
                                                onChange={e =>
                                                    setEditValues(prev => ({
                                                        ...prev,
                                                        [col.key]: e.target.value
                                                    }))
                                                }
                                            >
                                                {col.selectOptions.map(o => (
                                                    <option key={o.value} value={o.value}>
                                                        {o.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    );
                                }

                                // TEXT / NUMBER
                                return (
                                    <td key={String(col.key)} className="p-3">
                                        <input
                                            className="border rounded p-1 w-full"
                                            value={value}
                                            type={col.inputType === "number" ? "number" : "text"}
                                            onChange={e =>
                                                setEditValues(prev => ({
                                                    ...prev,
                                                    [col.key]:
                                                        col.inputType === "number"
                                                            ? Number(e.target.value)
                                                            : e.target.value
                                                }))
                                            }
                                        />
                                    </td>
                                );
                            }

                            if (col.render) {
                                return (
                                    <td key={String(col.key)} className="p-3">
                                        {col.render(baseValue, row, isEditing)}
                                    </td>
                                );
                            }

                            return (
                                <td key={String(col.key)} className="p-3">
                                    {baseValue}
                                </td>
                            );
                        })}

                        {/* ACTIONS */}
                        <td className="p-3 text-center">
                            {isEditing ? (
                                <button
                                    className="text-green-600 hover:text-green-800"
                                    onClick={saveRow}
                                >
                                    <Save size={16} />
                                </button>
                            ) : (
                                <button
                                    disabled={!!editingId}
                                    className={`text-yellow-600 hover:text-yellow-800 ${
                                        editingId ? "opacity-30 cursor-not-allowed" : ""
                                    }`}
                                    onClick={() => startEdit(row)}
                                >
                                    <Pencil size={16} />
                                </button>
                            )}
                        </td>

                        <td className="p-3 text-center">
                            {isEditing ? (
                                <button
                                    className="text-gray-600 hover:text-gray-800"
                                    onClick={cancelEdit}
                                >
                                    <X size={16} />
                                </button>
                            ) : (
                                <button
                                    disabled={!!editingId}
                                    className={`text-red-600 hover:text-red-800 ${
                                        editingId ? "opacity-30 cursor-not-allowed" : ""
                                    }`}
                                    onClick={() => deleteRow(row.id)}
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </td>

                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}
