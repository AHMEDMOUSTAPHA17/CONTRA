
import React, { useState, useMemo, useEffect } from 'react';
import { db } from './db';
import { useLiveQuery } from 'dexie-react-hooks';
import { Client, Product, CartItem, Contract, Language } from './types';
import { ContractTemplate } from './components/ContractTemplate';
import { DEFAULT_CONTENT_FR, DEFAULT_CONTENT_AR } from './defaultContent';
import { formatCurrencyArabic } from './utils/numberToArabicWords';
import {
  Users,
  ShoppingCart,
  Printer,
  Calculator,
  Search,
  Plus,
  Trash2,
  Save,
  Package,
  History,
  UserPlus,
  CreditCard,
  MapPin,
  Briefcase,
  Camera,
  X,
  Settings,
  Pencil,
  FileSpreadsheet,
  Download,
  Upload,
  LayoutDashboard,
  CheckCircle2,
  Eye,
  FileText,
  FileDown,
  Languages,
  Globe,
  Info
} from 'lucide-react';

// --- i18n Dictionary ---
const translations: Record<Language, any> = {
  ar: {
    title: "الفلاح للتقسيط",
    dashboard: "لوحة البيع",
    settings: "الإعدادات",
    products: "المنتجات",
    clients: "العملاء",
    general: "عام",
    client: "العميل",
    searchProduct: "بحث منتج...",
    searchClient: "بحث عن عميل...",
    cart: "السلة",
    editPriceQty: "يمكنك تعديل السعر والكمية",
    emptyCart: "أضف منتجات من القائمة",
    installmentSettings: "إعدادات التقسيط",
    downPayment: "الدفعة المقدمة (DA)",
    duration: "عدد الاشهر",
    months: "أشهر",
    paymentDay: "يوم الدفع",
    paymentMethod: "طريقة الدفع",
    profitMargin: "نسبة الفائدة / الهامش",
    contractSummary: "ملخص العقد",
    originalTotal: "الإجمالي الأصلي",
    totalWithProfit: "الإجمالي (بالفوائد)",
    monthlyPayment: "القسط الشهري",
    previewContract: "معاينة العقد",
    recentOperations: "عمليات حديثة (نقر مرتين للمعاينة)",
    noOperations: "لا توجد عمليات سابقة",
    exportExcel: "تصدير Excel",
    importExcel: "استيراد Excel",
    newProduct: "منتج جديد",
    newClient: "عميل جديد",
    save: "حفظ",
    cancel: "إلغاء",
    edit: "تعديل",
    delete: "حذف",
    language: "اللغة",
    selectLanguage: "اختر لغة الواجهة",
    price: "السعر",
    quantity: "الكمية",
    category: "الفئة",
    reference: "المرجع",
    designation: "التعيين",
    phone: "الهاتف",
    fullName: "الاسم الكامل",
    address: "العنوان",
    identityData: "بيانات الهوية",
    officialDocs: "الوثائق الرسمية",
    contact: "الاتصال",
    job: "الوظيفة",
    employer: "جهة العمل",
    financialCapacity: "الملاءة المالية",
    saveData: "حفظ البيانات",
    close: "إغلاق",
    printContract: "طباعة العقد",
    exportPDF: "تصدير PDF",
    previewTitle: "معاينة العقد",
    previewSubtitle: "راجع البيانات بدقة قبل الطباعة أو الحفظ",
    cash: "نقداً",
    transfer: "تحويل",
    cheque: "شيك",
    directDebit: "اقتطاع",
    downloadData: "تنزيل البيانات",
    pdfInstruction: "يتم الآن تصدير الملف مباشرة كـ PDF عالي الجودة بمجرد الضغط على الزر.",
    pageContentSettings: "إعدادات الصفحة والمحتوى",
    margins: "الهوامش (مم)",
    marginTop: "الهامش العلوي",
    marginBottom: "الهامش السفلي",
    marginLeft: "الهامش الأيسر",
    marginRight: "الهامش الأيمن",
    fontSize: "حجم الخط الأساسي",
    secondPageAr: "محتوى الصفحة الثانية (العربية)",
    secondPageFr: "محتوى الصفحة الثانية (الفرنسية)",
    watermark: "العلامة المائية (Logo)",
    uploadLogo: "تحميل الشعار",
    resetToDefault: "إعادة ضبط المحتوى الافتراضي",
    arColumnWidth: "عرض عمود اللغة العربية (%)",
    cityAr: "المدينة (بالعربية)",
    cityFr: "المدينة (بالفرنسية)",
    history: "سجل العقود",
    actions: "الإجراءات",
    noContracts: "لا توجد عقود مسجلة بعد",
    confirmDelete: "هل أنت متأكد من الحذف؟",
    darkMode: "الوضع الداكن",
    primaryColor: "لون البرنامج",
    appearance: "المظهر",
    makeBold: "نص عريض",
    socialSecurityNumber: "رقم الضمان الاجتماعي",
    idIssuedDate: "الصادرة بتاريخ",
    birthDate: "تاريخ الميلاد",
    birthPlace: "مكان الميلاد",
    fatherName: "اسم الأب",
    motherName: "اسم ولقب الأم",
  },
  fr: {
    title: "FALAH Facilités",
    dashboard: "Vente",
    settings: "Paramètres",
    products: "Produits",
    clients: "Clients",
    general: "Général",
    client: "Client",
    searchProduct: "Rechercher un produit...",
    searchClient: "Rechercher un client...",
    cart: "Panier",
    editPriceQty: "Modifiez prix et quantité",
    emptyCart: "Panier vide",
    installmentSettings: "Calcul Crédit",
    downPayment: "Apport Initial (DA)",
    duration: "Nombre de mois",
    months: "Mois",
    paymentDay: "Jour de paiement",
    paymentMethod: "Mode de paiement",
    profitMargin: "Marge bénéficiaire",
    contractSummary: "Résumé",
    originalTotal: "Total d'origine",
    totalWithProfit: "Total avec marge",
    monthlyPayment: "Mensualité",
    previewContract: "Aperçu Contrat",
    recentOperations: "Historique (Double clic pour voir)",
    noOperations: "Aucun historique",
    exportExcel: "Exporter Excel",
    importExcel: "Importer Excel",
    newProduct: "Nouveau Produit",
    newClient: "Nouveau Client",
    save: "Enregistrer",
    cancel: "Annuler",
    edit: "Modifier",
    delete: "Supprimer",
    language: "Langue",
    selectLanguage: "Langue de l'interface",
    price: "Prix",
    quantity: "Quantité",
    category: "Catégorie",
    reference: "Référence",
    designation: "Désignation",
    phone: "Téléphone",
    fullName: "Nom complet",
    address: "Adresse",
    identityData: "Identité",
    officialDocs: "Documents Officiels",
    contact: "Contact",
    job: "Profession",
    employer: "Employeur",
    financialCapacity: "Solvabilité",
    saveData: "Enregistrer",
    close: "Fermer",
    printContract: "Imprimer",
    exportPDF: "Exporter PDF",
    previewTitle: "Aperçu du Contrat",
    previewSubtitle: "Vérifiez les données avant l'impression",
    cash: "Espèces",
    transfer: "Virement",
    cheque: "Chèque",
    directDebit: "Prélèvement",
    downloadData: "Télécharger",
    pdfInstruction: "Le fichier est maintenant exporté directement en PDF de haute qualité.",
    pageContentSettings: "Réglages Page & Contenu",
    margins: "Marges (mm)",
    marginTop: "Marge Haut",
    marginBottom: "Marge Bas",
    marginLeft: "Marge Gauche",
    marginRight: "Marge Droite",
    fontSize: "Taille de Police",
    secondPageAr: "Contenu Page 2 (Arabe)",
    secondPageFr: "Contenu Page 2 (Français)",
    watermark: "Filigrane (Logo)",
    uploadLogo: "Charger Logo",
    resetToDefault: "Réinitialiser le contenu",
    arColumnWidth: "Largeur colonne Arabe (%)",
    cityAr: "Ville (Arabe)",
    cityFr: "Ville (Français)",
    history: "Historique",
    actions: "Actions",
    noContracts: "Aucun contrat enregistré",
    confirmDelete: "Êtes-vous sûr de vouloir supprimer ?",
    darkMode: "Mode Sombre",
    primaryColor: "Couleur Appli",
    appearance: "Apparence",
    makeBold: "Gras",
    socialSecurityNumber: "N° Sécurité Sociale",
    idIssuedDate: "Délivrée le",
    birthDate: "Date de naissance",
    birthPlace: "Lieu de naissance",
    fatherName: "Nom du Père",
    motherName: "Nom et Prénom de la Mère",
  },
  en: {
    title: "FALAH FACILITE",
    dashboard: "Sales Panel",
    settings: "Settings",
    products: "Products",
    clients: "Clients",
    general: "General",
    client: "Client",
    searchProduct: "Search product...",
    searchClient: "Search client...",
    cart: "Cart",
    editPriceQty: "You can edit price and quantity",
    emptyCart: "Add products to list",
    installmentSettings: "Installment Settings",
    downPayment: "Down Payment (DA)",
    duration: "Number of months",
    months: "Months",
    paymentDay: "Payment Day",
    paymentMethod: "Payment Method",
    profitMargin: "Profit Margin",
    contractSummary: "Contract Summary",
    originalTotal: "Original Total",
    totalWithProfit: "Total with Margin",
    monthlyPayment: "Monthly Payment",
    previewContract: "Preview Contract",
    recentOperations: "Recent Operations (Double click to view)",
    noOperations: "No history found",
    exportExcel: "Export Excel",
    importExcel: "Import Excel",
    newProduct: "New Product",
    newClient: "New Client",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    language: "Language",
    selectLanguage: "Interface Language",
    price: "Price",
    quantity: "Quantity",
    category: "Category",
    reference: "Reference",
    designation: "Designation",
    phone: "Phone",
    fullName: "Full Name",
    address: "Address",
    identityData: "Identity Data",
    officialDocs: "Official Docs",
    contact: "Contact",
    job: "Job Title",
    employer: "Employer",
    financialCapacity: "Financial Capacity",
    saveData: "Save Data",
    close: "Close",
    printContract: "Print",
    exportPDF: "Export PDF",
    previewTitle: "Contract Preview",
    previewSubtitle: "Review data carefully before printing",
    cash: "Cash",
    transfer: "Transfer",
    cheque: "Cheque",
    directDebit: "Direct Debit",
    downloadData: "Download",
    pdfInstruction: "The file is now exported directly as a high-quality PDF.",
    pageContentSettings: "Page & Content Settings",
    margins: "Margins (mm)",
    marginTop: "Top Margin",
    marginBottom: "Bottom Margin",
    marginLeft: "Left Margin",
    marginRight: "Right Margin",
    fontSize: "Font Size",
    secondPageAr: "Second Page (Arabic)",
    secondPageFr: "Second Page (French)",
    watermark: "Watermark (Logo)",
    uploadLogo: "Upload Logo",
    resetToDefault: "Reset to Default",
    arColumnWidth: "Arabic Column Width (%)",
    cityAr: "City (Arabic)",
    cityFr: "City (French)",
    history: "History",
    actions: "Actions",
    noContracts: "No contracts found",
    confirmDelete: "Are you sure you want to delete?",
    darkMode: "Dark Mode",
    primaryColor: "App Color",
    appearance: "Appearance",
    makeBold: "Bold",
  }
};

