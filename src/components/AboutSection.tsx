import React from "react";

// Section "Votre courtier à Gennevilliers" with bento-style image layout
export default function AboutSection() {
  return (
    <section className="relative w-full py-16 md:py-24 bg-[#F5F3EF]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div className="space-y-6">
            <h2 className="font-heading text-[32px] md:text-[44px] leading-[1.1] tracking-tight text-[#0D1B2A]">
              Votre courtier d'assurances à Gennevilliers
            </h2>
            
            <div className="space-y-4 text-[#0D1B2A]/80 text-base md:text-lg">
              <p>
                Chez <strong className="font-semibold text-[#0D1B2A]">Prévoyance Services</strong>, nous croyons que chaque client mérite une solution d'<strong className="font-semibold">assurance</strong> unique. Situés au cœur de <strong className="font-semibold">Gennevilliers</strong>, nous accompagnons particuliers et professionnels dans le choix de couvertures adaptées à leurs besoins.
              </p>
              
              <p>
                Que ce soit pour votre <strong className="font-semibold">santé</strong>, votre <strong className="font-semibold">logement</strong> ou votre <strong className="font-semibold">voiture</strong>, notre équipe s'engage à vous proposer des solutions fiables, transparentes et compétitives.
              </p>
              
              <p className="text-[#0D1B2A] font-medium">
                Service rapide, transparent, et fiable pour une protection sans compromis. Faites le choix de l'assurance personnalisée et optimisez votre sécurité dès maintenant.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white font-bold text-lg">
                +12k
              </div>
              <span className="text-[#0D1B2A] font-medium">D'adhérents satisfaits</span>
            </div>
          </div>

          {/* Right: Bento image grid */}
          <div className="relative grid grid-cols-2 gap-4 h-[500px]">
            {/* Large image - top left */}
            <div className="relative col-span-1 row-span-2 rounded-3xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80&auto=format&fit=crop"
                alt="Famille heureuse à la maison"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Small circular image - top right */}
            <div className="relative rounded-full overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&auto=format&fit=crop"
                alt="Jeune entrepreneur"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Medium rounded image - middle right */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80&auto=format&fit=crop"
                alt="Couple senior souriant"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom center - overlapping */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80&auto=format&fit=crop"
                alt="Maison moderne"
                className="w-full h-32 object-cover"
              />
            </div>

            {/* Small circular - bottom left corner */}
            <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full overflow-hidden shadow-lg border-2 border-white">
              <img
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=200&q=80&auto=format&fit=crop"
                alt="Voiture assurée"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Small circular - top right corner */}
            <div className="absolute top-4 right-4 w-24 h-24 rounded-full overflow-hidden shadow-lg border-2 border-white">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&q=80&auto=format&fit=crop"
                alt="Professionnel au bureau"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
