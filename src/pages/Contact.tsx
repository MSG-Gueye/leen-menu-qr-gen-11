import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, MessageSquare, Headphones } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simuler l'envoi du formulaire
    toast.success("Votre message a été envoyé avec succès ! Nous vous répondrons dans les 24h.");
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-8 w-8 text-scanner-green-600" />,
      title: "Adresse",
      details: ["Dakar, Sénégal"]
    },
    {
      icon: <Phone className="h-8 w-8 text-scanner-green-600" />,
      title: "Téléphone",
      details: ["+221 77 000 00 00"]
    },
    {
      icon: <Mail className="h-8 w-8 text-scanner-green-600" />,
      title: "Email",
      details: ["contact@kaay-scanner.sn", "support@kaay-scanner.sn"]
    },
    {
      icon: <Clock className="h-8 w-8 text-scanner-green-600" />,
      title: "Horaires",
      details: ["Lun - Ven: 8h00 - 18h00", "Sam: 9h00 - 14h00", "Dim: Fermé"]
    }
  ];

  const supportOptions = [
    {
      icon: <MessageSquare className="h-12 w-12 text-scanner-green-600" />,
      title: "Chat en direct",
      description: "Obtenez une réponse immédiate via notre chat en ligne",
      action: "Démarrer le chat"
    },
    {
      icon: <Headphones className="h-12 w-12 text-scanner-green-600" />,
      title: "Support téléphonique",
      description: "Appelez-nous pour une assistance personnalisée",
      action: "Nous appeler"
    },
    {
      icon: <Mail className="h-12 w-12 text-scanner-green-600" />,
      title: "Support par email",
      description: "Envoyez-nous un email, nous répondons sous 24h",
      action: "Envoyer un email"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-scanner-green-50 to-white">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-scanner-green-600">
            Kaay-Scanner
          </a>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="/" className="text-gray-600 hover:text-scanner-green-600">Accueil</a></li>
              <li><a href="/features" className="text-gray-600 hover:text-scanner-green-600">Fonctionnalités</a></li>
              <li><a href="/pricing" className="text-gray-600 hover:text-scanner-green-600">Tarifs</a></li>
              <li><a href="/contact" className="text-scanner-green-600 font-semibold">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Contactez
            <span className="text-scanner-green-600 block">Notre Équipe</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Nous sommes là pour vous aider. N'hésitez pas à nous contacter pour toute question 
            ou pour planifier une démonstration personnalisée.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Formulaire de contact */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Envoyez-nous un message
              </CardTitle>
              <CardDescription>
                Remplissez le formulaire ci-dessous et nous vous répondrons rapidement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nom complet</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Sujet</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="mt-1"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-scanner-green-600 hover:bg-scanner-green-700 py-3"
                >
                  Envoyer le message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Informations de contact */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="shadow-md">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      {info.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-3">{info.title}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      {info.details.map((detail, idx) => (
                        <p key={idx}>{detail}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="shadow-lg bg-scanner-green-600 text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold mb-4">Besoin d'aide immédiate ?</h3>
                <p className="mb-6 opacity-90">
                  Notre équipe de support est disponible pour vous assister
                </p>
                <Button 
                  className="bg-white text-scanner-green-600 hover:bg-gray-100"
                  size="lg"
                >
                  Demander une démonstration
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Options de support */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Autres moyens de nous contacter
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-6">
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {option.description}
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-scanner-green-600 text-scanner-green-600 hover:bg-scanner-green-600 hover:text-white"
                  >
                    {option.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;