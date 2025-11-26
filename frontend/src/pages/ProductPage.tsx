import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export type Product = {
    id: string;
    name: string;
    quantity: number;
    barcode: string;
    category: string;
};

export type Warehouse = {
    id: string;
    name: string;
};

export default function ProductPage() {
    const { warehouseId } = useParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [warehouse, setWarehouse] = useState<Warehouse | null>(null);
    const [loading, setLoading] = useState(true);

    // Produkte laden
    useEffect(() => {
        axios
            .get(`/api/product/warehouse/${warehouseId}`)
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [warehouseId]);

    // Lagerhaus-Namen laden
    useEffect(() => {
        axios
            .get(`/api/warehouse/${warehouseId}`)
            .then(res => setWarehouse(res.data))
            .catch(() => setWarehouse(null));
    }, [warehouseId]);

    if (loading)
        return (
            <div className="flex justify-center items-center h-40">
                <p className="text-lg">Lade Produkte…</p>
            </div>
        );

    return (
        <div className="flex justify-center w-full mt-10 px-4">
            <div className="w-full max-w-5xl">

                <h1 className="text-xl font-bold mb-6 text-center">
                    Lagerhaus: {warehouse?.name}
                </h1>

                <div className="overflow-x-auto shadow-lg rounded-xl">
                    <table className="min-w-full bg-white dark:bg-neutral-900 rounded-xl overflow-hidden">
                        <thead className="bg-gray-100 dark:bg-neutral-800 border-b dark:border-neutral-700">
                        <tr>
                            <th className="text-left p-4 font-semibold">Produktname</th>
                            <th className="text-left p-4 font-semibold">Menge</th>
                            <th className="text-left p-4 font-semibold">Barcode</th>
                            <th className="text-left p-4 font-semibold">Kategorie</th>
                        </tr>
                        </thead>

                        <tbody>
                        {products.map((p) => (
                            <tr
                                key={p.id}
                                className="border-b dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
                            >
                                <td className="p-4">
                                    <Link to={`/productdetails/${p.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                                        {p.name}
                                    </Link>
                                </td>

                                <td className="p-4">
                                    <Link to={`/productdetails/${p.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                                        {p.quantity}
                                    </Link>
                                </td>

                                <td className="p-4">
                                    <Link to={`/productdetails/${p.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                                        {p.barcode}
                                    </Link>
                                </td>

                                <td className="p-4 capitalize">
                                    <Link to={`/productdetails/${p.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                                        {p.category.toLowerCase()}
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
