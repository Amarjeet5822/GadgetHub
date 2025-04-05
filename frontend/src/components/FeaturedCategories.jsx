
import { Link } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import { getFeaturedCategories } from '../RTK/store/backendApi';

const FeaturedCategories = () => {
  const categories = getFeaturedCategories();
  
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Browse Categories</h2>
            <p className="text-gray-600">Discover our wide range of electronic products</p>
          </div>
          <Link 
            to="/products" 
            className="text-primary hover:text-primary-dark font-medium mt-2 md:mt-0"
          >
            View All Products
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
