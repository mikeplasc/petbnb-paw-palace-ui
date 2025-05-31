
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { mockReviews } from '@/data/mockData';

const TestimonialsSection = () => {
  const testimonials = mockReviews.slice(0, 3);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Miles de dueños confían en Petbnb para el cuidado de sus mascotas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((review) => (
            <Card key={review.id} className="border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  "{review.comment}"
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-900">{review.userName}</span>
                  <span className="text-gray-500">Mascota: {review.petName}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
