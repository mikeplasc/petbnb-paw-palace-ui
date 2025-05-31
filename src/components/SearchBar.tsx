import { CalendarIcon, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cities, petTypes } from "@/data/mockData";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { useState } from "react";

interface SearchBarProps {
  onSearch?: (filters: SearchFilters) => void;
  variant?: "hero" | "compact";
}

export interface SearchFilters {
  location: string;
  petType: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

const SearchBar = ({ onSearch, variant = "hero" }: SearchBarProps) => {
  const [location, setLocation] = useState("");
  const [petType, setPetType] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        location,
        petType,
        startDate,
        endDate,
      });
    }
  };

  if (variant === "compact") {
    return (
      <div className="bg-white rounded-full shadow-lg border border-gray-200 p-2 flex items-center space-x-2 max-w-2xl mx-auto">
        <div className="flex-1 px-4">
          <Input
            placeholder="¿Dónde buscas?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border-0 focus-visible:ring-0 text-sm"
          />
        </div>
        <div className="w-px h-8 bg-gray-300" />
        <div className="flex-1 px-4">
          <Select value={petType} onValueChange={setPetType}>
            <SelectTrigger className="border-0 focus:ring-0 text-sm">
              <SelectValue placeholder="Tipo de mascota" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg">
              {petTypes.map((type) => (
                <SelectItem
                  key={type}
                  value={type}
                  className="hover:bg-gray-50"
                >
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={handleSearch}
          size="sm"
          className="rounded-full bg-gradient-to-r from-petbnb-500 to-primary-600 hover:from-petbnb-600 hover:to-primary-700 text-white px-6"
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="space-y-2">
          <Label
            htmlFor="location"
            className="text-sm font-medium text-gray-700"
          >
            Ubicación
          </Label>
          <Input
            placeholder="Ciudad o región"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Pet Type */}
        <div className="space-y-2">
          <Label
            htmlFor="petType"
            className="text-sm font-medium text-gray-700"
          >
            Tipo de mascota
          </Label>
          <Select value={petType} onValueChange={setPetType}>
            <SelectTrigger className="h-12 border-gray-300 focus:ring-2 focus:ring-petbnb-500 focus:border-transparent">
              <SelectValue placeholder="¿Qué mascota tienes?" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg">
              {petTypes.map((type) => (
                <SelectItem
                  key={type}
                  value={type}
                  className="hover:bg-gray-50"
                >
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Start Date */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Fecha de entrada
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-12 w-full justify-start text-left font-normal border-gray-300 hover:bg-gray-50",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? (
                  format(startDate, "PPP", { locale: es })
                ) : (
                  <span>Selecciona fecha</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-white border border-gray-200 shadow-lg"
              align="start"
            >
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                disabled={(date) => date < new Date()}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Fecha de salida
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-12 w-full justify-start text-left font-normal border-gray-300 hover:bg-gray-50",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? (
                  format(endDate, "PPP", { locale: es })
                ) : (
                  <span>Selecciona fecha</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-white border border-gray-200 shadow-lg"
              align="start"
            >
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                disabled={(date) =>
                  date < new Date() || (startDate && date <= startDate)
                }
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button
          onClick={handleSearch}
          size="lg"
          className="bg-gradient-to-r from-petbnb-500 to-primary-600 hover:from-petbnb-600 hover:to-primary-700 text-white px-12 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Search className="w-5 h-5 mr-2" />
          Buscar cuidadores
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
