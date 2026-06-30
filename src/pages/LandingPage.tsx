import { useState } from 'react';
import { ArrowRight, BookOpen, Globe2, Heart, Sparkles, Check, ChevronRight } from 'lucide-react';
import schoolHero from '../african_school_hero.png';

interface LandingPageProps {
  activeLanguage: 'en' | 'fr';
  onPortalClick: () => void;
}

export default function LandingPage({ activeLanguage, onPortalClick }: LandingPageProps) {
  const [activeConcept, setActiveConcept] = useState<'pedagogy' | 'immersion' | 'wellbeing'>('pedagogy');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const concepts = {
    pedagogy: {
      title_en: 'School Analytics Made Easy',
      title_fr: 'Analyses scolaires simplifiées',
      text_en: 'Kitondo Analytics takes the burden away from daily administration tasks, creating a world for educators to focus on what matters most - student needs. Track performance, analyze exam statistics, and generate report cards instantly.',
      text_fr: 'Kitondo Analytics élimine le fardeau des tâches administratives quotidiennes. Suivez les performances, analysez les statistiques des examens et générez des bulletins scolaires instantanément.',
      badge_en: 'Analytics Platform',
      badge_fr: 'Plateforme d\'analyse',
    },
    immersion: {
      title_en: 'Comprehensive Digital Learning',
      title_fr: 'Apprentissage numérique complet',
      text_en: 'Kitondo Learning is a comprehensive digital learning platform that allows parents to track study progress and identify academic areas that need improvement, helping pupils improve their grades through structured video lessons.',
      text_fr: 'Kitondo Learning est une plateforme d\'apprentissage numérique complète qui permet aux parents de suivre les progrès d\'étude et d\'identifier les domaines à améliorer.',
      badge_en: 'Learning Platform',
      badge_fr: 'Plateforme d\'apprentissage',
    },
    wellbeing: {
      title_en: 'Smooth & Error-Free School Finance',
      title_fr: 'Gestion financière fluide',
      text_en: 'Kitondo Finance empowers our school and parents to manage and control accounts effectively. Parents can track fees, review invoices, and settle balances instantly online with secure mobile money or bank transfers.',
      text_fr: 'Kitondo Finance permet à notre école et aux parents de gérer et contrôler les comptes efficacement. Suivez les frais, examinez les factures et réglez les soldes en ligne.',
      badge_en: 'Finance Tracker',
      badge_fr: 'Gestion financière',
    },
  };

  const testimonials = [
    {
      quote_en: "Choosing Kitondo for our son was the best decision we made. The speed at which he picked up Spanish and French while keeping high grades in English was outstanding.",
      quote_fr: "Choisir Kitondo pour notre fils a été la meilleure décision que nous ayons prise. La rapidité avec laquelle il a appris l'espagnol et le français tout en maintenant d'excellents résultats en anglais est incroyable.",
      author: "Insert Parent Name",
      role_en: "Parent of Grade 4 Student",
      role_fr: "",
    },
    {
      quote_en: "The trilingual concept is supported by a very caring team of teachers. It is more than a school; it's a cooperative family where children develop confidence and global awareness.",
      quote_fr: "Le concept trilingue est soutenu par une équipe d'enseignants très attentionnée. C'est plus qu'une école; c'est une famille coopérative.",
      author: "Insert Parent name",
      role_en: "Parent of Kindergarten & Grade 2 Students",
      role_fr: "Parent d'élèves de maternelle et 2e année",
    },
  ];

  return (
    <div className="w-full bg-cream min-h-screen text-forest font-sans selection:bg-forest/10 selection:text-forest">

      {/* 1. HERO SECTION */}
      <section className="relative px-6 py-12 md:py-24 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
        <div className="lg:col-span-6 space-y-6 text-left">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-forest/10 bg-forest/5 rounded-full text-xs font-bold text-accent tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            {activeLanguage === 'en' ? 'Admission open for 2026/2027' : 'Admissions ouvertes pour 2026/2027'}
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-forest leading-tight">
            {activeLanguage === 'en' ? (
              <>Be <span className="italic text-accent">Extraordinary!</span></>
            ) : (
              <>Soyez <span className="italic text-accent">Extraordinaire!</span></>
            )}
          </h1>

          <p className="text-forest/70 text-base md:text-lg max-w-lg leading-relaxed">
            {activeLanguage === 'en' ? (
              'Making teaching and learning effective, engaging and productive with school analytics, digital learning tools, and school fees tracking.'
            ) : (
              'Rendre l\'enseignement et l\'apprentissage efficaces, engageants et productifs grâce aux analyses scolaires et au suivi des frais.'
            )}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button
              onClick={onPortalClick}
              className="px-8 py-3 bg-forest hover:bg-forest-light text-cream font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 text-center flex items-center justify-center gap-2 group"
            >
              {activeLanguage === 'en' ? 'Access Parent Portal' : 'Accéder au Portail Parents'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#concept"
              className="px-8 py-3 border border-forest/10 hover:border-forest text-forest hover:bg-forest/5 font-bold rounded-full transition-all duration-200 text-center"
            >
              {activeLanguage === 'en' ? 'Explore Concept' : 'Découvrir le Concept'}
            </a>
          </div>

        </div>

        {/* Hero Image Side */}
        <div className="lg:col-span-6 relative">
          <div className="absolute inset-0 bg-accent/5 rounded-3xl -rotate-2 transform scale-105 z-0"></div>
          <div className="relative z-10 overflow-hidden rounded-3xl border border-forest/10 shadow-2xl">
            <img
              src={schoolHero}
              alt="Kitondo School Classroom"
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

      </section>

      {/* 2. TRILINGUAL IMMERSION GRID */}
      <section id="schools" className="bg-forest text-cream py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-left">

          <div className="max-w-2xl mb-16">
            <p className="text-xs uppercase tracking-widest text-accent font-bold mb-3">
              {activeLanguage === 'en' ? 'Linguistic Model' : 'Modèle linguistique'}
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-cream">
              {activeLanguage === 'en' ? (
                'Our Trilingual Immersion Program'
              ) : (
                'Notre programme d\'immersion trilingue'
              )}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* English Card */}
            <div className="p-8 border border-cream/10 bg-cream/[0.03] rounded-2xl hover:border-accent/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-6 text-accent">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-cream mb-3">
                {activeLanguage === 'en' ? 'Primary/CBC' : 'Maîtrise de l\'anglais'}
              </h3>
              <p className="text-cream/70 text-sm leading-relaxed mb-6">
                {activeLanguage === 'en' ? (
                  'We offer CBC classes.'
                ) : (
                  'L\'enseignement principal est conçu pour dépasser les normes ministérielles. Les élèves apprennent à s\'exprimer en anglais comme langue maternelle.'
                )}
              </p>
              <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase">
                <span>{activeLanguage === 'en' ? 'First Language' : 'Langue maternelle'}</span>
                <Check className="w-4 h-4" />
              </div>
            </div>

            {/* French Card */}
            <div className="p-8 border border-cream/10 bg-cream/[0.03] rounded-2xl hover:border-accent/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-6 text-accent">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-cream mb-3">
                {activeLanguage === 'en' ? 'HighSchool' : 'Immersion française'}
              </h3>
              <p className="text-cream/70 text-sm leading-relaxed mb-6">
                {activeLanguage === 'en' ? (
                  'We Offer Highschool Classes.'
                ) : (
                  'Intégration organique en sciences, histoire et sciences sociales. Les élèves atteignent un bilinguisme complet.'
                )}
              </p>
              <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase">
                <span>{activeLanguage === 'en' ? 'Full Immersion' : 'Immersion complète'}</span>
                <Check className="w-4 h-4" />
              </div>
            </div>

            {/* Spanish Card */}
            <div className="p-8 border border-cream/10 bg-cream/[0.03] rounded-2xl hover:border-accent/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-6 text-accent">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-cream mb-3">
                {activeLanguage === 'en' ? 'University' : 'Communication en espagnol'}
              </h3>
              <p className="text-cream/70 text-sm leading-relaxed mb-6">
                {activeLanguage === 'en' ? (
                  'We offer University classes.'
                ) : (
                  'Enseigné par le jeu, les arts, la musique et l\'intégration culturelle quotidienne pour bâtir une fluidité orale exceptionnelle.'
                )}
              </p>
              <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase">
                <span>{activeLanguage === 'en' ? 'High Oral Proficiency' : 'Haute maîtrise orale'}</span>
                <Check className="w-4 h-4" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. DYNAMIC CONCEPT ACCORDION */}
      <section id="concept" className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Concept Selection */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-accent font-bold mb-3">
                {activeLanguage === 'en' ? 'Why Kitondo?' : 'Pourquoi Kitondo?'}
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-forest">
                {activeLanguage === 'en' ? 'School Technology' : 'Technologie scolaire'}
              </h2>
            </div>

            <div className="space-y-4">

              {/* Tab 1 */}
              <button
                onClick={() => setActiveConcept('pedagogy')}
                className={`w-full text-left p-6 rounded-2xl border transition-all flex items-start gap-4 ${activeConcept === 'pedagogy'
                  ? 'bg-cream-dark border-forest/10 shadow-md'
                  : 'border-transparent hover:bg-forest/5'
                  }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${activeConcept === 'pedagogy' ? 'bg-forest text-cream' : 'bg-forest/10 text-forest'
                  }`}>
                  1
                </div>
                <div>
                  <h3 className="font-bold text-base text-forest">
                    {activeLanguage === 'en' ? 'Kitondo Analytics' : 'Kitondo Analytics'}
                  </h3>
                  <p className="text-forest/70 text-xs mt-1">
                    {activeLanguage === 'en' ? 'Grade tracking, stats, and reports' : 'Bulletins et suivi de performance'}
                  </p>
                </div>
                <ChevronRight className={`ml-auto w-5 h-5 transition-transform ${activeConcept === 'pedagogy' ? 'rotate-90 text-accent' : 'opacity-40'}`} />
              </button>

              {/* Tab 2 */}
              <button
                onClick={() => setActiveConcept('immersion')}
                className={`w-full text-left p-6 rounded-2xl border transition-all flex items-start gap-4 ${activeConcept === 'immersion'
                  ? 'bg-cream-dark border-forest/10 shadow-md'
                  : 'border-transparent hover:bg-forest/5'
                  }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${activeConcept === 'immersion' ? 'bg-forest text-cream' : 'bg-forest/10 text-forest'
                  }`}>
                  2
                </div>
                <div>
                  <h3 className="font-bold text-base text-forest">
                    {activeLanguage === 'en' ? 'Kitondo Learning' : 'Kitondo Learning'}
                  </h3>
                  <p className="text-forest/70 text-xs mt-1">
                    {activeLanguage === 'en' ? 'Syllabus revision guides and progress' : 'Révision numérique et devoirs'}
                  </p>
                </div>
                <ChevronRight className={`ml-auto w-5 h-5 transition-transform ${activeConcept === 'immersion' ? 'rotate-90 text-accent' : 'opacity-40'}`} />
              </button>

              {/* Tab 3 */}
              <button
                onClick={() => setActiveConcept('wellbeing')}
                className={`w-full text-left p-6 rounded-2xl border transition-all flex items-start gap-4 ${activeConcept === 'wellbeing'
                  ? 'bg-cream-dark border-forest/10 shadow-md'
                  : 'border-transparent hover:bg-forest/5'
                  }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${activeConcept === 'wellbeing' ? 'bg-forest text-cream' : 'bg-forest/10 text-forest'
                  }`}>
                  3
                </div>
                <div>
                  <h3 className="font-bold text-base text-forest">
                    {activeLanguage === 'en' ? 'Kitondo Finance' : 'Kitondo Finance'}
                  </h3>
                  <p className="text-forest/70 text-xs mt-1">
                    {activeLanguage === 'en' ? 'Invoice tracking and online payments' : 'Facturation et paiements sécurisés'}
                  </p>
                </div>
                <ChevronRight className={`ml-auto w-5 h-5 transition-transform ${activeConcept === 'wellbeing' ? 'rotate-90 text-accent' : 'opacity-40'}`} />
              </button>

            </div>

          </div>

          {/* Right Concept Detail Display */}
          <div className="lg:col-span-7 p-8 md:p-12 border border-forest/10 bg-cream-dark rounded-3xl text-left space-y-6 shadow-xl relative overflow-hidden flex flex-col justify-center min-h-[380px]">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/15 rounded-full text-xs font-bold text-accent tracking-wide uppercase">
              {activeLanguage === 'en' ? concepts[activeConcept].badge_en : concepts[activeConcept].badge_fr}
            </div>

            <h3 className="font-display text-2xl md:text-3xl font-bold text-forest">
              {activeLanguage === 'en' ? concepts[activeConcept].title_en : concepts[activeConcept].title_fr}
            </h3>

            <p className="text-forest/80 text-base md:text-lg leading-relaxed">
              {activeLanguage === 'en' ? concepts[activeConcept].text_en : concepts[activeConcept].text_fr}
            </p>

            <div className="pt-4 flex items-center gap-3 text-forest font-bold text-xs uppercase tracking-wider">
              <span>{activeLanguage === 'en' ? 'Learn more' : 'En savoir plus'}</span>
              <ArrowRight className="w-4 h-4 text-accent" />
            </div>
          </div>

        </div>
      </section>

      {/* 4. TESTIMONIALS SLIDER */}
      <section className="bg-cream-dark py-16 md:py-24 px-6 md:px-12 border-t border-b border-forest/5">
        <div className="max-w-4xl mx-auto text-center space-y-8">

          <p className="text-xs uppercase tracking-widest text-accent font-bold">
            {activeLanguage === 'en' ? 'Parent Stories' : 'Témoignages'}
          </p>

          <blockquote className="font-display text-2xl md:text-3xl italic text-forest leading-relaxed font-semibold">
            "{activeLanguage === 'en' ? testimonials[activeTestimonial].quote_en : testimonials[activeTestimonial].quote_fr}"
          </blockquote>

          <div>
            <p className="font-bold text-base text-forest">{testimonials[activeTestimonial].author}</p>
            <p className="text-forest/50 text-xs uppercase tracking-wider font-bold mt-1">
              {activeLanguage === 'en' ? testimonials[activeTestimonial].role_en : testimonials[activeTestimonial].role_fr}
            </p>
          </div>

          {/* Slider Dots */}
          <div className="flex justify-center gap-3 pt-4">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${activeTestimonial === idx ? 'bg-accent w-6' : 'bg-forest/20 hover:bg-forest/40'
                  }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              ></button>
            ))}
          </div>

        </div>
      </section>

      {/* 5. FOOTER */}
      <footer id="cooperative" className="bg-forest text-cream pt-16 pb-12 px-6 md:px-12 border-t border-cream/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left mb-16">

          {/* Logo Brand Info */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-tight text-cream">
                Kitondo
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-accent mt-0.5 leading-none">
                Trilingual School
              </span>
            </div>
            <p className="text-cream/50 text-sm max-w-xs leading-relaxed">
              {activeLanguage === 'en' ? (
                'Fostering linguistic mastery, active learning, and healthy lifestyle habits for kids.'
              ) : (
                'Favoriser la maîtrise linguistique, l\'apprentissage actif et de saines habitudes de vie pour les enfants.'
              )}
            </p>
          </div>

          {/* Concept Links */}
          <div>
            <p className="text-xs uppercase tracking-widest text-accent font-bold mb-4">
              Concept
            </p>
            <ul className="space-y-2 text-sm text-cream/70">
              <li>
                <a href="#concept" className="hover:text-accent transition-colors">
                  {activeLanguage === 'en' ? 'Linguistic Immersion' : 'Immersion linguistique'}
                </a>
              </li>
              <li>
                <a href="#concept" className="hover:text-accent transition-colors">
                  {activeLanguage === 'en' ? 'Personalized Pedagogy' : 'Pédagogie active'}
                </a>
              </li>
              <li>
                <a href="#concept" className="hover:text-accent transition-colors">
                  {activeLanguage === 'en' ? 'Healthy Lifestyle' : 'Saines habitudes'}
                </a>
              </li>
            </ul>
          </div>

          {/* School Network Links */}
          <div>
            <p className="text-xs uppercase tracking-widest text-accent font-bold mb-4">
              {activeLanguage === 'en' ? 'Cooperative' : 'Coopérative'}
            </p>
            <ul className="space-y-2 text-sm text-cream/70">
              <li>
                <a href="#schools" className="hover:text-accent transition-colors">
                  {activeLanguage === 'en' ? 'Our Campuses' : 'Nos campus'}
                </a>
              </li>
              <li>
                <a href="#cooperative" className="hover:text-accent transition-colors">
                  {activeLanguage === 'en' ? 'Coop Vision' : 'Coop Vision'}
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-accent transition-colors">
                  {activeLanguage === 'en' ? 'Careers' : 'Carrières'}
                </a>
              </li>
            </ul>
          </div>

          {/* Portal Links */}
          <div>
            <p className="text-xs uppercase tracking-widest text-accent font-bold mb-4">
              Portal
            </p>
            <ul className="space-y-2 text-sm text-cream/70">
              <li>
                <button onClick={onPortalClick} className="hover:text-accent transition-colors text-left font-bold">
                  {activeLanguage === 'en' ? 'Parent Portal Login' : 'Connexion Portail Parents'}
                </button>
              </li>
              <li>
                <button onClick={onPortalClick} className="hover:text-accent transition-colors text-left">
                  {activeLanguage === 'en' ? 'Admin Access' : 'Accès Administrateur'}
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-cream/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/40">
          <p>© 2026 Kitondo Boys School. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Designed in partnership with TechAI</p>
        </div>

      </footer>

    </div>
  );
}
