/**
 * The Facade Pattern is used when you want a simpler interface for a subsystem of a complex system. By using a facade,
 * you create an interface that only shows the necessary endpoints for a subset of a system rather than the entire
 * complex system.
 */

// For example, suppose you have an eCommerce system with a monolithic API. The API has endpoints for orders, invoices,
// customer profiles, products, product categories, store locations, and more.

// eCommerceAPIEndpoints:
// getAllOrders()
// getOrdersByCustomer(customerId)
// getOrder(orderId)
// getAllInvoices()
// getInvoicesByCustomer(customerId)
// getInvoice(invoiceId)
// getCustomerProfile(customerId)
// getAllProducts()
// getProduct(productId)
// getAllProductCategories()
// getProductCategory(categoryId)
// getAllStores()
// getStoreLocations()
// getStoreLocation(storeId)

// Those are many subsystems. Some of those may be related, but having them all in one API violates the KISS and
// separation of concerns principles.

// Suppose you have a client that needs to maintain the products on the site. Create a facade that makes it so that the
// client uses a facade that only deals with products and product categories. The client does not need to know that the
// other sections exist.

// Product Facade

// ProductEndpoints:
// getAllProducts()
// getProduct(productId)
// getAllProductCategories()
// getProductCategory(categoryId)

// By creating this facade, the client does not need to be concerned with customer IDs, order IDs, or invoice IDs.
