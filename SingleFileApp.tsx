import React, { useState, useMemo, useEffect } from 'react';
import { db } from './db';
import { useLiveQuery } from 'dexie-react-hooks';
import {
    Users, ShoppingCart, Printer, Calculator, Search, Plus, Trash2, Save,
    Package, History, UserPlus, CreditCard, MapPin, Briefcase, Camera, X,
    Settings, Pencil, FileSpreadsheet, Download, Upload, LayoutDashboard,
    CheckCircle2, Eye, FileText, FileDown, Languages, Globe, Info
} from 'lucide-react';

// --- Types ---
export type Civility = 'السيد' | 'السيدة' | 'الآنسة';
export type Language = 'ar' | 'fr' | 'en';

export interface Client {
    id?: number;
    firstName: string;
    lastName: string;
    civility: Civility;
    birthDate: string;
    birthPlace: string;
    fatherName: string;
    motherName: string;
    nationalId: string;
    idIssuedDate: string;
    idIssuedBy: string;
    socialSecurityNumber?: string;
    address: string;
    commune: string;
    wilaya: string;
    phone: string;
    phone2?: string;
    jobTitle: string;
    employer: string;
    photo?: string;
    fullName?: string;
}

export interface Product {
    id?: number;
    reference: string;
    name: string;
    price: number;
    category: string;
    image?: string;
}

export interface CartItem extends Product {
    cartId: string;
    quantity: number;
}

export interface Contract {
    id?: number;
    clientId: number;
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
    paymentDay?: string;
    paymentMethod?: string;
}

// --- Components ---

