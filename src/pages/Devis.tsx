import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Devis() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1
    civilite: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    date_naissance: '',
    code_postal: '',
    ville: '',
    // Step 2
    type_assurance: '',
    // Step 3
    details: {} as any,
    // Step 4
    message: '',
    accepte_contact: false,
    accepte_cgu: false
  });

  const progress = (step / 4) * 100;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('devis')
        .insert({
          civilite: formData.civilite,
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          telephone: formData.telephone,
          date_naissance: formData.date_naissance,
          code_postal: formData.code_postal,
          ville: formData.ville,
          type_assurance: formData.type_assurance,
          details: formData.details,
          message: formData.message
        });

      if (error) throw error;
      navigate('/merci');
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
      <section className="h-[40vh] bg-gradient-to-r from-teal-500 to-cyan-600 flex flex-col justify-center px-8 text-white">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-5xl font-bold mb-4">Demande de devis</h1>
          <p className="text-xl text-white/90">
            Obtenez votre devis personnalisé en quelques minutes
          </p>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="bg-slate-50 py-6 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-slate-600">Étape {step} sur 4</span>
            <span className="text-sm font-semibold text-teal-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Form */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {/* Step 1: Informations personnelles */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Vos informations</h2>
                
                <div>
                  <Label>Civilité *</Label>
                  <RadioGroup value={formData.civilite} onValueChange={(value) => setFormData({...formData, civilite: value})}>
                    <div className="flex gap-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="M" id="m" />
                        <Label htmlFor="m">M.</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Mme" id="mme" />
                        <Label htmlFor="mme">Mme</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nom">Nom *</Label>
                    <Input
                      id="nom"
                      value={formData.nom}
                      onChange={(e) => setFormData({...formData, nom: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="prenom">Prénom *</Label>
                    <Input
                      id="prenom"
                      value={formData.prenom}
                      onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                      required
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
                  />
                </div>

                <div>
                  <Label htmlFor="date_naissance">Date de naissance *</Label>
                  <Input
                    id="date_naissance"
                    type="date"
                    value={formData.date_naissance}
                    onChange={(e) => setFormData({...formData, date_naissance: e.target.value})}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="code_postal">Code postal *</Label>
                    <Input
                      id="code_postal"
                      value={formData.code_postal}
                      onChange={(e) => setFormData({...formData, code_postal: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="ville">Ville *</Label>
                    <Input
                      id="ville"
                      value={formData.ville}
                      onChange={(e) => setFormData({...formData, ville: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Type d'assurance */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Type d'assurance</h2>
                <p className="text-slate-600 mb-6">Sélectionnez le type d'assurance qui vous intéresse</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {['Santé', 'Prévoyance', 'Auto', 'Habitation', 'Animaux'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFormData({...formData, type_assurance: type})}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        formData.type_assurance === type
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-slate-200 hover:border-teal-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-slate-900">{type}</span>
                        {formData.type_assurance === type && (
                          <Check className="w-6 h-6 text-teal-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Détails */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Vos besoins</h2>
                <p className="text-slate-600 mb-6">Précisez vos besoins pour {formData.type_assurance}</p>
                
                <div>
                  <Label htmlFor="details_text">Décrivez vos besoins</Label>
                  <Textarea
                    id="details_text"
                    rows={6}
                    placeholder="Exemple: Je recherche une assurance santé pour ma famille (2 adultes, 2 enfants)..."
                    value={formData.details.description || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      details: {...formData.details, description: e.target.value}
                    })}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Récapitulatif */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Récapitulatif</h2>
                
                <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                  <div>
                    <p className="text-sm text-slate-500">Nom complet</p>
                    <p className="font-semibold text-slate-900">{formData.civilite} {formData.prenom} {formData.nom}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="font-semibold text-slate-900">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Téléphone</p>
                    <p className="font-semibold text-slate-900">{formData.telephone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Type d'assurance</p>
                    <p className="font-semibold text-slate-900">{formData.type_assurance}</p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Message complémentaire (optionnel)</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="contact"
                      checked={formData.accepte_contact}
                      onCheckedChange={(checked) => setFormData({...formData, accepte_contact: checked as boolean})}
                      required
                    />
                    <Label htmlFor="contact" className="text-sm text-slate-600 cursor-pointer">
                      J'accepte d'être contacté par Prévoyance Services *
                    </Label>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="cgu"
                      checked={formData.accepte_cgu}
                      onCheckedChange={(checked) => setFormData({...formData, accepte_cgu: checked as boolean})}
                      required
                    />
                    <Label htmlFor="cgu" className="text-sm text-slate-600 cursor-pointer">
                      J'accepte les conditions générales d'utilisation *
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12 pt-8 border-t border-slate-200">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="border-2 border-slate-300"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Précédent
                </Button>
              )}
              
              {step < 4 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  className="ml-auto bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold"
                  disabled={
                    (step === 1 && (!formData.nom || !formData.email || !formData.telephone)) ||
                    (step === 2 && !formData.type_assurance)
                  }
                >
                  Suivant
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="ml-auto bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold"
                  disabled={loading || !formData.accepte_contact || !formData.accepte_cgu}
                >
                  {loading ? 'Envoi...' : 'Envoyer ma demande'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
