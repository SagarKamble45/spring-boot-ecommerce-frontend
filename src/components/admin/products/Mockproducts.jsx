/*
 * TEMPORARY raw data. Delete this file once the API is connected.
 *
 * Field names match what the storefront ProductCard already receives from
 * the backend (productId, productName, image, description, quantity, price,
 * discount, specialPrice). `category` is the one assumed field - the
 * formatter in utils/productFormat.jsx accepts an object ({ categoryName }),
 * a flat `categoryName`, or a plain string.
 */
export const mockProducts = [
  { productId: 12, productName: "Velvet Accent Chair", image: "https://picsum.photos/id/1062/200/200", description: "Soft velvet accent chair with solid wood legs.", quantity: 14, price: 18999, discount: 10, specialPrice: 17099.1, category: { categoryId: 1, categoryName: "Living Room" } },
  { productId: 11, productName: "Walnut Coffee Table", image: "https://picsum.photos/id/1070/200/200", description: "Round walnut coffee table with storage shelf.", quantity: 3, price: 12499, discount: 0, specialPrice: 12499, category: { categoryId: 1, categoryName: "Living Room" } },
  { productId: 10, productName: "Linen Sofa 3-Seater", image: "https://picsum.photos/id/1060/200/200", description: "Three-seater linen sofa, removable covers.", quantity: 24, price: 49900, discount: 15, specialPrice: 42415, category: { categoryId: 1, categoryName: "Living Room" } },
  { productId: 9, productName: "Teak Dining Table", image: "https://picsum.photos/id/1080/200/200", description: "Six-seater solid teak dining table.", quantity: 12, price: 37900, discount: 5, specialPrice: 36005, category: { categoryId: 2, categoryName: "Dining Room" } },
  { productId: 8, productName: "Ergo Office Chair", image: "https://picsum.photos/id/180/200/200", description: "Ergonomic mesh chair with lumbar support.", quantity: 0, price: 15900, discount: 0, specialPrice: 15900, category: { categoryId: 3, categoryName: "Office" } },
  { productId: 7, productName: "Standing Desk", image: "https://picsum.photos/id/119/200/200", description: "Electric height-adjustable standing desk.", quantity: 9, price: 28900, discount: 12, specialPrice: 25432, category: { categoryId: 3, categoryName: "Office" } },
  { productId: 6, productName: "Queen Bed Frame", image: "https://picsum.photos/id/1048/200/200", description: "Queen bed frame with upholstered headboard.", quantity: 18, price: 49900, discount: 0, specialPrice: 49900, category: { categoryId: 4, categoryName: "Bedroom" } },
  { productId: 5, productName: "Oak Bookshelf", image: "https://picsum.photos/id/24/200/200", description: "Five-tier oak bookshelf.", quantity: 7, price: 12900, discount: 8, specialPrice: 11868, category: { categoryId: 5, categoryName: "Storage" } },
  { productId: 4, productName: "Cane Arm Chair", image: "https://picsum.photos/id/1068/200/200", description: "Hand-woven cane arm chair.", quantity: 11, price: 21900, discount: 0, specialPrice: 21900, category: { categoryId: 1, categoryName: "Living Room" } },
  { productId: 3, productName: "Bedside Table", image: "https://picsum.photos/id/1058/200/200", description: "Two-drawer bedside table.", quantity: 0, price: 6900, discount: 0, specialPrice: 6900, category: { categoryId: 4, categoryName: "Bedroom" } },
  { productId: 2, productName: "Shoe Rack", image: "https://picsum.photos/id/1073/200/200", description: "Slim four-shelf shoe rack.", quantity: 40, price: 3499, discount: 20, specialPrice: 2799.2, category: { categoryId: 5, categoryName: "Storage" } },
  { productId: 1, productName: "Marble Side Table", image: "https://picsum.photos/id/1076/200/200", description: "Marble-top side table, brass frame.", quantity: 4, price: 8900, discount: 0, specialPrice: 8900, category: { categoryId: 1, categoryName: "Living Room" } },
];

// Shape mirrors `orderStats` in the order reducer.
export const mockProductStats = {
  totalProducts: 86,
  activeProducts: 78,
  outOfStockProducts: 8,
  totalCategories: 12,
};