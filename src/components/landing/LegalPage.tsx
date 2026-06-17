import { Button, ComicPanel } from "@/components/ds";
import { FORJA_LEGAL, type LegalBlock, type LegalDocKey } from "@/lib/legal";

function LegalDoc({ block }: { block: LegalBlock }) {
  if ("hr" in block) return <hr className="lp-doc__hr" />;
  if ("h" in block)
    return (
      <h3 className="lp-doc__h">
        <span className="lp-doc__h-mark">▮</span>
        {block.h}
      </h3>
    );
  if ("ul" in block)
    return (
      <ul className="lp-doc__ul">
        {block.ul.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    );
  return <p className="lp-doc__p">{block.p}</p>;
}

/** The "Archivo Táctico" dossier template for the three legal documents. */
export function LegalPage({ doc }: { doc: LegalDocKey }) {
  const data = FORJA_LEGAL[doc] ?? FORJA_LEGAL.terminos;
  return (
    <div className="lp lp-legal">
      <div className="lp-dossier">
        <div className="lp-dossier__bar">
          <Button as="a" href="/" variant="primary" size="md">
            ← Volver a la Base
          </Button>
          <span className="lp-dossier__stamp" aria-hidden="true">
            Clasificado<br />
            <b>Acceso: Culto</b>
          </span>
        </div>

        <span className="lp-dossier__kicker">Archivo Táctico</span>
        <h1 className="lp-dossier__title">
          Archivo:<br />
          {data.title}
        </h1>

        <div className="lp-dossier__meta">
          <span>REF · {data.ref}</span>
          <span>NIVEL · MÁXIMO</span>
          <span>EST · ACTIVO</span>
          <span>REV · 2026.06</span>
        </div>

        <ComicPanel weight="frame" padded className="lp-dossier__file">
          <div className="lp-doc">
            <p className="lp-doc__intro">{data.intro}</p>
            <hr className="lp-doc__hr" />
            {data.blocks.map((b, i) => (
              <LegalDoc key={i} block={b} />
            ))}
            <hr className="lp-doc__hr" />
            <p className="lp-doc__sign">
              // FIN DEL ARCHIVO · FORJA — Forja tu físico, domina el sistema.
            </p>
          </div>
        </ComicPanel>

        <div className="lp-dossier__foot">
          <Button as="a" href="/" variant="outline" size="md">
            ← Volver a la Base
          </Button>
        </div>
      </div>
    </div>
  );
}
