import { and, desc, eq, ne, or } from "drizzle-orm";
import { supplierCatalogItems, supplierOrderRequests, supplierProviderSyncs } from "../../drizzle/schema";
import { callDataApi } from "../_core/dataApi";
import { getDb } from "../db";

export const supplierProviders = ["dhgate", "alibaba", "admin_import", "private_supplier"] as const;
export type SupplierProvider = (typeof supplierProviders)[number];
export type SupplierOrderProvider = SupplierProvider | "mixed";

const providerApiEnv: Partial<Record<SupplierProvider, string>> = {
  dhgate: "DHGATE_DATA_API_ID",
  alibaba: "ALIBABA_DATA_API_ID",
};

export type SupplierCatalogImportRow = {
  provider?: SupplierProvider;
  externalId?: string;
  title: string;
  description?: string;
  category?: string;
  supplierName?: string;
  supplierCountry?: string;
  sourceUrl?: string;
  imageUrls?: string[];
  reviewSummary?: Record<string, unknown> | Array<Record<string, unknown>>;
  specs?: Record<string, unknown>;
  price: number;
  compareAtPrice?: number;
  currency?: string;
  serviceFee?: number;
  marginPercent?: number;
  rating?: number;
  reviewCount?: number;
  soldCount?: number;
  minOrder?: number;
  shippingSummary?: string;
  shippingDays?: string;
  providerStatus?: "live_api" | "admin_import" | "curated_seed" | "needs_review" | "paused" | "removed";
  reviewStatus?: "queued" | "approved" | "rejected";
};

export type SupplierCartItemInput = {
  catalogItemId?: number;
  title: string;
  provider?: SupplierOrderProvider;
  price: number;
  quantity: number;
  imageUrl?: string;
  supplierName?: string;
};

export type SupplierOrderInput = {
  items: SupplierCartItemInput[];
  serviceFee?: number;
  shippingName?: string;
  shippingAddress?: string;
  buyerNote?: string;
};

