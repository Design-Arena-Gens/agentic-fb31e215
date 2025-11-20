import { StageShowcase } from "@/components/StageShowcase";

export default function Home() {
  const sequences = [
    {
      title: "Ouverture - Rideau de Soie",
      description:
        "Panoramique doux dévoilant la scène, projecteurs pastel se croisant tandis que les chatons prennent place avec un clin d'œil chorégraphié.",
      cue: "Plan large, travelling latéral fluide, accent lumineux doré.",
    },
    {
      title: "Numéro central - Jazz Félin",
      description:
        "Succession de pas syncopés sur un rythme chaloupé, queue battant la mesure et accessoires chatoyants vibrant au tempo.",
      cue: "Zoom circulaire, mouvements steadicam proches des expressions malicieuses.",
    },
    {
      title: "Clôture - Final en Rubans",
      description:
        "Tourbillons de rubans miniatures et trio de sauts parfaitement synchronisés avant une révérence collective.",
      cue: "Ralenti léger, faisceaux lumineux convergents, effet bokeh scintillant.",
    },
  ];

  const lightingNotes = [
    {
      name: "Projecteurs latéraux",
      palette: "Prunes électriques, bleu glacier, reflets champagne.",
      detail:
        "Balayages asymétriques soulignant la texture soyeuse du pelage tout en conservant les ombres douces.",
    },
    {
      name: "Rampes de scène",
      palette: "Or rosé, ambre clair, pointes lavande.",
      detail:
        "Bordure lumineuse pour découper chaque silhouette et accompagner les déplacements rapides sur le plancher.",
    },
    {
      name: "Contre-jour caressé",
      palette: "Blanc lunaire, nacre irisée.",
      detail:
        "Halo diffus derrière le rideau accentuant les poils angora lors des rotations et portés humoristiques.",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#08011e] via-[#0b012e] to-[#020009] text-white">
      <div className="absolute inset-x-0 top-0 z-0 h-[480px] blur-[120px] opacity-60" />
      <main className="relative z-10 flex min-h-screen flex-col items-center pb-32">
        <header className="relative flex w-full max-w-6xl flex-col gap-10 px-5 pb-16 pt-20 sm:px-10 lg:pb-20">
          <div className="absolute inset-0 -z-10 rounded-[48px] border border-white/8 bg-white/[0.02] shadow-[0_60px_160px_rgba(26,6,64,0.45)] blur-0" />
          <div className="relative flex flex-col items-start gap-6">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.5em] text-white/70">
              Revue féline hyperréaliste
            </span>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Cabaret des Chatons Angora — chorégraphie joyeuse, humour feutré et lumière
              voluptueuse
            </h1>
            <p className="max-w-2xl text-base text-white/70 sm:text-lg">
              Sur une scène baignée d&apos;une lumière naturelle filtrée, six chatons angora
              blancs dévoilent une chorégraphie ludique inspirée du swing sensuel de{" "}
              <span className="font-semibold text-white">“You Can Leave Your Hat On”</span>. Les
              accessoires miniatures scintillent au rythme d&apos;un groove taquin pour une revue
              douce, charmante et follement espiègle.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-white/60">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1">
                Hyperréalisme
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1">
                Caméra fluide
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1">
                Accessoires miniatures
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1">
                Lumière naturelle
              </span>
            </div>
          </div>
        </header>

        <StageShowcase />

        <section className="w-full max-w-6xl px-5 sm:px-10">
          <h2 className="text-2xl font-semibold tracking-wide text-white/90 sm:text-3xl">
            Découpage chorégraphique
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {sequences.map((sequence) => (
              <article
                key={sequence.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_60px_rgba(18,4,47,0.35)] transition duration-300 hover:-translate-y-1.5 hover:border-white/20"
              >
                <h3 className="text-lg font-semibold text-white/90">{sequence.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {sequence.description}
                </p>
                <p className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs uppercase tracking-[0.28em] text-white/60">
                  {sequence.cue}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 w-full max-w-6xl px-5 sm:px-10">
          <div className="flex flex-col gap-6 rounded-[40px] border border-white/12 bg-white/[0.03] p-8 shadow-[0_40px_150px_rgba(16,3,44,0.45)] sm:p-12">
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-[0.58em] text-white/50">
                Architecture lumineuse
              </span>
              <h2 className="text-2xl font-semibold text-white/90 sm:text-3xl">
                Palette et effets lumière
              </h2>
              <p className="max-w-2xl text-sm text-white/70 sm:text-base">
                Un éclairage sculptural qui met en relief la douceur du pelage, souligne les
                mouvements comiques et conserve une ambiance chaleureuse, digne d&apos;une captation
                cinéma.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {lightingNotes.map((note) => (
                <article
                  key={note.name}
                  className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-white/[0.08] p-6 text-white/70"
                >
                  <h3 className="text-lg font-semibold text-white/95">{note.name}</h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.32em] text-white/50">
                    {note.palette}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed">{note.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
