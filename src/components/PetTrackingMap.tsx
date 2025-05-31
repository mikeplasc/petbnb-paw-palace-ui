
import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Battery, Clock, Wifi, WifiOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PetLocation } from '@/services/petLocationService';

interface PetTrackingMapProps {
  petId: string;
  petName: string;
  locations: PetLocation[];
  isRealTimeActive: boolean;
}

const PetTrackingMap: React.FC<PetTrackingMapProps> = ({
  petId,
  petName,
  locations,
  isRealTimeActive
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedLocation, setSelectedLocation] = useState<PetLocation | null>(null);

  const latestLocation = locations[0];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getBatteryColor = (level?: number) => {
    if (!level) return 'text-gray-400';
    if (level > 50) return 'text-green-600';
    if (level > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-4">
      {/* Estado del rastreo */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{petName}</CardTitle>
            <div className="flex items-center gap-2">
              {isRealTimeActive ? (
                <Badge variant="default" className="bg-green-100 text-green-800">
                  <Wifi className="h-3 w-3 mr-1" />
                  En línea
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                  <WifiOff className="h-3 w-3 mr-1" />
                  Desconectado
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {latestLocation ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Última ubicación</p>
                  <p className="text-xs text-gray-600">
                    {latestLocation.latitude.toFixed(6)}, {latestLocation.longitude.toFixed(6)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-sm font-medium">Última actualización</p>
                  <p className="text-xs text-gray-600">
                    {formatDate(latestLocation.timestamp)}
                  </p>
                </div>
              </div>
              {latestLocation.battery_level && (
                <div className="flex items-center gap-2">
                  <Battery className={`h-4 w-4 ${getBatteryColor(latestLocation.battery_level)}`} />
                  <div>
                    <p className="text-sm font-medium">Batería</p>
                    <p className="text-xs text-gray-600">
                      {latestLocation.battery_level}%
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>No hay datos de ubicación disponibles</p>
              <p className="text-sm">El dispositivo GPS aún no ha enviado datos</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mapa placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Mapa de ubicación</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            ref={mapRef}
            className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300"
          >
            <div className="text-center text-gray-500">
              <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">Mapa interactivo</p>
              <p className="text-sm">
                Aquí se mostraría un mapa con la ubicación en tiempo real
              </p>
              <p className="text-xs mt-2">
                Requiere integración con Mapbox o Google Maps
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historial de ubicaciones */}
      {locations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Historial de ubicaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {locations.slice(0, 10).map((location) => (
                <div
                  key={location.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                  onClick={() => setSelectedLocation(location)}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">
                        {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                      </p>
                      <p className="text-xs text-gray-600">
                        {formatDate(location.timestamp)}
                      </p>
                    </div>
                  </div>
                  {location.battery_level && (
                    <div className="flex items-center gap-1">
                      <Battery className={`h-3 w-3 ${getBatteryColor(location.battery_level)}`} />
                      <span className="text-xs">{location.battery_level}%</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PetTrackingMap;
