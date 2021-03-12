import React from "react";
import ImmobiliSection from "../common/ImmobiliSection";
import { Container, Row, Col, Image } from "react-bootstrap";
import aboutUs from "../../images/aboutUsPage/aboutUs.jpg";
import MapContainer from "../common/MapContainer";

/**
 * Effettua il render della AboutUs Page
 * @returns l'aboutUs Page
 */
const AboutUsPage = () => {
	return (
		<>
			<Container fluid className="aboutus">
				<Row>
					<Col md={8}>
						<div className="body">
							<Row>
								<div className="image">
									<Image
										src={aboutUs}
										fluid
										className="image"
										rounded
									/>
								</div>
							</Row>
							<Row>
								<div className="text-aboutus">{text()}</div>
							</Row>
						</div>
					</Col>
					<Col md={4}>
						<div className="aboutus-right-col">
							<Row>
								<div className="immobili">
									<ImmobiliSection homepage={false} />
								</div>
							</Row>
							<Row className="map-section">
								<MapContainer indirizzo="L'Aquila(AQ), via Enrico de Nicola 17" />
							</Row>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
};

function text() {
	return (
		<>
			L'agenzia Immobile17 nasce dal desiderio di valorizzare al massimo
			l'esperienza maturata nel settore dal 2015. L'utilizzo del proprio
			nome nel marchio vuol essere sinonimo di massima serietà,
			trasparenza e correttezza, valori concreti sui quali è fondata la
			nostra piccola ma efficiente struttura. Un'attività giovane e
			contemporanea che opera selezionando minuziosamente le migliori
			opportunità immobiliari, sia in vendita che in locazione. Ogni
			immobile che scegliamo di trattare è altamente qualificato, completo
			di documentazione e preparato alla vendita. IMMOBILI IN VISTA
			Rivolgersi alla nostra Agenzia Immobiliare significa affidarsi a
			giovani e dinamici professionisti, regolarmente iscritti alla Camera
			di Commercio e alla Fiaip (Federazione Italiana Agenti Immobiliari
			Professionali) costantemente aggiornati mediante corsi di alta
			formazione professionale, pronti ad ascoltarvi attentamente al fine
			di risolvere ogni tipo di esigenza legata all'abitare.Siamo in grado
			di offrire un'assistenza precisa e puntuale sin dal primo incontro.
			Tutto su misura e personalizzato come un abito sartoriale, tutto
			seguito direttamente da noi in prima persona: dalla valutazione
			dell'immobile al piano marketing dedicato, dalle visite coi clienti
			ai feed-back programmati, dalle trattative sino alla stipula
			dell'atto definitivo. La nostra figura è quella dell'AGENTE
			IMMOBILIARE PROFESSIONISTA e l'attenzione è principalmente rivolta,
			prima ancora che all'immobile, alla Persona ed alle sue esigenze: in
			questo modo gli interessi del Cliente sono sempre preminenti.
			Condividiamo ogni passaggio della compravendita con i nostri
			Clienti, in piena armonia e con la massima condivisione: la finalità
			è quella di raggiungere gli obiettivi prefissati con determinazione,
			spiccato dinamismo ed entusiasmo, mantenendo sempre un approccio
			diretto ed un'attenzione costante. Il rapporto confidenziale che si
			stabilisce è fondamentale per affrontare con serenità il delicato
			percorso di compravendita. Crediamo fortemente nei rapporti etici,
			nel rispetto reciproco e nella collaborazione qualificata: ogni tipo
			di contatto per noi è prezioso e diventa un'importante opportunità
			di crescita. Il costante sviluppo personale e professionale, i
			successi conseguiti nel tempo e la soddisfazione dei Clienti, hanno
			contribuito a far diventare oggi la nostra Azienda un rilevante
			punto di riferimento per chi necessita di un servizio efficiente e
			meticoloso, con professionalità e riservatezza. Ricerchiamo da
			sempre l'eccellenza nelle CASE, nella qualità delle RELAZIONI e nel
			modo di ABITARE.
		</>
	);
}

export default AboutUsPage;
