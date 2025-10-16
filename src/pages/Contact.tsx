import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { CONTACT } from '@/lib/constants';
import { supabase } from '@/lib/supabase';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: '',
    rgpd: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          telephone: formData.telephone,
          sujet: formData.sujet,
          message: formData.message
        });

      if (error) throw error;

      setSuccess(true);
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        sujet: '',
        message: '',
        rgpd: false
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero */}
      <section className="h-[50vh] bg-gradient-to-r from-teal-500 to-cyan-600 flex flex-col justify-center px-8 text-white">
        <div className="max-w-7xl mx-auto w-full">
          <nav className="text-white/70 text-sm mb-4">
            <Link to="/" className="hover:text-white">Accueil</Link> / <span className="text-white">Contact</span>
          </nav>
          <h1 className="text-5xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Notre équipe est à votre écoute pour répondre à toutes vos questions
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulaire */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Envoyez-nous un message</h2>
              
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  Merci ! Votre message a été envoyé. Nous vous répondrons sous 24h.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nom">Nom *</Label>
                    <Input
                      id="nom"
                      value={formData.nom}
                      onChange={(e) => setFormData({...formData, nom: e.target.value})}
                      required
                      className="border-slate-300 focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="prenom">Prénom *</Label>
                    <Input
                      id="prenom"
                      value={formData.prenom}
                      onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                      required
                      className="border-slate-300 focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="border-slate-300 focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <Label htmlFor="telephone">Téléphone *</Label>
                  <Input
                    id="telephone"
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                    required
                    className="border-slate-300 focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <Label htmlFor="sujet">Sujet *</Label>
                  <Input
                    id="sujet"
                    value={formData.sujet}
                    onChange={(e) => setFormData({...formData, sujet: e.target.value})}
                    required
                    className="border-slate-300 focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    rows={6}
                    className="border-slate-300 focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="rgpd"
                    checked={formData.rgpd}
                    onCheckedChange={(checked) => setFormData({...formData, rgpd: checked as boolean})}
                    required
                  />
                  <Label htmlFor="rgpd" className="text-sm text-slate-600 leading-relaxed cursor-pointer">
                    J'accepte que mes données soient utilisées pour me recontacter dans le cadre de ma demande *
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold py-6 text-lg"
                  disabled={loading || !formData.rgpd}
                >
                  {loading ? 'Envoi en cours...' : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Informations */}
            <div className="space-y-8">
              <div className="bg-slate-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Nos coordonnées</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">Adresse</p>
                      <p className="text-slate-600">{CONTACT.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">Téléphone</p>
                      <a href={`tel:${CONTACT.phone}`} className="text-teal-600 hover:text-teal-700 font-medium">
                        {CONTACT.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">Email</p>
                      <a href={`mailto:${CONTACT.email}`} className="text-teal-600 hover:text-teal-700 font-medium">
                        {CONTACT.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">Horaires</p>
                      <p className="text-slate-600">{CONTACT.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="bg-slate-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Nous trouver</h3>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2622.8!2d2.3!3d48.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDU1JzQ4LjAiTiAywrAxOCcwMC4wIkU!5e0!3m2!1sfr!2sfr!4v1234567890"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
