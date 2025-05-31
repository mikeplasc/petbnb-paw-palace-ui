
const mockResponses = [
  "¡Hola! Gracias por tu interés. Estaré encantado de cuidar a tu mascota. ¿Cuándo necesitas el servicio?",
  "¡Perfecto! Tengo disponibilidad para esas fechas. ¿Podrías contarme un poco más sobre tu mascota?",
  "Claro, no hay problema. Me especializo en el cuidado de mascotas mayores. ¿Necesita algún medicamento especial?",
  "¡Excelente! Me encantan los cachorros. Tengo mucha experiencia con entrenamiento básico también.",
  "Sí, puedo hacer paseos largos. Vivo cerca del parque y me gusta mantener a las mascotas activas.",
  "Por supuesto, puedo administrar medicamentos. Tengo experiencia previa con tratamientos veterinarios.",
  "¡Genial! También ofrezco servicio de baño y cepillado sin costo adicional.",
  "Perfecto, tengo un jardín grande y seguro donde tu mascota podrá jugar libremente.",
  "Claro, puedo enviar fotos y videos durante el día para que veas cómo está tu mascota.",
  "¡Hola! Sí, acepto gatos. Tengo experiencia con felinos de todas las edades.",
  "Por supuesto, puedo recoger a tu mascota. ¿A qué hora te viene mejor?",
  "Sí, ofrezco cuidado nocturno. Tu mascota estará en excelentes manos.",
  "¡Perfecto! También hago socialización con otras mascotas si lo deseas.",
  "Claro, puedo seguir la rutina específica de alimentación que me indiques.",
  "Sí, tengo cámaras de seguridad para mayor tranquilidad de los dueños.",
  "¡Excelente! También ofrezco servicios de grooming básico.",
  "Por supuesto, puedo cuidar múltiples mascotas de la misma familia.",
  "Sí, tengo experiencia con mascotas con necesidades especiales.",
  "Claro, puedo hacer videollamadas para que veas a tu mascota cuando quieras.",
  "¡Perfecto! También ofrezco entrenamiento básico de obediencia.",
  "Sí, puedo cuidar aves. Tengo experiencia con diferentes especies.",
  "Por supuesto, puedo administrar suplementos y vitaminas.",
  "¡Genial! También hago servicios de taxi para mascotas al veterinario.",
  "Sí, acepto mascotas de todas las razas y tamaños.",
  "Claro, puedo hacer ejercicios de rehabilitación si los necesita.",
  "¡Perfecto! También ofrezco cuidado de mascotas exóticas.",
  "Sí, tengo aire acondicionado y calefacción para el confort de las mascotas.",
  "Por supuesto, puedo seguir dietas especiales y restricciones alimentarias.",
  "¡Excelente! También hago servicios de compañía para mascotas solitarias.",
  "Sí, puedo cuidar cachorros recién nacidos con biberón si es necesario."
];

export interface Message {
  id: string;
  hostId: string;
  hostName: string;
  message: string;
  response: string;
  timestamp: string;
}

let messages: Message[] = [];

export const sendMessage = (hostId: string, hostName: string, messageContent: string): Message => {
  const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
  
  const newMessage: Message = {
    id: Date.now().toString(),
    hostId,
    hostName,
    message: messageContent,
    response: randomResponse,
    timestamp: new Date().toISOString()
  };

  messages.push(newMessage);
  return newMessage;
};

export const getUserMessages = (): Message[] => {
  return messages;
};