const inputClass = "w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all";
const labelClass = "block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5";

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('sahhil_lang') as Language) || 'ar');
  const t = (key: string) => translations[lang][key] || key;

  useEffect(() => {
    localStorage.setItem('sahhil_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const appSettings = useLiveQuery(() => db.settings.get('main'));

  useEffect(() => {
    if (appSettings?.page.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    if (appSettings?.page.primaryColor) {
      document.documentElement.style.setProperty('--primary-color', appSettings.page.primaryColor);
    } else {
      document.documentElement.style.setProperty('--primary-color', '#10b981'); // Default emerald-500
    }
  }, [appSettings?.page.darkMode, appSettings?.page.primaryColor]);

  useEffect(() => {
    const ensureSettings = async () => {
      const s = await db.settings.get('main');
      if (!s) {
        await db.settings.add({
          id: 'main',
          page: {
            marginTop: 0,
            marginBottom: 0,
            marginLeft: -1,
            marginRight: 0,
            fontSize: 10,
            secondPageContentAr: DEFAULT_CONTENT_AR,
            secondPageContentFr: DEFAULT_CONTENT_FR,
            arColumnWidth: 40,
            cityAr: 'تيارت',
            cityFr: 'TIARET',
          }
        });
      }
    };
    ensureSettings();
  }, []);

  const [currentView, setCurrentView] = useState<'dashboard' | 'settings'>('dashboard');
  const [settingsTab, setSettingsTab] = useState<'products' | 'clients' | 'general' | 'page' | 'history'>('products');

  const clients = useLiveQuery(() => db.clients.toArray());
  const products = useLiveQuery(() => db.products.toArray());
  // Removed duplicate appSettings
  const allContracts = useLiveQuery(() => db.contracts.toArray());
  const contractsHistory = useLiveQuery(() => db.contracts.orderBy('id').reverse().limit(10).toArray());

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [clientSearch, setClientSearch] = useState('');

  const [downPayment, setDownPayment] = useState<number>(0);
  const [months, setMonths] = useState<number>(6);
  const [profitMargin, setProfitMargin] = useState<number>(0);

  const [paymentDay, setPaymentDay] = useState<string>('25');
  const [paymentMethod, setPaymentMethod] = useState<string>('Prélèvement');

  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isEditingClient, setIsEditingClient] = useState(false);

  const initialClientState: Client = {
    firstName: '', lastName: '', civility: 'السيد', birthDate: '', birthPlace: '',
    fatherName: '', motherName: '', nationalId: '', idIssuedDate: '', idIssuedBy: '',
    socialSecurityNumber: '', address: '', commune: '', wilaya: '', phone: '',
    phone2: '', jobTitle: '', employer: '', photo: '',
  };
  const [clientForm, setClientForm] = useState<Client>(initialClientState);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);
  const [pasteData, setPasteData] = useState('');

  const initialProductState: Product = { name: '', reference: '', price: 0, category: 'عام' };
  const [productForm, setProductForm] = useState<Product>(initialProductState);

  const [showPreview, setShowPreview] = useState(false);
  const [draftContract, setDraftContract] = useState<Contract | null>(null);

  const [localContentAr, setLocalContentAr] = useState('');
  const [localContentFr, setLocalContentFr] = useState('');
  const [isSettingsInitialized, setIsSettingsInitialized] = useState(false);

  useEffect(() => {
    if (appSettings?.page && !isSettingsInitialized) {
      setLocalContentAr(appSettings.page.secondPageContentAr || '');
      setLocalContentFr(appSettings.page.secondPageContentFr || '');
      setIsSettingsInitialized(true);
    }
  }, [appSettings?.page, isSettingsInitialized]);

  const totals = useMemo(() => {
    const originalTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const profitAmount = originalTotal * (profitMargin / 100);
    const totalWithProfit = originalTotal + profitAmount;
    const remaining = Math.max(0, totalWithProfit - downPayment);
    const monthlyPayment = months > 0 ? remaining / months : 0;
    return { originalTotal, totalWithProfit, remaining, monthlyPayment: Math.round(monthlyPayment) };
  }, [cart, profitMargin, downPayment, months]);

  const handleLoadContractFromHistory = async (contract: Contract) => {
    const client = await db.clients.get(contract.clientId);
    if (!client) return alert('Data missing');
    setSelectedClient(client);
    setCart(contract.items);
    setDownPayment(contract.downPayment);
    setMonths(contract.months);
    setProfitMargin(contract.profitMarginPercent);
    setPaymentDay(contract.paymentDay || '25');
    setPaymentMethod(contract.paymentMethod || 'Prélèvement');
    setDraftContract(contract);
    setCurrentView('dashboard');
    setShowPreview(true);
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (!data || data.length === 0) return alert('No data');
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).map(val => `"${(val || '').toString().replace(/"/g, '""')}"`).join(','));
    const csvContent = "\uFEFF" + [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.csv`;
    link.click();
  };

  const handleDownloadRawData = () => {
    if (!draftContract) return;
    const dataStr = JSON.stringify(draftContract, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Contract_Data_${draftContract.id || 'Draft'}.json`;
    link.click();
  };

  const triggerPrintAction = async (isPDF: boolean) => {
    if (!draftContract || !selectedClient) return;

    const element = document.getElementById('printable-area');
    if (!element) return;

    const contractRef = (draftContract.id || 'DRAFT').toString().padStart(6, '0');
    const clientName = `${selectedClient.lastName}_${selectedClient.firstName}`.replace(/\s+/g, '_');
    const fileName = isPDF ? `Sahhil_Contract_${contractRef}_${clientName}` : `Sahhil_Print_${contractRef}`;

    if (isPDF) {
      // تصدير مباشر كملف PDF باستخدام html2pdf.js
      const opt = {
        margin: 0,
        filename: `${fileName}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: 'css' }
      };

      try {
        // @ts-ignore
        const h2p = window.html2pdf;
        if (h2p) {
          await h2p().from(element).set(opt).save();
        } else {
          console.error("html2pdf library not loaded");
          window.print();
        }
      } catch (error) {
        console.error("PDF Export failed:", error);
        window.print();
      }
    } else {
      const originalTitle = document.title;
      document.title = fileName;
      window.print();
      setTimeout(() => { document.title = originalTitle; }, 2000);
    }
  };

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    else setCart([...cart, { ...product, quantity: 1, cartId: Math.random().toString(36).substr(2, 9) }]);
  };

  const updateCartItem = (cartId: string, field: 'price' | 'quantity', value: number) => {
    setCart(cart.map(item => item.cartId === cartId ? { ...item, [field]: value } : item));
  };

  const removeFromCart = (cartId: string) => setCart(cart.filter(item => item.cartId !== cartId));

  const handleOpenAddClient = () => { setClientForm(initialClientState); setIsEditingClient(false); setIsClientModalOpen(true); };
  const handleOpenEditClient = (client?: Client) => { const target = client || selectedClient; if (!target) return; setClientForm({ ...target }); setIsEditingClient(true); setIsClientModalOpen(true); };

  const handleSaveClient = async () => {
    if (!clientForm.lastName || !clientForm.firstName || !clientForm.phone) return alert("Required fields missing");
    const clientToSave = { ...clientForm, fullName: `${clientForm.lastName} ${clientForm.firstName}` };
    if (isEditingClient && clientForm.id) {
      await db.clients.update(clientForm.id, clientToSave);
      if (selectedClient?.id === clientForm.id) setSelectedClient(clientToSave as Client);
    } else {
      const id = await db.clients.add(clientToSave);
      const added = await db.clients.get(id);
      if (currentView === 'dashboard') setSelectedClient(added || null);
    }
    setIsClientModalOpen(false);
  };

  const handlePreviewContract = async () => {
    if (!selectedClient || cart.length === 0) return alert('Client and products required');

    // حفظ العقد في قاعدة البيانات فوراً للحصول على الرقم التسلسلي
    const newContract: Contract = {
      clientId: selectedClient.id!,
      clientName: selectedClient.fullName || `${selectedClient.lastName} ${selectedClient.firstName}`,
      clientNationalId: selectedClient.nationalId, clientAddress: selectedClient.address, clientPhone: selectedClient.phone,
      items: cart, totalOriginalPrice: totals.originalTotal, profitMarginPercent: profitMargin,
      totalWithProfit: totals.totalWithProfit, downPayment: downPayment, remainingAmount: totals.remaining,
      months, monthlyInstallment: totals.monthlyPayment, createdAt: new Date(), paymentDay, paymentMethod
    };

    const id = await db.contracts.add(newContract);
    const saved = await db.contracts.get(id);
    setDraftContract(saved || newContract);
    setShowPreview(true);
  };

  const handleUpdatePageSettings = async (field: string, value: any) => {
    if (!appSettings) return;
    const newSettings = { ...appSettings, page: { ...appSettings.page, [field]: value } };
    await db.settings.put(newSettings);
  };

  const handleResetToDefault = async () => {
    if (!appSettings) return;
    const newSettings = {
      ...appSettings,
      page: {
        ...appSettings.page,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: -1,
        marginRight: 0,
        fontSize: 10,
        arColumnWidth: 40,
        cityAr: 'تيارت',
        cityFr: 'TIARET',
        secondPageContentAr: DEFAULT_CONTENT_AR,
        secondPageContentFr: DEFAULT_CONTENT_FR,
      }
    };
    await db.settings.put(newSettings);
    setLocalContentAr(DEFAULT_CONTENT_AR);
    setLocalContentFr(DEFAULT_CONTENT_FR);
  };

  const insertBold = (field: 'secondPageContentAr' | 'secondPageContentFr') => {
    const el = document.getElementById(field) as HTMLTextAreaElement;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const text = el.value;
    const selected = text.substring(start, end);
    const before = text.substring(0, start);
    const after = text.substring(end);
    const newVal = `${before}**${selected}**${after}`;

    // Update local state first for immediate UI response
    if (field === 'secondPageContentAr') setLocalContentAr(newVal);
    else setLocalContentFr(newVal);

    handleUpdatePageSettings(field, newVal);

    // Restore focus and selection
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + 2, end + 2);
    }, 0);
  };

  const handleSaveProduct = async () => {
    if (!productForm.name || !productForm.price) return alert("Required fields missing");
    if (productForm.id) await db.products.update(productForm.id, productForm);
    else await db.products.add(productForm);
    setIsProductModalOpen(false);
  };

  const handlePasteImport = async () => {
    if (!pasteData.trim()) return;
    const lines = pasteData.trim().split('\n');
    let importedCount = 0;
    for (const line of lines) {
      const parts = line.split(/[\t,]/).map(s => s.trim().replace(/^"|"$/g, ''));
      if (parts.length >= 2) {
        if (settingsTab === 'products') {
          let ref = parts.length >= 3 ? parts[0] : '', name = parts.length >= 3 ? parts[1] : parts[0], price = parseFloat(parts.length >= 3 ? parts[2] : parts[1]), cat = parts[3] || 'عام';
          if (name && !isNaN(price)) { await db.products.add({ reference: ref, name, price, category: cat }); importedCount++; }
        } else if (settingsTab === 'clients') {
          const ln = parts[0], fn = parts[1], ph = parts[2], nid = parts[3] || '';
          if (ln && fn && ph) { await db.clients.add({ ...initialClientState, lastName: ln, firstName: fn, phone: ph, nationalId: nid, fullName: `${ln} ${fn}` }); importedCount++; }
        }
      }
    }
    alert(`Imported ${importedCount}`);
    setPasteData('');
    setIsPasteModalOpen(false);
  };

  const handleDeleteProduct = async (id: number) => {
    if (confirm(t('confirmDelete'))) {
      await db.products.delete(id);
    }
  };

  const handleDeleteClient = async (id: number) => {
    if (confirm(t('confirmDelete'))) {
      await db.clients.delete(id);
    }
  };

  const handleDeleteContract = async (id: number) => {
    if (confirm(t('confirmDelete'))) {
      await db.contracts.delete(id);
    }
  };

  const filteredProducts = products?.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.reference.toLowerCase().includes(searchTerm.toLowerCase())) || [];
  const filteredClients = clients?.filter(c => {
    const s = clientSearch.toLowerCase();
    return (c.fullName || `${c.lastName} ${c.firstName}`).toLowerCase().includes(s) || c.nationalId.includes(s) || c.phone.includes(s);
  }) || [];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-white transition-colors">
      {/* Navbar */}
      <nav className="bg-slate-900 dark:bg-black text-white p-4 shadow-lg no-print sticky top-0 z-30 transition-colors">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            {appSettings?.page.watermarkLogo ? (
              <img src={appSettings.page.watermarkLogo} alt="Logo" className="w-8 h-8 object-contain" />
            ) : (
              <Calculator className="w-6 h-6 text-primary" />
            )}
            <span className="text-xl font-bold tracking-tight">{t('title')}</span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setCurrentView('dashboard')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${currentView === 'dashboard' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}><LayoutDashboard className="w-5 h-5" /><span className="hidden md:inline">{t('dashboard')}</span></button>
            <button onClick={() => setCurrentView('settings')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${currentView === 'settings' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}><Settings className="w-5 h-5" /><span className="hidden md:inline">{t('settings')}</span></button>
          </div>
        </div>
      </nav>

      {/* VIEW: DASHBOARD */}
      {currentView === 'dashboard' && (
        <main className="flex-1 container mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-6 no-print">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold flex items-center gap-2 text-slate-700 dark:text-slate-200"><Users className="w-5 h-5" /> {t('client')}</h2>
                <button onClick={handleOpenAddClient} className="bg-primary/10 text-primary p-1.5 rounded-lg hover:bg-primary/20 transition"><Plus className="w-4 h-4" /></button>
              </div>
              {selectedClient ? (
                <div className="bg-primary/5 border-2 border-primary p-4 rounded-xl relative group shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    {selectedClient.photo ? <img src={selectedClient.photo} alt="Client" className="w-12 h-12 rounded-full object-cover border-2 border-primary/20" /> : <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">{selectedClient.firstName?.[0]}</div>}
                    <div><div className="font-extrabold text-slate-800 dark:text-white">{selectedClient.lastName} {selectedClient.firstName}</div><div className="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded inline-block mt-1">{selectedClient.phone}</div></div>
                  </div>
                  <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-emerald-200">
                    <button onClick={() => handleOpenEditClient(selectedClient)} className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:bg-blue-50 px-2 py-1 rounded"><Pencil className="w-3 h-3" /> {t('edit')}</button>
                    <button onClick={() => setSelectedClient(null)} className="flex items-center gap-1 text-xs font-bold text-red-600 hover:bg-red-50 px-2 py-1 rounded"><X className="w-3 h-3" /> {t('cancel')}</button>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <Search className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-3 w-4 h-4 text-gray-400`} />
                  <input type="text" placeholder={t('searchClient')} className={`${inputClass} ${lang === 'ar' ? 'pr-9' : 'pl-9'}`} value={clientSearch} onChange={(e) => setClientSearch(e.target.value)} />
                  {clientSearch && (
                    <div className="absolute z-10 w-full bg-white border shadow-lg mt-1 rounded-lg max-h-48 overflow-y-auto">
                      {filteredClients.map(client => (<div key={client.id} className="p-2 hover:bg-slate-50 cursor-pointer border-b last:border-0" onClick={() => { setSelectedClient(client); setClientSearch(''); }}><div className="font-bold text-sm text-slate-800">{client.lastName} {client.firstName}</div><div className="text-xs text-gray-500">{client.phone}</div></div>))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex-1 flex flex-col h-[calc(100vh-320px)]">
              <div className="flex justify-between items-center mb-4"><div className="flex items-center gap-2"><Package className="w-5 h-5 text-slate-700 dark:text-slate-200" /><h2 className="font-bold text-slate-700 dark:text-slate-200">{t('products')}</h2></div><button onClick={() => setIsProductModalOpen(true)} className="bg-primary/10 text-primary p-1.5 rounded-lg hover:bg-primary/20 transition"><Plus className="w-4 h-4" /></button></div>
              <div className="relative mb-3"><Search className={`absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-2.5 w-4 h-4 text-gray-400`} /><input type="text" placeholder={t('searchProduct')} className={`${inputClass} ${lang === 'ar' ? 'pr-9' : 'pl-9'}`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {filteredProducts.map(product => (<div key={product.id} className="group flex justify-between items-center p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-primary hover:bg-primary/5 rounded-lg cursor-pointer transition shadow-sm" onClick={() => addToCart(product)}><div><div className="font-bold text-slate-800 dark:text-white text-sm">{product.name}</div><div className="text-xs text-slate-500">{product.reference}</div></div><div className="text-primary font-bold text-sm">{product.price.toLocaleString()}</div></div>))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex-1">
              <div className="flex justify-between items-center mb-4 border-b dark:border-slate-700 pb-2"><h2 className="font-bold flex items-center gap-2 text-slate-700 dark:text-slate-200"><ShoppingCart className="w-5 h-5" /> {t('cart')} ({cart.length})</h2><span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">{t('editPriceQty')}</span></div>
              <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                {cart.length === 0 ? <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">{t('emptyCart')}</div> : cart.map(item => (
                  <div key={item.cartId} className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:border-primary transition-colors">
                    <div className="flex justify-between items-start mb-2"><span className="font-bold text-slate-700 dark:text-slate-200 text-sm">{item.name}</span><button onClick={() => removeFromCart(item.cartId)} className="text-slate-400 hover:text-red-500 transition p-1"><Trash2 className="w-4 h-4" /></button></div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col"><label className="text-[10px] text-slate-500 font-bold mb-1">{t('price')}</label><input type="number" className="w-full p-1 border dark:border-slate-600 rounded text-sm font-bold bg-white dark:bg-slate-800 dark:text-white" value={item.price} onChange={(e) => updateCartItem(item.cartId, 'price', parseFloat(e.target.value) || 0)} /></div>
                      <div className="flex flex-col"><label className="text-[10px] text-slate-500 font-bold mb-1">{t('quantity')}</label><input type="number" min="1" className="w-full p-1 border dark:border-slate-600 rounded text-sm font-bold text-center bg-white dark:bg-slate-800 dark:text-white" value={item.quantity} onChange={(e) => updateCartItem(item.cartId, 'quantity', parseInt(e.target.value) || 1)} /></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2"><Calculator className="w-5 h-5" /> {t('installmentSettings')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClass}>{t('downPayment')}</label><input type="number" className={inputClass} value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} /></div>
                <div><label className={labelClass}>{t('duration')}</label><input type="number" list="duration-options" min="1" className={inputClass} value={months} onChange={(e) => setMonths(Number(e.target.value))} /><datalist id="duration-options">{Array.from({ length: 22 }, (_, i) => i + 3).map(m => (<option key={m} value={m}>{m} {t('months')}</option>))}</datalist></div>
                <div><label className={labelClass}>{t('paymentDay')}</label><input type="text" className={inputClass} value={paymentDay} onChange={(e) => setPaymentDay(e.target.value)} /></div>
                <div><label className={labelClass}>{t('paymentMethod')}</label><select className={inputClass} value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}><option value="Espèces">{t('cash')}</option><option value="Prélèvement">{t('directDebit')}</option><option value="Virement">{t('transfer')}</option><option value="Chèque">{t('cheque')}</option></select></div>
                {/* Profit Margin Removed */}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-2xl shadow-xl">
              <h2 className="text-slate-400 text-sm font-medium mb-6">{t('contractSummary')}</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-baseline border-b border-slate-700 pb-2"><span className="text-slate-400">{t('originalTotal')}</span><span className="text-lg font-mono">{totals.originalTotal.toLocaleString()}</span></div>
                <div className="flex justify-between items-baseline border-b border-slate-700 pb-2"><span className="text-primary">{t('totalWithProfit')}</span><span className="text-xl font-mono font-bold">{totals.totalWithProfit.toLocaleString()}</span></div>
                {lang === 'ar' && (
                  <div className="text-[10px] text-emerald-400 font-bold text-right pt-1 pb-2">
                    {formatCurrencyArabic(totals.totalWithProfit)}
                  </div>
                )}
                <div className="pt-4 mt-2">
                  <span className="block text-center text-slate-400 text-sm mb-1">{t('monthlyPayment')} ({months} {t('months')})</span>
                  <div className="text-center text-4xl font-bold font-mono text-primary tracking-tight">{totals.monthlyPayment.toLocaleString()}<span className="text-sm font-sans text-slate-400 mx-2">DA</span></div>
                </div>
              </div>
              <button onClick={handlePreviewContract} disabled={!selectedClient || cart.length === 0} className="w-full mt-8 bg-primary hover:opacity-90 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition disabled:opacity-50 hover:scale-[1.02] transform active:scale-95"><Eye className="w-6 h-6" /><span>{t('previewContract')}</span></button>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex-1 overflow-hidden">
              <h3 className="font-bold text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-2 text-sm"><History className="w-4 h-4" /> {t('recentOperations')}</h3>
              <div className="space-y-1 overflow-y-auto max-h-[300px]">
                {contractsHistory?.map(c => (
                  <div key={c.id} onDoubleClick={() => handleLoadContractFromHistory(c)} className="flex justify-between p-2 bg-slate-50 dark:bg-slate-900 border border-transparent hover:border-primary/30 hover:bg-primary/5 rounded cursor-pointer transition select-none group">
                    <div className="flex items-center gap-2"><span className="text-[10px] text-slate-400">#{c.id}</span><span className="truncate w-32 text-slate-700 dark:text-slate-200 font-bold">{c.clientName}</span></div>
                    <span className="font-mono text-primary font-bold">{c.monthlyInstallment.toLocaleString()}</span>
                  </div>
                ))}
                {contractsHistory?.length === 0 && <div className="text-center py-8 text-slate-300 dark:text-slate-600 text-xs">{t('noOperations')}</div>}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* VIEW: SETTINGS */}
      {currentView === 'settings' && (
        <div className="container mx-auto p-6 max-w-6xl no-print">
          <div className="flex gap-6">
            <aside className="w-full md:w-64 space-y-2 no-print">
              <button onClick={() => setSettingsTab('products')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${settingsTab === 'products' ? 'bg-primary text-white shadow-lg scale-[1.02]' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border dark:border-slate-700'}`}><Package className="w-5 h-5" /> {t('products')}</button>
              <button onClick={() => setSettingsTab('clients')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${settingsTab === 'clients' ? 'bg-primary text-white shadow-lg scale-[1.02]' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border dark:border-slate-700'}`}><Users className="w-5 h-5" /> {t('clients')}</button>
              <button onClick={() => setSettingsTab('history')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${settingsTab === 'history' ? 'bg-primary text-white shadow-lg scale-[1.02]' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border dark:border-slate-700'}`}><History className="w-5 h-5" /> {t('history')}</button>
              <button onClick={() => setSettingsTab('page')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${settingsTab === 'page' ? 'bg-primary text-white shadow-lg scale-[1.02]' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border dark:border-slate-700'}`}><FileText className="w-5 h-5" /> {t('pageContentSettings')}</button>
              <button onClick={() => setSettingsTab('general')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${settingsTab === 'general' ? 'bg-primary text-white shadow-lg scale-[1.02]' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border dark:border-slate-700'}`}><Languages className="w-5 h-5" /> {t('general')}</button>
            </aside>
            <div className="flex-1 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 min-h-[600px] transition-colors">
              {settingsTab === 'products' && (
                <div>
                  <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t('products')}</h2><div className="flex gap-2">
                    <button onClick={() => exportToCSV(products || [], 'products')} className="flex items-center gap-2 px-3 py-2 border dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-700 text-primary transition-colors"><Download className="w-4 h-4" /> {t('exportExcel')}</button>
                    <button onClick={() => setIsPasteModalOpen(true)} className="flex items-center gap-2 px-3 py-2 border dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"><FileSpreadsheet className="w-4 h-4" /> {t('importExcel')}</button>
                    <button onClick={() => { setProductForm(initialProductState); setIsProductModalOpen(true); }} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded shadow transition-transform active:scale-95"><Plus className="w-4 h-4" /> {t('newProduct')}</button>
                  </div></div>
                  <div className="overflow-x-auto"><table className={`w-full ${lang === 'ar' ? 'text-right' : 'text-left'} border-collapse`}><thead><tr className="bg-slate-100 dark:bg-slate-900 border-b dark:border-slate-700"><th className="p-3 text-slate-600 dark:text-slate-400 font-bold uppercase text-xs">{t('designation')}</th><th className="p-3 text-slate-600 dark:text-slate-400 font-bold uppercase text-xs">{t('price')}</th><th className="p-3 text-slate-600 dark:text-slate-400 font-bold uppercase text-xs">{t('settings')}</th></tr></thead><tbody>{filteredProducts.map(p => (<tr key={p.id} className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50"><td className="p-3 font-bold text-slate-800 dark:text-slate-200">{p.name}</td><td className="p-3 text-primary font-bold">{p.price.toLocaleString()}</td><td className="p-3">
                    <div className="flex gap-2">
                      <button onClick={() => { setProductForm(p); setIsProductModalOpen(true); }} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteProduct(p.id!)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td></tr>))}</tbody></table></div>
                </div>
              )}
              {settingsTab === 'clients' && (
                <div>
                  <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t('clients')}</h2><div className="flex gap-2">
                    <button onClick={() => exportToCSV(clients || [], 'clients')} className="flex items-center gap-2 px-3 py-2 border dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-700 text-primary transition-colors"><Download className="w-4 h-4" /> {t('exportExcel')}</button>
                    <button onClick={() => setIsPasteModalOpen(true)} className="flex items-center gap-2 px-3 py-2 border dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"><FileSpreadsheet className="w-4 h-4" /> {t('importExcel')}</button>
                    <button onClick={handleOpenAddClient} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded shadow transition-transform active:scale-95"><Plus className="w-4 h-4" /> {t('newClient')}</button>
                  </div></div>
                  <div className="overflow-x-auto"><table className={`w-full ${lang === 'ar' ? 'text-right' : 'text-left'} border-collapse`}><thead><tr className="bg-slate-100 dark:bg-slate-900 border-b dark:border-slate-700"><th className="p-3 text-slate-600 dark:text-slate-400 font-bold uppercase text-xs">{t('fullName')}</th><th className="p-3 text-slate-600 dark:text-slate-400 font-bold uppercase text-xs">{t('phone')}</th><th className="p-3 text-slate-600 dark:text-slate-400 font-bold uppercase text-xs">{t('settings')}</th></tr></thead><tbody>{filteredClients.map(c => (<tr key={c.id} className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50"><td className="p-3 font-bold text-slate-800 dark:text-slate-200">{c.lastName} {c.firstName}</td><td className="p-3 text-sm font-mono text-primary">{c.phone}</td><td className="p-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleOpenEditClient(c)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteClient(c.id!)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td></tr>))}</tbody></table></div>
                </div>
              )}
              {settingsTab === 'history' && (
                <div>
                  <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-slate-800">{t('history')}</h2><div className="flex gap-2">
                    <button onClick={() => exportToCSV(allContracts || [], 'contracts')} className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-slate-50 text-emerald-600"><Download className="w-4 h-4" /> {t('exportExcel')}</button>
                  </div></div>
                  <div className="overflow-x-auto">
                    <table className={`w-full ${lang === 'ar' ? 'text-right' : 'text-left'} border-collapse`}>
                      <thead>
                        <tr className="bg-slate-100 dark:bg-slate-900 border-b dark:border-slate-700">
                          <th className="p-3 text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px]">ID</th>
                          <th className="p-3 text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px]">{t('clientName')}</th>
                          <th className="p-3 text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px]">{t('totalWithProfit')}</th>
                          <th className="p-3 text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px]">{t('monthlyPayment')}</th>
                          <th className="p-3 text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px]">{t('date')}</th>
                          <th className="p-3 text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px]">{t('settings')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allContracts?.sort((a, b) => (b.id || 0) - (a.id || 0)).map(c => {
                          const client = clients?.find(cl => cl.id === c.clientId);
                          return (
                            <tr key={c.id} className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                              <td className="p-3 text-slate-800 dark:text-slate-200 font-bold">#{c.id}</td>
                              <td className="p-3 text-slate-800 dark:text-slate-200">{client ? `${client.lastName} ${client.firstName}` : c.clientName}</td>
                              <td className="p-3 text-primary font-bold">{c.totalWithProfit.toLocaleString()} DA</td>
                              <td className="p-3 text-primary font-bold">{c.monthlyInstallment.toLocaleString()} DA</td>
                              <td className="p-3 text-slate-500 dark:text-slate-400 text-sm">{new Date(c.createdAt).toLocaleDateString()}</td>
                              <td className="p-3 text-right">
                                <div className="flex justify-end gap-2">
                                  <button onClick={() => handleLoadContractFromHistory(c)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title={t('view')}><Eye className="w-4 h-4" /></button>
                                  <button onClick={() => handleDeleteContract(c.id!)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title={t('delete')}><Trash2 className="w-4 h-4" /></button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {(!allContracts || allContracts.length === 0) && (
                      <div className="p-12 text-center text-slate-400 dark:text-slate-600 font-bold">{t('noContracts')}</div>
                    )}
                  </div>
                </div>
              )}
              {settingsTab === 'page' && (
                <div className="space-y-8">
                  <div className="flex justify-between items-center"><h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><FileText className="w-7 h-7 text-emerald-600" /> {t('pageContentSettings')}</h2><p className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100 font-bold">Tip: Use **Text** for bolding</p></div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Margins & Font */}
                    <div className="bg-slate-50 p-6 rounded-xl border space-y-4">
                      <h3 className="font-bold text-slate-700 border-b pb-2 flex items-center gap-2"><MapPin className="w-4 h-4" /> {t('margins')}</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div><label className={labelClass}>{t('marginTop')}</label><input type="number" className={inputClass} value={appSettings?.page.marginTop || 0} onChange={e => handleUpdatePageSettings('marginTop', parseInt(e.target.value))} /></div>
                        <div><label className={labelClass}>{t('marginBottom')}</label><input type="number" className={inputClass} value={appSettings?.page.marginBottom || 0} onChange={e => handleUpdatePageSettings('marginBottom', parseInt(e.target.value))} /></div>
                        <div><label className={labelClass}>{t('marginLeft')}</label><input type="number" className={inputClass} value={appSettings?.page.marginLeft || 0} onChange={e => handleUpdatePageSettings('marginLeft', parseInt(e.target.value))} /></div>
                        <div><label className={labelClass}>{t('marginRight')}</label><input type="number" className={inputClass} value={appSettings?.page.marginRight || 0} onChange={e => handleUpdatePageSettings('marginRight', parseInt(e.target.value))} /></div>
                      </div>
                      <div className="pt-4 mt-4 border-t grid grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>{t('fontSize')} (px)</label>
                          <input type="number" className={inputClass} value={appSettings?.page.fontSize || 12} onChange={e => handleUpdatePageSettings('fontSize', parseInt(e.target.value))} />
                        </div>
                        <div>
                          <label className={labelClass}>{t('arColumnWidth')}</label>
                          <input type="number" min="10" max="90" className={inputClass} value={appSettings?.page.arColumnWidth || 50} onChange={e => handleUpdatePageSettings('arColumnWidth', parseInt(e.target.value))} />
                        </div>
                      </div>
                      <div className="pt-4 mt-4 border-t grid grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>{t('cityAr')}</label>
                          <input type="text" className={inputClass} value={appSettings?.page.cityAr || ''} onChange={e => handleUpdatePageSettings('cityAr', e.target.value)} />
                        </div>
                        <div>
                          <label className={labelClass}>{t('cityFr')}</label>
                          <input type="text" className={inputClass} value={appSettings?.page.cityFr || ''} onChange={e => handleUpdatePageSettings('cityFr', e.target.value)} />
                        </div>
                      </div>
                    </div>

                    {/* Logo Watermark */}
                    <div className="bg-slate-50 p-6 rounded-xl border space-y-4">
                      <h3 className="font-bold text-slate-700 border-b pb-2 flex items-center gap-2"><Camera className="w-4 h-4" /> {t('watermark')}</h3>
                      <div className="flex flex-col items-center gap-4">
                        {appSettings?.page.watermarkLogo ? (
                          <div className="relative group">
                            <img src={appSettings.page.watermarkLogo} className="max-h-32 rounded border shadow-sm" alt="Watermark" />
                            <button onClick={() => handleUpdatePageSettings('watermarkLogo', undefined)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition"><X className="w-4 h-4" /></button>
                          </div>
                        ) : (
                          <div className="w-full h-32 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-400">
                            <Camera className="w-10 h-10" />
                          </div>
                        )}
                        <label className="cursor-pointer bg-white border-2 border-emerald-500 text-emerald-600 px-6 py-2 rounded-lg font-bold hover:bg-emerald-50 transition">
                          {t('uploadLogo')}
                          <input type="file" className="hidden" accept="image/*" onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => handleUpdatePageSettings('watermarkLogo', reader.result as string);
                              reader.readAsDataURL(file);
                            }
                          }} />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Second Page Content */}
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border dark:border-slate-700 space-y-4 shadow-sm transition-colors">
                    <div className="flex justify-between items-center border-b dark:border-slate-700 pb-2">
                      <div className="flex items-center gap-4">
                        <h3 className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2 text-sm"><FileText className="w-4 h-4 text-primary" /> {t('secondPageAr')}</h3>
                        <button onClick={() => insertBold('secondPageContentAr')} className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded text-xs font-bold transition">
                          <Plus className="w-3 h-3" /> {t('makeBold')}
                        </button>
                      </div>
                      <button onClick={handleResetToDefault} className="text-[10px] px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-lg font-bold hover:bg-orange-200 transition uppercase">{t('resetToDefault')}</button>
                    </div>
                    <textarea id="secondPageContentAr" className="w-full h-48 p-4 border dark:border-slate-600 rounded-xl font-tajawal text-right shadow-inner bg-slate-50 dark:bg-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary transition-all" dir="rtl" value={localContentAr} onChange={e => {
                      setLocalContentAr(e.target.value);
                      handleUpdatePageSettings('secondPageContentAr', e.target.value);
                    }}></textarea>

                    <div className="flex justify-between items-center border-b dark:border-slate-700 pb-2 pt-4">
                      <div className="flex items-center gap-4">
                        <h3 className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2 text-sm"><FileText className="w-4 h-4 text-blue-500" /> {t('secondPageFr')}</h3>
                        <button onClick={() => insertBold('secondPageContentFr')} className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded text-xs font-bold transition">
                          <Plus className="w-3 h-3" /> {t('makeBold')}
                        </button>
                      </div>
                    </div>
                    <textarea id="secondPageContentFr" className="w-full h-48 p-4 border dark:border-slate-600 rounded-xl shadow-inner bg-slate-50 dark:bg-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary transition-all" value={localContentFr} onChange={e => {
                      setLocalContentFr(e.target.value);
                      handleUpdatePageSettings('secondPageContentFr', e.target.value);
                    }}></textarea>
                  </div>
                </div>
              )}
              {settingsTab === 'general' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">{t('general')}</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Language Selection */}
                    <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border dark:border-slate-700">
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2"><Languages className="w-5 h-5 text-primary" /> {t('selectLanguage')}</label>
                      <div className="grid grid-cols-1 gap-2">
                        {['ar', 'fr', 'en'].map((l) => (
                          <button key={l} onClick={() => setLang(l as Language)} className={`flex items-center justify-between p-3 rounded-lg border-2 transition ${lang === l ? 'border-primary bg-primary/5 text-primary' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'}`}>
                            <span className="font-bold uppercase">{l === 'ar' ? 'العربية' : l === 'fr' ? 'Français' : 'English'}</span>
                            {lang === l && <CheckCircle2 className="w-4 h-4" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Appearance Settings */}
                    <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border dark:border-slate-700 space-y-6">
                      <h3 className="font-bold text-slate-700 dark:text-slate-200 border-b dark:border-slate-700 pb-2 flex items-center gap-2"><Settings className="w-5 h-5 text-primary" /> {t('appearance')}</h3>

                      {/* Dark Mode Toggle */}
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border dark:border-slate-700">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg ${appSettings?.page.darkMode ? 'bg-indigo-100 text-indigo-600' : 'bg-orange-100 text-orange-600'}`}>
                            {appSettings?.page.darkMode ? <Globe className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                          </div>
                          <span className="font-bold text-slate-700 dark:text-slate-200">{t('darkMode')}</span>
                        </div>
                        <button
                          onClick={() => handleUpdatePageSettings('darkMode', !appSettings?.page.darkMode)}
                          className={`w-12 h-6 rounded-full transition-colors relative ${appSettings?.page.darkMode ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'}`}
                        >
                          <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${appSettings?.page.darkMode ? 'translate-x-6' : ''}`} />
                        </button>
                      </div>

                      {/* Primary Color Picker */}
                      <div className="space-y-3">
                        <label className={labelClass}>{t('primaryColor')}</label>
                        <div className="flex gap-2 items-center">
                          <input
                            type="color"
                            className="w-12 h-12 rounded cursor-pointer border-2 border-white shadow-sm"
                            value={appSettings?.page.primaryColor || '#10b981'}
                            onChange={e => handleUpdatePageSettings('primaryColor', e.target.value)}
                          />
                          <input
                            type="text"
                            className={`${inputClass} font-mono`}
                            value={appSettings?.page.primaryColor || '#10b981'}
                            onChange={e => handleUpdatePageSettings('primaryColor', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Copyright */}
                  <div className="mt-12 pt-8 border-t dark:border-slate-700 text-center">
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-sm">
                      جميع الحقوق محفوظة لمؤسسة الفلاح للتقسيط - أحمد مصطفى -
                    </p>
                    <p className="text-slate-400 dark:text-slate-500 text-[10px] mt-1 uppercase tracking-widest">
                      FALAH FACILITE System &copy; {new Date().getFullYear()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Contract Preview Modal */}
      {showPreview && draftContract && selectedClient && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/95 overflow-hidden print:bg-white print:relative print:overflow-visible">
          <div className="flex justify-between items-center px-6 py-3 bg-slate-800 text-white border-b border-slate-700 shadow-xl no-print">
            <div className="flex items-center gap-3"><Eye className="w-6 h-6 text-emerald-400" /><div><h2 className="text-lg font-bold">{t('previewTitle')}</h2><p className="text-xs text-slate-400">{t('previewSubtitle')}</p></div></div>
            <div className="flex gap-3">
              <button onClick={() => setShowPreview(false)} className="px-4 py-2 rounded-lg text-slate-300 hover:text-white font-bold">{t('close')}</button>
              <button onClick={handleDownloadRawData} className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-bold flex items-center gap-2" title={t('downloadData')}><Save className="w-5 h-5" /> <span className="hidden sm:inline">{t('downloadData')}</span></button>
              <button onClick={() => triggerPrintAction(false)} className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-2 shadow-lg"><Printer className="w-5 h-5" /><span>{t('printContract')}</span></button>
              <button onClick={() => triggerPrintAction(true)} className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-2 shadow-lg"><FileDown className="w-5 h-5" /><span>{t('exportPDF')}</span></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center bg-slate-700/50 print:bg-white print:p-0 print:overflow-visible">
            <div className="w-full max-w-[210mm] bg-emerald-500/10 border border-emerald-500/30 p-4 mb-4 rounded-xl flex items-center gap-3 text-emerald-100 text-sm no-print">
              <Info className="w-6 h-6 shrink-0" />
              <p>{t('pdfInstruction')}</p>
            </div>

            {/* الحاوية المطبوعة */}
            <div id="printable-area" className="relative shadow-2xl bg-white w-full max-w-[210mm] print:shadow-none print:m-0 print:w-full print:block">
              <ContractTemplate
                contract={draftContract}
                clientDetails={selectedClient}
                settings={appSettings?.page}
              />
            </div>
          </div>
        </div>
      )}

      {/* ساير المودالات الاخرى كما هي */}
      {isClientModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 no-print overflow-y-auto py-10">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col max-h-full transition-colors">
            <div className="p-6 border-b dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 rounded-t-2xl"><h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800 dark:text-white"><UserPlus className="w-6 h-6 text-primary" />{isEditingClient ? t('edit') : t('newClient')}</h2><button onClick={() => setIsClientModalOpen(false)} className="dark:text-white hover:opacity-70"><X className="w-6 h-6" /></button></div>
            <div className="flex-1 overflow-y-auto p-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-4 space-y-6">
                  <div className="flex flex-col items-center gap-4 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border dark:border-slate-700"><div className="relative w-32 h-32">{clientForm.photo ? <img src={clientForm.photo} className="w-full h-full rounded-full object-cover border-4 border-white dark:border-slate-700 shadow-md" /> : <div className="w-full h-full rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400"><Camera className="w-10 h-10" /></div>}<label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform"><Plus className="w-4 h-4" /><input type="file" className="hidden" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) { const r = new FileReader(); r.onloadend = () => setClientForm({ ...clientForm, photo: r.result as string }); r.readAsDataURL(f); } }} /></label></div></div>
                  <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30"><h3 className="font-bold text-blue-800 dark:text-blue-400 mb-3">{t('financialCapacity')}</h3><div className="space-y-3"><div><label className={labelClass}>{t('job')}</label><input className={inputClass} value={clientForm.jobTitle} onChange={e => setClientForm({ ...clientForm, jobTitle: e.target.value })} /></div><div><label className={labelClass}>{t('employer')}</label><input className={inputClass} value={clientForm.employer} onChange={e => setClientForm({ ...clientForm, employer: e.target.value })} /></div></div></div>
                </div>
                <div className="md:col-span-8 space-y-6 text-right">
                  <section>
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-4 border-b dark:border-slate-700 pb-2">{t('identityData')}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className={labelClass}>اللقب / Nom</label><input className={inputClass} value={clientForm.lastName} onChange={e => setClientForm({ ...clientForm, lastName: e.target.value })} /></div>
                      <div><label className={labelClass}>الاسم / Prénom</label><input className={inputClass} value={clientForm.firstName} onChange={e => setClientForm({ ...clientForm, firstName: e.target.value })} /></div>
                      <div><label className={labelClass}>{t('fatherName')}</label><input className={inputClass} value={clientForm.fatherName} onChange={e => setClientForm({ ...clientForm, fatherName: e.target.value })} /></div>
                      <div><label className={labelClass}>{t('motherName')}</label><input className={inputClass} value={clientForm.motherName} onChange={e => setClientForm({ ...clientForm, motherName: e.target.value })} /></div>
                      <div><label className={labelClass}>{t('birthDate')}</label><input type="date" className={inputClass} value={clientForm.birthDate} onChange={e => setClientForm({ ...clientForm, birthDate: e.target.value })} /></div>
                      <div><label className={labelClass}>{t('birthPlace')}</label><input className={inputClass} value={clientForm.birthPlace} onChange={e => setClientForm({ ...clientForm, birthPlace: e.target.value })} /></div>
                    </div>
                  </section>
                  <section>
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-4 border-b dark:border-slate-700 pb-2">{t('officialDocs')}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className={labelClass}>{t('reference')} (CNI/PC)</label><input className={inputClass} value={clientForm.nationalId} onChange={e => setClientForm({ ...clientForm, nationalId: e.target.value })} /></div>
                      <div><label className={labelClass}>{t('idIssuedDate')}</label><input type="date" className={inputClass} value={clientForm.idIssuedDate} onChange={e => setClientForm({ ...clientForm, idIssuedDate: e.target.value })} /></div>
                      <div className="col-span-2"><label className={labelClass}>{t('socialSecurityNumber')}</label><input className={inputClass} value={clientForm.socialSecurityNumber} onChange={e => setClientForm({ ...clientForm, socialSecurityNumber: e.target.value })} /></div>
                    </div>
                  </section>
                  <section>
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-4 border-b dark:border-slate-700 pb-2">{t('contact')}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className={labelClass}>{t('phone')}</label><input type="tel" className={inputClass} value={clientForm.phone} onChange={e => setClientForm({ ...clientForm, phone: e.target.value })} /></div>
                      <div><label className={labelClass}>{t('address')}</label><input className={inputClass} value={clientForm.address} onChange={e => setClientForm({ ...clientForm, address: e.target.value })} /></div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
            <div className="p-6 border-t dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 rounded-b-2xl flex justify-end gap-3"><button onClick={() => setIsClientModalOpen(false)} className="px-6 py-2 rounded-lg border dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white">{t('cancel')}</button><button onClick={handleSaveClient} className="px-8 py-2 rounded-lg bg-primary text-white font-bold transition-transform active:scale-95">{t('saveData')}</button></div>
          </div>
        </div>
      )}

      {isProductModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 no-print">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg shadow-2xl transition-colors">
            <div className="p-6 border-b dark:border-slate-700 flex justify-between items-center"><h2 className="text-xl font-bold dark:text-white">{productForm.id ? t('edit') : t('newProduct')}</h2><button onClick={() => setIsProductModalOpen(false)} className="dark:text-white"><X className="w-6 h-6" /></button></div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><label className={labelClass}>{t('designation')}</label><input className={inputClass} value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} /></div>
                <div><label className={labelClass}>{t('reference')}</label><input className={inputClass} value={productForm.reference} onChange={e => setProductForm({ ...productForm, reference: e.target.value })} /></div>
                <div><label className={labelClass}>{t('category')}</label><input className={inputClass} value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })} /></div>
                <div className="col-span-2"><label className={labelClass}>{t('price')}</label><input type="number" className={inputClass} value={productForm.price} onChange={e => setProductForm({ ...productForm, price: parseFloat(e.target.value) || 0 })} /></div>
              </div>
            </div>
            <div className="p-6 border-t dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-3 rounded-b-2xl"><button onClick={() => setIsProductModalOpen(false)} className="px-6 py-2 border dark:border-slate-700 dark:text-white rounded-lg">{t('cancel')}</button><button onClick={handleSaveProduct} className="px-8 py-2 bg-primary text-white rounded-lg font-bold transition-transform active:scale-95">{t('save')}</button></div>
          </div>
        </div>
      )}

      {isPasteModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 no-print">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50 rounded-t-2xl"><h2 className="text-xl font-bold flex items-center gap-2 text-slate-800"><Upload className="w-6 h-6 text-emerald-600" />{t('importExcel')}</h2><button onClick={() => setIsPasteModalOpen(false)}><X className="w-6 h-6" /></button></div>
            <div className="p-6"><textarea className="w-full h-64 p-4 border-2 border-slate-200 rounded-xl font-mono text-sm focus:border-emerald-500 outline-none" value={pasteData} onChange={(e) => setPasteData(e.target.value)}></textarea></div>
            <div className="p-6 border-t flex justify-end gap-3"><button onClick={() => setIsPasteModalOpen(false)} className="px-6 py-2 border rounded-lg">{t('cancel')}</button><button onClick={handlePasteImport} className="px-8 py-2 bg-emerald-600 text-white font-bold rounded-lg shadow-lg">Start Import</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