const curatedSupplierCatalog = [
  {
    id: 900001,
    provider: "admin_import" as SupplierProvider,
    externalId: "curated-stream-kit-001",
    title: "Creator Livestream Starter Kit Bundle",
    description: "Curated supplier-import placeholder for ring light, tabletop tripod, mic, and product-demo props. Replace with verified DHgate, Alibaba, or direct supplier rows before live fulfillment.",
    category: "Streaming",
    supplierName: "Admin Curated Supplier Desk",
    supplierCountry: "Global",
    sourceUrl: null,
    imageUrlsJson: JSON.stringify(["https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=600&h=600&fit=crop"]),
    reviewSummaryJson: JSON.stringify([{ source: "curated", text: "Demo review summary only; import real reviews from approved supplier files or APIs." }]),
    specsJson: JSON.stringify({ channel: "livestream commerce", reviewPolicy: "admin approval required" }),
    price: "44.00",
    compareAtPrice: "128.00",
    currency: "USD",
    serviceFee: "44",
    marginPercent: "18",
    rating: "4.8",
    reviewCount: 128,
    soldCount: 4440,
    minOrder: 1,
    shippingSummary: "Supplier quote after admin review",
    shippingDays: "7-18 days after approval",
    providerStatus: "curated_seed",
    reviewStatus: "approved",
    createdByAdminId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 900002,
    provider: "admin_import" as SupplierProvider,
    externalId: "curated-space-gaming-002",
    title: "Space Quest Gaming Desk Drop",
    description: "Curated entertainment-commerce drop for RGB desk lights, keyboard accessories, and Space Quest streamer setups. Real supplier rows can override this seeded entry.",
    category: "Gaming",
    supplierName: "Admin Curated Supplier Desk",
    supplierCountry: "Global",
    sourceUrl: null,
    imageUrlsJson: JSON.stringify(["https://images.unsplash.com/photo-1587829741301-dc798d83add3?w=600&h=600&fit=crop"]),
    reviewSummaryJson: JSON.stringify([{ source: "curated", text: "Demo popularity only; verify supplier reviews before public fulfillment." }]),
    specsJson: JSON.stringify({ questTieIn: "Space Quest", reviewPolicy: "admin approval required" }),
    price: "31.20",
    compareAtPrice: "95.00",
    currency: "USD",
    serviceFee: "44",
    marginPercent: "20",
    rating: "4.6",
    reviewCount: 289,
    soldCount: 8200,
    minOrder: 1,
    shippingSummary: "Supplier quote after admin review",
    shippingDays: "9-16 days after approval",
    providerStatus: "curated_seed",
    reviewStatus: "approved",
    createdByAdminId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 900003,
    provider: "admin_import" as SupplierProvider,
    externalId: "curated-video-power-003",
    title: "Always-Live Video Creator Power Pack",
    description: "Curated catalog item for power banks, mini lights, and creator accessories that help video streamers stay live. Import real supplier cost and availability before fulfillment.",
    category: "Electronics",
    supplierName: "Admin Curated Supplier Desk",
    supplierCountry: "Global",
    sourceUrl: null,
    imageUrlsJson: JSON.stringify(["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&h=600&fit=crop"]),
    reviewSummaryJson: JSON.stringify([{ source: "curated", text: "Seeded trend card; not a confirmed live supplier order history." }]),
    specsJson: JSON.stringify({ streamUse: "portable power", reviewPolicy: "admin approval required" }),
    price: "28.00",
    compareAtPrice: "80.00",
    currency: "USD",
    serviceFee: "44",
    marginPercent: "18",
    rating: "4.7",
    reviewCount: 312,
    soldCount: 12000,
    minOrder: 1,
    shippingSummary: "Supplier quote after admin review",
    shippingDays: "8-16 days after approval",
    providerStatus: "curated_seed",
    reviewStatus: "approved",
    createdByAdminId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

function normalizeMoney(value: number | undefined, fallback = 0): string {
  const safe = Number.isFinite(value) ? Number(value) : fallback;
  return Math.max(0, safe).toFixed(2);
}

function safeJson(value: unknown, fallback: unknown): string {
  try {
    return JSON.stringify(value ?? fallback);
  } catch {
    return JSON.stringify(fallback);
  }
}

function parseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function hydrateSupplierCatalogItem(row: typeof supplierCatalogItems.$inferSelect | (typeof curatedSupplierCatalog)[number]) {
  return {
    ...row,
    imageUrls: parseJson<string[]>(row.imageUrlsJson, []),
    reviewSummary: parseJson<unknown[]>(row.reviewSummaryJson, []),
    specs: parseJson<Record<string, unknown>>(row.specsJson, {}),
    sourceLabel: row.providerStatus === "live_api" ? "Live supplier API" : row.providerStatus === "admin_import" ? "Admin imported supplier data" : "Curated demo seed",
    reviewLabel: row.reviewStatus === "approved" ? "Admin approved" : row.reviewStatus === "queued" ? "Queued for admin review" : "Rejected",
  };
}

export async function getSupplierProviderStatus() {
  const providerStatus = supplierProviders.map((provider) => {
    const envName = providerApiEnv[provider];
    const configured = envName ? Boolean(process.env[envName]) : provider === "admin_import" || provider === "private_supplier";
    return {
      provider,
      displayName: provider === "dhgate" ? "DHgate Open Platform" : provider === "alibaba" ? "Alibaba Open Platform" : provider === "admin_import" ? "Admin Import" : "Private Supplier",
      configured,
      mode: configured && envName ? "server_api_adapter" : provider === "admin_import" ? "admin_upload" : provider === "private_supplier" ? "manual_supplier" : "not_configured",
      message: configured && envName ? "Server-side provider ID is configured for live supplier calls." : provider === "admin_import" ? "Admins can import supplier catalog rows immediately." : provider === "private_supplier" ? "Private supplier rows can be imported and reviewed by admins." : "Set the provider API ID environment variable and credentials before live sync.",
    };
  });

  const db = await getDb();
  if (!db) return { providerStatus, persistedSyncs: [], dataMode: "curated_fallback" as const };
  const persistedSyncs = await db.select().from(supplierProviderSyncs).orderBy(desc(supplierProviderSyncs.updatedAt)).limit(20);
  return { providerStatus, persistedSyncs, dataMode: persistedSyncs.length ? "mixed_provider_state" as const : "admin_import_ready" as const };
}

export async function listSupplierCatalog(input?: { search?: string; category?: string; limit?: number }) {
  const db = await getDb();
  const limit = input?.limit ?? 48;
  if (!db) return curatedSupplierCatalog.slice(0, limit).map(hydrateSupplierCatalogItem);

  const filters = [eq(supplierCatalogItems.reviewStatus, "approved"), ne(supplierCatalogItems.providerStatus, "removed")];
  if (input?.category && input.category !== "All" && input.category !== "all") filters.push(eq(supplierCatalogItems.category, input.category));
  if (input?.search) {
    const lowered = input.search.toLowerCase();
    const rows = await db.select().from(supplierCatalogItems).where(and(...filters)).orderBy(desc(supplierCatalogItems.updatedAt)).limit(200);
    const filtered = rows.filter((row) => `${row.title} ${row.description} ${row.category} ${row.supplierName}`.toLowerCase().includes(lowered)).slice(0, limit);
    return (filtered.length ? filtered : curatedSupplierCatalog.slice(0, limit)).map(hydrateSupplierCatalogItem);
  }

  const rows = await db.select().from(supplierCatalogItems).where(and(...filters)).orderBy(desc(supplierCatalogItems.updatedAt)).limit(limit);
  return (rows.length ? rows : curatedSupplierCatalog.slice(0, limit)).map(hydrateSupplierCatalogItem);
}

export async function importSupplierCatalogRows(adminId: number, rows: SupplierCatalogImportRow[]) {
  const db = await getDb();
  if (!db) throw new Error("Database is required for supplier catalog imports.");
  if (!rows.length) return { success: true, count: 0, ids: [] as number[] };

  const ids: number[] = [];
  for (const row of rows) {
    const [created] = await db.insert(supplierCatalogItems).values({
      provider: row.provider ?? "admin_import",
      externalId: row.externalId,
      title: row.title,
      description: row.description ?? "Admin-imported supplier product. Verify source URL, images, reviews, supplier cost, and shipping before approval.",
      category: row.category ?? "general",
      supplierName: row.supplierName ?? "Admin imported supplier",
      supplierCountry: row.supplierCountry ?? "global",
      sourceUrl: row.sourceUrl,
      imageUrlsJson: safeJson(row.imageUrls, []),
      reviewSummaryJson: safeJson(row.reviewSummary, []),
      specsJson: safeJson(row.specs, {}),
      price: normalizeMoney(row.price),
      compareAtPrice: row.compareAtPrice === undefined ? undefined : normalizeMoney(row.compareAtPrice),
      currency: row.currency ?? "USD",
      serviceFee: normalizeMoney(row.serviceFee, 44),
      marginPercent: normalizeMoney(row.marginPercent, 18),
      rating: normalizeMoney(row.rating, 0),
      reviewCount: Math.max(0, Math.floor(row.reviewCount ?? 0)),
      soldCount: Math.max(0, Math.floor(row.soldCount ?? 0)),
      minOrder: Math.max(1, Math.floor(row.minOrder ?? 1)),
      shippingSummary: row.shippingSummary ?? "Supplier quoted shipping",
      shippingDays: row.shippingDays ?? "Quoted after admin review",
      providerStatus: row.providerStatus ?? "admin_import",
      reviewStatus: row.reviewStatus ?? "approved",
      createdByAdminId: adminId,
    }).$returningId();
    ids.push(created.id);
  }

  return { success: true, count: ids.length, ids };
}

export async function syncSupplierProviderCatalog(provider: Exclude<SupplierProvider, "admin_import" | "private_supplier">, query: string, adminId: number) {
  const apiId = process.env[providerApiEnv[provider] ?? ""];
  const db = await getDb();
  if (!db) throw new Error("Database is required for supplier provider sync state.");
  if (!apiId) {
    await db.insert(supplierProviderSyncs).values({
      provider,
      displayName: provider === "dhgate" ? "DHgate Open Platform" : "Alibaba Open Platform",
      providerStatus: "not_configured",
      lastError: `Missing ${providerApiEnv[provider]} environment configuration.`,
    });
    throw new Error(`${provider} supplier API is not configured. Add the server-side provider API ID and credentials before live sync.`);
  }

  await db.insert(supplierProviderSyncs).values({ provider, displayName: provider === "dhgate" ? "DHgate Open Platform" : "Alibaba Open Platform", apiId, providerStatus: "syncing" });
  const payload = await callDataApi(apiId, { query: { q: query, pageSize: 20 } });
  await db.insert(supplierProviderSyncs).values({ provider, displayName: provider === "dhgate" ? "DHgate Open Platform" : "Alibaba Open Platform", apiId, providerStatus: "healthy", lastSyncAt: new Date() });

  return {
    success: true,
    provider,
    adminId,
    query,
    payload,
    nextStep: "Map the provider payload into supplier catalog import rows after confirming the provider response contract for this account.",
  };
}

export async function createSupplierOrderRequest(userId: number, input: SupplierOrderInput) {
  const db = await getDb();
  if (!db) throw new Error("Database is required for supplier order requests.");
  if (!input.items.length) throw new Error("Cart is empty.");

  const sanitizedItems = input.items.map((item) => ({
    catalogItemId: item.catalogItemId,
    title: item.title.slice(0, 220),
    provider: item.provider ?? "mixed",
    price: Math.max(0, item.price),
    quantity: Math.max(1, Math.floor(item.quantity)),
    imageUrl: item.imageUrl,
    supplierName: item.supplierName,
  }));
  const subtotal = sanitizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const serviceFee = Math.max(0, input.serviceFee ?? 44);
  const estimatedSupplierCost = subtotal * 0.82;
  const platformMargin = Math.max(0, subtotal - estimatedSupplierCost) + serviceFee;
  const providers = Array.from(new Set(sanitizedItems.map((item) => item.provider).filter(Boolean)));
  const provider = providers.length === 1 && providers[0] !== "mixed" ? (providers[0] as SupplierOrderProvider) : "mixed";

  const [created] = await db.insert(supplierOrderRequests).values({
    requesterId: userId,
    provider,
    cartItemsJson: safeJson(sanitizedItems, []),
    subtotal: normalizeMoney(subtotal),
    serviceFee: normalizeMoney(serviceFee),
    platformMargin: normalizeMoney(platformMargin),
    estimatedSupplierCost: normalizeMoney(estimatedSupplierCost),
    total: normalizeMoney(subtotal + serviceFee),
    currency: "USD",
    orderStatus: "admin_review",
    paymentStatus: "not_charged",
    shippingName: input.shippingName,
    shippingAddress: input.shippingAddress,
    buyerNote: input.buyerNote,
  }).$returningId();

  return {
    success: true,
    id: created.id,
    status: "admin_review",
    subtotal: normalizeMoney(subtotal),
    serviceFee: normalizeMoney(serviceFee),
    total: normalizeMoney(subtotal + serviceFee),
    reviewNotice: "Supplier order request queued for admin review. No live supplier order or payment capture occurs until approval and provider confirmation.",
  };
}

export async function listSupplierOrderRequests(input?: { userId?: number; limit?: number }) {
  const db = await getDb();
  if (!db) return [];
  const limit = input?.limit ?? 50;
  const rows = input?.userId
    ? await db.select().from(supplierOrderRequests).where(eq(supplierOrderRequests.requesterId, input.userId)).orderBy(desc(supplierOrderRequests.createdAt)).limit(limit)
    : await db.select().from(supplierOrderRequests).where(or(eq(supplierOrderRequests.orderStatus, "queued"), eq(supplierOrderRequests.orderStatus, "admin_review"), eq(supplierOrderRequests.orderStatus, "approved"))).orderBy(desc(supplierOrderRequests.createdAt)).limit(limit);
  return rows.map((row) => ({ ...row, cartItems: parseJson<SupplierCartItemInput[]>(row.cartItemsJson, []) }));
}

export async function updateSupplierOrderRequestStatus(input: { orderId: number; orderStatus: "queued" | "admin_review" | "approved" | "provider_submitted" | "fulfilled" | "rejected" | "cancelled"; paymentStatus?: "not_charged" | "quote_sent" | "held" | "paid" | "refunded"; adminNote?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database is required for supplier order admin controls.");
  await db.update(supplierOrderRequests).set({ orderStatus: input.orderStatus, paymentStatus: input.paymentStatus, adminNote: input.adminNote }).where(eq(supplierOrderRequests.id, input.orderId));
  return { success: true };
}
