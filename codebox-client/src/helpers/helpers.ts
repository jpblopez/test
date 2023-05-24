export async function fetchCustomers<Customer>(url: string): Promise<Customer> {
    const response = await fetch(url);
    const data = await response.json();
    return data as Customer;
}

export async function fetchCustomer<Customer>(url: string): Promise<Customer> {
    const response = await fetch(url);
    const responseData = await response.json();
    const data = responseData.data;
    return data as Customer;
}