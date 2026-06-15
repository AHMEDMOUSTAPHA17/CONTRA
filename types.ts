
export type Civility = 'السيد' | 'السيدة' | 'الآنسة';
export type Language = 'ar' | 'fr' | 'en';

export interface Client {
  id?: number;
  // Identity
  firstName: string; // Prenom
  lastName: string;  // Nom
  civility: Civility;
  birthDate: string;
  birthPlace: string;
  fatherName: string; // Fils de
  motherName: string; // Et de (Nom complet de la mere)

  // Official Documents
  nationalId: string; // CNI/PC Number
  idIssuedDate: string;
  idIssuedBy: string;
  socialSecurityNumber?: string; // Optional but recommended

  // Contact & Location
  address: string;
  commune: string;
  wilaya: string;
  phone: string;
  phone2?: string;

  // Solvency
  jobTitle: string; // Fonction
  employer: string; // Employeur
  photo?: string; // Base64 string for the image

  // Computed for display
  fullName?: string;
}

export interface Product {
  id?: number;
  reference: string; // Référence_tarif (New)
  name: string; // Désignation
  price: number; // Prix_unitaire
  category: string;
  image?: string; // Optional Base64
}

export interface CartItem extends Product {
  cartId: string; // Unique ID for list rendering
  quantity: number; // Added quantity
}

export interface Contract {
  id?: number;
  clientId: number;
  // Denormalized Client Data (Snapshot at time of contract)
  clientName: string;
  clientNationalId: string;
  clientAddress: string;
  clientPhone: string;

  items: CartItem[];
  totalOriginalPrice: number;
  profitMarginPercent: number;
  totalWithProfit: number;
  downPayment: number;
  remainingAmount: number;
  months: number;
  monthlyInstallment: number;
  createdAt: Date;

  // Payment Details
  paymentDay?: string;
  paymentMethod?: string;
}

export interface PageSettings {
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  fontSize: number;
  secondPageContentAr: string;
  secondPageContentFr: string;
  watermarkLogo?: string; // Base64
  arColumnWidth?: number; // Percentage for Arabic column (e.g. 50 for 50/50)
  cityAr?: string;
  cityFr?: string;
  darkMode?: boolean;
  primaryColor?: string;
}

export interface AppSettings {
  id: string;
  page: PageSettings;
}
