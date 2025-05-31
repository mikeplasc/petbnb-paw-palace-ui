
const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-gray-900 text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-petbnb-400 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🐾</span>
              </div>
              <span className="text-xl font-bold">Petbnb</span>
            </div>
            <p className="text-gray-400 text-sm">
              La plataforma líder en cuidado temporal de mascotas en México.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Buscar cuidadores</li>
              <li>Veterinarias certificadas</li>
              <li>Cuidado a domicilio</li>
              <li>Emergencias 24/7</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Acerca de nosotros</li>
              <li>Carreras</li>
              <li>Prensa</li>
              <li>Blog</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Centro de ayuda</li>
              <li>Contacto</li>
              <li>Términos de servicio</li>
              <li>Privacidad</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Petbnb. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
