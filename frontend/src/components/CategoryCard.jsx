
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link 
      to={`/category/${category.id}`}
      className="group relative overflow-hidden rounded-lg"
    >
      {/* Category image */}
      <div className="aspect-square relative">
        <img 
          src={category.image} 
          alt={category.name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        {/* Category name */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-medium text-lg">{category.name}</h3>
          <span className="text-white/80 text-sm">Shop now</span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
