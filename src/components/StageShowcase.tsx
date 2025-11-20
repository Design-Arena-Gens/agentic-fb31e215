"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Performer = {
  id: string;
  name: string;
  role: string;
  accessory: "bow" | "tie" | "hat";
  catchphrase: string;
  delay: number;
  position: string;
};

const performers: Performer[] = [
  {
    id: "lila",
    name: "Lila Velvet",
    role: "Capitaine de la revue",
    accessory: "hat",
    catchphrase: "Un regard espiègle et le chapeau bas pour ouvrir le bal.",
    delay: 0,
    position: "md:col-start-2",
  },
  {
    id: "milo",
    name: "Milo Swing",
    role: "Acrobate syncopé",
    accessory: "tie",
    catchphrase: "Pirouettes félines et contretemps suaves.",
    delay: 0.3,
    position: "md:col-start-1",
  },
  {
    id: "pepita",
    name: "Pépita Stardust",
    role: "Tempo scintillant",
    accessory: "bow",
    catchphrase: "Rubans dorés et battements précis comme un métronome.",
    delay: 0.6,
    position: "md:col-start-3",
  },
  {
    id: "noisette",
    name: "Noisette Glissade",
    role: "Pas de deux comique",
    accessory: "tie",
    catchphrase: "Sauts synchronisés et mimiques malicieuses.",
    delay: 0.9,
    position: "md:col-start-1",
  },
  {
    id: "opaline",
    name: "Opaline Bluebell",
    role: "Batonniste céleste",
    accessory: "bow",
    catchphrase: "Rubans tournoyants et scintillements nacrés.",
    delay: 1.2,
    position: "md:col-start-2",
  },
  {
    id: "cosmo",
    name: "Cosmo Strut",
    role: "Basse chaloupée",
    accessory: "hat",
    catchphrase: "Groove moelleux et sourire irrésistible.",
    delay: 1.5,
    position: "md:col-start-3",
  },
];

type CatFigureProps = {
  performer: Performer;
};

function CatFigure({ performer }: CatFigureProps) {
  return (
    <div
      className="cat"
      style={{ "--delay": performer.delay } as React.CSSProperties}
      aria-label={`${performer.name}, ${performer.role}`}
    >
      <div className="cat-body" />
      <div className="cat-ear left" />
      <div className="cat-ear right" />
      <div className="cat-face">
        <div className="cat-eye left" />
        <div className="cat-eye right" />
        <div className="cat-nose" />
        <div className="cat-whiskers" />
      </div>
      <div className="cat-chest" />
      <div className="cat-paw left" />
      <div className="cat-paw right" />
      <div className="cat-tail" />

      {performer.accessory === "hat" && <div className="cat-accessory cat-hat" />}
      {performer.accessory === "bow" && <div className="cat-accessory cat-bow" />}
      {performer.accessory === "tie" && <div className="cat-accessory cat-tie" />}

      <div className="cat-sparkle" />
      <div className="cat-sparkle" />
      <div className="cat-sparkle" />
    </div>
  );
}

type AudioState = {
  ctx: AudioContext;
  master: GainNode;
};

