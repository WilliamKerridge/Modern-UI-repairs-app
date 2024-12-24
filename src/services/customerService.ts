interface CustomerContact {
  name: string;
  email: string;
}

export const getCustomerContact = async (rmaNumber: string): Promise<CustomerContact> => {
  try {
    // Here you would implement the actual database query
    // First check RMA contacts, then fall back to customer account
    // This is a mock implementation
    return {
      name: "John Smith",
      email: "john.smith@acme.com"
    };
  } catch (error) {
    console.error('Error fetching customer contact:', error);
    throw error;
  }
};