export async function FetchallItemsCart() {
    try {
        const res = await fetch("http://localhost:8080/api/products", {
            method: "GET",
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Erro ao buscar os produtos");
        }

        return await res.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error na FetchAllItemsCart: ", error.message);
        } else {
            console.error("Error desconhecido na FetchAllItemsCart: ", error);
        }
        return [];
    }
}
