
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { banners } from "../RTK/store/backendApi";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);
  
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + banners.length) % banners.length);
  };
  
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  
  return (
    <div className="relative overflow-hidden h-[300px] md:h-[400px] lg:h-[500px] bg-gray-900">
      {/* Slides */}
      <div className="absolute inset-0">
        {banners.map((banner, index) => (
          <div 
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{
              backgroundImage: `url(${banner.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
            
            {/* Content */}
            <div className="relative z-20 container mx-auto h-full px-6 flex flex-col justify-center">
              <div className="max-w-lg">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 animate-in fade-in">
                  {banner.title}
                </h1>
                <p className="text-white/90 text-lg md:text-xl mb-6 animate-in fade-in">
                  {banner.subtitle}
                </p>
                <Link 
                  to={banner.link}
                  className="inline-flex bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors animate-in fade-in"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white transition-colors backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white transition-colors backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      
      {/* Indicator dots */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-2">
        {banners.map((_, index) => (
          <button 
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
