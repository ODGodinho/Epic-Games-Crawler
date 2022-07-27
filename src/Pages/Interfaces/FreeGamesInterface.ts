export interface KeyImage {
    type: string;
    url: string;
}

export interface Seller {
    id: string;
    name: string;
}

export interface Item {
    id: string;
    namespace: string;
}

export interface CustomAttribute {
    key: string;
    value: string;
}

export interface Category {
    path: string;
}

export interface Tag {
    id: string;
}

export interface Mapping {
    pageSlug: string;
    pageType: string;
}

export interface CatalogNs {
    mappings: Mapping[];
}

export interface OfferMapping {
    pageSlug: string;
    pageType: string;
}

export interface CurrencyInfo {
    decimals: number;
}

export interface FmtPrice {
    originalPrice: string;
    discountPrice: string;
    intermediatePrice: string;
}

export interface TotalPrice {
    discountPrice: number;
    originalPrice: number;
    voucherDiscount: number;
    discount: number;
    currencyCode: string;
    currencyInfo: CurrencyInfo;
    fmtPrice: FmtPrice;
}

export interface DiscountSetting {
    discountType: string;
}

export interface AppliedRule {
    id: string;
    endDate: Date;
    discountSetting: DiscountSetting;
}

export interface LineOffer {
    appliedRules: AppliedRule[];
}

export interface Price {
    totalPrice: TotalPrice;
    lineOffers: LineOffer[];
}

export interface DiscountSetting2 {
    discountType: string;
    discountPercentage: number;
}

export interface PromotionalOffer2 {
    startDate: Date;
    endDate: Date;
    discountSetting: DiscountSetting2;
}

export interface PromotionalOffer {
    promotionalOffers: PromotionalOffer2[];
}

export interface DiscountSetting3 {
    discountType: string;
    discountPercentage: number;
}

export interface PromotionalOffer3 {
    startDate: Date;
    endDate: Date;
    discountSetting: DiscountSetting3;
}

export interface UpcomingPromotionalOffer {
    promotionalOffers: PromotionalOffer3[];
}

export interface Promotions {
    promotionalOffers: PromotionalOffer[];
    upcomingPromotionalOffers: UpcomingPromotionalOffer[];
}

export interface FreeGamesElement {
    title: string;
    id: string;
    namespace: string;
    description: string;
    effectiveDate: Date;
    offerType: string;
    expiryDate?: null;
    status: string;
    isCodeRedemptionOnly: boolean;
    keyImages: KeyImage[];
    seller: Seller;
    productSlug: string;
    urlSlug: string;
    url?: null;
    items: Item[];
    customAttributes: CustomAttribute[];
    categories: Category[];
    tags: Tag[];
    catalogNs: CatalogNs;
    offerMappings: OfferMapping[];
    price: Price;
    promotions: Promotions;
}

export interface Paging {
    count: number;
    total: number;
}

export interface SearchStore {
    elements: FreeGamesElement[];
    paging: Paging;
}

export interface Catalog {
    searchStore: SearchStore;
}

interface FreeGamesInterface {
    Catalog: Catalog;
}

export default FreeGamesInterface;
