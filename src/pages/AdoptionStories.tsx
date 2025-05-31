import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Share2, Calendar } from 'lucide-react';
import { getAdoptionStories, likeAdoptionStory } from '@/services/adoptionStoryService';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

const AdoptionStories = () => {
  const [expandedStory, setExpandedStory] = useState<string | null>(null);

  const { data: stories = [], isLoading, refetch } = useQuery({
    queryKey: ['adoption-stories'],
    queryFn: getAdoptionStories,
  });

  const handleLike = async (storyId: string) => {
    try {
      await likeAdoptionStory(storyId);
      toast.success('¡Historia marcada como favorita!');
      refetch();
    } catch (error) {
      console.error('Error liking story:', error);
      toast.error('No se pudo marcar como favorita');
    }
  };

  const handleShare = async (story: any) => {
    try {
      await navigator.share({
        title: story.title,
        text: `¡Mira esta hermosa historia de adopción de ${story.pet_name}!`,
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing story:', error);
      // Fallback for browsers that don't support sharing
      navigator.clipboard.writeText(window.location.href);
      toast.success('¡Enlace copiado al portapapeles!');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, index) => (
              <Card key={index}>
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Historias de Adopción
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Descubre las hermosas historias de mascotas que encontraron su hogar para siempre.
          Cada historia es única y especial.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stories.map((story) => (
          <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={story.images[0] || story.pet_image}
                alt={story.pet_name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="bg-white/90 hover:bg-white"
                  onClick={() => handleShare(story)}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="bg-white/90 hover:bg-white"
                  onClick={() => handleLike(story.id)}
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage src={story.user_avatar} />
                  <AvatarFallback>{story.user_name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{story.user_name}</p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(story.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <CardTitle className="text-xl mb-2">{story.title}</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    {story.pet_name}
                  </Badge>
                  <Badge variant="outline" className="text-gray-600">
                    <Heart className="h-3 w-3 mr-1 fill-current" />
                    {story.likes} me gusta
                  </Badge>
                </div>

                <p className={`text-gray-600 ${
                  expandedStory === story.id ? '' : 'line-clamp-3'
                }`}>
                  {story.content}
                </p>

                {story.content.length > 150 && (
                  <Button
                    variant="link"
                    onClick={() => setExpandedStory(
                      expandedStory === story.id ? null : story.id
                    )}
                    className="p-0 h-auto font-medium text-purple-600 hover:text-purple-700"
                  >
                    {expandedStory === story.id ? 'Leer menos' : 'Leer más'}
                  </Button>
                )}

                {story.images.length > 1 && (
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {story.images.slice(1).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${story.pet_name} - ${index + 2}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {stories.length === 0 && (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">
            Aún no hay historias de adopción. ¡Sé el primero en compartir tu historia!
          </p>
        </div>
      )}
    </div>
  );
};

export default AdoptionStories; 