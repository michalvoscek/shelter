"use client";

import styled from "styled-components";
import SubPage from "@/components/SubPage";
import { useDonationStatus } from "@/hooks/useDonationStatus";

const Paragraph = styled.p`
  max-width: 100%;
  font-size: 17px;
  line-height: 1.65;
  color: var(--text);
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--border);
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Stat = styled.div`
  text-align: center;

  strong {
    display: block;
    font-size: 72px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--primary);
    margin-bottom: 8px;
  }

  span {
    font-size: 18px;
    font-weight: 600;
    color: var(--text);
  }

  @media (max-width: 640px) {
    strong {
      font-size: 40px;
    }
  }
`;

export default function AboutContent() {
  const { data, isLoading, isError } = useDonationStatus();

  return (
    <SubPage title="O projekte">
      <Paragraph>
        Nadácia Good Boy sa venuje zlepšovaniu života psov v Žiline na
        Slovensku. Zachraňujeme opustené, týrané a bezdomovské psy,
        poskytujeme im lekársku starostlivosť, útočisko a lásku, ktorú si
        zaslúžia. Naším poslaním je dať týmto verným spoločníkom druhú šancu
        na život tým, že im nájdeme milujúci domov. Okrem záchrany a
        rehabilitácie sa zameriavame aj na podporu zodpovedného vlastníctva
        zvierat a ochrany zvierat prostredníctvom vzdelávacích a komunitných
        programov.
      </Paragraph>
      <Divider />
      <Stats>
        <Stat>
          <strong>
            {isLoading
              ? "Načítava sa..."
              : isError
                ? "Nedostupné"
                : `${(data!.contribution).toLocaleString("sk-SK", { style: "currency", currency: "EUR" })}`}
          </strong>
          <span>Celková vyzbieraná hodnota</span>
        </Stat>
        <Stat>
          <strong>
            {isLoading
              ? "Načítava sa..."
              : isError
                ? "Nedostupné"
                : data!.contributors.toLocaleString("sk-SK")}
          </strong>
          <span>Počet darcov</span>
        </Stat>
      </Stats>
      <Divider />
      <Paragraph>
        Naša práca je možná vďaka podpore vášnivých dobrovoľníkov, štedrých
        darcov a komunity, ktorá sa hlboko stará o dobro zvierat. Organizujeme
        aj kastračné a sterilizačné iniciatívy, aby sme riešili problém
        túlavých psov a zabezpečili dlhodobý vplyv. V nadácii Good Boy veríme,
        že každý pes si zaslúži bezpečný, milujúci domov a šťastný život.
        Pridajte sa k nám a pomôžte nám robiť zmeny – či už dobrovoľníctvom,
        darovaním alebo adopciou chlpatého priateľa. Spoločne môžeme vytvoriť
        lepšiu budúcnosť pre psy v Žiline.
      </Paragraph>
    </SubPage>
  );
}
