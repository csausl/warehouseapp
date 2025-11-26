import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export type Warehouse = {
    id: string;
    name: string;
    city: string;
    street: string;
    houseNumber: string;
    zipCode: string;
};

export default function WarehousePage() {
    // Liste aller Lagerhäuser vom Backend
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    // zeigt, ob die Daten noch geladen werden
    const [loading, setLoading] = useState(true);

    // lädt Daten vom Backend
    useEffect(() => {
        axios.get("/api/warehouse")
            .then(res => {
                setWarehouses(res.data);   // speichert Daten im State
                setLoading(false);         // lädt nicht mehr
            })
            .catch(() => setLoading(false)); // Fehler → trotzdem fertig
    }, []);

    // Anzeige während die Daten geladen werden
    if (loading) return <p className="p-4">Lade Lagerhäuser…</p>;

    return (
        <div className="flex justify-center w-full mt-10">
            <div className="w-full max-w-5xl">
                <h1 className="text-2xl font-bold mb-6 text-center">Lagerhäuser</h1>

                <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 border-b">
                    <tr>
                        <th className="text-left p-4 font-semibold">Name</th>
                        <th className="text-left p-4 font-semibold">Stadt</th>
                        <th className="text-left p-4 font-semibold">Straße</th>
                        <th className="text-left p-4 font-semibold">Nr.</th>
                        <th className="text-left p-4 font-semibold">PLZ</th>
                    </tr>
                    </thead>

                    <tbody>
                    {warehouses.map((wh) => (
                        <tr
                            key={wh.id}
                            className="border-b hover:bg-gray-50 transition"
                        >
                            <td className="p-4 pr-14">
                                <Link
                                    to={`/warehouse/${wh.id}/products`}
                                    className="text-blue-600 underline hover:no-underline"
                                >
                                    {wh.name}
                                </Link>
                            </td>

                            <td className="p-4">
                                <Link
                                    to={`/warehouse/${wh.id}/products`}
                                    className="text-blue-600 underline hover:no-underline"
                                >
                                    {wh.city}
                                </Link>
                            </td>

                            <td className="p-4">
                                <Link
                                    to={`/warehouse/${wh.id}/products`}
                                    className="text-blue-600 underline hover:no-underline"
                                >
                                    {wh.street}
                                </Link>
                            </td>

                            <td className="p-4">
                                <Link
                                    to={`/warehouse/${wh.id}/products`}
                                    className="text-blue-600 underline hover:no-underline"
                                >
                                    {wh.houseNumber}
                                </Link>
                            </td>

                            <td className="p-4">
                                <Link
                                    to={`/warehouse/${wh.id}/products`}
                                    className="text-blue-600 underline hover:no-underline"
                                >
                                    {wh.zipCode}
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
