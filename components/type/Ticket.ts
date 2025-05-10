export interface ITicket {
    name: string;
    email: string;
    phone: string;
    location: string;
    department: string;
    category: string;
    subCategory: string;
    otherSubCategory?: string;
    title: string;
    details: string;
    image?: File | null;
  }
  