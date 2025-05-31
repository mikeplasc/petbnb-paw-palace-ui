
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    type: string;
    size: string;
    location: string;
    urgent: boolean;
  };
  onApplyFilters: (filters: any) => void;
  onResetFilters: () => void;
}

const FiltersModal = ({ isOpen, onClose, filters, onApplyFilters, onResetFilters }: FiltersModalProps) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      type: '',
      size: '',
      location: '',
      urgent: false
    };
    setLocalFilters(resetFilters);
    onResetFilters();
    onClose();
  };

  // Update local filters when props change
  React.useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Filtros de búsqueda
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Tipo de mascota */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Tipo de mascota</Label>
            <Select 
              value={localFilters.type} 
              onValueChange={(value) => setLocalFilters(prev => ({ ...prev, type: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el tipo" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                <SelectItem value="">Todos los tipos</SelectItem>
                <SelectItem value="Perro">Perros</SelectItem>
                <SelectItem value="Gato">Gatos</SelectItem>
                <SelectItem value="Ave">Aves</SelectItem>
                <SelectItem value="Conejo">Conejos</SelectItem>
                <SelectItem value="Hámster">Hámsters</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tamaño */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Tamaño</Label>
            <Select 
              value={localFilters.size} 
              onValueChange={(value) => setLocalFilters(prev => ({ ...prev, size: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el tamaño" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                <SelectItem value="">Todos los tamaños</SelectItem>
                <SelectItem value="Pequeño">Pequeño</SelectItem>
                <SelectItem value="Mediano">Mediano</SelectItem>
                <SelectItem value="Grande">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Ubicación */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Ubicación</Label>
            <Input
              placeholder="Ingresa la ubicación"
              value={localFilters.location}
              onChange={(e) => setLocalFilters(prev => ({ ...prev, location: e.target.value }))}
            />
          </div>

          {/* Solo urgentes */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="urgent"
              checked={localFilters.urgent}
              onCheckedChange={(checked) => setLocalFilters(prev => ({ ...prev, urgent: !!checked }))}
            />
            <Label htmlFor="urgent" className="text-sm font-medium">
              Solo mostrar casos urgentes
            </Label>
          </div>

          {/* Filtros activos */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs font-medium text-gray-600 mb-2">Filtros activos:</p>
            <div className="flex flex-wrap gap-1">
              {localFilters.type && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  Tipo: {localFilters.type}
                </span>
              )}
              {localFilters.size && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Tamaño: {localFilters.size}
                </span>
              )}
              {localFilters.location && (
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                  Ubicación: {localFilters.location}
                </span>
              )}
              {localFilters.urgent && (
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                  Urgentes
                </span>
              )}
              {!localFilters.type && !localFilters.size && !localFilters.location && !localFilters.urgent && (
                <span className="text-gray-500 text-xs">Ningún filtro activo</span>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleReset} className="w-full sm:w-auto">
            Limpiar filtros
          </Button>
          <Button onClick={handleApply} className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700">
            Aplicar filtros
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FiltersModal;