export function StageShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioStateRef = useRef<AudioState | null>(null);
  const nextNoteTimeRef = useRef(0);
  const beatIndexRef = useRef(0);
  const schedulerRef = useRef<number | null>(null);
  const noiseBufferRef = useRef<AudioBuffer | null>(null);

  const tempo = 104;
  const subdivision = 2; // eighth notes

  const createNoiseBuffer = useCallback((ctx: AudioContext) => {
    if (noiseBufferRef.current) return noiseBufferRef.current;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
    const channel = buffer.getChannelData(0);
    for (let i = 0; i < channel.length; i++) {
      channel[i] = Math.random() * 2 - 1;
    }
    noiseBufferRef.current = buffer;
    return buffer;
  }, []);

  const scheduleBeat = useCallback(
    (time: number) => {
      const audioState = audioStateRef.current;
      if (!audioState) return;
      const { ctx, master } = audioState;

      const meterPosition = beatIndexRef.current % 8;
      const bassPattern = [1, 0, 1, 0, 1, 0, 1, 0];
      const hatPattern = [0, 1, 0, 1, 0, 1, 0, 1];
      const accentPattern = [0, 0, 0, 0, 1, 0, 0, 0];

      if (bassPattern[meterPosition]) {
        const osc = ctx.createOscillator();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(146.83, time);
        osc.frequency.exponentialRampToValueAtTime(110, time + 0.22);

        const envelope = ctx.createGain();
        envelope.gain.setValueAtTime(0.0001, time);
        envelope.gain.exponentialRampToValueAtTime(0.3, time + 0.02);
        envelope.gain.exponentialRampToValueAtTime(0.0001, time + 0.36);

        osc.connect(envelope).connect(master);
        osc.start(time);
        osc.stop(time + 0.42);
      }

      if (hatPattern[meterPosition]) {
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = createNoiseBuffer(ctx);
        const highPass = ctx.createBiquadFilter();
        highPass.type = "highpass";
        highPass.frequency.setValueAtTime(6500, time);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.exponentialRampToValueAtTime(0.18, time + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.12);

        noiseSource.connect(highPass).connect(gain).connect(master);
        noiseSource.start(time);
        noiseSource.stop(time + 0.14);
      }

      if (accentPattern[meterPosition]) {
        const osc = ctx.createOscillator();
        osc.type = "triangle";
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.exponentialRampToValueAtTime(0.22, time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.28);

        osc.frequency.setValueAtTime(523.25, time);
        osc.frequency.exponentialRampToValueAtTime(392, time + 0.28);

        osc.connect(gain).connect(master);
        osc.start(time);
        osc.stop(time + 0.32);
      }

      beatIndexRef.current = (beatIndexRef.current + 1) % 8;
    },
    [createNoiseBuffer]
  );

  const scheduler = useCallback(() => {
    const audioState = audioStateRef.current;
    if (!audioState) return;
    const { ctx } = audioState;
    const lookAhead = 0.6;
    const secondsPerBeat = 60 / tempo;

    while (nextNoteTimeRef.current < ctx.currentTime + lookAhead) {
      scheduleBeat(nextNoteTimeRef.current);
      nextNoteTimeRef.current += secondsPerBeat / subdivision;
    }

    schedulerRef.current = window.setTimeout(scheduler, 60);
  }, [scheduleBeat, tempo]);

  const stopMusic = useCallback(() => {
    if (schedulerRef.current !== null) {
      window.clearTimeout(schedulerRef.current);
      schedulerRef.current = null;
    }
    if (audioStateRef.current) {
      const { ctx, master } = audioStateRef.current;
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
      window.setTimeout(() => {
        ctx.close().catch(() => undefined);
      }, 450);
    }
    audioStateRef.current = null;
    beatIndexRef.current = 0;
    nextNoteTimeRef.current = 0;
    setIsPlaying(false);
  }, []);

  const startMusic = useCallback(async () => {
    if (isPlaying) {
      stopMusic();
      return;
    }

    const ctx = new AudioContext();
    await ctx.resume();
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, ctx.currentTime);
    master.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + 0.4);
    master.connect(ctx.destination);

    audioStateRef.current = { ctx, master };
    beatIndexRef.current = 0;
    nextNoteTimeRef.current = ctx.currentTime + 0.12;

    scheduler();
    setIsPlaying(true);
  }, [isPlaying, scheduler, stopMusic]);

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, [stopMusic]);

  const performerHighlights = useMemo(
    () =>
      performers.map((performer) => (
        <article
          key={performer.id}
          className="rounded-3xl border border-white/8 bg-white/5 backdrop-blur-lg p-5 shadow-[0_18px_45px_rgba(24,5,62,0.35)] transition-transform hover:-translate-y-1 hover:border-white/12"
        >
          <h3 className="text-lg tracking-wide text-white/95">{performer.name}</h3>
          <p className="text-sm text-white/70">{performer.role}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/75">
            {performer.catchphrase}
          </p>
        </article>
      )),
    []
  );

  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-16 px-4 pb-24 pt-12 sm:px-8">
      <div aria-hidden className="backdrop-glow" />
      <div className="relative w-full rounded-[48px] border border-white/10 bg-white/[0.03] bg-gradient-to-br from-white/10 via-white/8 to-white/10 p-[1px] shadow-[0_40px_120px_rgba(37,7,85,0.55)]">
        <div className="relative overflow-hidden rounded-[46px] bg-slate-950/40 px-4 py-12 sm:px-10">
          <div className="stage-spotlight" aria-hidden />
          <div className="light-beam" aria-hidden />
          <div className="light-beam" aria-hidden />
          <div className="light-beam" aria-hidden />
          <div className="light-beam" aria-hidden />

          <div className="relative z-10 flex flex-col items-center gap-8">
            <h2 className="max-w-3xl text-center text-3xl font-semibold tracking-[0.12em] text-white/95 sm:text-4xl md:text-5xl">
              Revue Lumineuse des Chatons Angora
            </h2>
            <p className="max-w-2xl text-center text-base text-white/70 sm:text-lg">
              Une chorégraphie espiègle inspirée du groove de{" "}
              <span className="font-semibold text-white/85">“You Can Leave Your Hat On”</span>,
              mise en lumière par des projecteurs soyeux, des accessoires miniatures et des
              mimiques irrésistibles.
            </p>

            <button
              type="button"
              onClick={startMusic}
              className="group relative overflow-hidden rounded-full border border-white/15 bg-gradient-to-r from-fuchsia-500/60 via-amber-400/60 to-sky-400/60 px-8 py-3 text-sm font-semibold uppercase tracking-[0.38em] text-white shadow-[0_16px_40px_rgba(99,13,109,0.45)] transition hover:border-white/25 hover:from-fuchsia-400/80 hover:via-amber-300/80 hover:to-sky-300/80"
            >
              {isPlaying ? "Pause le groove" : "Lancer la revue"}
              <span className="absolute inset-0 -translate-x-full bg-white/30 transition duration-500 ease-out group-hover:translate-x-full" />
            </button>
          </div>

          <div className="relative z-10 mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
            {performers.map((performer) => (
              <div
                key={performer.id}
                className={`relative flex flex-col items-center justify-end ${performer.position}`}
              >
                <CatFigure performer={performer} />
              </div>
            ))}
          </div>

          <div className="stage-floor" aria-hidden />
          <div className="stage-fog" aria-hidden />

          <span className="floating-note" style={{ bottom: "20%", left: "14%", animationDelay: "0.4s" }}>
            ♪
          </span>
          <span className="floating-note" style={{ bottom: "32%", left: "72%", animationDelay: "1.1s" }}>
            ♫
          </span>
          <span className="floating-note" style={{ bottom: "42%", left: "44%", animationDelay: "1.8s" }}>
            ♬
          </span>
          <span className="floating-note" style={{ bottom: "26%", left: "86%", animationDelay: "2.2s" }}>
            ♫
          </span>
          <span className="floating-note" style={{ bottom: "18%", left: "30%", animationDelay: "2.8s" }}>
            ♪
          </span>
        </div>
      </div>

      <div className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-3">{performerHighlights}</div>
    </section>
  );
}
