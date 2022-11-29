import { JSXElement } from "solid-js";

export class Mapping {
  header: string;
  text: JSXElement;
  tiles: string = "/resources/_tiles/"
  
  constructor(header: string, text: JSXElement, resource: string) {
    this.header = header;
    this.text = text;
    this.tiles += resource + ".jpg";
  }
}

export const titleMapping = {
  instalacje_dachowe: new Mapping(
    "Instalacje dachowe",
    (
      <>
        Instalacja na powierzchni dachowej w zależności od pokrycia dobierana
        jest odpowiednia konstrukcja nośna. Kable na całej długości prowadzone
        są w osłonowych rurach lub peszlach a w części zewnętrznej odporne na UV
        zgodnie ze specyfikacją producenta.
      </>
    ),
    "instalacje_dachowe",
  ),
  instalacje_wolnostojace: new Mapping(
    "Instalacje wolnostojące",
    (
      <>
        Istnieje możliwość wykonania instalacji wolnostojącej w ogrodzie bądź w
        pobliżu budynku docelowego. W tym przypadku inwerter montowany jest
        bezpośrednio pod panelami, zasilanie AC po dobraniu przekroju prowadzimy
        ziemią w rurze osłonowej typu arot.
      </>
    ),
    "instalacje_wolnostojace",
  ),
  inwertery: new Mapping(
    "Inwertery",
    (
      <>
        Instalujemy oraz konfigurujemy inwertery wielu firm min Fronius, Huawei,
        Growatt, Goodwe.
        <br />
        Od strony DC (paneli) montujemy zabezpieczenia i ochronniki przepięć
        Citel lub Dehn typ T1 + T2 dla każdego łańcucha oddzielnie.
        <br />
        Strona AC (sieć) Dehn lub Citel T2. Instalację projektujemy tak by
        maksymalnie wykorzystać nasłonecznienie, dzielimy na niezależne
        łańcuchy. Wschód, zachód i południe każdy z tych kierunków ma swoje
        zalety. Nie tylko strona południowa jest najlepsza. Wschód i zachodem
        zwiększają konsumpcję własną budynku która normalnie nie przekracza 25%.
        Innymi słowy przez większą część dnia mamy relatywnie dużo własnej
        energii.
      </>
    ),
    "inwertery",
  ),
  offgrid: new Mapping(
    "Off-grid",
    (
      <>
        Oferujemy doradztwo oraz wykonanie instalacji gromadzących energię w
        akumulatorach. Naszym celem jest stworzenie samowystarczalnego
        energetycznie budynku przez całą dobę.
        <br />
        Do tego celu wykorzystujemy urządzania firmy Victron Energy - ładowarki
        solarne i inwertery.
        <br />
        Napisaliśmy własne oprogramowanie które łączy ze sobą te urządzenia i
        daje użytkownikowi pełen obraz o aktualnym stanie wszystkich elementów
        składowych systemu.
      </>
    ),
    "offgrid",
  ),
  monitoring_sieci: new Mapping(
    "Monitoring CCTV i sieci LAN",
    (
      <>
        Montujemy i konfigurujemy monitoring wizyjny posesji, wewnątrz i na
        zewnątrz budynków hal itp. Integrujemy z lokalną siecią LAN albo z
        wykorzystaniem modemu LTE tworzymy niezależną wyspę.
        <br />
        Użytkownik na stały dostęp poprzez aplikację mobilną lub komputer.
        Dodatkowo rejestratory zapisują nagranie do którego można wrócić nawet
        wiele dni później.
      </>
    ),
    "monitoring_sieci",
  ),
};