// --- ContractConditions ---
export const ContractConditions: React.FC = () => {
    return (
        <div className="bg-white text-black font-serif p-8 print:p-0 mx-auto relative border-t-2 border-dashed border-slate-200 print:border-t-0" style={{ width: '100%', minHeight: '297mm' }}>
            <div className="flex justify-between items-start mb-6 border-b-2 border-black pb-2">
                <h2 className="text-sm font-black underline uppercase">CONDITIONS GENERALES</h2>
                <h2 className="text-sm font-black font-tajawal underline">الشروط العامة</h2>
            </div>

            <div className="grid grid-cols-2 gap-6 text-[10px] leading-tight text-justify">
                {/* French Section */}
                <div className="space-y-3 pr-2 border-r border-slate-300">
                    <p>Le présent document, désigne les conditions générales de l'engagement de paiement par facilité, entre la société à responsabilité limitée EL FALAH FACILITE désigné ci-dessous par l'expression le « Vendeur », et l' « Acheteur ».</p>
                    <p>Il a été convenu ce qui suit :</p>
                    <section>
                        <h3 className="font-black underline italic">Article 01 : Objet de l'engagement.</h3>
                        <p>Le présent engagement, a pour objet de désigner les conditions et les modalités de paiement par facilité par l'acheteur, au profit du vendeur.</p>
                    </section>
                    <section>
                        <h3 className="font-black underline italic">Article 02 : Obligation de l'acheteur.</h3>
                        <ul className="list-disc pl-4 space-y-1">
                            <li>L'acheteur s'engage par le présent de payer le montant global de la facture d'achat des biens, désignés dans les conditions particulières.</li>
                            <li>L'acheteur s'engage à effectuer les mensualités dues, à la date convenue et de façon régulière, selon le mode de paiement désigné dans les conditions particulières.</li>
                            <li>La première échéance sera payée, au plus tard, un mois après l'enlèvement de la marchandise.</li>
                        </ul>
                        <p className="font-bold mt-1 underline">Dans le cas d'un mode de paiement par prélèvement :</p>
                        <ul className="list-disc pl-4 space-y-1">
                            <li>L'acheteur autorise le vendeur à procéder au prélèvement automatique sur son compte, des montants mensuels dus.</li>
                            <li>L'acheteur s'oblige à assurer la provision suffisante, sur son compte pour couvrir le prélèvement de la totalité des montants arrêtés pour chacune des mensualités prévues aux dates échues.</li>
                            <li>Tout frais ou taxe, découlant de la gestion du compte de l'acheteur, restera à la charge exclusive de celui-ci.</li>
                        </ul>
                    </section>
                    <section>
                        <h3 className="font-black underline italic">Article 3 : obligations du vendeur.</h3>
                        <ul className="list-disc pl-4 space-y-1">
                            <li>Le vendeur garantit les articles vendus selon la durée mentionnée au certificat de garantie de l'article. Cette période de garantie court à dater de la livraison dûment constatée sur le certificat de garantie du produit et/ou bon de livraison.</li>
                            <li>Une garantie de fonctionnement, au sens mise en marche, est consentie pour une durée de 48h. Le produit présentant un défaut est échangé, à la condition que :
                                <ul className="list-circle pl-4">
                                    <li>L'acheteur le restitue dans un délai de 48h.</li>
                                    <li>Sous emballage d'origine et avec tous accessoires.</li>
                                </ul>
                            </li>
                            <li>La garantie est subordonnée à la présentation du certificat de garantie dûment authentifié par le revendeur.</li>
                            <li>La garantie de pièces et main d'œuvre par le service après-vente désigné par le vendeur ne sont pas assurées gratuitement en période de couverture de la garantie dans les cas suivants :
                                <ul className="list-circle pl-4">
                                    <li>Cassure, détérioration du produit dû à une chute ou autres.</li>
                                    <li>Tentative de réparation ou de manipulation du produit par des personnes ou service tiers autres que le service après-vente désigné par le vendeur.</li>
                                </ul>
                            </li>
                        </ul>
                        <p>En cas d'écoulement de la période de couverture de la garantie, toute réparation sera facturée à l'acheteur.</p>
                        <ul className="list-disc pl-4 space-y-1">
                            <li>Le service après-vente n'assure pas de garantie pour les meubles après les avoir montés et installés par l'acheteur.</li>
                            <li>Le service après-vente n'assure pas de garantie pour les climatiseurs après les avoir montés et installés par l'acheteur.</li>
                        </ul>
                    </section>
                    <section>
                        <h3 className="font-black underline italic">Article 04 : Conditions de paiement et Sanctions y afférentes.</h3>
                        <ul className="list-disc pl-4 space-y-1">
                            <li>Le paiement des mensualités, s'effectue par l'acheteur, de façon régulière, selon le mode de paiement convenu.</li>
                            <li>En cas du non-respect d'une ou de plusieurs échéances, l'acheteur supportera tous les frais directs ou indirects qui peuvent résulter des poursuites de recouvrement éventuelles.</li>
                            <li>Tout retard de paiement de trois (03) mensualités consécutives, annulera le présent engagement et donnera le plein droit au vendeur, de réclamer le montant global restant, ainsi que les frais y afférents.</li>
                        </ul>
                    </section>
                    <section>
                        <h3 className="font-black underline italic">Article 05 : Résiliation de l'engagement et déchéance du terme.</h3>
                        <p>Le vendeur, pourra résilier de plein droit le présent engagement après envoi d'une mise en demeure dans les cas suivants :</p>
                        <ul className="list-disc pl-4">
                            <li>la non exactitude des informations, fournies par l'acheteur.</li>
                            <li>le non-paiement à la date d'échéance de toute somme due en vertu de l'engagement actuel.</li>
                        </ul>
                    </section>
                    <section>
                        <h3 className="font-black underline italic">Article 06 : Cas exceptionnels.</h3>
                        <p>Dans le cas, où l'acheteur décide de solder par anticipation les mensualités restantes, l'opération de prélèvement sera clôturée du mois qui succède sa confirmation.</p>
                    </section>
                </div>

                {/* Arabic Section */}
                <div className="space-y-3 pl-2 text-right font-tajawal" dir="rtl">
                    <p>تحدد هذه الوثيقة الشروط العامة للالتزام بالدفع بالتقسيط بين مؤسسة الفلاح لبيع التقسيط المسمى أدناه بـ البائع و المشتري.</p>
                    <p>اتفق الطرفان المتعاقدان فيما يلي على ما يلي:</p>
                    <section>
                        <h3 className="font-black underline italic text-[10px]">المادة الأولى: موضوع الالتزام</h3>
                        <p>يهدف الالتزام بالدفع إلى تحديد شروط وكيفيات الدفع بالأقساط لفائدة البائع من طرف المشتري.</p>
                    </section>
                    <section>
                        <h3 className="font-black underline italic text-[10px]">المادة الثانية: التزام المشتري</h3>
                        <ul className="list-disc pr-4 space-y-1">
                            <li>يلتزم المشتري بموجب هذا الالتزام بدفع المبلغ الإجمالي للمشتريات المعينة في الشروط الخاصة.</li>
                            <li>يلتزم المشتري بدفع الأقساط المستحقة في ميعادها المحدد بصفة منتظمة ووفقا لطريقة الدفع المعينة في الشروط.</li>
                            <li>يتم تسديد مبلغ القسط الأول في مدة أقصاها شهر بعد استلام المشتريات.</li>
                        </ul>
                        <p className="font-bold mt-1 underline">في حالة التسديد عن طريق الاقتطاع:</p>
                        <ul className="list-disc pr-4 space-y-1">
                            <li>يرخص المشتري للبائع باقتطاع مبالغ القسط المستحق من حسابه.</li>
                            <li>يلتزم المشتري بتوفير الرصيد الكافي لتغطية كل الأقساط وذلك في آجالها المحددة.</li>
                            <li>كل المصاريف أو الرسوم المترتبة عن تسيير الحساب للمشتري، تحتسب على عاتقه.</li>
                        </ul>
                    </section>
                    <section>
                        <h3 className="font-black underline italic text-[10px]">المادة الثالثة: التزامات البائع</h3>
                        <ul className="list-disc pr-4 space-y-1">
                            <li>يضمن البائع مبيعاته حسب المدة المحددة في بطاقة الضمان المرفقة مع الجهاز. تحسب مدة الضمان ابتداء من تاريخ استلام الجهاز وفقا لشهادة ضمان أو وصل تسليم.</li>
                            <li>يضمن البائع صلاحية تشغيل المنتج لمدة 48 ساعة، في حالة عدم إمكانية تشغيل الجهاز يمكن للمشتري تبديل الجهاز وفقا للشروط التالية:
                                <ul className="list-circle pr-4">
                                    <li>إعادتها إلى محل البيع خلال 48 ساعة.</li>
                                    <li>يرجع الجهاز بغلافه الأصلي وجميع ملحقاته.</li>
                                </ul>
                            </li>
                            <li>الضمان ساري بشرط تقديم شهادة الضمان مصادق عليها من طرف البائع.</li>
                            <li>لا تشمل مصلحة ما بعد البيع ضمان قطع الغيار واليد العاملة في الحالات التالية:
                                <ul className="list-circle pr-4">
                                    <li>إذا تعرضت البضاعة لحادث خارجي (تلف، صدمة، كهرباء...).</li>
                                    <li>إذا تم تصليح البضاعة من طرف هيئة غير تابعة لمصلحة ما بعد البيع.</li>
                                </ul>
                            </li>
                            <li>إذا انقضت مدة الضمان المنصوص عليها، كل مصاريف التصليح تترتب على المشتري.</li>
                            <li>مصلحة ما بعد البيع لا تتحمل ضمان الأثاث في حالة ما تم تركيبه من طرف المشتري.</li>
                            <li>مصلحة ما بعد البيع لا تتحمل ضمان المكيفات في حالة ما تم تركيبها من طرف المشتري.</li>
                        </ul>
                    </section>
                    <section>
                        <h3 className="font-black underline italic text-[10px]">المادة الرابعة: شروط الدفع والتدابير المترتبة عنها</h3>
                        <ul className="list-disc pr-4 space-y-1">
                            <li>يتم دفع الأقساط من طرف المشتري بطريقة منتظمة حسب طريقة الدفع المتفق عليها.</li>
                            <li>في حالة عدم احترام آجال دفع مبلغ الأقساط، يتحمل المشتري كل المصاريف المباشرة وغير المباشرة المترتبة عن الإجراءات القانونية المتخذة لتحصيل المبلغ المستحق.</li>
                            <li>في حالة تخلف المشتري عن دفع 03 أقساط شهرية متتالية، يصبح المبلغ الكلي المتبقي حالا للأداء وواجب الدفع إضافة إلى المصاريف الناتجة عن التأخير.</li>
                        </ul>
                    </section>
                    <section>
                        <h3 className="font-black underline italic text-[10px]">المادة الخامسة: فسخ الالتزام وسقوط الآجال</h3>
                        <p>يمكن للبائع فسخ الالتزام الحالي بعد إرسال إعذار في الحالات التالية:</p>
                        <ul className="list-disc pr-4">
                            <li>عدم صحة المعلومات المقدمة للبائع من طرف الزبون.</li>
                            <li>عدم تسديد في تاريخ الاستحقاق لأي مبلغ مستحق في إطار الالتزام الحالي.</li>
                        </ul>
                    </section>
                    <section>
                        <h3 className="font-black underline italic text-[10px]">المادة السادسة: الحالات الاستثنائية</h3>
                        <p>في حالة رغبة المشتري بتسديد المبالغ المستحقة مسبقا، يتم إنهاء العملية في الشهر الذي يلي قرار المشتري.</p>
                    </section>
                </div>
            </div>

            <div className="mt-4 border-t border-black pt-2 grid grid-cols-2 gap-4 text-[9px]">
                <div>
                    <p className="font-bold mb-1 italic uppercase">Engagement de changement d'informations :</p>
                    <ul className="flex flex-wrap gap-x-4">
                        <li>• Employeur</li>
                        <li>• Compte courant</li>
                        <li>• N° Téléphone</li>
                        <li>• Lieu de Résidence</li>
                    </ul>
                </div>
                <div className="text-right font-tajawal text-[12px] flex flex-col items-end" dir="rtl">
                    <p className="font-black mb-1 underline">التزام بإعلام المؤسسة بكل تغيير في :</p>
                    <ul className="flex flex-wrap gap-x-4 justify-start w-full">
                        <li>- المستخدم</li>
                        <li>- الحساب الجاري</li>
                        <li>- رقم الهاتف</li>
                        <li>- محل الإقامة</li>
                    </ul>
                </div>
            </div>

            <div className="mt-4 border-2 border-black p-4 text-[11px] bg-slate-50">
                <div className="flex justify-between mb-8">
                    <div className="w-[45%]">
                        <p className="font-bold">Je soussigné Mr/Mme: ...........................................................</p>
                        <p className="mt-2 text-[9px] italic leading-tight text-slate-700">Déclare avoir pris connaissance des conditions générales et particulières du présent engagement, les accepter et atteste de l'exactitude des informations fournies.</p>
                    </div>
                    <div className="w-[45%] text-right font-tajawal" dir="rtl">
                        <p className="text-[14px] font-black">أنا الموقع أسفله السيد (ة): ...........................................................</p>
                        <p className="mt-2 text-[10px] italic leading-tight text-slate-700">أقر بعلمي التام وموافقتي على كل الشروط العامة والخاصة لهذا الالتزام وكذا صحة مجموع المعلومات المقدمة.</p>
                    </div>
                </div>
                <div className="flex justify-between items-end mt-4 font-black">
                    <div className="text-center text-[10px] w-1/3">
                        REPRESENTANT DE <br /> EL FALAH FACILITE
                    </div>
                    <div className="text-center text-[10px] w-1/3 border-b border-black pb-1 mb-1">
                        <span dir="rtl">حرر بـ ................ في ................</span> <br />
                        <span className="font-serif italic font-normal">Fait à ................. le .................</span>
                    </div>
                    <div className="text-center text-[10px] w-1/3">
                        Lu et approuvé (cachet et signature) <br />
                        قرئ وصودق عليه (الإمضاء والختم)
                    </div>
                </div>
            </div>
        </div>
    );
};
