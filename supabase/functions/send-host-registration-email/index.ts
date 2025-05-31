
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface HostRegistrationRequest {
  name: string;
  email: string;
  type: string;
  city: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, type, city }: HostRegistrationRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "PetBnB <onboarding@resend.dev>",
      to: [email],
      subject: "¡Solicitud de cuidador recibida! - En proceso de revisión",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Solicitud de Cuidador - PetBnB</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fa;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">PetBnB</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Tu hogar para mascotas felices</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px; font-weight: bold;">¡Hola ${name}!</h2>
              
              <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
                Hemos recibido tu solicitud para convertirte en cuidador de ${type.toLowerCase()} en <strong>${city}</strong>. 
                ¡Estamos emocionados de que quieras formar parte de nuestra comunidad de cuidadores!
              </p>
              
              <!-- Status Card -->
              <div style="background-color: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 24px; margin: 30px 0;">
                <div style="display: flex; align-items: center; margin-bottom: 16px;">
                  <div style="width: 24px; height: 24px; background-color: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                    <span style="color: #ffffff; font-size: 14px; font-weight: bold;">⏱</span>
                  </div>
                  <h3 style="color: #92400e; margin: 0; font-size: 18px; font-weight: bold;">Estado: En Revisión</h3>
                </div>
                <p style="color: #92400e; margin: 0; font-size: 14px; line-height: 1.5;">
                  Tu solicitud está siendo revisada por nuestro equipo de calidad. Este proceso puede tomar entre 24-48 horas.
                </p>
              </div>
              
              <h3 style="color: #1f2937; margin: 30px 0 15px 0; font-size: 20px; font-weight: bold;">📋 Próximos pasos:</h3>
              
              <div style="margin: 20px 0;">
                <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
                  <div style="width: 28px; height: 28px; background-color: #8B5CF6; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                    <span style="color: #ffffff; font-size: 14px; font-weight: bold;">1</span>
                  </div>
                  <div>
                    <h4 style="color: #1f2937; margin: 0 0 4px 0; font-size: 16px; font-weight: 600;">Revisión de documentación</h4>
                    <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.4;">Verificaremos toda la información proporcionada en tu solicitud.</p>
                  </div>
                </div>
                
                <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
                  <div style="width: 28px; height: 28px; background-color: #8B5CF6; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                    <span style="color: #ffffff; font-size: 14px; font-weight: bold;">2</span>
                  </div>
                  <div>
                    <h4 style="color: #1f2937; margin: 0 0 4px 0; font-size: 16px; font-weight: 600;">Entrevista telefónica</h4>
                    <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.4;">Un miembro de nuestro equipo se pondrá en contacto contigo para una breve entrevista.</p>
                  </div>
                </div>
                
                <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
                  <div style="width: 28px; height: 28px; background-color: #8B5CF6; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                    <span style="color: #ffffff; font-size: 14px; font-weight: bold;">3</span>
                  </div>
                  <div>
                    <h4 style="color: #1f2937; margin: 0 0 4px 0; font-size: 16px; font-weight: 600;">Visita de verificación</h4>
                    <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.4;">Programaremos una visita a tu hogar para verificar las condiciones y conocerte en persona. Esto nos ayuda a garantizar la seguridad y bienestar de las mascotas.</p>
                  </div>
                </div>
                
                <div style="display: flex; align-items: flex-start;">
                  <div style="width: 28px; height: 28px; background-color: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                    <span style="color: #ffffff; font-size: 14px; font-weight: bold;">✓</span>
                  </div>
                  <div>
                    <h4 style="color: #1f2937; margin: 0 0 4px 0; font-size: 16px; font-weight: 600;">¡Aprobación y activación!</h4>
                    <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.4;">Una vez completado el proceso, activaremos tu perfil y podrás comenzar a recibir reservas.</p>
                  </div>
                </div>
              </div>
              
              <!-- Important Info -->
              <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 30px 0;">
                <h4 style="color: #1e40af; margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">💡 Información importante:</h4>
                <ul style="color: #1e40af; margin: 8px 0 0 0; padding-left: 20px; font-size: 14px; line-height: 1.5;">
                  <li style="margin-bottom: 4px;">La visita de verificación es obligatoria y completamente gratuita.</li>
                  <li style="margin-bottom: 4px;">Nuestro equipo se pondrá en contacto contigo para coordinar la fecha y hora.</li>
                  <li style="margin-bottom: 4px;">Asegúrate de tener disponible tu identificación oficial durante la visita.</li>
                  <li>El proceso completo suele tomar entre 3-5 días hábiles.</li>
                </ul>
              </div>
              
              <p style="color: #4b5563; line-height: 1.6; margin: 30px 0 0 0; font-size: 16px;">
                Si tienes alguna pregunta durante este proceso, no dudes en contactarnos. ¡Estamos aquí para ayudarte!
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; margin: 0 0 8px 0; font-size: 14px;">
                <strong>PetBnB</strong> - Conectando mascotas con cuidadores de confianza
              </p>
              <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                Si no esperabas este correo, puedes ignorarlo de forma segura.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Registration email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending registration email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
