
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const CategoriesSection = () => {
  const categories = [
    {
      title: 'Casas familiares',
      description: 'Familias amorosas con experiencia',
      icon: '🏠',
      count: '150+ disponibles',
      color: 'from-warm-400 to-warm-500'
    },
    {
      title: 'Veterinarias certificadas',
      description: 'Cuidado médico profesional 24/7',
      icon: '🏥',
      count: '25+ clínicas',
      color: 'from-petbnb-400 to-petbnb-500'
    },
    {
      title: 'Cuidadores individuales',
      description: 'Atención personalizada uno a uno',
      icon: '👨‍⚕️',
      count: '200+ cuidadores',
      color: 'from-sage-400 to-sage-500'
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explora nuestros servicios
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Diferentes opciones de cuidado para satisfacer las necesidades específicas de tu mascota
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card key={index} className="group cursor-pointer border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {category.description}
                </p>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  {category.count}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
