import { BUSINESS } from './business'

/**
 * Search-result title and description for every public route (Magnus approved
 * the wording 2026-09-29). Until then every page shared the one <title> and
 * description from index.html, so Google could not tell the brake page from
 * the tyre page. Applied on navigation by components/PageMeta.tsx.
 *
 * Keep titles under ~60 characters and descriptions under ~155 so Google does
 * not cut them off. Business facts come from BUSINESS, never typed out here.
 */

export interface PageMeta {
  title: string
  description?: string
}

export const PAGE_META: Record<string, PageMeta> = {
  '/': {
    title: 'Bilverkstad i Gävle – Brynäs Bilservice',
    description: 'Oberoende bilverkstad på Sörby Urfjäll i Gävle. Service och reparationer för alla bilmärken, däck, AC, felsökning och bärgning. Pris innan vi börjar.',
  },
  '/om-oss': {
    title: 'Om oss – din bilverkstad i Brynäs | Brynäs Bilservice',
    description: 'Sedan 2021 driver vi en oberoende bilverkstad på Utmarksvägen i Gävle. Personlig service, fackmannamässigt arbete och raka besked.',
  },
  '/galleri': {
    title: 'Bilder från verkstaden – Brynäs Bilservice, Gävle',
    description: 'Bilder från Brynäs Bilservice på Utmarksvägen i Gävle: verkstaden, arbetet och bilarna vi tar hand om.',
  },
  '/biltjanster': {
    title: 'Biltjänster i Gävle – Brynäs Bilservice',
    description: 'Alla våra tjänster på ett ställe: service, oljebyte, bromsar, kamrem, koppling, hjul och chassi, däck, AC, felsökning och bärgning. Alla bilmärken.',
  },
  '/service-reparationer': {
    title: 'Bilservice & reparationer i Gävle – Brynäs Bilservice',
    description: 'Bas-, mellan- och stor service samt reparationer för alla bilmärken i Gävle. Tydligt pris innan vi börjar och inget extraarbete utan ditt godkännande.',
  },
  '/reparationer-storre-arbeten': {
    title: 'Reparationer & större arbeten i Gävle – Brynäs Bilservice',
    description: 'Motor, koppling, avgassystem och andra större reparationer för alla bilmärken i Gävle. Kostnadsförslag innan vi börjar och inget extraarbete utan ditt OK.',
  },
  '/felsokning': {
    title: 'Felsökning & diagnostik i Gävle – Brynäs Bilservice',
    description: 'Lyser en varningslampa eller låter bilen konstigt? Vi läser av felkoder och mäter oss fram till den verkliga orsaken, för alla märken och modeller.',
  },
  '/oljebyte': {
    title: 'Oljebyte i Gävle – Brynäs Bilservice',
    description: 'Oljebyte med rätt olja och filter för din motor. Vi byter olja på alla bilmärken hos Brynäs Bilservice i Gävle.',
  },
  '/kamrem': {
    title: 'Kamremsbyte i Gävle – Brynäs Bilservice',
    description: 'Ett kamremsbyte i tid skyddar motorn mot haveri. Vi byter kamrem på alla bilmärken och ger dig pris innan vi börjar.',
  },
  '/koppling': {
    title: 'Byte av koppling i Gävle – Brynäs Bilservice',
    description: 'Slirar kopplingen eller rycker bilen? Vi felsöker och byter koppling på alla bilmärken hos Brynäs Bilservice i Gävle.',
  },
  '/bromssystem': {
    title: 'Bromsservice & bromsbyte i Gävle – Brynäs Bilservice',
    description: 'Byte av bromsbelägg, bromsskivor och bromsvätska. Vi kontrollerar hela bromssystemet på alla bilmärken hos Brynäs Bilservice i Gävle.',
  },
  '/bilbatteri': {
    title: 'Bilbatteri & batteribyte i Gävle – Brynäs Bilservice',
    description: 'Svårstartad bil? Vi testar batteriet, byter och kodar rätt batterityp för din bil, oavsett märke. Brynäs Bilservice i Gävle.',
  },
  '/stodampare-fjadrar': {
    title: 'Stötdämpare & fjädrar i Gävle – Brynäs Bilservice',
    description: 'Vi inspekterar och byter stötdämpare och fjädrar och gör hjulinställning efteråt. För alla bilmärken hos Brynäs Bilservice i Gävle.',
  },
  '/hjullagerbyte': {
    title: 'Hjullagerbyte i Gävle – Brynäs Bilservice',
    description: 'Brummande ljud eller vibrationer? Vi hittar det slitna hjullagret och byter det på alla bilmärken hos Brynäs Bilservice i Gävle.',
  },
  '/avgassystem': {
    title: 'Avgassystem & ljuddämpare i Gävle – Brynäs Bilservice',
    description: 'Vi hittar läckage, byter ljuddämpare och felsöker lambdasonder och katalysatorer. För alla bilmärken hos Brynäs Bilservice i Gävle.',
  },
  '/drivaxel-drivknutar': {
    title: 'Drivaxel & drivknutar i Gävle – Brynäs Bilservice',
    description: 'Vi byter damasker, drivknutar och kompletta drivaxlar på alla bilmärken hos Brynäs Bilservice i Gävle.',
  },
  '/styrning-kulleder': {
    title: 'Styrning & kulleder i Gävle – Brynäs Bilservice',
    description: 'Glapp eller missljud i framvagnen? Vi byter slitna styr- och spindelleder och gör hjulinställning. Brynäs Bilservice i Gävle.',
  },
  '/dackservice': {
    title: 'Däckservice & hjulskifte i Gävle – Brynäs Bilservice',
    description: 'Hjulskifte, montering, balansering, hjulinställning, punkteringslagning och däckhotell hos Brynäs Bilservice i Gävle.',
  },
  '/ac-service': {
    title: 'AC-service i Gävle – Brynäs Bilservice',
    description: 'Service, påfyllning och klimatrengöring av bilens AC. Vi felsöker också när AC:n inte kyler som den ska. Brynäs Bilservice i Gävle.',
  },
  '/bargning': {
    title: 'Bärgning & biltransport i Gävle – Brynäs Bilservice',
    description: 'Har bilen gått sönder? Vi hjälper till med bärgning, starthjälp och transport direkt till vår verkstad i Gävle.',
  },
  '/kontakt': {
    title: 'Kontakt – Brynäs Bilservice, Utmarksvägen i Gävle',
    description: `Ring ${BUSINESS.phone.display}, mejla eller skicka ett meddelande. Besök oss på ${BUSINESS.address.full}.`,
  },
  '/bilar-till-salu': {
    title: 'Begagnade bilar till salu i Gävle – Brynäs Bilservice',
    description: `Begagnade bilar som våra egna mekaniker har gått igenom, kontrollerat och servat. ${BUSINESS.address.street} i ${BUSINESS.address.city}.`,
  },
  '/admin': { title: 'Admin – Brynäs Bilservice' },
}

/** Unknown paths render the 404 page; it gets its own title and is kept out of search results. */
export const NOT_FOUND_META: PageMeta = { title: 'Sidan hittades inte – Brynäs Bilservice' }
