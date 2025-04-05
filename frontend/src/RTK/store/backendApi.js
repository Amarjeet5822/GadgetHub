export const api = "https://gadgethub-xdmd.onrender.com"

export const categories = [
  {
    id: "smartphones",
    name: "Smartphones",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "laptops",
    name: "Laptops",
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "audio",
    name: "Audio",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "tablets",
    name: "Tablets",
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "tvs",
    name: "TVs",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "gaming",
    name: "Gaming",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "cameras",
    name: "Cameras",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1625723044792-44de33fc88a5?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "wearables",
    name: "Wearables",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop"
  }
];

export const banners = [
  {
    id: 1,
    title: "Summer Sale",
    subtitle: "Save up to 40% on selected items",
    image: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?q=80&w=1200&auto=format&fit=crop",
    link: "/products"
  },
  {
    id: 2,
    title: "New Apple Products",
    subtitle: "Check out the latest releases",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
    link: "/category/apple"
  },
  {
    id: 3,
    title: "Gaming Essentials",
    subtitle: "Level up your gaming experience",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
    link: "/category/gaming"
  }
];

export const featuredProducts = [1, 3, 5, 8, 15];
// Get featured categories
export const getFeaturedCategories = () => {
  return categories.slice(0, 6);
};

// Get featured products
export const getFeaturedProductsData = () => {
  return featuredProducts.map(id => getProductById(id));
};
