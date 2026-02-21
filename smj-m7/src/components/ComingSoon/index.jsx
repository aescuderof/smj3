import { Link } from "react-router-dom";
import { Hammer, Clock, Sparkles } from "lucide-react";

const ComingSoon = () => {
  const highlights = [
    {
      icon: <Sparkles className="w-5 h-5 text-dust-grey-500" />,
      label: "Experiencia renovada",
      detail: "Estamos afinando los últimos detalles para que lo disfrutes al máximo."
    },
    {
      icon: <Clock className="w-5 h-5 text-dust-grey-600" />,
      label: "Lanzamiento cercano",
      detail: "Volveremos en cuestión de días, mantente atent@."
    },
    {
      icon: <Hammer className="w-5 h-5 text-dust-grey-700" />,
      label: "Construyendo contigo",
      detail: "Aprovechamos tus sugerencias para crear algo realmente útil."
    }
  ];

  return (
    <section className="min-h-[75vh] w-full bg-linear-to-b from-dust-grey-50 via-dust-grey-100 to-dust-grey-200 text-dust-grey-800">
      <div className="max-w-5xl mx-auto px-6 py-20 flex flex-col items-center text-center gap-10">
        <div className="space-y-4">
          <p className="uppercase tracking-[0.4em] text-sm text-dust-grey-500">
            Próximamente
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-dust-grey-800">
            Estamos preparando algo espectacular
          </h1>
          <p className="text-base md:text-lg text-dust-grey-600 max-w-2xl mx-auto">
            Esta sección aún está en construcción, pero seguimos trabajando para que tengas
            una experiencia impecable. Muy pronto podrás explorar cada detalle sin interrupciones.
          </p>
        </div>

        <div className="w-full bg-white/70 border border-dust-grey-200 rounded-2xl p-6 grid md:grid-cols-3 gap-4 shadow-xl shadow-dust-grey-200/60">
          {highlights.map(({ icon, label, detail }) => (
            <article key={label} className="bg-dust-grey-50 rounded-xl p-4 text-left border border-dust-grey-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-dust-grey-100">
                  {icon}
                </span>
                <p className="font-semibold text-dust-grey-800/90">{label}</p>
              </div>
              <p className="text-sm text-dust-grey-600 leading-relaxed">{detail}</p>
            </article>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 rounded-full border border-dust-grey-600 text-dust-grey-700 hover:bg-dust-grey-100 transition"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;
