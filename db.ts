import Dexie, { Table } from 'dexie';
import { Client, Product, Contract, AppSettings } from './types';

export type SahhilDatabase = Dexie & {
  clients: Table<Client, number>;
  products: Table<Product, number>;
  contracts: Table<Contract, number>;
  settings: Table<AppSettings, string>;
};

export const db = new Dexie('SahhilDB') as SahhilDatabase;

// Upgrade version to support new fields
db.version(4).stores({
  clients: '++id, lastName, firstName, nationalId, phone',
  products: '++id, name, reference, category', // Added reference index
  contracts: '++id, clientId, createdAt',
  settings: 'id'
});

// Seed initial data if empty
db.on('populate', () => {
  // Default Settings
  db.settings.add({
    id: 'main',
    page: {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: -1,
      marginRight: 0,
      fontSize: 10,
      secondPageContentAr: '',
      secondPageContentFr: '',
      arColumnWidth: 40,
      cityAr: 'تيارت',
      cityFr: 'TIARET',
    }
  });
  db.products.bulkAdd([
    { reference: 'PH-15PM', name: 'iPhone 15 Pro Max', price: 140000, category: 'هواتف' },
    { reference: 'SM-S24U', name: 'Samsung S24 Ultra', price: 135000, category: 'هواتف' },
    { reference: 'PS5-SLM', name: 'PlayStation 5 Slim', price: 55000, category: 'ألعاب' },
    { reference: 'MAC-M2', name: 'MacBook Air M2', price: 120000, category: 'لابتوب' },
    { reference: 'TV-SAM55', name: 'Smart TV Samsung 55"', price: 65000, category: 'تلفاز' },
    { reference: 'LG-REF18', name: 'ثلاجة LG 18 قدم', price: 85000, category: 'أجهزة منزلية' },
    { reference: 'CND-12K', name: 'مكيف Condor 12000 BTU', price: 42000, category: 'أجهزة منزلية' },
  ]);

  db.clients.add({
    firstName: 'عميل',
    lastName: 'افتراضي',
    civility: 'السيد',
    birthDate: '1990-01-01',
    birthPlace: 'الجزائر',
    fatherName: 'محمد',
    motherName: 'فاطمة',
    nationalId: '000000000',
    idIssuedDate: '2020-01-01',
    idIssuedBy: 'الجزائر الوسطى',
    address: 'حي المستقبل',
    commune: 'الجزائر',
    wilaya: 'الجزائر',
    phone: '0000000000',
    jobTitle: 'موظف',
    employer: 'الشركة الوطنية',
    fullName: 'عميل افتراضي'
  });
});